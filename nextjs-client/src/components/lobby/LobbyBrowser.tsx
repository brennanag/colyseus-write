"use client";

import { useState } from "react";
import { useRoom } from "../../contexts/RoomContext";
import { LobbyTabs, LobbyTab } from "./LobbyTabs";
import { JoinViaCodeTab } from "./JoinViaCodeTab";
import { CreateGameTab } from "./CreateGameTab";
import { OpenGamesTab } from "./OpenGamesTab";

// PRESERVE YOUR EXISTING LOBBYBROWSER LOGIC
function RoomBrowserSection() {
  const {
    availableRooms,
    joinWritingRoom,
    isJoining,
  } = useRoom();

  // Enhanced room processing using existing data (FROM YOUR CODE)
  const enhancedRooms = availableRooms.map(room => ({
    ...room,
    canJoin: room.clients < room.maxClients,
    isFull: room.clients >= room.maxClients,
    playerCount: room.clients,
    roomName: room.metadata?.name || "Writing Room",
    hostName: room.metadata?.host || "Unknown Host"
  }));

  // Group rooms (FROM YOUR CODE)
  const available = enhancedRooms.filter(room => room.canJoin);
  const full = enhancedRooms.filter(room => room.isFull);

  return (
    <div className="space-y-8">
      {/* Available Rooms - FROM YOUR CODE */}
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

      {/* Full Rooms - FROM YOUR CODE */}
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

      {/* Empty State - FROM YOUR CODE */}
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

// RoomCard - FROM YOUR CODE (PRESERVED)
interface RoomCardProps {
  roomInfo: any;
  onJoinRoom: (roomId: string) => void;
  isJoining: boolean;
  disabled?: boolean;
}

function RoomCard({ roomInfo, onJoinRoom, isJoining, disabled = false }: RoomCardProps) {
  const [error, setError] = useState("");

  const handleJoin = async () => {
    if (disabled) return;
    
    setError("");
    try {
      await onJoinRoom(roomInfo.roomId);
    } catch (err: any) {
      console.error("Failed to join room:", err);
      setError(err.message || "Failed to join room");
      
      // Auto-clear error after 5 seconds
      setTimeout(() => setError(""), 5000);
    }
  };

  const canJoin = roomInfo.canJoin && !disabled && !error;

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
          
          {/* Error message for room cards */}
          {error && (
            <div className="mt-2 text-sm text-red-400 bg-red-900/20 p-2 rounded">
              ⚠️ {error}
            </div>
          )}
        </div>

        <button
          onClick={handleJoin}
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

// ENHANCED LOBBY BROWSER WITH TABS
export function EnhancedLobbyBrowser() {
  const [activeTab, setActiveTab] = useState<LobbyTab>("open-games");

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Writing Game Lobby</h1>
        <p className="text-gray-400">
          Join an existing game or create your own collaborative writing experience
        </p>
      </div>

      <div className="card">
        <LobbyTabs activeTab={activeTab} onTabChange={setActiveTab} />
        
        {/* Tab Content */}
        <div className="min-h-[400px]">
          {activeTab === "open-games" && <OpenGamesTab />}
          {activeTab === "join-code" && <JoinViaCodeTab />}
          {activeTab === "create-game" && <CreateGameTab />}
        </div>
      </div>
    </div>
  );
}