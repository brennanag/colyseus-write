"use client";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { WritingGameState, Player } from "@/schema/WritingGameState";

interface LobbyPhaseProps {
  gameState: WritingGameState;
  currentPlayer: Player | null | undefined;
  onToggleReady: () => void;
  formatTime: (ms: number) => string;
}

export function LobbyPhase({
  gameState,
  currentPlayer,
  onToggleReady,
  formatTime,
}: LobbyPhaseProps) {
  return (
    <div className=" card">
      <h3 className="text-xl font-bold mb-2 text-gray-700">Waiting in Lobby</h3>
      <p className="mb-4 text-gray-200">
        {gameState.timeRemaining > 0
          ? `Game starts in ${formatTime(
              gameState.timeRemaining
            )} seconds when all players are ready`
          : " "}
      </p>
      <button
        onClick={onToggleReady}
        className={`px-6 py-3 rounded-lg text-lg ${
          currentPlayer?.isReady
            ? "bg-green-600 hover:bg-green-700"
            : "bg-blue-600 hover:bg-blue-700"
        } text-white transition-colors`}
      >
        {currentPlayer?.isReady ? "Wait, I'm not ready" : "Let's Write!"}
      </button>
    </div>
  );
}
