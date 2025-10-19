'use client';

import { useEffect, useState } from 'react';
import { Box, Button, VStack, Text, Heading } from '@chakra-ui/react';
import { Room } from 'colyseus.js';
import { useAuth } from '../contexts/AuthContext';
import AuthForms from '../components/AuthForms';

export default function Home() {
  const { user, logout, client } = useAuth(); // Remove token, add client
  const [room, setRoom] = useState<Room | null>(null);
  const [players, setPlayers] = useState<any[]>([]);

  const joinRoom = async () => {
    if (!client || !user) return;
    
    try {
      // Token is automatically handled by client.auth
      const gameRoom = await client.joinOrCreate('writing_room', {});
      
      setRoom(gameRoom);
      
      gameRoom.onStateChange((state) => {
        console.log('Room state changed:', state);
        if (state.players) {
          const playersArray = Array.from(state.players.values());
          setPlayers(playersArray);
        }
      });

      gameRoom.onMessage("writing_submitted", (message) => {
        console.log('Writing submitted:', message);
      });

    } catch (error) {
      console.error('Failed to join room:', error);
    }
  };

  const leaveRoom = async () => {
    if (room) {
      await room.leave();
      setRoom(null);
      setPlayers([]);
    }
  };

  const submitWriting = async (text: string) => {
    if (room) {
      room.send("submit_writing", { text });
    }
  };

  if (!user) {
    return <AuthForms />;
  }

  return (
    <Box minHeight="100vh" p={8}>
      <VStack gap={6} align="stretch">
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
          <Button onClick={joinRoom} colorPalette="blue" size="lg">
            Join Writing Room
          </Button>
        ) : (
          <>
            <Box>
              <Text>Connected to room: {room.roomId}</Text>
              <Button onClick={leaveRoom} colorPalette="red" size="sm">
                Leave Room
              </Button>
            </Box>

            <Box>
              <Heading size="md">Players in Room:</Heading>
              <VStack align="start" mt={2}>
                {players.map((player) => (
                  <Text key={player.playerId}>
                    • {player.playerName} {player.isAuthenticated ? '✓' : ''}
                  </Text>
                ))}
              </VStack>
            </Box>

            <Box borderWidth={1} p={4} borderRadius="md">
              <Heading size="md">Writing Area</Heading>
              <Text mt={2}>Your collaborative writing interface will appear here.</Text>
              <Button 
                onClick={() => submitWriting("Sample writing submission")} 
                colorPalette="green" 
                mt={4}
              >
                Submit Writing
              </Button>
            </Box>
          </>
        )}
      </VStack>
    </Box>
  );
}