'use client';

import { useState } from 'react';
import { Box, Button, VStack, Text, Heading, Container, HStack } from '@chakra-ui/react';
import { Room } from 'colyseus.js';
import { useAuth } from '../contexts/AuthContext';
import AuthForms from '../components/AuthForms';
import { WritingGameState, Player } from '../schema/WritingGameState';

export default function Home() {
  const { user, logout, client } = useAuth();
  const [room, setRoom] = useState<Room<WritingGameState> | null>(null);
  const [gameState, setGameState] = useState<WritingGameState | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);

  const joinRoom = async () => {
    if (!client || !user) return;
    
    try {
      // Token is automatically handled by client.auth
      const gameRoom = await client.joinOrCreate<WritingGameState>('writing_room', {});
      
      setRoom(gameRoom);
      
      // Set up room event listeners with proper typing
      gameRoom.onStateChange((state) => {
        console.log('Room state changed:', state);
        setGameState(state);
        
        if (state.players) {
          const playersArray = Array.from(state.players.values());
          setPlayers(playersArray);
        }
      });

      gameRoom.state.players.onAdd((player, sessionId) => {
        console.log('Player joined:', player.playerName, sessionId);
      });

      gameRoom.state.players.onRemove((player, sessionId) => {
        console.log('Player left:', player.playerName, sessionId);
      });

    } catch (error) {
      console.error('Failed to join room:', error);
    }
  };

  const leaveRoom = async () => {
    if (room) {
      await room.leave();
      setRoom(null);
      setGameState(null);
      setPlayers([]);
    }
  };

  if (!user) {
    return <AuthForms />;
  }

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={6} align="stretch">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Heading size="lg">Welcome, {user.name || user.email}!</Heading>
            <Text color="gray.600">Ready to write collaboratively with friends</Text>
          </Box>
          <Button onClick={() => logout()} colorPalette="gray" variant="outline">
            Logout
          </Button>
        </Box>

        {!room ? (
          <Box textAlign="center">
            <Button onClick={joinRoom} colorPalette="blue" size="lg">
              Join Writing Room
            </Button>
          </Box>
        ) : (
          <>
            {/* Room Header */}
            <Box bg="blue.50" p={4} borderRadius="md">
              <HStack justify="space-between">
                <VStack align="start" spacing={0}>
                  <Text fontSize="sm" color="gray.600">Room ID</Text>
                  <Text fontWeight="bold">{room.id}</Text>
                </VStack>
                <VStack align="start" spacing={0}>
                  <Text fontSize="sm" color="gray.600">Phase</Text>
                  <Text fontWeight="bold" textTransform="capitalize">
                    {gameState?.phase || 'lobby'}
                  </Text>
                </VStack>
                <VStack align="start" spacing={0}>
                  <Text fontSize="sm" color="gray.600">Players</Text>
                  <Text fontWeight="bold">
                    {players.length} / {gameState?.maxPlayers || 8}
                  </Text>
                </VStack>
                <Button onClick={leaveRoom} colorPalette="red" size="sm">
                  Leave Room
                </Button>
              </HStack>
            </Box>

            {/* Players List */}
            <Box bg="white" p={4} borderRadius="md" shadow="sm">
              <Text fontSize="lg" fontWeight="bold" mb={3}>
                Players in Room
              </Text>
              <VStack align="stretch" spacing={2}>
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
                    <HStack spacing={4}>
                      {player.isReady && (
                        <Text fontSize="xs" color="green.600" fontWeight="bold">
                          ✓ Ready
                        </Text>
                      )}
                    </HStack>
                  </HStack>
                ))}
              </VStack>
            </Box>

            {/* Game Interface Placeholder */}
            <Box borderWidth={1} p={4} borderRadius="md">
              <Heading size="md">Writing Area</Heading>
              <Text mt={2}>Your collaborative writing interface will appear here.</Text>
              <Button 
                onClick={() => console.log('Submit writing')} 
                colorPalette="green" 
                mt={4}
              >
                Submit Writing
              </Button>
            </Box>
          </>
        )}
      </VStack>
    </Container>
  );
}