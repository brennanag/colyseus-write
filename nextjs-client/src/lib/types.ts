export type GamePhase = 
  | 'lobby' 
  | 'game_setup' 
  | 'writing' 
  | 'editing' 
  | 'reading';

export type SetupStage = 
  | 'genre_selection' 
  | 'theme_voting' 
  | 'character_creation' 
  | 'setting_establishment';

export interface Player {
  id: string;
  name: string;
  isReady: boolean;
  isHost: boolean;
}

export interface WritingContribution {
  playerId: string;
  playerName: string;
  content: string;
  round: number;
}

export interface ChatMessage {
  playerId: string;
  playerName: string;
  content: string;
  timestamp: Date;
}

export interface GameState {
    phase: GamePhase;
    setupStage: SetupStage;
    currentWritingRound: number;
    totalWritingRounds: number;
    players: { [sessionId: string]: Player };
    contributions: WritingContribution[];
    currentStory: string;
    chatMessages: ChatMessage[];
  }