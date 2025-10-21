import { Room, Client } from "colyseus";
import { JWT } from "@colyseus/auth";
import { WritingGameState, Player, Story } from "./schema/WritingGameState";
import { GAME_CONFIG } from "../constants/game-config";

interface JWTPayload {
  email: string;
  name?: string;
  [key: string]: any;
}

export class WritingRoom extends Room<WritingGameState> {
  private currentPhaseTimeout!: NodeJS.Timeout;
  private timerInterval!: NodeJS.Timeout;

  static async onAuth(token: string) {
    console.log("Received token in onAuth:", token);

    try {
      const payload = (await JWT.verify(token)) as JWTPayload;
      console.log("Token verified successfully for user:", payload.email);
      return payload;
    } catch (error) {
      console.error("Token verification failed:", error);
      throw new Error("Authentication failed");
    }
  }

  onCreate() {
    console.log("WritingRoom created!", this.roomId);

    this.setState(new WritingGameState());
    this.initializeGame();
    this.setupMessageHandlers();
  }

  async onJoin(client: Client, options: any, auth: JWTPayload) {
    console.log("Authenticated user joined:", auth.email);

    // Duplicate login prevention
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

    this.onMessage("submitWriting", (client, message) => {
      console.log("=== DEBUG: submitWriting message ===");
      console.log("Full message:", message);
      console.log("Message text:", message?.text);
      console.log("Message content:", message?.content);

      // Try both possible property names
      const content = message?.content || message?.text;
      console.log("Final content:", content);

      if (!content) {
        console.error("No content found in submitWriting message!");
        return;
      }

      this.handleWritingSubmission(client, content);
    });

    this.onMessage("nextRound", (client) => {
      this.handleNextRound(client);
    });
  }

  private handlePlayerReady(client: Client) {
    const player = this.state.players.get(client.sessionId);
    if (!player) return;

    player.isReady = !player.isReady;
    this.state.readyStates.set(client.sessionId, player.isReady);

    console.log(`Player ${player.email} ready: ${player.isReady}`);

    if (this.state.phase === "lobby") {
      this.checkLobbyStart();
    }
  }

  private checkLobbyStart() {
    const readyPlayers = Array.from(this.state.readyStates.values()).filter(
      Boolean
    ).length;
    const totalPlayers = this.state.players.size;

    console.log(`Lobby check: ${readyPlayers}/${totalPlayers} players ready`);

    if (
      readyPlayers >= GAME_CONFIG.requirements.minPlayers &&
      readyPlayers === totalPlayers &&
      !this.currentPhaseTimeout
    ) {
      this.startLobbyCountdown();
    } else if (
      readyPlayers < GAME_CONFIG.requirements.minPlayers &&
      this.currentPhaseTimeout
    ) {
      clearTimeout(this.currentPhaseTimeout);
      this.currentPhaseTimeout = null as any;
      this.state.timerEndsAt = 0;
      this.state.timeRemaining = 0;
    }
  }

  private startLobbyCountdown() {
    console.log("Starting lobby countdown...");

    const endTime = Date.now() + GAME_CONFIG.timers.lobbyCountdown;
    this.state.timerEndsAt = endTime;
    this.state.timeRemaining = GAME_CONFIG.timers.lobbyCountdown;

    this.currentPhaseTimeout = setTimeout(() => {
      this.startWritingPhase();
    }, GAME_CONFIG.timers.lobbyCountdown);

    this.startTimerUpdates();
  }

