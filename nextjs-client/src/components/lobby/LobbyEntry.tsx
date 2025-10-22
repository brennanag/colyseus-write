"use client";

interface LobbyEntryProps {
  onJoinLobby: () => void;
  isLoading?: boolean;
}

// Simple component for entering the lobby - clean and focused
export function LobbyEntry({
  onJoinLobby,
  isLoading = false,
}: LobbyEntryProps) {
  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold mb-4 --text-secondary">
        Welcome to Collaborative Writing
      </h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Join the lobby to see available writing rooms or create your own.
        Collaborate with others to build amazing stories together.
      </p>
      <button
        onClick={onJoinLobby}
        disabled={isLoading}
        className={`px-8 py-4 text-lg rounded-lg transition-colors ${
          isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        } text-white font-medium`}
      >
        {isLoading ? "Entering Lobby..." : "Enter Lobby"}
      </button>
    </div>
  );
}
