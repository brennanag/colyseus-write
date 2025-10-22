"use client";

import { WritingGameState, Player } from "../../../schema/WritingGameState";

interface LobbyPhaseProps {
  gameState: WritingGameState;
  currentPlayer: Player | null | undefined;
  onToggleReady: () => void;
  formatTime: (ms: number) => string;
}

// Updated to use consistent styling and clearer messaging
export function LobbyPhase({
  gameState,
  currentPlayer,
  onToggleReady,
  formatTime,
}: LobbyPhaseProps) {
  return (
    <div className="text-center py-8">
      <h3 className="text-2xl font-bold mb-4 --text-secondary">Game Lobby</h3>

      <p className="mb-6 text-gray-600 max-w-md mx-auto">
        {gameState.timeRemaining > 0
          ? `Game starts in ${formatTime(
              gameState.timeRemaining
            )} seconds when all players are ready`
          : "Get ready! The game will start once all players are ready"}
      </p>

      <button
        onClick={onToggleReady}
        className={`px-8 py-3 rounded-lg text-lg font-medium ${
          currentPlayer?.isReady
            ? "bg-green-600 hover:bg-green-700"
            : "bg-blue-600 hover:bg-blue-700"
        } text-white transition-colors`}
      >
        {currentPlayer?.isReady ? "Wait, I'm Not Ready" : "I'm Ready!"}
      </button>

      {currentPlayer?.isReady && (
        <p className="mt-4 text-green-600">
          ✓ You're ready! Waiting for other players...
        </p>
      )}
    </div>
  );
}
