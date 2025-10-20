import { Schema, type, MapSchema } from "@colyseus/schema";

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
  @type({ map: "string" }) segments = new MapSchema<string>();
  @type("number") currentRound: number = 0;
}

export class WritingGameState extends Schema {
  // Players in the game
  @type({ map: Player }) players = new MapSchema<Player>();

  // Current game phase: 'lobby' | 'writing' | 'reading'
  @type("string") phase: string = "lobby";

  // Game timers
  @type("number") timerEndsAt: number = 0;
  @type("number") timeRemaining: number = 0;

  // Current round info
  @type("string") currentPrompt: string = "";

  // Sequential stories properties
  @type({ map: Story }) stories = new MapSchema<Story>();
  @type("number") currentRound: number = 0;
  @type({ map: "string" }) currentAssignments = new MapSchema<string>();

  // Ready states
  @type({ map: "boolean" }) readyStates = new MapSchema<boolean>();
}
