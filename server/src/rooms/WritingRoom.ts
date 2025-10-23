import { Room, Client } from "colyseus";
import { JWT } from "@colyseus/auth";
import { WritingGameState, Player, Story } from "./schema/WritingGameState";
import { GAME_CONFIG } from "../constants/game-config";
import { prisma } from "../lib/prisma";
// import * as Diff from 'diff';
const Diff = require("diff");

interface JWTPayload {
  email: string;
  name?: string;
  [key: string]: any;
}

interface CreateStoryData {
  gameSessionId: string;
  promptId: string;
  orderIndex: number;
}

export class WritingRoom extends Room<WritingGameState> {
  private currentPhaseTimeout!: NodeJS.Timeout;
  private timerInterval!: NodeJS.Timeout;
  private gameSessionId!: string;
  maxClients = GAME_CONFIG.requirements.maxPlayers;

  static async onAuth(token: string) {
    try {
      const payload = (await JWT.verify(token)) as JWTPayload;
      return payload;
    } catch (error) {
      throw new Error("Authentication failed");
    }
  }

  async onCreate() {
    console.log("WritingRoom created!", this.roomId);

    // Create game session in database
    this.gameSessionId = await this.createGameSession();

    this.setState(new WritingGameState());
    this.initializeGame();
    this.setupMessageHandlers();
  }

  async onJoin(client: Client, options: any, auth: JWTPayload) {
    console.log("Authenticated user joined:", auth.email);

    // Add player to database game session
    await this.addPlayerToGameSession(auth);

    // Duplicate login prevention and player setup (existing logic)
    this.state.players.forEach((existingPlayer, sessionId) => {
      if (
        existingPlayer.email === auth.email &&
        sessionId !== client.sessionId
      ) {
        console.log(`Kicking duplicate login for ${auth.email}`);
        const existingClient = this.clients.find(
          (c) => c.sessionId === sessionId
        );
        if (existingClient) {
          existingClient.leave(1000, "Logged in from another location");
        }
        this.state.players.delete(sessionId);
        this.state.readyStates.delete(sessionId);
      }
    });

    // Create player with new game properties
    const player = new Player();
    player.playerId = client.sessionId;
    player.playerName = auth.name || auth.email;
    player.email = auth.email;
    player.isAuthenticated = true;
    player.isReady = false;
    player.hasSubmitted = false;

    this.state.players.set(client.sessionId, player);
    this.state.readyStates.set(client.sessionId, false);

    console.log(
      `Player ${auth.email} added. Total players: ${this.state.players.size}`
    );
    this.checkLobbyStart();
  }

  async onLeave(client: Client) {
    console.log("Player left:", client.sessionId);

    if (this.state.players.has(client.sessionId)) {
      const player = this.state.players.get(client.sessionId);
      console.log(`Removing player ${player?.email} from room`);

      this.state.players.delete(client.sessionId);
      this.state.readyStates.delete(client.sessionId);
      this.state.currentAssignments.delete(client.sessionId);
    }

    if (this.state.phase === "lobby") {
      this.checkLobbyStart();
    }
  }

  // === DATABASE METHODS ===

  private async createGameSession(): Promise<string> {
    const gameSession = await prisma.gameSession.create({
      data: {
        roomId: this.roomId,
        status: "active",
      },
    });
    console.log("Game session created:", gameSession.id);
    return gameSession.id;
  }

