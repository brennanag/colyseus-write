"use client";

import { Player } from "../../schema/WritingGameState";
import { WritingGameState } from "../../schema/WritingGameState";

interface PlayerListProps {
  players: Player[];
  gameState: WritingGameState;
}

// Reusable player list component for all game phases
export function PlayerList({ players, gameState }: PlayerListProps) {
  return (
    <div className="card">
      <h3 className="text-xl font-bold mb-4 --text-secondary">Players</h3>

      <div className="flex flex-wrap gap-3">
        {players.map((player) => (
          <PlayerBadge
            key={player.playerId}
            player={player}
            gamePhase={gameState.phase}
          />
        ))}
      </div>
    </div>
  );
}

// Individual player badge component
interface PlayerBadgeProps {
  player: Player;
  gamePhase: string;
}

function PlayerBadge({ player, gamePhase }: PlayerBadgeProps) {
  // Determine status text and styling based on game phase
  const getStatusInfo = () => {
    switch (gamePhase) {
      case "lobby":
        return {
          text: player.isReady ? "✓ Ready" : "Not Ready",
          color: player.isReady ? "text-green-600" : "text-gray-500",
        };

      case "writing":
        return {
          text: player.hasSubmitted ? "✓ Submitted" : "Writing...",
          color: player.hasSubmitted ? "text-green-600" : "text-gray-500",
        };

      case "reading":
        return {
          text: player.isReady ? "✓ Next Round" : "Reading...",
          color: player.isReady ? "text-green-600" : "text-gray-500",
        };

      default:
        return {
          text: player.isAuthenticated ? "Connected" : "Disconnected",
          color: player.isAuthenticated ? "text-green-600" : "text-gray-500",
        };
    }
  };

  const status = getStatusInfo();

  return (
    <div className="flex items-center gap-2 px-3 py-2 border --border-color rounded-lg --bg-secondary">
      {/* Online indicator */}
      <span
        className={`w-2 h-2 rounded-full ${
          player.isAuthenticated ? "bg-green-500" : "bg-gray-400"
        }`}
      />

      {/* Player name */}
      <span className="font-medium --text-secondary">{player.playerName}</span>

      {/* Status */}
      <span className={`text-sm ${status.color}`}>{status.text}</span>
    </div>
  );
}
