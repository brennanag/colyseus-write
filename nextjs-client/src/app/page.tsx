"use client";

import { useAuth } from "../contexts/AuthContext";
import { RoomProvider, useRoom } from "../contexts/RoomContext";
import AuthForms from "../components/AuthForms";
import { LobbyEntry } from "../components/lobby/LobbyEntry";
import { EnhancedLobbyBrowser } from "../components/lobby/LobbyBrowser";
import { GameView } from "../components/game/GameView";
import { ReadingView } from "../components/reading/ReadingView"; // NEW IMPORT
import { Room } from "colyseus.js";
import  ClientOnly from "../components/ClientOnly";

/**
 * Main application component - Clean orchestration layer
 */
export default function Home() {
  const { user, logout, isInitialized } = useAuth();
  const { currentRoom, roomType, currentView,joinLobby, isJoining } = useRoom();

  // Show authentication forms if user is not logged in
  if (!user) {
    return <AuthForms />;
  }

  // NEW: Show loading state until auth is initialized
  if (!isInitialized) {
    return (
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="flex flex-col gap-6">
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 ">
      <div className="flex flex-col gap-6">
        {/* Application Header - Consistent across all views */}
        <ClientOnly>
          <AppHeader user={user} onLogout={logout} />
        </ClientOnly>
        {/* Main Content - Routes between different application states */}
        <main>
          {renderMainContent({ currentRoom, roomType, currentView, joinLobby, isJoining })}
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
  // backToLobby: () => void;
}

// In page.tsx - UPDATE the AppHeader component
function AppHeader({ user, onLogout }: AppHeaderProps) {
  const { currentRoom, currentView, navigateToLobby } = useRoom(); // CHANGED: Use currentView and navigateToLobby

  const backToLobby = async () => {
    if (currentRoom && currentView !== "lobby") { // CHANGED: Check currentView instead of roomType
      navigateToLobby(); // CHANGED: Use view navigation instead of leaving room
    }
  };

  return (
    <header className="flex justify-between items-center">
      <div>
        {/* CHANGED: Show button when not in lobby view (but might be in lobby room) */}
        {currentRoom && currentView !== "lobby" && (
          <button
            onClick={backToLobby}
            className="px-4 py-2 border --border-color rounded-md --text-accent hover:--border-color transition-colors"
          >
            Back to Lobby
          </button>
        )}
      </div>
      <button onClick={onLogout} className="px-4 py-2 btn btn-hover">
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
  roomType: "lobby" | "writing_room" | "reading_room" | null; // Add roomType here
  currentView: "lobby" | "writing" | "reading"; // CHANGED
  joinLobby: () => void;
  isJoining: boolean;
}

function renderMainContent({
  currentRoom,
  roomType,
  currentView,
  joinLobby,
  isJoining,
}: MainContentProps) {


  console.log("=== MAIN CONTENT DEBUG ===");
  console.log("currentRoom exists:", !!currentRoom);
  console.log("roomType:", roomType);
  console.log("isJoining:", isJoining);
  console.log("========================");

  // State 1: No room joined - show lobby entry
  if (!currentRoom) {
        console.log("✅ Condition 1: No room - rendering LobbyEntry");
    return <LobbyEntry onJoinLobby={joinLobby} isLoading={isJoining} />;
  }

  // State 2: In lobby room - show room browser
  if (currentView === "lobby") {
        console.log("✅ Condition 2: In lobby - rendering EnhancedLobbyBrowser");
    return <EnhancedLobbyBrowser />;
  }

  // State 3: In writing room - show game interface
  if (currentView === "writing") {
    return <GameView />;
  }

  // NEW: State 4: In reading room - show reading interface
  if (currentView === "reading") {
    return <ReadingView />;
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
