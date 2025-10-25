"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Room } from "colyseus.js";
import { useAuth } from "./AuthContext";
import { useEffect } from "react";

// Extended room type to handle reading room
type RoomType = "lobby" | "writing_room" | "reading_room" | null;


interface RoomContextType {
  // Current room state
  currentRoom: Room<any> | null;
  roomType: RoomType;

  // NEW: Current view state (separate from room connection)
  currentView: "lobby" | "writing" | "reading";

  // Room discovery
  availableRooms: any[];

  // NEW: View navigation methods (doesn't leave room)
  navigateToLobby: () => void;
  navigateToWriting: () => void;
  navigateToReading: () => void;

  // Existing room management methods
  joinLobby: () => Promise<void>;
  joinWritingRoom: (roomId: string) => Promise<void>;
  createWritingRoom: (options?: any) => Promise<void>;
  joinReadingRoom: (gameSessionId?: string) => Promise<void>;
  leaveRoom: () => Promise<void>;

  // Loading states
  isJoining: boolean;
  isCreating: boolean;

  // Reconnection info
  lastRoomInfo: { roomId: string; roomType: string; roomName: string } | null;
  clearLastRoomInfo: () => void;
}

const RoomContext = createContext<RoomContextType | undefined>(undefined);

export function RoomProvider({ children }: { children: ReactNode }) {
  const { client, user, isInitialized } = useAuth();
  const [currentRoom, setCurrentRoom] = useState<Room<any> | null>(null);
  const [availableRooms, setAvailableRooms] = useState<any[]>([]);
  const [isJoining, setIsJoining] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [lastRoomInfo, setLastRoomInfo] = useState<{
    roomId: string;
    roomType: string;
    roomName: string;
  } | null>(null);
  const [hasAttemptedAutoRejoin, setHasAttemptedAutoRejoin] = useState(false);

  // Determine room type based on current room
  const roomType = currentRoom ? (currentRoom.name as RoomType) : null;

  const [currentView, setCurrentView] = useState<
    "lobby" | "writing" | "reading"
  >("lobby");

  // 🔍 ADD DEBUG LOGS RIGHT HERE:
  console.log("=== ROOM TYPE DEBUG ===");
  console.log("currentRoom:", currentRoom);
  console.log("currentRoom?.name:", currentRoom?.name);
  console.log("typeof currentRoom?.name:", typeof currentRoom?.name);
  console.log("calculated roomType:", roomType);
  console.log("=======================");

  // NEW: Load last room info on mount (for manual rejoin) - ONLY when initialized
  useEffect(() => {
    if (!isInitialized) return;

    const saved = localStorage.getItem("colyseus-last-room");
    if (saved) {
      setLastRoomInfo(JSON.parse(saved));
    }
  }, [isInitialized]);

     const navigateToLobby = () => {
      console.log("Navigating to lobby view (staying in room)");
      setCurrentView("lobby");
    };

    const navigateToWriting = () => {
      console.log("Navigating to writing view");
      setCurrentView("writing");
    };

    const navigateToReading = () => {
      console.log("Navigating to reading view");
      setCurrentView("reading");
    };

  // NEW: Auto-rejoin ONLY when auth is fully initialized
useEffect(() => {
  if (!isInitialized || !user || !client || currentRoom || hasAttemptedAutoRejoin || !lastRoomInfo) return;

  const attemptRejoin = async () => {
    try {
      setIsJoining(true);
      const gameRoom = await client.joinById(lastRoomInfo.roomId);

      // Set up message handlers
      gameRoom.onMessage("moveToReadingRoom", (message) => {
        console.log("Moving to reading room for game session:", message.gameSessionId);
        joinReadingRoom(message.gameSessionId);
      });

      setCurrentRoom(gameRoom);
      
      // NEW: Set appropriate view based on room type
      if (lastRoomInfo.roomType === 'writing_room') {
        setCurrentView("writing");
      } else if (lastRoomInfo.roomType === 'reading_room') {
        setCurrentView("reading");
      }
      
      console.log("Successfully auto-rejoined room:", gameRoom.roomId);
    } catch (error: any) {
      // ... existing error handling
    } finally {
      setIsJoining(false);
    }
  };

  setTimeout(attemptRejoin, 1000);
}, [isInitialized, user, client, currentRoom, hasAttemptedAutoRejoin, lastRoomInfo]);

  // Join the global lobby to see available rooms
  const joinLobby = async () => {
    if (!client || !user) return;
    try {
      setIsJoining(true);

    
    console.log("=== JOINING LOBBY DEBUG ===");
    console.log("Attempting to join lobby room...");

      // Join Colyseus LobbyRoom with metadata
      const lobby = await client.joinOrCreate("lobby", {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });

          
    console.log("Successfully joined lobby:", lobby);
    console.log("Lobby room name:", lobby.name);
    console.log("Lobby room ID:", lobby.id);
    console.log("===========================");

      // Enhanced room listing with metadata
      lobby.onMessage("rooms", (rooms) => {
        console.log("Received rooms list from lobby:", rooms);
        console.log("Raw rooms data:", rooms.length);


        const enhancedRooms = rooms.map((room: any) => ({
          ...room,
          // Add computed properties
          canJoin: room.clients < room.maxClients,
          isFull: room.clients >= room.maxClients,
          playerCount: room.clients,
          hasPassword: !!room.metadata?.passwordProtected,
        }));
        setAvailableRooms(enhancedRooms);
      });

      // Handle room updates in real-time
      lobby.onMessage("update", (update) => {
        // Real-time updates when rooms are created/closed
        console.log("Lobby update:", update);
      });

      setCurrentRoom(lobby);
    } catch (error) {
      console.error("Failed to join lobby:", error);
    } finally {
      setIsJoining(false);
    }
  };

  // Join a specific writing room by ID
// In RoomContext.tsx - COMPLETE UPDATED FUNCTION
const joinWritingRoom = async (roomId: string) => {
  if (!client) {
    throw new Error("Client not initialized");
  }

  try {
    setIsJoining(true);
    console.log("Attempting to join writing room:", roomId);
    
    const gameRoom = await client.joinById(roomId);

    // Set up message handlers
    gameRoom.onMessage("moveToReadingRoom", (message) => {
      console.log("Moving to reading room for game session:", message.gameSessionId);
      joinReadingRoom(message.gameSessionId);
    });

    gameRoom.onMessage("gameResetToLobby", () => {
      console.log("Game reset to lobby - switching to writing view");
      setCurrentView("writing"); // Stay in writing view for game reset
    });

    gameRoom.onMessage("timerUpdate", (message) => {
      // Handle timer updates if needed for UI
      console.log("Timer update:", message);
    });

    gameRoom.onMessage("readyCountdownUpdate", (message) => {
      console.log("Ready countdown update:", message);
    });

    gameRoom.onMessage("readyCountdownCancelled", () => {
      console.log("Ready countdown cancelled");
    });

    // NEW: Save room info for potential reconnection
    const roomInfo = {
      roomId: gameRoom.roomId,
      roomType: 'writing_room',
      roomName: gameRoom.name,
      joinedAt: new Date().toISOString()
    };
    
    localStorage.setItem('colyseus-last-room', JSON.stringify(roomInfo));
    setLastRoomInfo(roomInfo);

    // NEW: Set current room AND switch to writing view
    setCurrentRoom(gameRoom);
    setCurrentView("writing");
    
    console.log("Successfully joined writing room:", gameRoom.roomId);
    console.log("Switched to writing view - player remains connected");

  } catch (error: any) {
    console.error("Failed to join game room:", error);
    
    // IMPROVED ERROR HANDLING: Re-throw the error so UI components can handle it
    if (error.code === "MATCHMAKE_NO_ROOM_FOUND" || error.message?.includes("not found")) {
      // Clear invalid room info for "not found" errors
      localStorage.removeItem('colyseus-last-room');
      setLastRoomInfo(null);
      throw new Error("Room not found. It may have been closed or expired.");
    } else if (error.message?.includes("full")) {
      throw new Error("This room is full. Try another room.");
    } else if (error.message?.includes("password")) {
      throw new Error("This room requires a password.");
    } else {
      throw new Error("Failed to join room. Please try again.");
    }
  } finally {
    setIsJoining(false);
  }
};
  

  // Join reading room
// In RoomContext.tsx - UPDATED FOR CONSISTENCY
const joinReadingRoom = async (gameSessionId?: string) => {
  if (!client) return;

  try {
    setIsJoining(true);
    console.log("Joining reading room with gameSessionId:", gameSessionId);

    // Leave current room if we're in one (but preserve connection for writing rooms)
    if (currentRoom && currentRoom.name !== "reading_room") {
      await currentRoom.leave();
    }

    const readingRoom = await client.joinOrCreate("reading_room", {
      gameSessionId, // Optional: specific game session to focus on
    });

    // Set up reading room message handlers
    readingRoom.onMessage("storiesData", (message) => {
      console.log("Received stories data:", message);
    });

    readingRoom.onMessage("storyHistory", (message) => {
      console.log("Received story history:", message);
    });

    readingRoom.onMessage("error", (message) => {
      console.error("Reading room error:", message);
    });

    // NEW: Save room info for potential reconnection
    const roomInfo = {
      roomId: readingRoom.roomId,
      roomType: 'reading_room',
      roomName: readingRoom.name,
      joinedAt: new Date().toISOString()
    };
    
    localStorage.setItem('colyseus-last-room', JSON.stringify(roomInfo));
    setLastRoomInfo(roomInfo);

    // NEW: Set current room AND switch to reading view
    setCurrentRoom(readingRoom);
    setCurrentView("reading");
    
    console.log("Successfully joined reading room and switched to reading view");

  } catch (error) {
    console.error("Failed to join reading room:", error);
    throw error; // Re-throw for error handling
  } finally {
    setIsJoining(false);
  }
};

  // Create a new writing room
  interface RoomCreationOptions {
    roomName?: string;
    host?: string;
    metadata?: {
      name?: string;
      host?: string;
      hostId?: string;
      hostEmail?: string;
      createdAt?: string;
      gameType?: string;
      passwordProtected?: boolean;
      storyTheme?: string;
      [key: string]: any;
    };
    [key: string]: any;
  }

// In RoomContext.tsx - COMPLETE UPDATED FUNCTION
const createWritingRoom = async (options: RoomCreationOptions = {}) => {
  if (!client || !user) return;

  try {
    setIsCreating(true);
    
    console.log("=== CLIENT: Attempting to create writing_room ===");
    
    const defaultOptions: RoomCreationOptions = {
      roomName: `${user.name}'s Writing Room`,
      host: user.name,
      metadata: {
        name: `${user.name}'s Writing Room`,
        host: user.name,
        hostId: user.id,
        hostEmail: user.email,
        createdAt: new Date().toISOString(),
        gameType: "collaborative_writing",
        ...options.metadata,
      },
      ...options,
    };

    console.log("Room creation options:", defaultOptions);
    
    const gameRoom = await client.create("writing_room", defaultOptions);
    
    console.log("✅ CLIENT: Room creation returned successfully");
    console.log("Room object:", gameRoom);
    console.log("Room ID:", gameRoom.roomId);
    console.log("Room name:", gameRoom.name);
    
    // Check if we can actually communicate with the room
    gameRoom.onError((error) => {
      console.error("❌ Room error:", error);
    });

    // Set up message handlers
    gameRoom.onMessage("moveToReadingRoom", (message) => {
      console.log("Moving to reading room for game session:", message.gameSessionId);
      joinReadingRoom(message.gameSessionId);
    });

    gameRoom.onMessage("gameResetToLobby", () => {
      console.log("Game reset to lobby - switching to writing view");
      setCurrentView("writing");
    });

    gameRoom.onMessage("timerUpdate", (message) => {
      console.log("Timer update:", message);
    });

    gameRoom.onMessage("readyCountdownUpdate", (message) => {
      console.log("Ready countdown update:", message);
    });

    gameRoom.onMessage("readyCountdownCancelled", () => {
      console.log("Ready countdown cancelled");
    });

    // Save room info for potential reconnection
    const roomInfo = {
      roomId: gameRoom.roomId,
      roomType: 'writing_room',
      roomName: gameRoom.name,
      joinedAt: new Date().toISOString()
    };
    
    localStorage.setItem('colyseus-last-room', JSON.stringify(roomInfo));
    setLastRoomInfo(roomInfo);

    // Set current room AND switch to writing view
    setCurrentRoom(gameRoom);
    setCurrentView("writing");
    
    console.log("Successfully created and joined writing room:", gameRoom.roomId);
    console.log("Switched to writing view - player remains connected");

  } catch (error) {
    console.error("❌ CLIENT: Room creation failed:", error);
    throw error;
  } finally {
    setIsCreating(false);
  }
};

  // Leave current room
// In RoomContext.tsx - UPDATED FOR CLARITY
const leaveRoom = async () => {
  if (currentRoom) {
    console.log("Leaving room and disconnecting:", currentRoom.roomId);
    await currentRoom.leave();
    setCurrentRoom(null);
    setAvailableRooms([]);
    setCurrentView("lobby"); // Reset to lobby view
    
    // NEW: Keep room info for manual rejoin, but don't auto-rejoin
    console.log("Left room but kept reconnection info for manual rejoin");
    
    // Optional: If you want to clear reconnection info on manual leave:
    // localStorage.removeItem('colyseus-last-room');
    // setLastRoomInfo(null);
  }
};

  // NEW: Clear last room info (for when user explicitly doesn't want to rejoin)
  const clearLastRoomInfo = () => {
    localStorage.removeItem("colyseus-last-room");
    setLastRoomInfo(null);
    setHasAttemptedAutoRejoin(false);
    console.log("Cleared last room info");
  };

  return (
    <RoomContext.Provider
      value={{
        currentRoom,
        roomType,
        currentView, // NEW
        availableRooms,
        joinLobby,
        joinWritingRoom,
        createWritingRoom,
        joinReadingRoom,
        leaveRoom,
        navigateToLobby, // NEW
        navigateToWriting, // NEW
        navigateToReading, // NEW
        isJoining,
        isCreating,
        lastRoomInfo,
        clearLastRoomInfo,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
}

export function useRoom() {
  const context = useContext(RoomContext);
  if (context === undefined) {
    throw new Error("useRoom must be used within a RoomProvider");
  }
  return context;
}
