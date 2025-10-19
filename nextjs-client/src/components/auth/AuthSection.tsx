'use client';
import { useState } from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  Input,
  Button,
  Card,
  Field,
} from '@chakra-ui/react';

interface AuthSectionProps {
  onSignIn: (playerName: string, authToken: string) => void;
  loading?: boolean;
}

export function AuthSection({ onSignIn, loading = false }: AuthSectionProps) {
  const [playerName, setPlayerName] = useState('');
  const [authToken, setAuthToken] = useState('USER_DUMMY_TOKEN');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim() && authToken.trim()) {
      onSignIn(playerName.trim(), authToken.trim());
    }
  };

  return (
    <Box width="100%" maxWidth="400px" margin="0 auto">
      <Card.Root>
        <Card.Body>
          <VStack gap={6}>
            <VStack gap={2} textAlign="center">
              <Heading size="lg">📝 StoryCraft</Heading>
              <Text color="fg.muted">
                Join a collaborative writing game
              </Text>
            </VStack>

            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <VStack gap={4}>
                <Field.Root>
                  <Field.Label>Display Name</Field.Label>
                  <Input
                    placeholder="Enter your name"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    required
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label>Auth Token</Field.Label>
                  <Input
                    value={authToken}
                    onChange={(e) => setAuthToken(e.target.value)}
                    required
                  />
                </Field.Root>

                <Button
                  type="submit"
                  colorPalette="blue"
                  width="100%"
                  disabled={!playerName.trim() || !authToken.trim() || loading}
                >
                  {loading ? 'Signing In...' : 'Join Game'}
                </Button>
              </VStack>
            </form>

            <Text fontSize="sm" color="fg.muted" textAlign="center">
              Use "USER_DUMMY_TOKEN" to test the game
            </Text>
          </VStack>
        </Card.Body>
      </Card.Root>
    </Box>
  );
}