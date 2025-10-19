'use client';

import { useEffect, useState } from 'react';
import { Box, Button, VStack, Text } from '@chakra-ui/react';
import { Client, Room } from 'colyseus.js';
import { useAuth } from '../contexts/AuthContext';
import AuthForms from '../components/AuthForms';

export default function Home() {
  const { user, token } = useAuth();
  const [client, setClient] = useState<Client | null>(null);
  const [room, setRoom] = useState<Room | null>(null);

  useEffect(() => {
    const gameClient = new Client('ws://localhost:2567');
    setClient(gameClient);
  }, []);

  const joinRoom = async () => {
    if (!client || !user) return;
    
    try {
      const gameRoom = await client.joinOrCreate('writing_room', {
        token // Send authentication token to server
      });
      setRoom(gameRoom);
    } catch (error) {
      console.error('Failed to join room:', error);
    }
  };

  if (!user) {
    return <AuthForms />;
  }

  return (
    <Box minHeight="100vh" p={8}>
      <VStack gap={4}>
        <Text>Welcome, {user.name || user.email}!</Text>
        <Button onClick={joinRoom} colorPalette="blue">
          Join Writing Room
        </Button>
        {room && <Text>Connected to room: {room.roomId}</Text>}
      </VStack>
    </Box>
  );
}