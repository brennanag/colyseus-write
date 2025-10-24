import { Room, Client } from "colyseus";
import { JWT } from "@colyseus/auth";
import { WritingGameState, Player, Story } from "./schema/WritingGameState";
import { GAME_CONFIG } from "../constants/game-config";
import { prisma } from "../lib/prisma";
import { Diff } from "diff";

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
  private readyCountdownInterval!: NodeJS.Timeout;
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

        // Remove from readyOrder if present
        const readyIndex = this.state.readyOrder.indexOf(sessionId);
        if (readyIndex > -1) {
          this.state.readyOrder.splice(readyIndex, 1);
        }
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
  }

  async onLeave(client: Client) {
    console.log("Player left:", client.sessionId);

    if (this.state.players.has(client.sessionId)) {
      const player = this.state.players.get(client.sessionId);
      console.log(`Removing player ${player?.email} from room`);

      this.state.players.delete(client.sessionId);
      this.state.readyStates.delete(client.sessionId);
      this.state.currentAssignments.delete(client.sessionId);

      // Remove from readyOrder if present
      const readyIndex = this.state.readyOrder.indexOf(client.sessionId);
      if (readyIndex > -1) {
        this.state.readyOrder.splice(readyIndex, 1);
      }
    }

    if (this.state.phase === "ready") {
      this.checkReadyStart();
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
      // TODO: Re-enable diff later
  const diff = Diff.diffChars(previousContent, newContent);

    // Create wrapper object with metadata
    const editRecord = {
      playerId,
      playerName,
      roundNumber,
      timestamp: new Date().toISOString(),
      content: newContent,
      previousContent: previousContent,
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
    this.state.phase = "ready";
    this.state.timerEndsAt = 0;
    this.state.timeRemaining = 0;
    this.state.currentRound = 0;
    this.state.readyCountdownRemaining = 0;
    this.state.isReadyCountdownActive = false;
    this.state.readyOrder.splice(0, this.state.readyOrder.length);
    this.state.stories.clear();
    this.state.currentAssignments.clear();
    console.log("Game initialized in ready phase");
  }

  private setupMessageHandlers() {
    this.onMessage("toggleReady", (client) => {
      this.handlePlayerReady(client);
    });

    this.onMessage("backToready", () => {
      this.handleBackToready();
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

  private handlePlayerReady(client: Client) {
    const currentReadyState =
      this.state.readyStates.get(client.sessionId) || false;
    const newReadyState = !currentReadyState;

    this.state.readyStates.set(client.sessionId, newReadyState);

    const player = this.state.players.get(client.sessionId);
    if (player) {
      player.isReady = newReadyState;
    }

    // Update ready order
    if (newReadyState) {
      // Add to ready order if not already there
      if (!this.state.readyOrder.includes(client.sessionId)) {
        this.state.readyOrder.push(client.sessionId);
      }
    } else {
      // Remove from ready order
      const index = this.state.readyOrder.indexOf(client.sessionId);
      if (index > -1) {
        this.state.readyOrder.splice(index, 1);
      }
    }

    console.log(
      `Player ${client.sessionId} ready state: ${newReadyState}. Ready order:`,
      this.state.readyOrder
    );
    this.checkReadyStart();
  }

  private checkReadyStart() {
    const minPlayers = GAME_CONFIG.requirements.minPlayers;
    const currentReadyCount = this.state.readyOrder.length;

    // Not enough players - ensure countdown is stopped
    if (currentReadyCount < minPlayers) {
      if (this.state.isReadyCountdownActive) {
        this.state.isReadyCountdownActive = false;
        this.state.readyCountdownRemaining = 0;
        if (this.readyCountdownInterval) {
          clearInterval(this.readyCountdownInterval);
        }
        this.broadcast("readyCountdownCancelled");
        console.log("ready countdown cancelled - not enough ready players");
      }
      return;
    }

    // Enough players and countdown not already running - start countdown
    if (!this.state.isReadyCountdownActive) {
      this.state.isReadyCountdownActive = true;
      this.state.readyCountdownRemaining = GAME_CONFIG.timers.readyCountdown;

      console.log(
        `Starting ready countdown with ${currentReadyCount} ready players`
      );

      this.currentPhaseTimeout = setTimeout(() => {
        this.startWritingPhase();
      }, GAME_CONFIG.timers.readyCountdown);

      // Start updating the countdown for clients
      this.startreadyCountdownUpdates();
    }
  }

  private startreadyCountdownUpdates() {
    if (this.readyCountdownInterval) {
      clearInterval(this.readyCountdownInterval);
    }

    this.readyCountdownInterval = setInterval(() => {
      if (!this.state.isReadyCountdownActive) {
        clearInterval(this.readyCountdownInterval);
        return;
      }

      this.state.readyCountdownRemaining -= 1000;

      this.broadcast("readyCountdownUpdate", {
        timeRemaining: this.state.readyCountdownRemaining,
        readyPlayers: this.state.readyOrder.length,
      });

      if (this.state.readyCountdownRemaining <= 0) {
        clearInterval(this.readyCountdownInterval);
      }
    }, 1000);
  }

  private handleBackToready() {
    console.log("Resetting game to ready state");

    // Clear any active timers
    if (this.currentPhaseTimeout) {
      clearTimeout(this.currentPhaseTimeout);
    }
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    if (this.readyCountdownInterval) {
      clearInterval(this.readyCountdownInterval);
    }

    // Reset game state
    this.initializeGame();

    // Reset all players
    this.state.players.forEach((player) => {
      player.isReady = false;
      player.hasSubmitted = false;
    });

    this.state.readyStates.forEach((_, sessionId) => {
      this.state.readyStates.set(sessionId, false);
    });

    this.broadcast("gameResetToready");
    console.log("Game reset to ready");
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

    // Clear any existing timers
    if (this.currentPhaseTimeout) {
      clearTimeout(this.currentPhaseTimeout);
    }
    if (this.readyCountdownInterval) {
      clearInterval(this.readyCountdownInterval);
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
      console.log(
        "Writing timer expired - auto-submitting for unfinished players"
      );

      // Auto-submit for any players who haven't submitted
      this.state.players.forEach((player, sessionId) => {
        if (!player.hasSubmitted) {
          console.log(
            `Auto-submitting empty content for player ${player.playerName}`
          );
          const client = this.clients.find((c) => c.sessionId === sessionId);
          if (client) {
            this.handleWritingSubmission(client, "");
          }
        }
      });
    }, GAME_CONFIG.timers.writingPhase);

    this.startTimerUpdates();
  }

  private async initializeStories() {
    const readyOrder = this.state.readyOrder;

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

    for (let i = 0; i < readyOrder.length; i++) {
      const playerSessionId = readyOrder[i];
      const player = this.state.players.get(playerSessionId);

      if (!player) continue;

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
      this.state.currentAssignments.set(playerSessionId, story.storyId);

      console.log(`Player ${player.playerName} starts story: ${story.storyId}`);
    }
  }

  private rotateStoryAssignments() {
    console.log(
      "Rotating story assignments for round",
      this.state.currentRound
    );

    const readyOrder = this.state.readyOrder;
    const totalPlayers = readyOrder.length;

    // Create a mapping of which story each player should get
    // Player at readyOrder[i] gets story from readyOrder[(i - 1 + totalPlayers) % totalPlayers]
    readyOrder.forEach((playerSessionId, index) => {
      const previousPlayerIndex = (index - 1 + totalPlayers) % totalPlayers;
      const previousPlayerSessionId = readyOrder[previousPlayerIndex];

      // Find the story that belonged to the previous player
      const assignedStoryId = this.state.currentAssignments.get(
        previousPlayerSessionId
      );

      if (assignedStoryId) {
        this.state.currentAssignments.set(playerSessionId, assignedStoryId);
        const player = this.state.players.get(playerSessionId);
        const previousPlayer = this.state.players.get(previousPlayerSessionId);
        console.log(
          `Player ${player?.playerName} gets story from player ${previousPlayer?.playerName}: ${assignedStoryId}`
        );
      } else {
        console.error(
          `No story found for previous player ${previousPlayerSessionId}`
        );
      }
    });
  }

  private startTimerUpdates() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }

    this.timerInterval = setInterval(() => {
      const now = Date.now();
      this.state.timeRemaining = Math.max(0, this.state.timerEndsAt - now);

      // Broadcast timer update to all clients
      this.broadcast("timerUpdate", {
        timeRemaining: this.state.timeRemaining,
        phase: this.state.phase,
      });

      // Note: Auto-submission is handled by the setTimeout in startWritingPhase
      // This interval just updates the display
    }, 1000);
  }

  private async handleRoundCompletion() {
    this.state.currentRound++;
    const totalRounds = this.state.readyOrder.length;

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
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
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
    if (this.readyCountdownInterval) {
      clearInterval(this.readyCountdownInterval);
    }
    console.log("WritingRoom disposed", this.roomId);
  }
}
