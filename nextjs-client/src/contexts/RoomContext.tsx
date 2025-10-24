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

  // Room discovery
  availableRooms: any[];

  // Room management methods
  joinLobby: () => Promise<void>;
  joinWritingRoom: (roomId: string) => Promise<void>;
  createWritingRoom: (options?: any) => Promise<void>;
  joinReadingRoom: (gameSessionId?: string) => Promise<void>; // NEW
  leaveRoom: () => Promise<void>;

  // Loading states
  isJoining: boolean;
  isCreating: boolean;
}

const RoomContext = createContext<RoomContextType | undefined>(undefined);

export function RoomProvider({ children }: { children: ReactNode }) {
  const { client, user } = useAuth();
  const [currentRoom, setCurrentRoom] = useState<Room<any> | null>(null);
  const [availableRooms, setAvailableRooms] = useState<any[]>([]);
  const [isJoining, setIsJoining] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // Determine room type based on current room
  const roomType = currentRoom ? (currentRoom.name as RoomType) : null;
  useEffect(() => {
    const lastRoomInfo = localStorage.getItem('colyseus-last-room');
    if (lastRoomInfo && user) {
      const { roomId, roomType } = JSON.parse(lastRoomInfo);
      // Auto-rejoin logic here?
    }
  }, [user]);
  // Join the global lobby to see available rooms
 const joinLobby = async () => {
  if (!client || !user) return;
  try {
    setIsJoining(true);
    
    // Join Colyseus LobbyRoom with metadata
    const lobby = await client.joinOrCreate("lobby", {
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
    
    // Enhanced room listing with metadata
    lobby.onMessage("rooms", (rooms) => {
      const enhancedRooms = rooms.map((room: any) => ({
        ...room,
        // Add computed properties
        canJoin: room.clients < room.maxClients,
        isFull: room.clients >= room.maxClients,
        playerCount: room.clients,
        hasPassword: !!room.metadata?.passwordProtected
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
  }
};

  // Join a specific writing room by ID
const joinWritingRoom = async (roomId: string) => {
  if (!client) return;

  try {
    setIsJoining(true);
    const gameRoom = await client.joinById(roomId);

    // PRESERVE existing move to reading room listener
    gameRoom.onMessage("moveToReadingRoom", (message) => {
      console.log(
        "Moving to reading room for game session:",
        message.gameSessionId
      );
      joinReadingRoom(message.gameSessionId);
    });

    // NEW: Save room info for reconnection
    localStorage.setItem('colyseus-last-room', JSON.stringify({
      roomId: gameRoom.roomId,
      roomType: 'writing_room',
      roomName: gameRoom.name,
      joinedAt: new Date().toISOString()
    }));

    // PRESERVE existing state update
    setCurrentRoom(gameRoom);
    
    console.log("Joined room and saved for reconnection:", gameRoom.roomId);
  } catch (error) {
    console.error("Failed to join game room:", error);
    // NEW: Clear invalid room info on failure
    localStorage.removeItem('colyseus-last-room');
  } finally {
    // PRESERVE existing loading state cleanup
    setIsJoining(false);
  }
};

  // NEW: Join reading room
  const joinReadingRoom = async (gameSessionId?: string) => {
    if (!client) return;

    try {
      setIsJoining(true);

      // Leave current room if we're in one
      if (currentRoom) {
        await currentRoom.leave();
      }

      const readingRoom = await client.joinOrCreate("reading_room", {
        gameSessionId, // Optional: specific game session to focus on
      });

      setCurrentRoom(readingRoom);
    } catch (error) {
      console.error("Failed to join reading room:", error);
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
    [key: string]: any; // Preserve flexibility
  };
  [key: string]: any; // Preserve full backward compatibility
}

const createWritingRoom = async (options: RoomCreationOptions = {}) => {
  if (!client || !user) return;

  try {
    setIsCreating(true);
    
    // MERGE existing logic with enhancements
    const defaultOptions: RoomCreationOptions = {
      // Preserve existing required fields
      roomName: `${user.name}'s Writing Room`,
      host: user.name,
      
      // Enhanced metadata (won't break existing code)
      metadata: {
        name: `${user.name}'s Writing Room`,
        host: user.name,
        hostId: user.id,
        hostEmail: user.email,
        createdAt: new Date().toISOString(),
        gameType: "collaborative_writing",
        // Merge with any provided metadata
        ...options.metadata,
      },
      
      // Preserve all other options exactly as they are
      ...options,
    };

    // EVERYTHING BELOW IS IDENTICAL TO EXISTING CODE
    const gameRoom = await client.create("writing_room", defaultOptions);

    gameRoom.onMessage("moveToReadingRoom", (message) => {
      console.log("Moving to reading room for game session:", message.gameSessionId);
      joinReadingRoom(message.gameSessionId);
    });

    setCurrentRoom(gameRoom);
  } catch (error) {
    console.error("Failed to create room:", error);
  } finally {
    setIsCreating(false);
  }
};

  // Leave current room
const leaveRoom = async () => {
  if (currentRoom) {
    // PRESERVE existing room leave
    await currentRoom.leave();
    
    // PRESERVE existing state cleanup
    setCurrentRoom(null);
    setAvailableRooms([]);
    
    // NEW: Keep room info for potential rejoin
    // (Don't remove from localStorage - allows "Back to Lobby" + rejoin)
    console.log("Left room but kept reconnection info");
    
    // OPTIONAL: If you want to clear it instead, use:
    // localStorage.removeItem('colyseus-last-room');
  }
};

  return (
    <RoomContext.Provider
      value={{
        currentRoom,
        roomType,
        availableRooms,
        joinLobby,
        joinWritingRoom,
        createWritingRoom,
        joinReadingRoom, // NEW
        leaveRoom,
        isJoining,
        isCreating,
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
