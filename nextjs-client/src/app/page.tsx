'use client';

import { useState } from 'react';
import { Box, Button, VStack, Text, Heading, Container, HStack, Textarea } from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext';
import AuthForms from '../components/AuthForms';
import { WritingGameState, Player } from '../schema/WritingGameState';

export default function Home() {
  const { user, logout, client, room, setCurrentRoom } = useAuth();
  const [gameState, setGameState] = useState<WritingGameState | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [writingText, setWritingText] = useState('');

  const formatTime = (ms: number) => {
    return Math.ceil(ms / 1000);
  };

  const joinRoom = async () => {
    if (!client || !user) return;
    
    try {
      const gameRoom = await client.joinOrCreate<WritingGameState>('writing_room', {});
      setCurrentRoom(gameRoom);
      
      gameRoom.onStateChange((state) => {
        console.log('Room state changed:', state);
        setGameState(state);
        
        if (state.players) {
          const playersArray = Array.from(state.players.values());
          setPlayers(playersArray);
        }
      });

      gameRoom.onMessage('phaseChanged', (message) => {
        console.log('Phase changed to:', message.phase);
        if (message.phase === 'writing') {
          setWritingText('');
        }
      });

      gameRoom.onMessage('error', (message) => {
        console.error('Server error:', message);
      });

    } catch (error) {
      console.error('Failed to join room:', error);
    }
  };

  const leaveRoom = async () => {
    if (room) {
      await room.leave();
      setCurrentRoom(null);
      setGameState(null);
      setPlayers([]);
      setWritingText('');
    }
  };

  const toggleReady = () => {
    if (room) {
      room.send('toggleReady');
    }
  };

  const submitWriting = () => {
    if (room && writingText.trim()) {
      room.send('submitWriting', { text: writingText.trim() });
      setWritingText('');
    }
  };

  const nextRound = () => {
    if (room) {
      room.send('nextRound');
    }
  };

  const getCurrentPlayer = (): Player | undefined => {
    return players.find(player => player.email === user?.email);
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
                  <Text fontSize="sm" color="gray.600">Room</Text>
                  <Text fontWeight="bold">{room.roomId}</Text>
                </VStack>
                <VStack align="start" gap={0}>
                  <Text fontSize="sm" color="gray.600">Phase</Text>
                  <Text fontWeight="bold" textTransform="capitalize">
                    {gameState?.phase || 'lobby'}
                  </Text>
                </VStack>
                <VStack align="start" gap={0}>
                  <Text fontSize="sm" color="gray.600">Time</Text>
                  <Text fontWeight="bold">
                    {gameState?.timeRemaining ? `${formatTime(gameState.timeRemaining)}s` : '--'}
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
                Players ({players.length}/8)
              </Text>
              <VStack align="stretch" gap={2}>
                {players.map((player) => (
                  <HStack
                    key={player.playerId}
                    p={3}
                    bg={player.email === user.email ? 'blue.50' : 'gray.50'}
                    borderRadius="md"
                    justify="space-between"
                  >
                    <HStack>
                      <Text fontWeight="medium">{player.playerName}</Text>
                      {player.email === user.email && (
                        <Text fontSize="xs" color="blue.600">(You)</Text>
                      )}
                    </HStack>
                    <HStack gap={4}>
                      {gameState?.phase === 'lobby' && (
                        <Text fontSize="sm" color={player.isReady ? 'green.600' : 'gray.600'}>
                          {player.isReady ? '✓ Ready' : 'Not Ready'}
                        </Text>
                      )}
                      {gameState?.phase === 'writing' && (
                        <Text fontSize="sm" color={player.hasSubmitted ? 'green.600' : 'gray.600'}>
                          {player.hasSubmitted ? '✓ Submitted' : 'Writing...'}
                        </Text>
                      )}
                      {gameState?.phase === 'reading' && (
                        <Text fontSize="sm" color={player.isReady ? 'green.600' : 'gray.600'}>
                          {player.isReady ? '✓ Next Round' : 'Reading...'}
                        </Text>
                      )}
                    </HStack>
                  </HStack>
                ))}
              </VStack>
            </Box>

            {/* Game Content Based on Phase */}
            {gameState?.phase === 'lobby' && (
              <Box bg="green.50" p={6} borderRadius="md" textAlign="center">
                <Text fontSize="xl" fontWeight="bold" mb={2}>
                  Waiting in Lobby
                </Text>
                <Text mb={4}>
                  {gameState.timeRemaining > 0 
                    ? `Game starts in ${formatTime(gameState.timeRemaining)} seconds when all players are ready`
                    : 'Click ready when you\'re prepared to start writing'
                  }
                </Text>
                <Button 
                  onClick={toggleReady}
                  colorScheme={currentPlayer?.isReady ? 'green' : 'blue'}
                  size="lg"
                >
                  {currentPlayer?.isReady ? '✓ Ready' : 'I\'m Ready!'}
                </Button>
              </Box>
            )}

            {gameState?.phase === 'writing' && (
              <Box bg="purple.50" p={6} borderRadius="md">
                <Text fontSize="xl" fontWeight="bold" mb={2}>
                  Writing Prompt:
                </Text>
                <Text fontSize="lg" mb={4} fontStyle="italic">
                  "{gameState.currentPrompt}"
                </Text>
                <Text fontSize="sm" color="gray.600" mb={4}>
                  Time remaining: {formatTime(gameState.timeRemaining)} seconds
                  {currentPlayer?.hasSubmitted && ' • ✓ Submitted'}
                </Text>
                
                <Textarea
                  value={writingText}
                  onChange={(e) => setWritingText(e.target.value)}
                  placeholder="Start writing your story here..."
                  minH="200px"
                  mb={4}
                  disabled={currentPlayer?.hasSubmitted}
                />
                
                <HStack justify="space-between">
                  <Text fontSize="sm" color="gray.600">
                    {writingText.length} characters
                  </Text>
                  <Button 
                    onClick={submitWriting}
                    colorScheme="green"
                    disabled={!writingText.trim() || currentPlayer?.hasSubmitted}
                  >
                    {currentPlayer?.hasSubmitted ? '✓ Submitted' : 'Submit Writing'}
                  </Button>
                </HStack>
              </Box>
            )}

            {gameState?.phase === 'reading' && (
              <Box bg="orange.50" p={6} borderRadius="md">
                <Text fontSize="xl" fontWeight="bold" mb={4}>
                  Stories from this Round
                </Text>
                
                <VStack align="stretch" gap={4} mb={6}>
                  {Array.from(gameState.submissions?.entries() || []).map(([playerId, story], index) => {
                    const author = players.find(p => p.playerId === playerId);
                    return (
                      <Box key={playerId} bg="white" p={4} borderRadius="md" shadow="sm">
                        <Text fontWeight="bold" mb={2}>
                          Story {index + 1} {author?.playerName === user.name && '(Yours)'}
                        </Text>
                        <Text whiteSpace="pre-wrap">{story as string}</Text>
                        <Text fontSize="sm" color="gray.600" mt={2}>
                          — {author?.playerName}
                        </Text>
                      </Box>
                    );
                  })}
                </VStack>

                <Box textAlign="center">
                  <Text mb={4}>
                    {currentPlayer?.isReady 
                      ? '✓ Ready for next round' 
                      : 'Click below when you\'re ready for the next round'
                    }
                  </Text>
                  <Button 
                    onClick={nextRound}
                    colorScheme={currentPlayer?.isReady ? 'green' : 'blue'}
                    size="lg"
                  >
                    {currentPlayer?.isReady ? '✓ Ready' : 'Next Round'}
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