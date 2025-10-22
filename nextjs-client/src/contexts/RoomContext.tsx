"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Room } from "colyseus.js";
import { useAuth } from "./AuthContext";
import { WritingGameState } from "../schema/WritingGameState";

// Room context manages room connections and room listing
interface RoomContextType {
  // Current room state
  currentRoom: Room<any> | null;
  roomType: "lobby" | "writing_room" | null;

  // Room discovery
  availableRooms: any[];

  // Room management methods
  joinLobby: () => Promise<void>;
  joinWritingRoom: (roomId: string) => Promise<void>;
  createWritingRoom: (options?: any) => Promise<void>;
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
  const roomType = currentRoom
    ? currentRoom.name === "lobby"
      ? "lobby"
      : "writing_room"
    : null;

  // Join the global lobby to see available rooms
  const joinLobby = async () => {
    if (!client || !user) return;

    try {
      setIsJoining(true);
      const lobby = await client.joinOrCreate("lobby");

      // Listen for room list updates
      lobby.onMessage("rooms", (rooms) => {
        setAvailableRooms(rooms);
      });

      setCurrentRoom(lobby);
    } catch (error) {
      console.error("Failed to join lobby:", error);
    } finally {
      setIsJoining(false);
    }
  };

  // Join a specific writing room by ID
  const joinWritingRoom = async (roomId: string) => {
    if (!client) return;

    try {
      setIsJoining(true);
      const gameRoom = await client.joinById(roomId);
      setCurrentRoom(gameRoom);
    } catch (error) {
      console.error("Failed to join game room:", error);
    } finally {
      setIsJoining(false);
    }
  };

  // Create a new writing room
  const createWritingRoom = async (options?: any) => {
    if (!client || !user) return;

    try {
      setIsCreating(true);
      const defaultOptions = {
        roomName: `${user.name}'s Writing Room`,
        host: user.name,
        ...options,
      };

      const gameRoom = await client.create("writing_room", defaultOptions);
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
      await currentRoom.leave();
      setCurrentRoom(null);
      setAvailableRooms([]);
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
