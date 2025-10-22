"use client";

import { useGame } from "../../contexts/GameContext";
import { PlayerList } from "./PlayerList";
import { LobbyPhase } from "../game/phases/LobbyPhase";
import { WritingPhase } from "../game/phases/WritingPhase";
import { ReadingPhase } from "../game/phases/ReadingPhase";

// Main game container that orchestrates all game phases
export function GameView() {
  const {
    gameState,
    players,
    writingText,
    setWritingText,
    toggleReady,
    submitWriting,
    backToLobby,
    getCurrentPlayer,
    formatTime,
  } = useGame();

  const currentPlayer = getCurrentPlayer();

  // Show loading state if game state isn't available yet
  if (!gameState) {
    return (
      <div className="card text-center py-12">
        <div className="text-lg --text-secondary">Loading game...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Player List - Always visible during game */}
      <PlayerList players={players} gameState={gameState} />

      {/* Game Phase Content */}
      <div className="card">
        {gameState.phase === "lobby" && (
          <LobbyPhase
            gameState={gameState}
            currentPlayer={currentPlayer}
            onToggleReady={toggleReady}
            formatTime={formatTime}
          />
        )}

        {gameState.phase === "writing" && (
          <WritingPhase
            gameState={gameState}
            currentPlayer={currentPlayer}
            writingText={writingText}
            onWritingUpdate={setWritingText}
            onSubmitWriting={submitWriting}
            formatTime={formatTime}
          />
        )}

        {gameState.phase === "reading" && (
          <ReadingPhase
            gameState={gameState}
            currentPlayer={currentPlayer}
            onBackToLobby={backToLobby}
          />
        )}
      </div>
    </div>
  );
}
