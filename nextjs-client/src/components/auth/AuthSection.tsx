"use client";
import { useState } from "react";

interface AuthSectionProps {
  onSignIn: (playerName: string, authToken: string) => void;
  loading?: boolean;
}

export function AuthSection({ onSignIn, loading = false }: AuthSectionProps) {
  const [playerName, setPlayerName] = useState("");
  const [authToken, setAuthToken] = useState("USER_DUMMY_TOKEN");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim() && authToken.trim()) {
      onSignIn(playerName.trim(), authToken.trim());
    }
  };

  return (
    <div className="w-full max-w-[400px] mx-auto">
      <div className="card">
        <div className="p-6">
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-bold">📝 StoryCraft</h1>
              <p className="text-gray-600">Join a collaborative writing game</p>
            </div>

            <form onSubmit={handleSubmit} className="w-full">
              <div className="flex flex-col space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Display Name
                  </label>
                  <input
                    placeholder="Enter your name"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Auth Token
                  </label>
                  <input
                    value={authToken}
                    onChange={(e) => setAuthToken(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!playerName.trim() || !authToken.trim() || loading}
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? "Signing In..." : "Join Game"}
                </button>
              </div>
            </form>

            <p className="text-sm text-gray-600 text-center">
              Use "USER_DUMMY_TOKEN" to test the game
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
