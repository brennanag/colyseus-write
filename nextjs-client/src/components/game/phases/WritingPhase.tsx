'use client';
import { useState } from 'react';
import { 
  Box, VStack, Heading, Text, Textarea, Button, 
  Progress, Badge, HStack 
} from '@chakra-ui/react';

interface WritingPhaseProps {
  currentRound: number;
  totalRounds: number;
  prompt: string;
  timeRemaining: number;
  onSubmitWriting: (content: string) => void;
}

export function WritingPhase({ 
  currentRound, 
  totalRounds, 
  prompt, 
  timeRemaining, 
  onSubmitWriting 
}: WritingPhaseProps) {
  const [writingContent, setWritingContent] = useState('');

  const handleSubmit = () => {
    if (writingContent.trim().length > 0) {
      onSubmitWriting(writingContent.trim());
      setWritingContent('');
    }
  };

  return (
    <Box>
      <VStack gap={6} align="stretch">
        <Heading>Writing Phase</Heading>
        
        <HStack justify="space-between">
          <Badge colorPalette="blue" fontSize="md">
            Round {currentRound} of {totalRounds}
          </Badge>
          <Text fontSize="sm" color="fg.subtle">
            Time: {timeRemaining}s
          </Text>
        </HStack>

        <Progress.Root value={(currentRound / totalRounds) * 100}>
          <Progress.Track>
            <Progress.Range />
          </Progress.Track>
        </Progress.Root>

        <Box bg="bg.subtle" p={4} borderRadius="md">
          <Text fontWeight="bold" mb={2}>Writing Prompt:</Text>
          <Text>{prompt}</Text>
        </Box>

        <Textarea
          value={writingContent}
          onChange={(e) => setWritingContent(e.target.value)}
          placeholder="Write your contribution to the story..."
          minHeight="200px"
          resize="vertical"
        />

        <Button 
          colorPalette="blue" 
          onClick={handleSubmit}
          disabled={writingContent.trim().length === 0}
          size="lg"
        >
          Submit Your Writing
        </Button>

        <Text fontSize="sm" color="fg.subtle" textAlign="center">
          Each player contributes to build the story together
        </Text>
      </VStack>
    </Box>
  );
}