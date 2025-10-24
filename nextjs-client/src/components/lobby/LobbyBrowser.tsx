"use client";

import { useRoom } from "../../contexts/RoomContext"; // ← YOUR EXISTING IMPORT

// Enhanced LobbyBrowser - NO NEW IMPORTS NEEDED
export function LobbyBrowser() {
  const {
    availableRooms,
    joinWritingRoom,
    createWritingRoom,
    isJoining,
    isCreating,
  } = useRoom();

  // Enhanced room processing using existing data
  const enhancedRooms = availableRooms.map(room => ({
    ...room,
    // Add computed properties using existing room data
    canJoin: room.clients < room.maxClients,
    isFull: room.clients >= room.maxClients,
    playerCount: room.clients,
    roomName: room.metadata?.name || "Writing Room",
    hostName: room.metadata?.host || "Unknown Host"
  }));

  // Group rooms (optional enhancement)
  const available = enhancedRooms.filter(room => room.canJoin);
  const full = enhancedRooms.filter(room => room.isFull);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold --text-secondary mb-2">
          Writing Rooms
        </h2>
        <p className="text-gray-600">
          Join an existing room or create your own writing session
        </p>
      </div>

      {/* Create Room Section - UNCHANGED */}
      <div className="card p-6">
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

      {/* Available Rooms - ENHANCED GROUPING */}
      {available.length > 0 && (
        <div className="card p-6">
          <h3 className="text-xl font-semibold mb-4 --text-secondary">
            Available Rooms ({available.length})
          </h3>
          <div className="space-y-4">
            {available.map((roomInfo) => (
              <RoomCard
                key={roomInfo.roomId}
                roomInfo={roomInfo}
                onJoinRoom={joinWritingRoom}
                isJoining={isJoining}
              />
            ))}
          </div>
        </div>
      )}

      {/* Full Rooms - NEW SECTION */}
      {full.length > 0 && (
        <div className="card p-6 opacity-70">
          <h3 className="text-xl font-semibold mb-4 --text-secondary">
            Full Rooms ({full.length})
          </h3>
          <div className="space-y-4">
            {full.map((roomInfo) => (
              <RoomCard
                key={roomInfo.roomId}
                roomInfo={roomInfo}
                onJoinRoom={joinWritingRoom}
                isJoining={isJoining}
                disabled={true}
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty State - ENHANCED */}
      {enhancedRooms.length === 0 && (
        <div className="text-center py-12 card">
          <h3 className="text-xl font-semibold mb-2 --text-secondary">
            No Rooms Available
          </h3>
          <p className="text-gray-600 mb-4">
            Be the first to create a writing room!
          </p>
        </div>
      )}
    </div>
  );
}

// Enhanced RoomCard with better info display
interface RoomCardProps {
  roomInfo: any;
  onJoinRoom: (roomId: string) => void;
  isJoining: boolean;
  disabled?: boolean;
}

function RoomCard({ roomInfo, onJoinRoom, isJoining, disabled = false }: RoomCardProps) {
  const canJoin = roomInfo.canJoin && !disabled;

  return (
    <div className={`border --border-color rounded-lg --bg-secondary p-4 ${
      disabled ? "opacity-60" : ""
    }`}>
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <h4 className="font-bold text-lg --text-secondary mb-1">
            {roomInfo.roomName}
          </h4>
          <div className="flex items-center gap-4 text-sm --text-secondary">
            <span>Host: {roomInfo.hostName}</span>
            <span>•</span>
            <span>
              {roomInfo.playerCount} / {roomInfo.maxClients} players
            </span>
            {roomInfo.metadata?.createdAt && (
              <>
                <span>•</span>
                <span>
                  {new Date(roomInfo.metadata.createdAt).toLocaleTimeString()}
                </span>
              </>
            )}
          </div>
        </div>

        <button
          onClick={() => onJoinRoom(roomInfo.roomId)}
          disabled={!canJoin || isJoining}
          className={`px-4 py-2 rounded font-medium min-w-20 ${
            !canJoin
              ? "bg-gray-400 cursor-not-allowed"
              : isJoining
              ? "bg-blue-400 cursor-wait"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white transition-colors`}
        >
          {disabled ? "Full" : isJoining ? "Joining..." : "Join"}
        </button>
      </div>
    </div>
  );
}