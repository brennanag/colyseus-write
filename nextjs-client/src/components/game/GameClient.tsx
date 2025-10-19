'use client';
import { useState, useEffect } from 'react';
import { Box, VStack, Text } from '@chakra-ui/react';
import { GameState } from '@/lib/types';
import { LobbyPhase } from './phases/LobbyPhase';
import { GameSetupPhase } from './phases/GameSetupPhase';
import { WritingPhase } from './phases/WritingPhase';
import { EditingPhase } from './phases/EditingPhase';
import { ReadingPhase } from './phases/ReadingPhase';

interface GameClientProps {
  user: {
    username: string;
    userId: string;
    authToken: string;
  };
}

export function GameClient({ user }: GameClientProps) {
  const [gameState, setGameState] = useState<GameState | null>(null);

  // Mock data for development - we'll replace this with real server connection later
  useEffect(() => {
    const mockGameState: GameState = {
      phase: 'lobby',
      setupStage: 'genre_selection',
      currentWritingRound: 1,
      totalWritingRounds: 3,
      players: [
        { id: user.userId, name: user.username, isReady: false, isHost: true },
        { id: '2', name: 'Other Player', isReady: true, isHost: false }
      ],
      contributions: [],
      currentStory: '',
      chatMessages: []
    };
    setGameState(mockGameState);
  }, [user]);

  const renderCurrentPhase = () => {
    if (!gameState) return <Text>Loading game...</Text>;

    switch (gameState.phase) {
      case 'lobby':
        return <LobbyPhase 
          players={gameState.players} 
          onReady={() => console.log('Ready clicked')}
        />;
      
      case 'game_setup':
        return (
          <GameSetupPhase 
            currentStage={gameState.setupStage}
            onStageComplete={(stage, data) => {
              console.log('Stage completed:', stage, data);
            }}
            players={gameState.players}
          />
        );
      
      case 'writing':
        return (
          <WritingPhase 
            currentRound={gameState.currentWritingRound}
            totalRounds={gameState.totalWritingRounds}
            prompt="Write about a mysterious door that appears in your character's home"
            timeRemaining={300}
            onSubmitWriting={(content) => {
              console.log('Writing submitted:', content);
            }}
          />
        );
      
      case 'editing':
        return (
          <EditingPhase 
            currentStory={gameState.currentStory}
            contributions={gameState.contributions}
            onSaveEdit={(editedStory) => {
              console.log('Edits saved:', editedStory);
            }}
          />
        );
      
      case 'reading':
        return (
          <ReadingPhase 
            finalStory={gameState.currentStory}
            chatMessages={gameState.chatMessages}
            players={gameState.players}
            onSendMessage={(message) => {
              console.log('Message sent:', message);
            }}
          />
        );
      
      default:
        return <Text>Unknown phase: {gameState.phase}</Text>;
    }
  };

  return (
    <Box maxWidth="6xl" margin="0 auto">
      <VStack gap={6} align="stretch">
        {renderCurrentPhase()}
      </VStack>
    </Box>
  );
}