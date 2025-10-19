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

// 🟢 ADD THIS TYPE - This matches your server's state structure
interface ColyseusGameState {
  phase: string;
  players: Map<string, any>;
  [key: string]: any;
}

export function GameClient({ user }: GameClientProps) {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [room, setRoom] = useState<Room<ColyseusGameState> | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');

  useEffect(() => {
    const client = new Client('ws://localhost:2567');
    let currentRoom: Room<ColyseusGameState> | null = null;
    
    const connectToRoom = async () => {
      try {
        console.log('Connecting to server...');
        
        const room = await client.joinOrCreate<ColyseusGameState>('writing_room', {
          username: user.username,
          token: user.authToken
        });
        
        currentRoom = room;
        setRoom(room);
        setConnectionStatus('connected');
        console.log('Connected to room:', room.roomId);

        // 🟢 KEEP YOUR EXISTING MESSAGE LISTENERS
        room.onMessage('phase_changed', (data: any) => {
          console.log('Phase changed:', data);
        });

        room.onMessage('player_joined', (data: any) => {
          console.log('Player joined:', data);
        });

        room.onMessage('player_left', (data: any) => {
          console.log('Player left:', data);
        });

        room.onMessage('time_update', (data: any) => {
          console.log('Time update:', data);
        });

        // 🎯 SIMPLE SOLUTION: Use onStateChange with proper typing
        room.onStateChange((state: ColyseusGameState) => {
          console.log('State changed, converting to JSON...');
          // Convert to plain JavaScript object for React
          const plainState = {
            ...state,
            players: Object.fromEntries(state.players.entries())
          };
          setGameState(plainState as any);
        });

        // Set initial state
        const initialState = {
          ...room.state,
          players: Object.fromEntries(room.state.players.entries())
        };
        setGameState(initialState as any);

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

    return () => {
      console.log('Cleaning up connection...');
      if (currentRoom) {
        currentRoom.leave();
      }
    };
  }, [user]);

  // REAL SERVER ACTIONS
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
            prompt={gameState.currentStory}
            timeRemaining={300}
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
      <DebugBar
        roomId={room?.roomId || null}
        playerCount={gameState?.players ? Object.keys(gameState.players).length : 0}
        currentPhase={gameState?.phase || 'connecting'}
        connectionStatus={connectionStatus}
      />

      <Box maxWidth="6xl" margin="0 auto" p={6}>
        <VStack gap={6} align="stretch">
          {renderCurrentPhase()}
        </VStack>
      </Box>
    </Box>
  );
}