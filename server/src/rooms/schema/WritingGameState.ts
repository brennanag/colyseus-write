import { Schema, type, MapSchema, ArraySchema } from "@colyseus/schema";

export class Player extends Schema {
  @type("string") id: string;
  @type("string") name: string;
  @type("boolean") isReady: boolean = false;
  @type("string") currentSubmission: string = "";
  @type("string") vote: string = ""; // playerId they voted for
}

export class WritingGameState extends Schema {
  @type("string") phase: string = "lobby"; // lobby, writing, review, voting, results
  @type("number") round: number = 0;
  @type("number") maxRounds: number = 3;
  @type("string") storyPrompt: string = "";
  @type("string") currentStory: string = "";
  
  @type({ map: Player }) players = new MapSchema<Player>();
  @type(["string"]) submissionOrder = new ArraySchema<string>();
}