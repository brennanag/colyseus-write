'use client';
import { Box, VStack, Heading, Text } from '@chakra-ui/react';
import { GameClient } from '@/components/game/GameClient';

export default function Home() {
  return (
    <Box minHeight="100vh" bg="bg.canvas">
      <VStack gap={8} p={6}>
        <Heading size="2xl" textAlign="center">
          Collaborative Writing Game
        </Heading>
        <Text fontSize="xl" color="fg.muted" textAlign="center">
          Create stories together with other writers
        </Text>
        <GameClient />
      </VStack>
    </Box>
  );
}