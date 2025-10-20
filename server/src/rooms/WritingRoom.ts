import { Room } from "colyseus";
import { JWT } from "@colyseus/auth";
import { WritingGameState } from "./schema/WritingGameState";
import { Player } from "./schema/WritingGameState";

export class WritingRoom extends Room {
  static async onAuth(token: string) {
    console.log("Received token in onAuth:", token);

    try {
      const payload = (await JWT.verify(token)) as any; // Temporary fix
      console.log("Token verified successfully for user:", payload.email);
      return payload;
    } catch (error) {
      console.error("Token verification failed:", error);
      throw new Error("Authentication failed");
    }
  }

  onCreate() {
    this.setState(new WritingGameState());

    this.onMessage("submit_writing", (client, message) => {
      const user = client.auth;
      console.log(`Writing submitted by ${user.email}:`, message);

      // Handle writing submission with user context
      this.handleWritingSubmission(client, message, user);
    });
  }

  onJoin(client: any, options: any, auth: any) {
    console.log("Authenticated user joined:", auth.email);

    // Create a proper Player instance instead of plain object
    const player = new Player();
    player.playerId = client.sessionId;
    player.playerName = auth.name || auth.email;
    player.email = auth.email;
    player.isAuthenticated = true;

    this.state.players.set(client.sessionId, player);
  }

  private handleWritingSubmission(client: any, message: any, user: any) {
    // Your existing writing submission logic
  }
}
