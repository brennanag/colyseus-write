'use client';

import { useState } from 'react';
import { Box, Button, VStack, Text, Heading, Container, HStack } from '@chakra-ui/react';
import { Room } from 'colyseus.js';
import { useAuth } from '../contexts/AuthContext';
import AuthForms from '../components/AuthForms';
import { WritingGameState, Player } from '../schema/WritingGameState';

export default function Home() {
  const { user, logout, client } = useAuth();
  // 1. Type the room state based on your schema.
  const [room, setRoom] = useState<Room<WritingGameState> | null>(null);
  const [gameState, setGameState] = useState<WritingGameState | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);

  const joinRoom = async () => {
    if (!client || !user) return;
    
    try {
      // 2. The schema is used for typing here. It is NOT a third parameter.
      const gameRoom = await client.joinOrCreate<WritingGameState>('writing_room', {});
      setRoom(gameRoom);
      
      // 3. The state is now properly typed as WritingGameState.
      gameRoom.onStateChange((state) => {
        console.log('Room state changed:', state);
        setGameState(state);
        if (state.players) {
          const playersArray = Array.from(state.players.values());
          setPlayers(playersArray);
        }


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

  // ... (The rest of your UI component remains the same)
  return (
    <Container maxW="container.xl" py={8}>
      <VStack gap={6} align="stretch">
        {/* Your existing UI code here */}
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
            {/* Room Info and Players List */}
            <Box bg="blue.50" p={4} borderRadius="md">
              <HStack justify="space-between">
                <Text>Connected to room: <strong>{room.roomId}</strong></Text>
                <Button onClick={leaveRoom} colorPalette="red" size="sm">
                  Leave Room
                </Button>
              </HStack>
            </Box>

            <Box>
              <Heading size="md">{players.length} Players in Room:</Heading>
              <VStack align="start" mt={2}>
                {players.map((player) => (
                  <Text key={player.playerId}>
                    • {player.playerName} {player.email === user.email && '(You)'}
                  </Text>
                ))}
              </VStack>
            </Box>
          </>
        )}
      </VStack>
    </Container>
  );
}