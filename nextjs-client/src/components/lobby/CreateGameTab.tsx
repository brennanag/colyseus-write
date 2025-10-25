"use client";

import { useState } from "react";
import { useRoom } from "@/contexts/RoomContext";

interface GameSettings {
  roomName: string;
  isPrivate: boolean;
  roomCode?: string;
  readyCountdown: number; // in seconds
  writingPhase: number; // in minutes
  maxPlayers: number;
}

export function CreateGameTab() {
  const { createWritingRoom, isCreating } = useRoom();
  const [settings, setSettings] = useState<GameSettings>({
    roomName: "",
    isPrivate: false,
    readyCountdown: 30, // 30 seconds default
    writingPhase: 5, // 5 minutes default
    maxPlayers: 6, // 6 players default
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prepare room creation options
    const roomOptions = {
      roomName: settings.roomName || `${settings.maxPlayers}-Player Writing Game`,
      metadata: {
        ...settings,
        // Convert to milliseconds for server
        readyCountdownMs: settings.readyCountdown * 1000,
        writingPhaseMs: settings.writingPhase * 60 * 1000,
      },
    };

    await createWritingRoom(roomOptions);
  };

  const handleSettingChange = (key: keyof GameSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Create New Game</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Room Name */}
        <div>
          <label htmlFor="roomName" className="block text-sm font-medium mb-2">
            Room Name
          </label>
          <input
            id="roomName"
            type="text"
            value={settings.roomName}
            onChange={(e) => handleSettingChange("roomName", e.target.value)}
            placeholder="My Awesome Writing Game"
            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Game Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Ready Countdown */}
          <div>
            <label htmlFor="readyCountdown" className="block text-sm font-medium mb-2">
              Ready Countdown (seconds)
            </label>
            <input
              id="readyCountdown"
              type="number"
              min="10"
              max="120"
              value={settings.readyCountdown}
              onChange={(e) => handleSettingChange("readyCountdown", parseInt(e.target.value) || 30)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Writing Phase */}
          <div>
            <label htmlFor="writingPhase" className="block text-sm font-medium mb-2">
              Writing Phase (minutes)
            </label>
            <input
              id="writingPhase"
              type="number"
              min="1"
              max="30"
              value={settings.writingPhase}
              onChange={(e) => handleSettingChange("writingPhase", parseInt(e.target.value) || 5)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Max Players */}
          <div>
            <label htmlFor="maxPlayers" className="block text-sm font-medium mb-2">
              Max Players
            </label>
            <select
              id="maxPlayers"
              value={settings.maxPlayers}
              onChange={(e) => handleSettingChange("maxPlayers", parseInt(e.target.value))}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {[2, 3, 4, 5, 6, 7, 8].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Privacy Setting */}
        <div className="flex items-center space-x-2">
          <input
            id="isPrivate"
            type="checkbox"
            checked={settings.isPrivate}
            onChange={(e) => handleSettingChange("isPrivate", e.target.checked)}
            className="rounded bg-gray-800 border-gray-600 text-blue-500 focus:ring-blue-500"
          />
          <label htmlFor="isPrivate" className="text-sm font-medium">
            Private Game (Require code to join)
          </label>
        </div>

        {/* Room Code (conditionally shown) */}
        {settings.isPrivate && (
          <div>
            <label htmlFor="roomCode" className="block text-sm font-medium mb-2">
              Room Code
            </label>
            <input
              id="roomCode"
              type="text"
              value={settings.roomCode || ""}
              onChange={(e) => handleSettingChange("roomCode", e.target.value)}
              placeholder="Enter access code..."
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        )}

        {/* Email Invites Placeholder */}
        <div className="border border-dashed border-gray-600 rounded-lg p-4">
          <p className="text-sm text-gray-400 text-center">
            📧 Email invites functionality coming soon...
          </p>
        </div>

        {/* Create Button */}
        <button
          type="submit"
          disabled={isCreating}
          className="w-full btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isCreating ? "Creating Game..." : "Create Game"}
        </button>
      </form>
    </div>
  );
}