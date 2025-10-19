// 
// THIS FILE HAS BEEN GENERATED AUTOMATICALLY
// DO NOT CHANGE IT MANUALLY UNLESS YOU KNOW WHAT YOU'RE DOING
// 
// GENERATED USING @colyseus/schema 3.0.64
// 

import { Schema, type, ArraySchema, MapSchema, SetSchema, DataChange } from '@colyseus/schema';
import { Player } from './Player'

export class WritingGameState extends Schema {
    @type("string") public phase!: string;
    @type("number") public round!: number;
    @type("number") public maxRounds!: number;
    @type("string") public storyPrompt!: string;
    @type("string") public currentStory!: string;
    @type({ map: Player }) public players: MapSchema<Player> = new MapSchema<Player>();
    @type([ "string" ]) public submissionOrder: ArraySchema<string> = new ArraySchema<string>();
}
