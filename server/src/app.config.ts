import config from "@colyseus/tools";
import { monitor } from "@colyseus/monitor";
import { playground } from "@colyseus/playground";
import { auth } from "@colyseus/auth";
import express from "express"; // ADD THIS IMPORT

/**
 * Import your Room files
 */
import { WritingRoom } from "./rooms/WritingRoom";
import "./config/auth.ts";

// IMPORT OUR NEW ROUTES
import submissionsRoutes from "./routes/submissions";

export default config({
  initializeGameServer: (gameServer) => {
    gameServer.define("writing_room", WritingRoom);
  },

  initializeExpress: (app) => {
    // ADD PROPER MIDDLEWARE SETUP
    app.use(express.json()); // Parse JSON request bodies
    app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

    app.get("/hello_world", (req, res) => {
      res.send("It's time to kick ass and chew bubblegum!");
    });

    // USE OUR SUBMISSIONS ROUTES
    app.use("/api/submissions", submissionsRoutes);

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
