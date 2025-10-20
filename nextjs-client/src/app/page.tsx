"use client";

import { useState } from "react";
import {
  Box,
  Button,
  VStack,
  Text,
  Heading,
  Container,
  HStack,
  Textarea,
  Separator,
} from "@chakra-ui/react";
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
    <Container maxW="container.xl" py={8}>
      <VStack gap={1} align="stretch">
        <Box>
          <DebugBar
            roomId={room?.roomId || null}
            playerCount={Number(gameState?.players.size) || 0}
            currentPhase={gameState?.phase || "connecting"}
            connectionStatus={connectionStatus}
          />
          <Box maxWidth="6xl" margin="0 auto" p={0}>
            {/* <VStack gap={6} align="stretch">
            {renderCurrentPhase()}
          </VStack> */}
          </Box>
        </Box>

        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Heading size="lg" color="text.main">
              Welcome, {user.name || user.email}!
            </Heading>
            {/* <Text color="text.subtle">Collaborative Writing Game</Text> */}
          </Box>
          <Button onClick={() => logout()} colorScheme="gray" variant="outline">
            Logout
          </Button>
        </Box>

        {!room ? (
          <Box textAlign="center" py={8}>
            <Button onClick={joinRoom} colorScheme="blue" size="lg">
              Join Writing Room
            </Button>
          </Box>
        ) : (
          <>
            {/* Players List */}
            <Box bg="bg.card" p={4} borderRadius="md" shadow="sm">
              <HStack justify="space-between" mb={4}>
                <Text fontSize="lg" fontWeight="bold" mb={3} color="text.main">
                  Players ({players.length})
                </Text>
                <Button onClick={leaveRoom} colorScheme="red" size="sm">
                  Leave Room
                </Button>
              </HStack>
              <VStack align="stretch" gap={2}>
                {players.map((player) => (
                  <HStack
                    key={player.playerId}
                    p={3}
                    bg={
                      player.email === user.email ? "bg.highlight" : "bg.subtle"
                    }
                    borderRadius="md"
                    justify="space-between"
                  >
                    <HStack>
                      <Text fontWeight="medium" color="text.main">
                        {player.playerName}
                      </Text>
                      {player.email === user.email && (
                        <Text fontSize="xs" color="text.highlight">
                          (You)
                        </Text>
                      )}
                    </HStack>
                    <HStack gap={4}>
                      {gameState?.phase === "lobby" && (
                        <Text
                          fontSize="sm"
                          color={
                            player.isReady ? "text.success" : "text.subtle"
                          }
                        >
                          {player.isReady ? "✓ Ready" : "Not Ready"}
                        </Text>
                      )}
                      {gameState?.phase === "writing" && (
                        <Text
                          fontSize="sm"
                          color={
                            player.hasSubmitted ? "text.success" : "text.subtle"
                          }
                        >
                          {player.hasSubmitted ? "✓ Submitted" : "Writing..."}
                        </Text>
                      )}
                      {gameState?.phase === "reading" && (
                        <Text
                          fontSize="sm"
                          color={
                            player.isReady ? "text.success" : "text.subtle"
                          }
                        >
                          {player.isReady ? "✓ Next Round" : "Reading..."}
                        </Text>
                      )}
                    </HStack>
                  </HStack>
                ))}
              </VStack>
            </Box>

            {/* Game Content Based on Phase */}
            {gameState?.phase === "lobby" && (
              <Box bg="bg.card" p={6} borderRadius="md" textAlign="center">
                <Text fontSize="xl" fontWeight="bold" mb={2} color="text.main">
                  Waiting in Lobby
                </Text>
                <Text mb={4} color="text.main">
                  {gameState.timeRemaining > 0
                    ? `Game starts in ${formatTime(
                        gameState.timeRemaining
                      )} seconds when all players are ready`
                    : " "}
                </Text>
                <Button
                  onClick={toggleReady}
                  colorScheme={currentPlayer?.isReady ? "green" : "blue"}
                  size="lg"
                >
                  {currentPlayer?.isReady
                    ? "Wait, I'm not ready"
                    : "Let's Write!"}
                </Button>
              </Box>
            )}

            {gameState?.phase === "writing" && (
              <Box bg="bg.card" p={6} borderRadius="md">
                {/* <Text fontSize="xl" fontWeight="bold" mb={2} color="text.main">
                  Round {gameState.currentRound + 1} of {players.length}
                </Text> */}

                {/* Show which story the player is continuing */}
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
                      <Text fontSize="md" mb={2} color="text.main">
                        Continuing:{" "}
                        <strong>
                          Story{" "}
                          {1 + Number(assignedStoryId?.replace("story_", ""))}
                        </strong>
                      </Text>
                      <Text
                        fontSize="md"
                        mb={4}
                        fontStyle="italic"
                        color="text.main"
                      >
                        "{assignedStory?.originalPrompt}"
                      </Text>

                      {/* Show accumulated story so far - CLEANER VERSION */}
                      {assignedStory?.accumulatedContent && (
                        <Box mb={4}>
                          <Text
                            fontSize="sm"
                            fontWeight="bold"
                            mb={2}
                            color="text.main"
                          >
                            The story so far:
                          </Text>
                          <Box
                            p={4}
                            borderRadius="md"
                            fontSize="md"
                            lineHeight="1.6"
                            bg="bg.card"
                            sx={{
                              "& ul, & ol": {
                                paddingLeft: "1.5em",
                                marginBottom: "1em",
                              },
                              "& strong": {
                                fontWeight: "bold",
                              },
                              "& em": {
                                fontStyle: "italic",
                              },
                            }}
                            dangerouslySetInnerHTML={{
                              __html: assignedStory.accumulatedContent || "",
                            }}
                          />
                        </Box>
                      )}

                      <Text fontSize="sm" color="text.subtle" mb={4}>
                        Time remaining: {formatTime(gameState.timeRemaining)}{" "}
                        seconds
                        {currentPlayer?.hasSubmitted && " • ✓ Submitted"}
                      </Text>

                      <TiptapEditor
                        onContentChange={(content) => setWritingText(content)}
                        isDisabled={currentPlayer?.hasSubmitted}
                      />

                      <HStack justify="space-between" mt={4}>
                        <Text fontSize="sm" color="text.subtle">
                          {writingText.replace(/<[^>]*>/g, "").length}{" "}
                          characters
                        </Text>
                        <Button
                          onClick={submitWriting}
                          colorScheme="green"
                          disabled={
                            !writingText.trim() || currentPlayer?.hasSubmitted
                          }
                        >
                          {currentPlayer?.hasSubmitted
                            ? "✓ Submitted"
                            : "Submit Continuation"}
                        </Button>
                      </HStack>
                    </>
                  );
                })()}
              </Box>
            )}

            {gameState?.phase === "reading" && (
              <Box bg="bg.card" p={4} borderRadius="md">
                <Text fontSize="xl" fontWeight="" mb={2}>
                  Read the Completed Stories
                </Text>

                <VStack align="stretch" gap={6} mb={6}>
                  {Array.from(gameState.stories?.entries() || []).map(
                    ([storyId, story], index) => (
                      <Box
                        key={storyId}
                        bg="bg.card"
                        p={4}
                        borderRadius="md"
                        shadow="sm"
                      >
                        <Text
                          fontWeight="light"
                          mb={2}
                          fontSize="md"
                          color="text.main"
                        >
                          Story {index + 1} Prompt: "{story.originalPrompt}"
                        </Text>
                        <Box
                          p={4}
                          borderRadius="md"
                          fontSize="md"
                          lineHeight="1.6"
                          bg="bg.subtle"
                          sx={{
                            "& ul, & ol": {
                              paddingLeft: "1.5em",
                              marginBottom: "1em",
                            },
                            "& strong": {
                              fontWeight: "bold",
                            },
                            "& em": {
                              fontStyle: "italic",
                            },
                          }}
                          dangerouslySetInnerHTML={{
                            __html: story.accumulatedContent || "",
                          }}
                        />
                        {/* <Text fontSize="sm" color="text.subtle" mt={2}>
                          Created by all {players.length} players together
                        </Text> */}
                        <Separator />
                      </Box>
                    )
                  )}
                </VStack>

                <Box textAlign="center">
                  <Text mb={4} color="text.main">
                    {currentPlayer?.isReady
                      ? "✓ Ready for next game"
                      : "Click below when you're ready for the next game"}
                  </Text>
                  <Button
                    onClick={nextRound}
                    colorScheme={currentPlayer?.isReady ? "green" : "blue"}
                    size="lg"
                  >
                    {currentPlayer?.isReady ? "✓ Ready" : "New Game"}
                  </Button>
                </Box>
              </Box>
            )}
          </>
        )}
      </VStack>
    </Container>
  );
}
