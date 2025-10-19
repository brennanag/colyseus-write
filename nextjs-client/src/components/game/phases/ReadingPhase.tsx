'use client';
import { 
  Box, VStack, Heading, Text, HStack, Avatar,
  Card, Separator 
} from '@chakra-ui/react';
import { ChatMessage, Player } from '@/lib/types';

interface ReadingPhaseProps {
  finalStory: string;
  chatMessages: ChatMessage[];
  players: { [sessionId: string]: Player };
  onSendMessage: (message: string) => void;
}

export function ReadingPhase({ finalStory, chatMessages }: ReadingPhaseProps) {
  return (
    <HStack gap={6} align="start" height="600px">
      {/* Story Display */}
      <Box flex={2} height="100%" overflowY="auto">
        <VStack gap={4} align="stretch">
          <Heading size="lg">Your Collaborative Story</Heading>
          <Card.Root>
            <Card.Body>
              <Text whiteSpace="pre-wrap">{finalStory}</Text>
            </Card.Body>
          </Card.Root>
        </VStack>
      </Box>

      {/* Chat Panel */}
      <Box flex={1} height="100%">
        <VStack gap={4} align="stretch" height="100%">
          <Heading size="md">Group Chat</Heading>
          <Card.Root variant="outline" flex={1}>
            <Card.Body>
              <VStack gap={3} align="stretch" height="100%" overflowY="auto">
                {chatMessages.map((message, index) => (
                  <Box key={index}>
                    <HStack gap={2}>
                      <Avatar.Root size="xs">
                        <Avatar.Fallback name={message.playerName} />
                      </Avatar.Root>
                      <Text fontWeight="bold">{message.playerName}:</Text>
                      <Text>{message.content}</Text>
                    </HStack>
                    {index < chatMessages.length - 1 && <Separator />}
                  </Box>
                ))}
              </VStack>
            </Card.Body>
          </Card.Root>
        </VStack>
      </Box>
    </HStack>
  );
}