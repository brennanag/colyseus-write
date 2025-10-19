import { Room, Client } from "@colyseus/core";
import { MyRoomState, Player } from "./schema/MyRoomState";

export class MyRoom extends Room<MyRoomState> {
  maxClients = 4;

  onCreate(options: any) {
    // Initialize the room state
    this.setState(new MyRoomState());
    
    console.log("MyRoom created!", this.roomId);

    // Handle player movement messages
    this.onMessage("move", (client, data) => {
      this.handlePlayerMove(client, data);
    });

    // Handle player jump messages
    this.onMessage("jump", (client, data) => {
      this.handlePlayerJump(client, data);
    });

    // Handle chat messages
    this.onMessage("chat", (client, message) => {
      console.log("Chat from", client.sessionId, ":", message);
      this.broadcast("chat", { 
        playerId: client.sessionId, 
        message: message 
      });
    });
  }

  onJoin(client: Client, options: any) {
    console.log(client.sessionId, "joined!");

    // Create a new player object
    const player = new Player();
    player.id = client.sessionId;
    player.name = `Player${this.clients.length}`;

    // Add player to the room state
    this.state.players.set(client.sessionId, player);
    this.state.status = `Players: ${this.state.players.size}`;

    console.log("Total players:", this.state.players.size);
  }

  onLeave(client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");

    // Remove player from the room state
    this.state.players.delete(client.sessionId);
    this.state.status = `Players: ${this.state.players.size}`;

    console.log("Total players:", this.state.players.size);
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

  private handlePlayerMove(client: Client, data: any) {
    const player = this.state.players.get(client.sessionId);
    if (player && data.dx !== undefined && data.dy !== undefined) {
      // Update player position
      player.x += data.dx;
      player.y += data.dy;
      
      console.log(`Player ${player.name} moved to (${player.x}, ${player.y})`);
    }
  }

  private handlePlayerJump(client: Client, data: any) {
    const player = this.state.players.get(client.sessionId);
    if (player) {
        const serverTime = Date.now();
        const latency = serverTime - data.clientTime;
        
        console.log(`📊 Jump latency: ${latency}ms`);
        console.log(`Client sent: ${data.clientTime}, Server received: ${serverTime}`);
        
        // Simple jump
        player.y -= 50;
        
        // Send back the latency for learning
        client.send("jump_processed", {
            clientTime: data.clientTime,
            serverTime: serverTime,
            latency: latency
        });
    }
  }
  
}