  private startTimerUpdates() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }

    this.timerInterval = setInterval(() => {
      if (this.state.timerEndsAt === 0) {
        clearInterval(this.timerInterval);
        return;
      }

      const now = Date.now();
      this.state.timeRemaining = Math.max(0, this.state.timerEndsAt - now);

      if (this.state.timeRemaining <= 0) {
        clearInterval(this.timerInterval);
      }
    }, 1000);
  }

  private startWritingPhase() {
    console.log("Starting writing phase!");

    if (this.currentPhaseTimeout) {
      clearTimeout(this.currentPhaseTimeout);
    }

    // Reset submission states
    this.state.players.forEach((player) => {
      player.hasSubmitted = false;
    });

    // Initialize stories if first round
    if (this.state.currentRound === 0) {
      this.initializeStories();
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

  private initializeStories() {
    const playersArray = Array.from(this.state.players.values());

    playersArray.forEach((player, index) => {
      const story = new Story();
      story.storyId = `story_${index}`;
      story.originalPrompt = this.getRandomPrompt();
      story.accumulatedContent = "";
      story.currentRound = 0;

      this.state.stories.set(story.storyId, story);

      // Each player starts with their own story
      this.state.currentAssignments.set(player.playerId, story.storyId);

      console.log(`Player ${player.playerName} starts story: ${story.storyId}`);
    });
  }

  private rotateStoryAssignments() {
    console.log(`=== DEBUG: rotateStoryAssignments ===`);
    console.log(`Current round: ${this.state.currentRound}`);

    const playersArray = Array.from(this.state.players.values());
    const storiesArray = Array.from(this.state.stories.values());

    console.log(
      `Players:`,
      playersArray.map((p) => p.playerName)
    );
    console.log(
      `Stories:`,
      storiesArray.map((s) => s.storyId)
    );

    // Simple rotation: each player gets the next story
    playersArray.forEach((player, playerIndex) => {
      const storyIndex =
        (playerIndex + this.state.currentRound) % storiesArray.length;
      const assignedStory = storiesArray[storyIndex];

      this.state.currentAssignments.set(player.playerId, assignedStory.storyId);

      console.log(
        `Round ${this.state.currentRound + 1}: ${player.playerName} continues ${
          assignedStory.storyId
        }`
      );
    });
  }

  private getRandomPrompt(): string {
    const prompts = GAME_CONFIG.prompts;
    return prompts[Math.floor(Math.random() * prompts.length)];
  }

  private handleWritingSubmission(client: Client, text: string) {
    console.log(`=== DEBUG: handleWritingSubmission called ===`);
    console.log(`Phase: ${this.state.phase}`);
    console.log(`Client session: ${client.sessionId}`);
    console.log(`Text:`, text); // Changed from text.length to see actual value
    console.log(`Text type:`, typeof text);

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

    // ADD THIS CHECK - text is undefined!
    if (text === undefined || text === null) {
      console.error(`ERROR: Text is undefined for player ${player.playerName}`);
      return;
    }

    // Store this player's segment
    story.segments.set(player.playerId, text);

    // Update accumulated content
    if (story.accumulatedContent) {
      story.accumulatedContent += " ";
    }
    story.accumulatedContent += text;

    player.hasSubmitted = true;

    console.log(`Player ${player.playerName} added to story ${story.storyId}`);

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

  private handleRoundCompletion() {
    this.state.currentRound++;
    const totalRounds = this.state.players.size;

    if (this.state.currentRound < totalRounds) {
      // More rounds to go - add buffer before next round
      console.log(
        `Completed round ${this.state.currentRound}, starting next round after ${GAME_CONFIG.timers.betweenRoundsBuffer}ms buffer`
      );

      // Set a brief buffer phase
      this.state.phase = "betweenRounds";
      this.state.timerEndsAt = 0;
      this.state.timeRemaining = 0;

      // Start next round after buffer
      this.currentPhaseTimeout = setTimeout(() => {
        this.startWritingPhase();
      }, GAME_CONFIG.timers.betweenRoundsBuffer);
    } else {
      // All rounds complete - go to reading
      console.log("All rounds completed! Moving to reading phase.");
      this.startReadingPhase();
    }
  }

  private startReadingPhase() {
    console.log("Starting reading phase!");

    if (this.currentPhaseTimeout) {
      clearTimeout(this.currentPhaseTimeout);
    }

    this.state.phase = "reading";
    this.state.timerEndsAt = 0;
    this.state.timeRemaining = 0;

    // Reset for next game
    this.state.players.forEach((player) => {
      player.isReady = false;
      player.hasSubmitted = false;
    });
    this.state.readyStates.clear();

    console.log(
      `Reading phase started with ${this.state.stories.size} completed stories`
    );
  }

  private handleNextRound(client: Client) {
    if (this.state.phase !== "reading") return;

    const player = this.state.players.get(client.sessionId);
    if (!player) return;

    player.isReady = true;
    this.state.readyStates.set(client.sessionId, true);

    console.log(`Player ${player.email} ready for next round`);

    const allReady = Array.from(this.state.players.values()).every(
      (p) => p.isReady
    );
    if (
      allReady &&
      this.state.players.size >= GAME_CONFIG.requirements.minPlayers
    ) {
      this.startNewRound();
    }
  }

  private startNewRound() {
    console.log("Starting new game!");

    this.state.stories.clear();
    this.state.currentAssignments.clear();
    this.state.currentRound = 0;
    this.state.phase = "lobby";
    this.state.timerEndsAt = 0;
    this.state.timeRemaining = 0;

    console.log("Back to lobby phase for new game");
    this.checkLobbyStart();
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
