import { Schema, type, MapSchema } from "@colyseus/schema";

export class Player extends Schema {
  @type("string") playerId: string;
  @type("string") playerName: string;
  @type("string") email: string;
  @type("boolean") isAuthenticated: boolean;
}

export class WritingGameState extends Schema {
  @type({ map: Player }) players = new MapSchema<Player>();
  // Only include fields your server actually uses
  @type("string") phase: string;
  @type("number") round: number;
  @type("number") maxRounds: number;
}
