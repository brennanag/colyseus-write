import { Schema, type, ArraySchema, MapSchema } from "@colyseus/schema";

export class Player extends Schema {
  @type("string") playerId: string = "";
  @type("string") playerName: string = "";
  @type("string") email: string = "";
  @type("boolean") isAuthenticated: boolean = false;
  @type("boolean") isReady: boolean = false;
  @type("boolean") hasSubmitted: boolean = false;
}

export class Story extends Schema {
  @type("string") storyId: string = "";
  @type("string") originalPrompt: string = "";
  @type("string") accumulatedContent: string = "";
  @type("number") currentRound: number = 0;
  
  // Maps playerId to their submitted text for this story
  @type({ map: "string" }) segments = new MapSchema<string>();
}

export class WritingGameState extends Schema {
  @type("string") phase: string = "ready"; // "ready", "writing", "betweenRounds", "reading"
  @type("number") timerEndsAt: number = 0;
  @type("number") timeRemaining: number = 0;
  @type("number") currentRound: number = 0;
  
  // ready state
  @type(["string"]) readyOrder = new ArraySchema<string>();
  @type("number") readyCountdownRemaining: number = 0;
  @type("boolean") isReadyCountdownActive: boolean = false;
  
  // Players and their states
  @type({ map: Player }) players = new MapSchema<Player>();
  @type({ map: "boolean" }) readyStates = new MapSchema<boolean>();
  
  // Stories and assignments
  @type({ map: Story }) stories = new MapSchema<Story>();
  @type({ map: "string" }) currentAssignments = new MapSchema<string>();
}