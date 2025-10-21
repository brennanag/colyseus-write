"use client";

interface DebugBarProps {
  roomId: string | null;
  playerCount: number;
  currentPhase: string;
  connectionStatus: string;
}

export function DebugBar({
  roomId,
  playerCount,
  currentPhase,
  connectionStatus,
}: DebugBarProps) {
  return (
    <div className="bg-gray-800 text-white p-2 text-sm">
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <div>
            Status:{" "}
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                connectionStatus === "connected"
                  ? "bg-green-100 text-green-800"
                  : "bg-orange-100 text-orange-800"
              }`}
            >
              {connectionStatus}
            </span>
          </div>
          {roomId && <div>Room: {roomId}</div>}
          <div>Players: {playerCount}</div>
          <div>Phase: {currentPhase}</div>
        </div>

        {/* REMOVED MOCK ACTION BUTTONS */}
      </div>
    </div>
  );
}
