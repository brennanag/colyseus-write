import { Room, Client } from "colyseus";
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

  async onJoin(client: Client, options: any, auth: any) {
    console.log("Authenticated user joined:", auth.email);

    // --- Start of new logic to prevent duplicates ---
    // Check all existing players for a matching email.
    for (let [existingSessionId, existingPlayer] of this.state.players) {
      if (existingPlayer.email === auth.email) {
        console.log(
          `Duplicate login for ${auth.email}. Kicking previous session: ${existingSessionId}`
        );

        // Find the client object for the existing session and disconnect it.
        const existingClient = Array.from(this.clients).find(
          (c: Client) => c.sessionId === existingSessionId
        );
        if (existingClient) {
          // This triggers the 'onLeave' method for the old client.
          existingClient.leave(1000, "Logged in from another location"); // :cite[6]
        }

        // Remove the old player from the state immediately.
        this.state.players.delete(existingSessionId);
        break; // Exit the loop once we've found and handled the duplicate.
      }
    }
    // --- End of new logic ---

    // Proceed to add the new player as you do now.
    const player = new Player();
    player.playerId = client.sessionId;
    player.playerName = auth.name || auth.email;
    player.email = auth.email;
    player.isAuthenticated = true;

    this.state.players.set(client.sessionId, player);
    console.log(`New player ${auth.email} added to room.`);
  }

  // This method is a built-in Colyseus lifecycle event :cite[6].
  // It is called automatically when a client's connection closes, including on logout.
  async onLeave(client: Client, consented: boolean) {
    console.log("Player left:", client.sessionId);

    // Remove the player from the room state using their sessionId.
    // This is the standard way to clean up after a client :cite[3]:cite[6].
    if (this.state.players.has(client.sessionId)) {
      this.state.players.delete(client.sessionId);
      console.log(
        `Player with sessionId ${client.sessionId} removed from state.`
      );
    }
  }

  private handleWritingSubmission(client: any, message: any, user: any) {
    // Your existing writing submission logic
  }
}
