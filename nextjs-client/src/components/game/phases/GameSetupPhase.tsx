'use client';
import { useState } from 'react';
import { 
  Box, VStack, Heading, Text, Button, SimpleGrid, 
  Card, Progress, Tag
} from '@chakra-ui/react';
import { Player, SetupStage } from '@/lib/types';

interface GameSetupPhaseProps {
  currentStage: SetupStage;
  onStageComplete: (stage: SetupStage, data: any) => void;
  players: { [sessionId: string]: Player };
}

export function GameSetupPhase({ currentStage, onStageComplete }: GameSetupPhaseProps) {
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);

  const genres = ['Fantasy', 'Sci-Fi', 'Mystery', 'Romance', 'Horror', 'Contemporary'];
  const themes = ['Redemption', 'Discovery', 'Transformation', 'Sacrifice', 'Justice', 'Love'];

  const renderGenreSelection = () => (
    <VStack gap={4}>
      <Heading size="md">Choose a Genre</Heading>
      <SimpleGrid columns={2} gap={4} width="100%">
        {genres.map(genre => (
          <Card.Root 
            key={genre} 
            variant={selectedGenre === genre ? 'elevated' : 'outline'}
            cursor="pointer"
            onClick={() => setSelectedGenre(genre)}
          >
            <Card.Body textAlign="center">
              <Text fontWeight="bold">{genre}</Text>
            </Card.Body>
          </Card.Root>
        ))}
      </SimpleGrid>
      <Button 
        colorPalette="blue" 
        disabled={!selectedGenre}
        onClick={() => onStageComplete('genre_selection', { genre: selectedGenre })}
      >
        Confirm Genre
      </Button>
    </VStack>
  );

  const renderThemeVoting = () => (
    <VStack gap={4}>
      <Heading size="md">Vote for Themes (Select 2-3)</Heading>
      <SimpleGrid columns={2} gap={2} width="100%">
        {themes.map(theme => (
          <Tag.Root
            key={theme}
            size="lg"
            colorPalette={selectedThemes.includes(theme) ? 'blue' : 'gray'}
            cursor="pointer"
            onClick={() => {
              setSelectedThemes(prev => 
                prev.includes(theme) 
                  ? prev.filter(t => t !== theme)
                  : [...prev, theme]
              );
            }}
          >
            <Tag.Label>{theme}</Tag.Label>
          </Tag.Root>
        ))}
      </SimpleGrid>
      <Button 
        colorPalette="blue"
        disabled={selectedThemes.length < 2}
        onClick={() => onStageComplete('theme_voting', { themes: selectedThemes })}
      >
        Confirm Themes
      </Button>
    </VStack>
  );

  const getStageProgress = (): number => {
    const stages: SetupStage[] = ['genre_selection', 'theme_voting', 'character_creation', 'setting_establishment'];
    return (stages.indexOf(currentStage) / stages.length) * 100;
  };

  return (
    <Box>
      <VStack gap={6}>
        <Heading>Game Setup</Heading>
        <Text>Let's build the foundation of your story together</Text>
        
        <Progress.Root value={getStageProgress()} width="100%">
          <Progress.Track>
            <Progress.Range />
          </Progress.Track>
        </Progress.Root>
        
        <Box width="100%">
          {currentStage === 'genre_selection' && renderGenreSelection()}
          {currentStage === 'theme_voting' && renderThemeVoting()}
          {currentStage === 'character_creation' && (
            <Text>Character Creation Stage - To be implemented</Text>
          )}
          {currentStage === 'setting_establishment' && (
            <Text>Setting Establishment Stage - To be implemented</Text>
          )}
        </Box>
      </VStack>
    </Box>
  );
}