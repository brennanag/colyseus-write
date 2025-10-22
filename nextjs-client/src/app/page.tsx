"use client";

import { useAuth } from "../contexts/AuthContext";
import { useRoom } from "../contexts/RoomContext";
import { useGame } from "../contexts/GameContext";
import AuthForms from "../components/AuthForms";
import { LobbyEntry } from "../components/lobby/LobbyEntry";
import { LobbyBrowser } from "../components/lobby/LobbyBrowser";
import { GameView } from "../components/game/GameView";

/**
 * Main application component - Clean orchestration layer
 *
 * This component now only handles the high-level routing between different
 * application states. All business logic has been moved to dedicated contexts.
 */
export default function Home() {
  // Use our clean, separated contexts
  const { user, logout } = useAuth();
  const { currentRoom, roomType, joinLobby, leaveRoom, isJoining } = useRoom();

  // Show authentication forms if user is not logged in
  if (!user) {
    return <AuthForms />;
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="flex flex-col gap-6">
        {/* Application Header - Consistent across all views */}
        <AppHeader user={user} onLogout={logout} />

        {/* Main Content - Routes between different application states */}
        <main>
          {renderMainContent({ currentRoom, roomType, joinLobby, isJoining })}
        </main>
      </div>
    </div>
  );
}

/**
 * Application header component
 */
interface AppHeaderProps {
  user: { name: string | null; email: string };
  onLogout: () => void;
}

function AppHeader({ user, onLogout }: AppHeaderProps) {
  return (
    <header className="flex justify-between items-center">
      <div>
        <h1 className="text-xl font-semibold --text-secondary">
          Welcome, {user.name || user.email}!
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Collaborative Writing Platform
        </p>
      </div>
      <button
        onClick={onLogout}
        className="px-4 py-2 border --border-color rounded-md --text-secondary hover:--border-color transition-colors"
      >
        Logout
      </button>
    </header>
  );
}

/**
 * Main content router - determines what to show based on current room state
 */
interface MainContentProps {
  currentRoom: any;
  roomType: "lobby" | "writing_room" | null;
  joinLobby: () => void;
  isJoining: boolean;
}

function renderMainContent({
  currentRoom,
  roomType,
  joinLobby,
  isJoining,
}: MainContentProps) {
  // State 1: No room joined - show lobby entry
  if (!currentRoom) {
    return <LobbyEntry onJoinLobby={joinLobby} isLoading={isJoining} />;
  }

  // State 2: In lobby room - show room browser
  if (roomType === "lobby") {
    return <LobbyBrowser />;
  }

  // State 3: In writing room - show game interface
  if (roomType === "writing_room") {
    return <GameView />;
  }

  // Fallback - should not normally happen
  return (
    <div className="card text-center py-12">
      <h2 className="text-xl font-bold mb-4 --text-secondary">
        Unknown Room State
      </h2>
      <p className="text-gray-600">
        Something unexpected happened. Please try rejoining the lobby.
      </p>
    </div>
  );
}
