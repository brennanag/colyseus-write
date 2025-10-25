"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { WritingGameState, Player } from "../schema/WritingGameState";
import { useRoom } from "./RoomContext";

// Game context manages the actual game state and gameplay
interface GameContextType {
  // Game state
  gameState: WritingGameState | null;
  players: Player[];
  writingText: string;

  // Game actions
  setWritingText: (text: string) => void;
  toggleReady: () => void;
  submitWriting: () => void;
  backToLobby: () => void;

  // Game utilities
  getCurrentPlayer: () => Player | null;
  formatTime: (ms: number) => string;

  // Game status
  isSubmitting: boolean;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const { currentRoom, roomType } = useRoom();
  const [gameState, setGameState] = useState<WritingGameState | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [writingText, setWritingText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Set up game state listeners when in a writing room
  useEffect(() => {
    if (!currentRoom || roomType !== "writing_room") {
      setGameState(null);
      setPlayers([]);
      setWritingText("");
      return;
    }

    // Game state change listener
    const stateChangeHandler = (state: WritingGameState) => {
      console.log("Room state changed:", state);
      setGameState(state);

      if (state.players) {
        const playersArray = Array.from(state.players.values());
        setPlayers(playersArray);
      }
    };

    // Phase change listener
    const phaseChangeHandler = (message: any) => {
      console.log("Phase changed to:", message.phase);
      if (message.phase === "writing") {
        setWritingText("");
      }
    };

    // Error listener
    const errorHandler = (message: any) => {
      console.error("Server error:", message);
    };

    currentRoom.onStateChange(stateChangeHandler);
    currentRoom.onMessage("phaseChanged", phaseChangeHandler);
    currentRoom.onMessage("error", errorHandler);

    // Cleanup
    return () => {
      currentRoom.onStateChange.remove(stateChangeHandler);
      currentRoom.onMessage("phaseChanged", phaseChangeHandler);
      currentRoom.onMessage("error", errorHandler);
    };
  }, [currentRoom, roomType]);

  // Toggle player ready status
  const toggleReady = () => {
    console.log("Toggling ready status");
    if (!currentRoom) return;
    currentRoom.send("toggleReady", {});
  };

  // Submit writing content
  const submitWriting = async () => {
    if (!currentRoom || !writingText.trim()) return;

    try {
      setIsSubmitting(true);
      currentRoom.send("submitWriting", { content: writingText });
    } catch (error) {
      console.error("Failed to submit writing:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Return to lobby after game
  const backToLobby = () => {
    if (!currentRoom) return;
    currentRoom.send("backToLobby", {});
  };

  // Get current player from game state
  const getCurrentPlayer = (): Player | null => {
    if (!gameState?.players) return null;

    // Note: This assumes user ID matching - you might need to adjust based on your auth setup
    const player = Array.from(gameState.players.values()).find(
      (player) => player.playerId === currentRoom?.sessionId
    );
    return player || null;
  };

  // Format time for display
  const formatTime = (ms: number): string => {
    return Math.ceil(ms / 1000).toString();
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        players,
        writingText,
        setWritingText,
        toggleReady,
        submitWriting,
        backToLobby,
        getCurrentPlayer,
        formatTime,
        isSubmitting,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
