'use client';
import { 
  Box, VStack, Heading, Button, Text 
} from '@chakra-ui/react';
import { Player } from '@/lib/types';

interface LobbyPhaseProps {
  players: Player[];
  onReady: () => void;
}

export function LobbyPhase({ players, onReady }: LobbyPhaseProps) {
  return (
    <Box>
      <VStack gap={6}>
        <Heading>Lobby</Heading>
        <Text>Waiting for players to join...</Text>
        
        <VStack gap={2} width="100%">
          {players.map(player => (
            <Box 
              key={player.id} 
              p={3} 
              bg={player.isReady ? 'green.100' : 'gray.100'}
              borderRadius="md"
              width="100%"
              textAlign="center"
            >
              <Text fontWeight="bold">
                {player.name} {player.isReady ? '✓ Ready' : '...'}
              </Text>
            </Box>
          ))}
        </VStack>
        
        <Button colorPalette="blue" onClick={onReady}>
          I'm Ready!
        </Button>
      </VStack>
    </Box>
  );
}