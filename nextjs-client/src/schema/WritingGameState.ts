// nextjs-client/src/schema/WritingGameState.ts
import { Schema, type, MapSchema, ArraySchema } from '@colyseus/schema';

/**
 * Player Schema - represents an authenticated player in the game
 */
export class Player extends Schema {
  @type('string') playerId: string = '';
  @type('string') playerName: string = '';
  @type('string') email: string = '';
  @type('boolean') isAuthenticated: boolean = false;
  @type('boolean') isReady: boolean = false;
  @type('number') score: number = 0;
}

/**
 * Prompt Schema - represents a writing prompt
 */
export class Prompt extends Schema {
  @type('string') id: string = '';
  @type('string') text: string = '';
  @type('string') category: string = '';
}

/**
 * Story Schema - represents a player's story submission
 */
export class Story extends Schema {
  @type('string') playerId: string = '';
  @type('string') playerName: string = '';
  @type('string') content: string = '';
  @type('number') wordCount: number = 0;
  @type('number') submittedAt: number = 0;
}

/**
 * Vote Schema - represents a vote for a story
 */
export class Vote extends Schema {
  @type('string') voterId: string = '';
  @type('string') storyId: string = '';
}

/**
 * Main Game State Schema
 */
export class WritingGameState extends Schema {
  // Players in the game
  @type({ map: Player }) players = new MapSchema<Player>();
  
  // Current game phase: 'lobby' | 'writing' | 'voting' | 'results'
  @type('string') phase: string = 'lobby';
  
  // Current round number
  @type('number') round: number = 0;
  
  // Maximum rounds per game
  @type('number') maxRounds: number = 3;
  
  // Current prompt
  @type(Prompt) currentPrompt?: Prompt;
  
  // All submitted stories
  @type({ map: Story }) stories = new MapSchema<Story>();
  
  // All votes
  @type([Vote]) votes = new ArraySchema<Vote>();
  
  // Time remaining in current phase (seconds)
  @type('number') timeRemaining: number = 0;
  
  // Writing time limit (seconds)
  @type('number') writingTimeLimit: number = 300; // 5 minutes
  
  // Voting time limit (seconds)
  @type('number') votingTimeLimit: number = 120; // 2 minutes
  
  // Game started flag
  @type('boolean') gameStarted: boolean = false;
  
  // Minimum players to start
  @type('number') minPlayers: number = 2;
  
  // Maximum players allowed
  @type('number') maxPlayers: number = 8;
}