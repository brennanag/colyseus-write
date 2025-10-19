'use client';
import { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
} from '@chakra-ui/react';
import { AuthSection } from '@/components/auth/AuthSection';
import { GameClient } from '@/components/game/GameClient';

interface User {
  username: string;
  userId: string;
  authToken: string;
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('writing-game-user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('writing-game-user');
      }
    }
    setLoading(false);
  }, []);

  const handleSignIn = (playerName: string, authToken: string) => {
    const userData: User = {
      username: playerName,
      userId: `user_${Date.now()}`,
      authToken: authToken,
    };
    
    setUser(userData);
    localStorage.setItem('writing-game-user', JSON.stringify(userData));
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('writing-game-user');
  };

  if (loading) {
    return (
      <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
        <Text>Loading...</Text>
      </Box>
    );
  }

  return (
    <Box minHeight="100vh" bg="bg.canvas">
      {user ? (
        // Game View (when authenticated)
        <Box>
          {/* Header with user info */}
          <Box bg="bg.subtle" borderBottom="1px" borderColor="border.subtle">
            <Box maxWidth="6xl" margin="0 auto" p={4}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <VStack align="start" gap={1}>
                  <Heading size="lg">📝 StoryCraft</Heading>
                  <Text color="fg.muted" fontSize="sm">
                    Welcome, {user.username}!
                  </Text>
                </VStack>
                <Button variant="outline" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </Box>
            </Box>
          </Box>

          {/* Game Content */}
          <Box p={6}>
            <GameClient user={user} />
          </Box>
        </Box>
      ) : (
        // Auth View (when not authenticated)
        <Box 
          minHeight="100vh" 
          display="flex" 
          alignItems="center" 
          justifyContent="center"
          p={6}
        >
          <VStack gap={8} width="100%">
            <VStack gap={2} textAlign="center">
              <Heading size="2xl">📝 StoryCraft</Heading>
              <Text fontSize="xl" color="fg.muted">
                Create amazing stories together
              </Text>
            </VStack>
            <AuthSection onSignIn={handleSignIn} />
          </VStack>
        </Box>
      )}
    </Box>
  );
}