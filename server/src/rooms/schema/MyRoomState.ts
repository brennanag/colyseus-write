import { Schema, type, MapSchema } from "@colyseus/schema";

export class Player extends Schema {
  @type("string") id: string;
  @type("number") x: number = 100;
  @type("number") y: number = 100;
  @type("string") name: string = "Player";
}

export class MyRoomState extends Schema {
  @type({ map: Player }) players = new MapSchema<Player>();
  @type("string") status: string = "Waiting for players...";
}