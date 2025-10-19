'use client';
import { useState } from 'react';
import { 
  Box, VStack, Heading, Text, Textarea, Button, 
  Card, HStack, Badge 
} from '@chakra-ui/react';
import { WritingContribution } from '@/lib/types';

interface EditingPhaseProps {
  currentStory: string;
  contributions: WritingContribution[];
  onSaveEdit: (editedStory: string) => void;
}

export function EditingPhase({ currentStory, contributions, onSaveEdit }: EditingPhaseProps) {
  const [editedContent, setEditedContent] = useState(currentStory);

  return (
    <Box>
      <VStack gap={6} align="stretch">
        <Heading>Editing & Review Phase</Heading>
        <Text>Collaboratively refine the story together</Text>

        <HStack gap={4} overflowX="auto" py={2}>
          {contributions.map((contribution, index) => (
            <Card.Root key={index} size="sm">
              <Card.Body>
                <VStack gap={2} align="start">
                  <Badge colorPalette="purple">Round {contribution.round}</Badge>
                  <Text fontWeight="bold">{contribution.playerName}</Text>
                  <Text fontSize="sm">
                    {contribution.content}
                  </Text>
                </VStack>
              </Card.Body>
            </Card.Root>
          ))}
        </HStack>

        <Box>
          <Text fontWeight="bold" mb={2}>Current Story:</Text>
          <Textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            minHeight="300px"
            placeholder="The collaborative story will appear here..."
          />
        </Box>

        <HStack justify="space-between">
          <Text fontSize="sm" color="fg.subtle">
            All players can suggest edits
          </Text>
          <Button 
            colorPalette="green"
            onClick={() => onSaveEdit(editedContent)}
          >
            Save Edits
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}