"use client";
import { Player } from "@/lib/types";

interface LobbyPhaseProps {
  players: { [sessionId: string]: Player };
  onReady: () => void;
}

export function LobbyPhase({ players, onReady }: LobbyPhaseProps) {
  const playersArray = Object.values(players);

  return (
    <div>
      <div className="flex flex-col space-y-6">
        <h1 className="text-2xl font-bold">Lobby</h1>
        <p className="text-gray-700">Waiting for players to join...</p>

        <div className="flex flex-col space-y-2 w-full">
          {playersArray.map((player) => (
            <div
              key={player.id}
              className={`p-3 rounded-md w-full text-center ${
                player.isReady ? "bg-green-100" : "bg-gray-100"
              }`}
            >
              <p className="font-bold text-gray-900">
                {player.name} {player.isReady ? "✓ Ready" : "..."}
              </p>
            </div>
          ))}
        </div>

        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          onClick={onReady}
        >
          I'm Ready!
        </button>
      </div>
    </div>
  );
}
