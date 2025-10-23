import config from "@colyseus/tools";
import { monitor } from "@colyseus/monitor";
import { playground } from "@colyseus/playground";
import { auth } from "@colyseus/auth";
import { LobbyRoom } from "@colyseus/core";

import { WritingRoom } from "./rooms/WritingRoom";
import { ReadingRoom } from "./rooms/ReadingRoom"; // ADD THIS IMPORT
import "./config/auth.ts";

export default config({
  initializeGameServer: (gameServer) => {
    gameServer.define("lobby", LobbyRoom);
    gameServer.define("writing_room", WritingRoom).enableRealtimeListing();
    gameServer.define("reading_room", ReadingRoom).enableRealtimeListing(); // ADD THIS LINE
  },

  initializeExpress: (app) => {
    app.get("/hello_world", (_req, res) => {
      res.send("It's time to kick ass and chew bubblegum!");
    });

    if (process.env.NODE_ENV !== "production") {
      app.use("/", playground());
    }

    app.use("/monitor", monitor());
    app.use(auth.prefix, auth.routes());
  },

  beforeListen: () => {
    console.log("Game server is starting up...");
  },
});
