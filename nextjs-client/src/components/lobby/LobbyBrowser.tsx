"use client";

import { useRoom } from "../../contexts/RoomContext";

// Main lobby component showing available rooms and creation options
export function LobbyBrowser() {
  const {
    availableRooms,
    joinWritingRoom,
    createWritingRoom,
    isJoining,
    isCreating,
  } = useRoom();

  return (
    <div className="card max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold --text-secondary mb-2">
          Writing Rooms
        </h2>
        <p className="text-gray-600">
          Join an existing room or create your own writing session
        </p>
      </div>

      {/* Create Room Section */}
      <div className="mb-8 p-6 card">
        <h3 className="text-xl font-semibold mb-4 --text-secondary">
          Create New Room
        </h3>
        <p className="text-gray-600 mb-4">
          Start a new collaborative writing session with custom settings
        </p>
        <button
          onClick={() => createWritingRoom()}
          disabled={isCreating}
          className={`px-6 py-3 rounded-lg font-medium ${
            isCreating
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          } text-white transition-colors`}
        >
          {isCreating ? "Creating Room..." : "Create Writing Room"}
        </button>
      </div>

      {/* Available Rooms Section */}
      <div>
        <h3 className="text-xl font-semibold mb-4 card">
          Available Rooms
        </h3>

        {availableRooms.length === 0 ? (
          <div className="text-center py-8 card">
            <p className="text-gray-600">
              No rooms available yet. Be the first to create one!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {availableRooms.map((roomInfo) => (
              <RoomCard
                key={roomInfo.roomId}
                roomInfo={roomInfo}
                onJoinRoom={joinWritingRoom}
                isJoining={isJoining}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Sub-component for individual room cards
interface RoomCardProps {
  roomInfo: any;
  onJoinRoom: (roomId: string) => void;
  isJoining: boolean;
}

function RoomCard({ roomInfo, onJoinRoom, isJoining }: RoomCardProps) {
  const isFull = roomInfo.clients >= roomInfo.maxClients;

  return (
    <div className="border --border-color rounded-lg --bg-secondary p-4">
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <h4 className="font-bold text-lg --text-secondary mb-1">
            {roomInfo.metadata?.name || "Writing Room"}
          </h4>
          <div className="flex items-center gap-4 text-sm --text-secondary">
            <span>Host: {roomInfo.metadata?.host || "Unknown"}</span>
            <span>•</span>
            <span>
              {roomInfo.clients} / {roomInfo.maxClients} players
            </span>
          </div>
        </div>

        <button
          onClick={() => onJoinRoom(roomInfo.roomId)}
          disabled={isFull || isJoining}
          className={`px-4 py-2 rounded font-medium min-w-20 ${
            isFull
              ? "bg-gray-400 cursor-not-allowed"
              : isJoining
              ? "bg-blue-400 cursor-wait"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white transition-colors`}
        >
          {isFull ? "Full" : isJoining ? "Joining..." : "Join"}
        </button>
      </div>
    </div>
  );
}
