"use client";

import { useRoom } from "@/contexts/RoomContext";
import { join } from "path";

export function OpenGamesTab() {
  const { availableRooms, joinWritingRoom, isJoining } = useRoom();

  // Filter out rooms that are full or can't be joined
  const joinableRooms = availableRooms.filter(room => room.canJoin);
console.log("OpenGamesTab - availableRooms:", availableRooms);


  if (availableRooms.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">No open games available.</p>
        <p className="text-gray-500 text-sm mt-2">
          Create a new game or check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Available Games</h2>
      
      {joinableRooms.length === 0 ? (
        <div className="text-center py-4">
          <p className="text-gray-400">All games are currently full.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {joinableRooms.map((room) => (
            <GameRoomCard
              key={room.roomId}
              room={room}
              onJoin={() => joinWritingRoom(room.roomId)}
              isJoining={isJoining}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Game Room Card Component
interface GameRoomCardProps {
  room: any;
  onJoin: () => void;
  isJoining: boolean;
}

function GameRoomCard({ room, onJoin, isJoining }: GameRoomCardProps) {
  return (
    <div className="card p-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-lg">
            {room.metadata?.name || "Writing Room"}
          </h3>
          <p className="text-sm text-gray-400">Host: {room.metadata?.host || "Unknown"}</p>
        </div>
        <span className="px-2 py-1 bg-gray-700 rounded text-xs">
          {room.playerCount}/{room.maxClients} players
        </span>
      </div>

      <div className="text-sm text-gray-400 space-y-1 mb-4">
        <p>Room ID: {room.roomId}</p>
        {room.metadata?.createdAt && (
          <p>Created: {new Date(room.metadata.createdAt).toLocaleTimeString()}</p>
        )}
      </div>

      <button
        onClick={onJoin}
        disabled={isJoining || !room.canJoin}
        className="w-full btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isJoining ? "Joining..." : "Join Game"}
      </button>
    </div>
  );
}