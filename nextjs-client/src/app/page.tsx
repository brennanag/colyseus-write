// src/app/page.tsx
'use client';

import { useState } from 'react';
import { Client, Room } from 'colyseus.js';
import { WritingGameState } from '../schema/WritingGameState';

export default function Home() {
  const [client] = useState(() => new Client('ws://localhost:2567'));
  const [room, setRoom] = useState<Room<WritingGameState> | null>(null);
  const [players, setPlayers] = useState<any[]>([]);

  const joinRoom = async () => {
    try {
      // CRITICAL FIX: Pass WritingGameState as third argument
      const gameRoom = await client.joinOrCreate<WritingGameState>(
        'writing_room',
        {},
        WritingGameState  // <-- This is the only change needed
      );
      
      setRoom(gameRoom);
      console.log('✅ Successfully joined room:', gameRoom.id);
      
      gameRoom.onStateChange((state) => {
        if (state.players) {
          const playersArray = Array.from(state.players.values());
          setPlayers(playersArray);
        }
      });

      gameRoom.state.players.onAdd((player, sessionId) => {
        console.log('➕ Player added:', player.playerName, sessionId);
      });

      gameRoom.state.players.onRemove((player, sessionId) => {
        console.log('➖ Player removed:', player.playerName, sessionId);
      });

    } catch (error) {
      console.error('❌ Failed to join room:', error);
    }
  };

  const leaveRoom = async () => {
    if (room) {
      await room.leave();
      setRoom(null);
      setPlayers([]);
    }
  };

  return (
    <div>
      <h1>Writing Game</h1>
      
      {!room ? (
        <button onClick={joinRoom}>Join Game Room</button>
      ) : (
        <div>
          <p>Room ID: {room.roomId}</p>
          <p>Players: {players.length}</p>
          {players.map((player, idx) => (
            <div key={player.playerId || idx}>
              {player.playerName} - {player.email}
            </div>
          ))}
          <button onClick={leaveRoom}>Leave Room</button>
        </div>
      )}
    </div>
  );
}