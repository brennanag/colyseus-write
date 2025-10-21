import config from "@colyseus/tools";
import { monitor } from "@colyseus/monitor";
import { playground } from "@colyseus/playground";
import { auth } from "@colyseus/auth";
// REMOVE: import express from "express";
// REMOVE: import submissionsRoutes from "./routes/submissions";

import { WritingRoom } from "./rooms/WritingRoom";
import "./config/auth.ts";

export default config({
  initializeGameServer: (gameServer) => {
    gameServer.define("writing_room", WritingRoom);
  },

  initializeExpress: (app) => {
    // REMOVE: app.use(express.json());
    // REMOVE: app.use(express.urlencoded({ extended: true }));

    app.get("/hello_world", (_req, res) => {
      res.send("It's time to kick ass and chew bubblegum!");
    });

    // REMOVE: app.use("/api/submissions", submissionsRoutes);

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
