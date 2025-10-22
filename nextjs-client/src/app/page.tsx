"use client";

import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import AuthForms from "../components/AuthForms";
import { WritingGameState, Player } from "../schema/WritingGameState";
import { DebugBar } from "@/components/debug/DebugBar";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { ReadingPhase } from "@/components/game/phases/ReadingPhase";
import { LobbyPhase } from "@/components/game/phases/LobbyPhase";
import { WritingPhase } from "@/components/game/phases/WritingPhase";

export default function Home() {
  const { user, logout, client, room, setCurrentRoom } = useAuth();
  const [gameState, setGameState] = useState<WritingGameState | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [writingText, setWritingText] = useState("");
  const [availableRooms, setAvailableRooms] = useState<any[]>([]);

  // Convert milliseconds to seconds for display
  const formatTime = (ms: number) => {
    return Math.ceil(ms / 1000).toString();
  };

  // Join the lobby room to see available writing rooms
  const joinLobby = async () => {
    if (!client || !user) return;

    try {
      const lobby = await client.joinOrCreate("lobby");

      // Listen for room list updates from the lobby
      lobby.onMessage("rooms", (rooms) => {
        setAvailableRooms(rooms);
      });

      setCurrentRoom(lobby); // Switch to lobby room
    } catch (error) {
      console.error("Failed to join lobby:", error);
    }
  };

  // Join a specific game room by ID
  const joinGameRoom = async (roomId: string) => {
    if (!client) return;

    try {
      const gameRoom = await client.joinById(roomId);
      setCurrentRoom(gameRoom);

      // Set up game state listeners for the actual game room
      gameRoom.onStateChange((state) => {
        console.log("Room state changed:", state);
        setGameState(state);

        if (state.players) {
          const playersArray = Array.from(state.players.values());
          setPlayers(playersArray);
        }
      });

      gameRoom.onMessage("phaseChanged", (message) => {
        console.log("Phase changed to:", message.phase);
        if (message.phase === "writing") {
          setWritingText("");
        }
      });

      gameRoom.onMessage("error", (message) => {
        console.error("Server error:", message);
      });
    } catch (error) {
      console.error("Failed to join game room:", error);
    }
  };

  // Create a new writing room with custom settings
  const createWritingRoom = async () => {
    if (!client || !user) return;

    try {
      const gameRoom = await client.create("writing_room", {
        roomName: `${user.name}'s Writing Room`,
        host: user.name,
      });

      // Set up game state listeners for the new room
      gameRoom.onStateChange((state) => {
        console.log("Room state changed:", state);
        setGameState(state);

        if (state.players) {
          const playersArray = Array.from(state.players.values());
          setPlayers(playersArray);
        }
      });

      gameRoom.onMessage("phaseChanged", (message) => {
        console.log("Phase changed to:", message.phase);
        if (message.phase === "writing") {
          setWritingText("");
        }
      });

      gameRoom.onMessage("error", (message) => {
        console.error("Server error:", message);
      });

      setCurrentRoom(gameRoom);
    } catch (error) {
      console.error("Failed to create room:", error);
    }
  };

  // Toggle player ready status in game room
  const toggleReady = () => {
    if (!room) return;
    room.send("toggleReady", {});
  };

  // Submit writing content to current story
  const submitWriting = () => {
    if (!room || !writingText.trim()) return;
    room.send("submitWriting", { content: writingText });
  };

  // Return to lobby after game ends
  const backToLobby = () => {
    if (!room) return;
    room.send("backToLobby", {});
  };

  // Get current player from game state
  const getCurrentPlayer = () => {
    if (!user || !gameState?.players) return null;
    return Array.from(gameState.players.values()).find(
      (player) => player.playerId === user.id
    );
  };

  // Show auth forms if user not logged in
  if (!user) {
    return <AuthForms />;
  }

  const currentPlayer = getCurrentPlayer();

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="flex flex-col gap-1">
        {/* Header with user info and logout */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-l --text-secondary">
              Welcome, {user.name || user.email}!
            </h1>
          </div>
          <button
            onClick={() => logout()}
            className="px-4 py-2 border --border-color rounded-md --text-secondary hover:--border-color transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Main content based on room state */}
        {!room ? (
          // No room joined - show lobby entry
          <div className="text-center py-8">
            <button
              onClick={joinLobby}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg"
            >
              Enter Lobby
            </button>
          </div>
        ) : room.name === "lobby" ? (
          // In lobby room - show available rooms
          <div className="card">
            <h3 className="text-xl font-bold mb-4">Available Writing Rooms</h3>

            {/* Create new room button */}
            <div className="mb-6">
              <button
                onClick={createWritingRoom}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Create New Writing Room
              </button>
            </div>

            {/* Room list */}
            {availableRooms.length === 0 ? (
              <p className="text-gray-600">No rooms available. Create one!</p>
            ) : (
              <div className="space-y-4">
                {availableRooms.map((roomInfo) => (
                  <div
                    key={roomInfo.roomId}
                    className="border p-4 rounded-lg --border-color --bg-secondary"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-bold --text-secondary">
                          {roomInfo.metadata?.name || "Writing Room"}
                        </h4>
                        <p className="text-sm --text-secondary">
                          Host: {roomInfo.metadata?.host || "Unknown"}
                        </p>
                        <p className="text-sm --text-secondary">
                          Players: {roomInfo.clients} / {roomInfo.maxClients}
                        </p>
                      </div>
                      <button
                        onClick={() => joinGameRoom(roomInfo.roomId)}
                        disabled={roomInfo.clients >= roomInfo.maxClients}
                        className={`px-4 py-2 rounded ${
                          roomInfo.clients >= roomInfo.maxClients
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                        } text-white transition-colors`}
                      >
                        {roomInfo.clients >= roomInfo.maxClients
                          ? "Full"
                          : "Join"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          // In game room - show game content
          <>
            {/* Players List */}
            <div className="card">
              <h3 className="text-xl font-bold mb-2 text-gray-700">Players</h3>
              <div className="flex flex-wrap gap-3">
                {players.map((player) => (
                  <div key={player.playerId} className="btn">
                    <span className="--text-secondary">
                      {player.playerName}
                    </span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        player.isAuthenticated ? "bg-green-500" : "bg-gray-400"
                      }`}
                    />
                    {gameState?.phase === "lobby" && (
                      <span
                        className={`text-sm ${
                          player.isReady ? "text-green-600" : "text-gray-500"
                        }`}
                      >
                        {player.isReady ? "  ✓ Ready" : "  Not Ready"}
                      </span>
                    )}
                    {gameState?.phase === "writing" && (
                      <span
                        className={`text-sm ${
                          player.hasSubmitted
                            ? "text-green-600"
                            : "text-gray-500"
                        }`}
                      >
                        {player.hasSubmitted ? "✓ Submitted" : "Writing..."}
                      </span>
                    )}
                    {gameState?.phase === "reading" && (
                      <span
                        className={`text-sm ${
                          player.isReady ? "text-green-600" : "text-gray-500"
                        }`}
                      >
                        {player.isReady ? "✓ Next Round" : "Reading..."}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Game Content Based on Phase */}
            {gameState?.phase === "lobby" && (
              <LobbyPhase
                gameState={gameState}
                currentPlayer={currentPlayer}
                onToggleReady={toggleReady}
                formatTime={formatTime}
              />
            )}

            {gameState?.phase === "writing" && (
              <WritingPhase
                gameState={gameState}
                currentPlayer={currentPlayer}
                writingText={writingText}
                onWritingUpdate={setWritingText}
                onSubmitWriting={submitWriting}
                formatTime={formatTime}
              />
            )}

            {gameState?.phase === "reading" && (
              <ReadingPhase
                gameState={gameState}
                currentPlayer={currentPlayer}
                onBackToLobby={backToLobby}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
