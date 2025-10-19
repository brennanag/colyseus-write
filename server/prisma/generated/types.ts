import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Game = {
    id: string;
    createdAt: Generated<string>;
    status: string;
    storyPrompt: string;
    currentStory: string | null;
};
export type GamePlayer = {
    id: string;
    playerId: string;
    gameId: string;
};
export type Player = {
    id: string;
    createdAt: Generated<string>;
    username: string;
    email: string | null;
};
export type Round = {
    id: string;
    createdAt: Generated<string>;
    gameId: string;
    roundNumber: number;
    prompt: string;
};
export type Submission = {
    id: string;
    createdAt: Generated<string>;
    roundId: string;
    playerId: string;
    content: string;
};
export type Vote = {
    id: string;
    createdAt: Generated<string>;
    submissionId: string;
    voterId: string;
};
export type DB = {
    game_players: GamePlayer;
    games: Game;
    players: Player;
    rounds: Round;
    submissions: Submission;
    votes: Vote;
};
