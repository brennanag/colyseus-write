import config from "@colyseus/tools";
import { monitor } from "@colyseus/monitor";
import { playground } from "@colyseus/playground";
import { auth } from "@colyseus/auth";
import { LobbyRoom } from "@colyseus/core"; // Import Colyseus built-in LobbyRoom

import { WritingRoom } from "./rooms/WritingRoom";
import "./config/auth.ts";

export default config({
  // Initialize the game server with room definitions
  initializeGameServer: (gameServer) => {
    // Define lobby room for discovering and joining writing rooms
    gameServer.define("lobby", LobbyRoom);

    // Define writing room with real-time listing enabled for lobby discovery
    gameServer.define("writing_room", WritingRoom).enableRealtimeListing();
  },

  // Set up Express server routes and middleware
  initializeExpress: (app) => {
    // Simple test route to verify server is working
    app.get("/hello_world", (_req, res) => {
      res.send("It's time to kick ass and chew bubblegum!");
    });

    // Enable playground in development environment for testing
    if (process.env.NODE_ENV !== "production") {
      app.use("/", playground());
    }

    // Enable Colyseus monitor for room management and debugging
    app.use("/monitor", monitor());

    // Set up authentication routes with Colyseus auth
    app.use(auth.prefix, auth.routes());
  },

  // Callback before server starts listening
  beforeListen: () => {
    console.log("Game server is starting up...");
  },
});
