'use client';
import { useState, useEffect } from 'react';
import { Box, VStack, Text } from '@chakra-ui/react';
import { Client, Room } from 'colyseus.js';
import { GameState } from '@/lib/types';
import { DebugBar } from '@/components/debug/DebugBar';
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
  const [room, setRoom] = useState<Room | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');

  // Connect to Colyseus server - NO MOCK DATA
// Replace the entire useEffect in GameClient.tsx:
useEffect(() => {
    const client = new Client('ws://localhost:2567');
    let currentRoom: Room | null = null;
    
    const connectToRoom = async () => {
      try {
        console.log('Connecting to server...');
        
        const room = await client.joinOrCreate('writing_room', {
          username: user.username,
          token: user.authToken
        });
        
        currentRoom = room;
        setRoom(room);
        setConnectionStatus('connected');
        console.log('Connected to room:', room.roomId);
  
        // REAL SERVER LISTENERS
        room.onStateChange((state) => {
          console.log('State changed:', state);
          setGameState(state as any);
        });
  
        room.onMessage('phase_changed', (data) => {
          console.log('Phase changed:', data);
        });
  
        room.onMessage('player_joined', (data) => {
          console.log('Player joined:', data);
        });
  
        room.onMessage('player_left', (data) => {
          console.log('Player left:', data);
        });
  
        room.onMessage('time_update', (data) => {
          console.log('Time update:', data);
        });
  
        room.onMessage('player_ready', (data) => {
            console.log('Player ready event received:', data);
            // Force a state refresh or update specific player
            if (gameState && gameState.players) {
              const player = gameState.players.get(data.playerId);
              if (player) {
                player.isReady = true;
                // Force React update
                setGameState({...gameState});
              }
            }
          });

        room.onLeave((code) => {
          console.log('Left room:', code);
          setConnectionStatus('disconnected');
        });
  
      } catch (error) {
        console.error('Connection failed:', error);
        setConnectionStatus('disconnected');
      }
    };
  
    connectToRoom();
  
    // PROPER CLEANUP - this runs before the next effect
    return () => {
      console.log('Cleaning up connection...');
      if (currentRoom) {
        currentRoom.leave();
        console.log('Left room:', currentRoom.roomId);
      }
    };
  }, [user]); // Only reconnect if user changes

  // REAL SERVER ACTIONS - NO MOCK ACTIONS
  const handleReady = () => {
    room?.send('player_ready');
  };

  const handleSetupStageComplete = (stage: string, data: any) => {
    room?.send('setup_stage_complete', { stage, data });
  };

  const handleSubmitWriting = (content: string) => {
    room?.send('submit_writing', { content });
  };

  const handleSaveEdit = (editedStory: string) => {
    room?.send('save_edit', { editedStory });
  };

  const handleSendMessage = (message: string) => {
    room?.send('chat_message', { message });
  };

  const renderCurrentPhase = () => {
    if (!gameState) {
      return <Text>Connecting to server...</Text>;
    }

    switch (gameState.phase) {
      case 'lobby':
        return <LobbyPhase 
          players={gameState.players} 
          onReady={handleReady}
        />;
      
      case 'game_setup':
        return (
          <GameSetupPhase 
            currentStage={gameState.setupStage}
            onStageComplete={handleSetupStageComplete}
            players={gameState.players}
          />
        );
      
      case 'writing':
        return (
          <WritingPhase 
            currentRound={gameState.currentWritingRound}
            totalRounds={gameState.totalWritingRounds}
            prompt={gameState.currentStory} // This should come from server
            timeRemaining={300} // This should come from server via time_update
            onSubmitWriting={handleSubmitWriting}
          />
        );
      
      case 'editing':
        return (
          <EditingPhase 
            currentStory={gameState.currentStory}
            contributions={gameState.contributions}
            onSaveEdit={handleSaveEdit}
          />
        );
      
      case 'reading':
        return (
          <ReadingPhase 
            finalStory={gameState.currentStory}
            chatMessages={gameState.chatMessages}
            players={gameState.players}
            onSendMessage={handleSendMessage}
          />
        );
      
      default:
        return <Text>Unknown phase: {gameState.phase}</Text>;
    }
  };

  return (
    <Box>
      {/* Debug Bar - Shows REAL server data only */}
      <DebugBar
        roomId={room?.roomId || null} // Change from room?.id
        playerCount={gameState?.players.size || 0}
        currentPhase={gameState?.phase || 'connecting'}
        connectionStatus={connectionStatus}
      />

      {/* Game Content - REAL server state only */}
      <Box maxWidth="6xl" margin="0 auto" p={6}>
        <VStack gap={6} align="stretch">
          {renderCurrentPhase()}
        </VStack>
      </Box>
    </Box>
  );
}