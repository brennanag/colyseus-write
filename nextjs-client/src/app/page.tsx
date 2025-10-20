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
} from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";
import AuthForms from "../components/AuthForms";
import { WritingGameState, Player } from "../schema/WritingGameState";
import TiptapEditor from "@/components/TiptapEditor";

export default function Home() {
  const { user, logout, client, room, setCurrentRoom } = useAuth();
  const [gameState, setGameState] = useState<WritingGameState | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [writingText, setWritingText] = useState("");

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
      <VStack gap={6} align="stretch">
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Heading size="lg">Welcome, {user.name || user.email}!</Heading>
            <Text color="gray.600">Collaborative Writing Game</Text>
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
            {/* Room Info */}
            <Box bg="blue.50" p={4} borderRadius="md">
              <HStack justify="space-between">
                <VStack align="start" gap={0}>
                  <Text fontSize="sm" color="gray.600">
                    Room
                  </Text>
                  <Text fontWeight="bold">{room.roomId}</Text>
                </VStack>
                <VStack align="start" gap={0}>
                  <Text fontSize="sm" color="gray.600">
                    Phase
                  </Text>
                  <Text fontWeight="bold" textTransform="capitalize">
                    {gameState?.phase || "lobby"}
                  </Text>
                </VStack>
                <VStack align="start" gap={0}>
                  <Text fontSize="sm" color="gray.600">
                    Time
                  </Text>
                  <Text fontWeight="bold">
                    {gameState?.timeRemaining
                      ? `${formatTime(gameState.timeRemaining)}s`
                      : "--"}
                  </Text>
                </VStack>
                <VStack align="start" gap={0}>
                  <Text fontSize="sm" color="gray.600">
                    Round
                  </Text>
                  <Text fontWeight="bold">
                    {gameState?.currentRound !== undefined
                      ? `${gameState.currentRound + 1}/${players.length}`
                      : "--"}
                  </Text>
                </VStack>
                <Button onClick={leaveRoom} colorScheme="red" size="sm">
                  Leave Room
                </Button>
              </HStack>
            </Box>

            {/* Players List */}
            <Box bg="white" p={4} borderRadius="md" shadow="sm">
              <Text fontSize="lg" fontWeight="bold" mb={3}>
                Players ({players.length})
              </Text>
              <VStack align="stretch" gap={2}>
                {players.map((player) => (
                  <HStack
                    key={player.playerId}
                    p={3}
                    bg={player.email === user.email ? "blue.50" : "gray.50"}
                    borderRadius="md"
                    justify="space-between"
                  >
                    <HStack>
                      <Text fontWeight="medium">{player.playerName}</Text>
                      {player.email === user.email && (
                        <Text fontSize="xs" color="blue.600">
                          (You)
                        </Text>
                      )}
                    </HStack>
                    <HStack gap={4}>
                      {gameState?.phase === "lobby" && (
                        <Text
                          fontSize="sm"
                          color={player.isReady ? "green.600" : "gray.600"}
                        >
                          {player.isReady ? "✓ Ready" : "Not Ready"}
                        </Text>
                      )}
                      {gameState?.phase === "writing" && (
                        <Text
                          fontSize="sm"
                          color={player.hasSubmitted ? "green.600" : "gray.600"}
                        >
                          {player.hasSubmitted ? "✓ Submitted" : "Writing..."}
                        </Text>
                      )}
                      {gameState?.phase === "reading" && (
                        <Text
                          fontSize="sm"
                          color={player.isReady ? "green.600" : "gray.600"}
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
              <Box bg="green.50" p={6} borderRadius="md" textAlign="center">
                <Text fontSize="xl" fontWeight="bold" mb={2}>
                  Waiting in Lobby
                </Text>
                <Text mb={4}>
                  {gameState.timeRemaining > 0
                    ? `Game starts in ${formatTime(
                        gameState.timeRemaining
                      )} seconds when all players are ready`
                    : "Click ready when you're prepared to start writing"}
                </Text>
                <Button
                  onClick={toggleReady}
                  colorScheme={currentPlayer?.isReady ? "green" : "blue"}
                  size="lg"
                >
                  {currentPlayer?.isReady ? "✓ Ready" : "I'm Ready!"}
                </Button>
              </Box>
            )}

            {gameState?.phase === "writing" && (
              <Box bg="purple.50" p={6} borderRadius="md">
                <Text fontSize="xl" fontWeight="bold" mb={2}>
                  Round {gameState.currentRound + 1} of {players.length}
                </Text>

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
                      <Text fontSize="lg" mb={2}>
                        Continuing:{" "}
                        <strong>
                          Story {assignedStoryId?.replace("story_", "")}
                        </strong>
                      </Text>
                      <Text fontSize="md" mb={4} fontStyle="italic">
                        "{assignedStory?.originalPrompt}"
                      </Text>

                      {/* Show accumulated story so far - CLEANER VERSION */}
                      {assignedStory?.accumulatedContent && (
                        <Box mb={4}>
                          <Text fontSize="sm" fontWeight="bold" mb={2}>
                            The story so far:
                          </Text>
                          <Box
                            p={4}
                            borderRadius="md"
                            fontSize="md"
                            lineHeight="1.6"
                            bg="white"
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
                          <Text fontSize="sm" fontWeight="bold" mb={2}>
                            The story so far:
                          </Text>
                          <Text
                            fontSize="sm"
                            whiteSpace="pre-wrap"
                            color="gray.700"
                            lineHeight="1.6"
                          >
                            {assignedStory.accumulatedContent}
                          </Text>
                        </Box>
                      )}

                      <Text fontSize="sm" color="gray.600" mb={4}>
                        Time remaining: {formatTime(gameState.timeRemaining)}{" "}
                        seconds
                        {currentPlayer?.hasSubmitted && " • ✓ Submitted"}
                      </Text>

                      <TiptapEditor
                        onContentChange={(content) => setWritingText(content)}
                        isDisabled={currentPlayer?.hasSubmitted}
                      />

                      <HStack justify="space-between">
                        <Text fontSize="sm" color="gray.600">
                          {writingText.replace(/<[^>]*>/g, "").length}{" "}
                          characters
                          {/* This counts text characters without HTML tags */}
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
              <Box bg="orange.50" p={6} borderRadius="md">
                <Text fontSize="xl" fontWeight="bold" mb={4}>
                  Completed Collaborative Stories
                </Text>

                <VStack align="stretch" spacing={6} mb={6}>
                  {Array.from(gameState.stories?.entries() || []).map(
                    ([storyId, story], index) => (
                      <Box
                        key={storyId}
                        bg="white"
                        p={4}
                        borderRadius="md"
                        shadow="sm"
                      >
                        <Text fontWeight="bold" mb={2} fontSize="lg">
                          Story {index + 1}: "{story.originalPrompt}"
                        </Text>
                        {/* FIXED: story is now properly defined in this scope */}
                        <Box
                          p={4}
                          borderRadius="md"
                          whiteSpace="pre-wrap"
                          fontSize="md"
                          lineHeight="1.6"
                          bg="white"
                          dangerouslySetInnerHTML={{
                            __html: story.accumulatedContent || "",
                          }}
                        />
                        <Text fontSize="sm" color="gray.600" mt={2}>
                          Created by all {players.length} players together
                        </Text>
                      </Box>
                    )
                  )}
                </VStack>

                <Box textAlign="center">
                  <Text mb={4}>
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
