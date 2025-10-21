"use client";

import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import AuthForms from "../components/AuthForms";
import { WritingGameState, Player } from "../schema/WritingGameState";
import TiptapEditor from "@/components/TiptapEditor";
import { DebugBar } from "@/components/debug/DebugBar";

export default function Home() {
  const { user, logout, client, room, setCurrentRoom } = useAuth();
  const [gameState, setGameState] = useState<WritingGameState | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [writingText, setWritingText] = useState("");
  const [connectionStatus, setConnectionStatus] =
    useState<string>("Disconnected");

  const formatTime = (ms: number) => {
    return Math.ceil(ms / 1000);
  };

  const joinRoom = async () => {
    if (!client || !user) return;

    try {
      const gameRoom = await client.joinOrCreate<WritingGameState>(
        "writing_room",
        {}
      );
      setCurrentRoom(gameRoom);

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
      console.error("Failed to join room:", error);
    }
  };

  const leaveRoom = async () => {
    if (room) {
      await room.leave();
      setCurrentRoom(null);
      setGameState(null);
      setPlayers([]);
      setWritingText("");
    }
  };

  const toggleReady = () => {
    if (room) {
      room.send("toggleReady");
    }
  };

  const submitWriting = () => {
    if (room && writingText.trim()) {
      room.send("submitWriting", { text: writingText.trim() });
      setWritingText("");
    }
  };

  const nextRound = () => {
    if (room) {
      room.send("nextRound");
    }
  };

  const getCurrentPlayer = (): Player | undefined => {
    return players.find((player) => player.email === user?.email);
  };

  if (!user) {
    return <AuthForms />;
  }

  const currentPlayer = getCurrentPlayer();

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="flex flex-col gap-1">
        <div>
          <DebugBar
            roomId={room?.roomId || null}
            playerCount={Number(gameState?.players.size) || 0}
            currentPhase={gameState?.phase || "connecting"}
            connectionStatus={connectionStatus}
          />
          <div className="max-w-6xl mx-auto p-0">
            {/* Content container if needed */}
          </div>
        </div>

        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome, {user.name || user.email}!
            </h1>
          </div>
          <button
            onClick={() => logout()}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Logout
          </button>
        </div>

        {!room ? (
          <div className="text-center py-8">
            <button
              onClick={joinRoom}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg"
            >
              Join Writing Room
            </button>
            <TiptapEditor
              onContentChange={(content) => setWritingText(content)}
              isDisabled={currentPlayer?.hasSubmitted}
            />
          </div>
        ) : (
          <>
            {/* Players List */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-900 mb-3">
                  Players ({players.length})
                </h2>
                <button
                  onClick={leaveRoom}
                  className="px-3 py-1.5 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 transition-colors"
                >
                  Leave Room
                </button>
              </div>
              <div className="flex flex-col gap-2">
                {players.map((player) => (
                  <div
                    key={player.playerId}
                    className={`flex justify-between items-center p-3 rounded-md ${
                      player.email === user.email ? "bg-blue-50" : "bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="font-medium text-gray-900">
                        {player.playerName}
                      </span>
                      {player.email === user.email && (
                        <span className="text-xs text-blue-600 ml-1">
                          (You)
                        </span>
                      )}
                    </div>
                    <div className="flex gap-4">
                      {gameState?.phase === "lobby" && (
                        <span
                          className={`text-sm ${
                            player.isReady ? "text-green-600" : "text-gray-500"
                          }`}
                        >
                          {player.isReady ? "✓ Ready" : "Not Ready"}
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
                  </div>
                ))}
              </div>
            </div>

            {/* Game Content Based on Phase */}
            {gameState?.phase === "lobby" && (
              <div className="bg-white p-6 rounded-lg text-center border border-gray-200">
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  Waiting in Lobby
                </h3>
                <p className="mb-4 text-gray-900">
                  {gameState.timeRemaining > 0
                    ? `Game starts in ${formatTime(
                        gameState.timeRemaining
                      )} seconds when all players are ready`
                    : " "}
                </p>
                <button
                  onClick={toggleReady}
                  className={`px-6 py-3 rounded-lg text-lg ${
                    currentPlayer?.isReady
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-blue-600 hover:bg-blue-700"
                  } text-white transition-colors`}
                >
                  {currentPlayer?.isReady
                    ? "Wait, I'm not ready"
                    : "Let's Write!"}
                </button>
              </div>
            )}

            {gameState?.phase === "writing" && (
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                {(() => {
                  const currentPlayer = getCurrentPlayer();
                  const assignedStoryId = gameState.currentAssignments?.get(
                    currentPlayer?.playerId || ""
                  );
                  const assignedStory = gameState.stories?.get(
                    assignedStoryId || ""
                  );

                  return (
                    <>
                      <p className="text-base mb-2 text-gray-900">
                        Continuing:{" "}
                        <strong>
                          Story{" "}
                          {1 + Number(assignedStoryId?.replace("story_", ""))}
                        </strong>
                      </p>
                      <p className="text-base mb-4 italic text-gray-900">
                        "{assignedStory?.originalPrompt}"
                      </p>

                      {/* Show accumulated story so far */}
                      {assignedStory?.accumulatedContent && (
                        <div className="mb-4">
                          <p className="text-sm font-bold mb-2 text-gray-900">
                            The story so far:
                          </p>
                          <div
                            className="p-4 rounded-md text-base leading-relaxed bg-white border border-gray-200 prose max-w-none"
                            dangerouslySetInnerHTML={{
                              __html: assignedStory.accumulatedContent || "",
                            }}
                          />
                        </div>
                      )}

                      <p className="text-sm text-gray-600 mb-4">
                        Time remaining: {formatTime(gameState.timeRemaining)}{" "}
                        seconds
                        {currentPlayer?.hasSubmitted && " • ✓ Submitted"}
                      </p>

                      <TiptapEditor
                        onContentChange={(content) => setWritingText(content)}
                        isDisabled={currentPlayer?.hasSubmitted}
                      />

                      <div className="flex justify-between items-center mt-4">
                        <p className="text-sm text-gray-600">
                          {writingText.replace(/<[^>]*>/g, "").length}{" "}
                          characters
                        </p>
                        <button
                          onClick={submitWriting}
                          disabled={
                            !writingText.trim() || currentPlayer?.hasSubmitted
                          }
                          className={`px-4 py-2 rounded-md ${
                            !writingText.trim() || currentPlayer?.hasSubmitted
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-green-600 hover:bg-green-700"
                          } text-white transition-colors`}
                        >
                          {currentPlayer?.hasSubmitted
                            ? "✓ Submitted"
                            : "Submit Continuation"}
                        </button>
                      </div>
                    </>
                  );
                })()}
              </div>
            )}

            {gameState?.phase === "reading" && (
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="text-xl font-normal mb-2 text-gray-900">
                  Read the Completed Stories
                </h3>

                <div className="flex flex-col gap-6 mb-6">
                  {Array.from(gameState.stories?.entries() || []).map(
                    ([storyId, story], index) => (
                      <div
                        key={storyId}
                        className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
                      >
                        <p className="font-light mb-2 text-base text-gray-900">
                          Story {index + 1} Prompt: "{story.originalPrompt}"
                        </p>
                        <div
                          className="p-4 rounded-md text-base leading-relaxed bg-gray-100 prose max-w-none"
                          dangerouslySetInnerHTML={{
                            __html: story.accumulatedContent || "",
                          }}
                        />
                        <hr className="my-4 border-gray-300" />
                      </div>
                    )
                  )}
                </div>

                <div className="text-center">
                  <p className="mb-4 text-gray-900">
                    {currentPlayer?.isReady
                      ? "✓ Ready for next game"
                      : "Click below when you're ready for the next game"}
                  </p>
                  <button
                    onClick={nextRound}
                    className={`px-6 py-3 rounded-lg text-lg ${
                      currentPlayer?.isReady
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-blue-600 hover:bg-blue-700"
                    } text-white transition-colors`}
                  >
                    {currentPlayer?.isReady ? "✓ Ready" : "New Game"}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
