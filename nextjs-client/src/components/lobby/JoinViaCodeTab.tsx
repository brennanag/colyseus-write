"use client";

import { useState } from "react";
import { useRoom } from "@/contexts/RoomContext";

export function JoinViaCodeTab() {
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState("");
  const { joinWritingRoom, isJoining } = useRoom();

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomCode.trim()) return;
    
    setError(""); // Clear previous errors
    
    try {
      await joinWritingRoom(roomCode.trim());
    } catch (err: any) {
      console.error("Failed to join room:", err);
      
      // Handle specific error cases
      if (err.code === "MATCHMAKE_NO_ROOM_FOUND" || err.message?.includes("not found")) {
        setError("Room not found. It may have been closed or expired.");
      } else if (err.message?.includes("full")) {
        setError("This room is full. Try another room.");
      } else {
        setError("Failed to join room. Please check the code and try again.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Join With Code</h2>
      <p className="text-gray-400 mb-6">
        Enter a room code to join a specific game.
      </p>

      <form onSubmit={handleJoin} className="space-y-4">
        <div>
          <label htmlFor="roomCode" className="block text-sm font-medium mb-2">
            Room Code
          </label>
          <input
            id="roomCode"
            type="text"
            value={roomCode}
            onChange={(e) => {
              setRoomCode(e.target.value);
              setError(""); // Clear error when user types
            }}
            placeholder="Enter room code..."
            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-3 bg-red-900 border border-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isJoining || !roomCode.trim()}
          className="w-full btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isJoining ? "Joining..." : "Join Game"}
        </button>
      </form>
    </div>
  );
}