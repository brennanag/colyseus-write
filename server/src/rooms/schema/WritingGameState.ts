import { Schema, type, MapSchema } from "@colyseus/schema";

export class Player extends Schema {
  @type("string") playerId: string = "";
  @type("string") playerName: string = "";
  @type("string") email: string = "";
  @type("boolean") isAuthenticated: boolean = false;
  @type("boolean") isReady: boolean = false;
  @type("boolean") hasSubmitted: boolean = false;
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
  @type({ map: "string" }) submissions = new MapSchema<string>();

  // Ready states
  @type({ map: "boolean" }) readyStates = new MapSchema<boolean>();
}
