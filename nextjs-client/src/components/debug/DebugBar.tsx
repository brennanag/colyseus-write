'use client';
import { HStack, Text, Badge, Box } from '@chakra-ui/react';

interface DebugBarProps {
  roomId: string | null;
  playerCount: number;
  currentPhase: string;
  connectionStatus: string;
}

export function DebugBar({ 
  roomId, 
  playerCount, 
  currentPhase, 
  connectionStatus 
}: DebugBarProps) {
  return (
    <Box bg="gray.800" color="white" p={2} fontSize="sm">
      <HStack gap={4} justify="space-between">
        <HStack gap={4}>
          <Text>Status: <Badge colorPalette={connectionStatus === 'connected' ? 'green' : 'orange'}>{connectionStatus}</Badge></Text>
          {roomId && <Text>Room: {roomId}</Text>}
          <Text>Players: {playerCount}</Text>
          <Text>Phase: {currentPhase}</Text>
        </HStack>
        
        {/* REMOVED MOCK ACTION BUTTONS */}
      </HStack>
    </Box>
  );
}