  private async addPlayerToGameSession(auth: JWTPayload) {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: auth.email },
    });

    if (!user) {
      console.error("User not found in database:", auth.email);
      return;
    }

    await prisma.gameParticipant.create({
      data: {
        gameSessionId: this.gameSessionId,
        playerId: user.id,
      },
    });
    console.log(`Player ${auth.email} added to game session`);
  }

  private async createStoryInDatabase(data: CreateStoryData) {
    const story = await prisma.story.create({
      data: {
        gameSessionId: data.gameSessionId,
        promptId: data.promptId,
        orderIndex: data.orderIndex,
        accumulatedContent: "", // Start with empty content
        editHistory: [], // Start with empty edit history
      },
    });
    return story;
  }

  private async updateStoryWithEdit(
    storyId: string,
    playerId: string,
    playerName: string,
    previousContent: string,
    newContent: string,
    roundNumber: number
  ) {
    // Generate diff using jsdiff
    const diff = Diff.diffChars(previousContent, newContent);

    // Create wrapper object with metadata
    const editRecord = {
      playerId,
      playerName,
      roundNumber,
      timestamp: new Date().toISOString(),
      diff,
    };

    // Update story in database
    const updatedStory = await prisma.story.update({
      where: { id: storyId },
      data: {
        accumulatedContent: newContent,
        editHistory: {
          push: editRecord,
        },
      },
    });

    console.log(`Story ${storyId} updated with edit from ${playerName}`);
    return updatedStory;
  }

  private async completeGameSession() {
    await prisma.gameSession.update({
      where: { id: this.gameSessionId },
      data: {
        status: "completed",
        completedAt: new Date(),
      },
    });
    console.log("Game session marked as completed:", this.gameSessionId);
  }

  // === GAME LOGIC (UPDATED FOR NEW STORAGE) ===

  private initializeGame() {
    this.state.phase = "lobby";
    this.state.timerEndsAt = 0;
    this.state.timeRemaining = 0;
    this.state.currentRound = 0;
    this.state.stories.clear();
    this.state.currentAssignments.clear();
    console.log("Game initialized in lobby phase");
  }

  private setupMessageHandlers() {
    this.onMessage("toggleReady", (client) => {
      this.handlePlayerReady(client);
    });

    this.onMessage("backToLobby", (client) => {
      this.handleBackToLobby();
    });

    this.onMessage("submitWriting", (client, message) => {
      console.log("=== DEBUG: submitWriting message ===");
      console.log("Full message:", message);

      const content = message?.content || message?.text;
      console.log("Final content:", content);

      if (!content) {
        console.error("No content found in submitWriting message!");
        return;
      }

      this.handleWritingSubmission(client, content);
    });
  }

  private async handleWritingSubmission(client: Client, text: string) {
    console.log(`=== DEBUG: handleWritingSubmission called ===`);
    console.log(`Phase: ${this.state.phase}`);
    console.log(`Client session: ${client.sessionId}`);

    if (this.state.phase !== "writing") {
      console.log(`ERROR: Not in writing phase!`);
      return;
    }

    const player = this.state.players.get(client.sessionId);
    console.log(`Player found:`, player ? player.playerName : "NOT FOUND");

    if (!player) return;

    const assignedStoryId = this.state.currentAssignments.get(client.sessionId);
    console.log(`Assigned story ID:`, assignedStoryId);

    if (!assignedStoryId) {
      console.log(`ERROR: No story assignment for player ${player.playerName}`);
      return;
    }

    const story = this.state.stories.get(assignedStoryId);
    console.log(`Story found:`, story ? story.storyId : "NOT FOUND");

    if (!story) return;

    if (text === undefined || text === null) {
      console.error(`ERROR: Text is undefined for player ${player.playerName}`);
      return;
    }

    // Get the previous accumulated content
    const previousContent = story.accumulatedContent || "";

    // Create new accumulated content by appending the new text
    const newContent = previousContent ? `${previousContent} ${text}` : text;

    // Update in-memory state
    story.accumulatedContent = newContent;
    story.segments.set(client.sessionId, text);
    player.hasSubmitted = true;

    // Update database with the edit
    try {
      await this.updateStoryWithEdit(
        assignedStoryId, // This is now the database story ID
        client.sessionId,
        player.playerName,
        previousContent,
        newContent,
        this.state.currentRound
      );
      console.log(`Database updated for story ${assignedStoryId}`);
    } catch (error) {
      console.error("Failed to update story in database:", error);
    }

    console.log(
      `Player ${player.playerName} added to story ${assignedStoryId}`
    );

    // Check if all players have submitted
    const allSubmitted = Array.from(this.state.players.values()).every(
      (p) => p.hasSubmitted
    );

    if (allSubmitted) {
      console.log(
        "All players have submitted! Moving to next round or reading."
      );
      if (this.currentPhaseTimeout) {
        clearTimeout(this.currentPhaseTimeout);
      }
      this.handleRoundCompletion();
    }
  }

  private async startWritingPhase() {
    console.log("Starting writing phase!");

    if (this.currentPhaseTimeout) {
      clearTimeout(this.currentPhaseTimeout);
    }

    // Reset submission states
    this.state.players.forEach((player) => {
      player.hasSubmitted = false;
    });

    // Initialize stories if first round - NOW WITH DATABASE
    if (this.state.currentRound === 0) {
      await this.initializeStories();
    } else {
      this.rotateStoryAssignments();
    }

    this.state.phase = "writing";

    // Set writing timer
    const endTime = Date.now() + GAME_CONFIG.timers.writingPhase;
    this.state.timerEndsAt = endTime;
    this.state.timeRemaining = GAME_CONFIG.timers.writingPhase;

    console.log(
      `Round ${this.state.currentRound + 1} started with ${
        this.state.stories.size
      } stories`
    );

    this.currentPhaseTimeout = setTimeout(() => {
      this.handleRoundCompletion();
    }, GAME_CONFIG.timers.writingPhase);

    this.startTimerUpdates();
  }

  private async initializeStories() {
    const playersArray = Array.from(this.state.players.values());

    // Get a random prompt from database (for now, use config - will update later)
    const randomPrompt = this.getRandomPrompt();

    // Create prompt in database or get existing one
    let prompt = await prisma.prompt.findFirst({
      where: { text: randomPrompt },
    });

    if (!prompt) {
      prompt = await prisma.prompt.create({
        data: { text: randomPrompt },
      });
    }

    // Update prompt usage count
    await prisma.prompt.update({
      where: { id: prompt.id },
      data: { usedCount: { increment: 1 } },
    });

    for (let i = 0; i < playersArray.length; i++) {
      const player = playersArray[i];

      // Create story in database
      const dbStory = await this.createStoryInDatabase({
        gameSessionId: this.gameSessionId,
        promptId: prompt.id,
        orderIndex: i,
      });

      // Create in-memory story representation
      const story = new Story();
      story.storyId = dbStory.id; // Now using database ID
      story.originalPrompt = randomPrompt;
      story.accumulatedContent = "";
      story.currentRound = 0;

      this.state.stories.set(story.storyId, story);
      this.state.currentAssignments.set(player.playerId, story.storyId);

      console.log(`Player ${player.playerName} starts story: ${story.storyId}`);
    }
  }

  private async handleRoundCompletion() {
    this.state.currentRound++;
    const totalRounds = this.state.players.size;

    if (this.state.currentRound < totalRounds) {
      // More rounds to go
      console.log(
        `Completed round ${this.state.currentRound}, starting next round after buffer`
      );

      this.state.phase = "betweenRounds";
      this.state.timerEndsAt = 0;
      this.state.timeRemaining = 0;

      this.currentPhaseTimeout = setTimeout(() => {
        this.startWritingPhase();
      }, GAME_CONFIG.timers.betweenRoundsBuffer);
    } else {
      // All rounds complete - save to database and move to reading
      console.log(
        "All rounds completed! Saving game and moving to reading phase."
      );
      await this.completeGameSession();
      this.startReadingPhase();
    }
  }

  private startReadingPhase() {
    console.log("Starting reading phase - preparing to move to reading room");

    if (this.currentPhaseTimeout) {
      clearTimeout(this.currentPhaseTimeout);
    }

    // Notify clients to move to reading room
    this.broadcast("moveToReadingRoom", {
      gameSessionId: this.gameSessionId,
    });

    // Close this room after a brief delay to allow clients to transition
    setTimeout(() => {
      this.disconnect();
    }, 5000);
  }

  // ADD THESE MISSING METHODS:
  private checkLobbyStart() {
    // We'll implement this later - just adding the signature for now
    console.log("checkLobbyStart called");
  }

  private handlePlayerReady(client: Client) {
    // We'll implement this later
    console.log("handlePlayerReady called for", client.sessionId);
  }

  private handleBackToLobby() {
    // We'll implement this later
    console.log("handleBackToLobby called");
  }

  private rotateStoryAssignments() {
    // We'll implement this later
    console.log("rotateStoryAssignments called");
  }

  private startTimerUpdates() {
    // We'll implement this later
    console.log("startTimerUpdates called");
  }
  private getRandomPrompt(): string {
    const prompts = GAME_CONFIG.prompts;
    return prompts[Math.floor(Math.random() * prompts.length)];
  }

  onDispose() {
    if (this.currentPhaseTimeout) {
      clearTimeout(this.currentPhaseTimeout);
    }
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    console.log("WritingRoom disposed", this.roomId);
  }
}
