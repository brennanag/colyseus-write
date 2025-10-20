import { Room, Client } from "colyseus";
import { JWT } from "@colyseus/auth";
import { WritingGameState, Player } from "./schema/WritingGameState";
import { GAME_CONFIG } from "../constants/game-config";

// Define JWT payload interface
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
        this.state.submissions.delete(sessionId);
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
      this.state.submissions.delete(client.sessionId);
    }

    if (this.state.phase === "lobby") {
      this.checkLobbyStart();
    }
  }

  private initializeGame() {
    this.state.phase = "lobby";
    this.state.timerEndsAt = 0;
    this.state.timeRemaining = 0;
    console.log("Game initialized in lobby phase");
  }

  private setupMessageHandlers() {
    this.onMessage("toggleReady", (client, message) => {
      this.handlePlayerReady(client);
    });

    this.onMessage("submitWriting", (client, message) => {
      this.handleWritingSubmission(client, message.text);
    });

    this.onMessage("nextRound", (client, message) => {
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
    this.state.submissions.clear();

    // Set phase and prompt
    this.state.phase = "writing";
    this.state.currentPrompt = this.getRandomPrompt();

    // Set writing timer (as fallback)
    const endTime = Date.now() + GAME_CONFIG.timers.writingPhase;
    this.state.timerEndsAt = endTime;
    this.state.timeRemaining = GAME_CONFIG.timers.writingPhase;

    console.log(
      `Writing phase started with prompt: ${this.state.currentPrompt}`
    );

    this.currentPhaseTimeout = setTimeout(() => {
      // Only start grace period if not all players have submitted
      const allSubmitted = Array.from(this.state.players.values()).every(
        (p) => p.hasSubmitted
      );
      if (!allSubmitted) {
        this.startSubmissionGracePeriod();
      }
    }, GAME_CONFIG.timers.writingPhase);

    this.startTimerUpdates();
  }

  private getRandomPrompt(): string {
    const prompts = GAME_CONFIG.prompts;
    return prompts[Math.floor(Math.random() * prompts.length)];
  }

  private handleWritingSubmission(client: Client, text: string) {
    if (this.state.phase !== "writing") return;

    const player = this.state.players.get(client.sessionId);
    if (!player) return;

    this.state.submissions.set(client.sessionId, text);
    player.hasSubmitted = true;

    console.log(
      `Player ${player.email} submitted writing (${text.length} chars)`
    );

    // Check if all players have submitted
    const allPlayers = Array.from(this.state.players.values());
    const allSubmitted = allPlayers.every((p) => p.hasSubmitted);

    if (allSubmitted) {
      console.log("All players have submitted! Ending writing phase early.");

      // Clear the writing phase timeout since everyone is done
      if (this.currentPhaseTimeout) {
        clearTimeout(this.currentPhaseTimeout);
      }

      // Skip grace period and go straight to reading
      this.startReadingPhase();
    }
  }

  private startSubmissionGracePeriod() {
    console.log("Starting submission grace period...");

    this.currentPhaseTimeout = setTimeout(() => {
      this.startReadingPhase();
    }, GAME_CONFIG.timers.submissionGrace);

    const endTime = Date.now() + GAME_CONFIG.timers.submissionGrace;
    this.state.timerEndsAt = endTime;
    this.state.timeRemaining = GAME_CONFIG.timers.submissionGrace;

    this.startTimerUpdates();
  }

  private startReadingPhase() {
    console.log("Starting reading phase!");

    if (this.currentPhaseTimeout) {
      clearTimeout(this.currentPhaseTimeout);
    }

    this.state.phase = "reading";
    this.state.timerEndsAt = 0;
    this.state.timeRemaining = 0;

    // Reset ready states for next round
    this.state.players.forEach((player) => {
      player.isReady = false;
      player.hasSubmitted = false;
    });
    this.state.readyStates.clear();

    console.log(
      `Reading phase started with ${this.state.submissions.size} submissions`
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
    console.log("Starting new round!");

    this.state.submissions.clear();
    this.state.currentPrompt = "";
    this.state.phase = "lobby";
    this.state.timerEndsAt = 0;
    this.state.timeRemaining = 0;

    console.log("Back to lobby phase for new round");
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
