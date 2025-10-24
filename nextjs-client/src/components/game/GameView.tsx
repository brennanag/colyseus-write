"use client";

import { useGame } from "../../contexts/GameContext";
import { PlayerList } from "./PlayerList";
import { ReadyPhase } from "./phases/ReadyPhase";
import { WritingPhase } from "../game/phases/WritingPhase";
import { ReadingPhase } from "../game/phases/ReadingPhase";
import { useRoom } from "@/contexts/RoomContext";

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
  const { currentRoom } = useRoom();

  const roomId = currentRoom?.roomId;
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
        {gameState.phase === "ready" && (
          <ReadyPhase
            gameState={gameState}
            currentPlayer={currentPlayer}
            roomId = {roomId}
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
