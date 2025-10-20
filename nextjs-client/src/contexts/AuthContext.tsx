'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Client, Room } from 'colyseus.js';
import { WritingGameState } from '../schema/WritingGameState';

// Create the Colyseus client instance
const client = new Client('ws://localhost:2567');

interface User {
  id: string;
  email: string;
  name: string | null;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  client: Client;
  room: Room<WritingGameState> | null;
  setCurrentRoom: (room: Room<WritingGameState> | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [room, setRoom] = useState<Room<WritingGameState> | null>(null);

  const register = async (email: string, password: string, name: string) => {
    const response = await client.auth.registerWithEmailAndPassword(
      email, 
      password, 
      { name }
    );
    setUser(response.user);
  };

  const login = async (email: string, password: string) => {
    const response = await client.auth.signInWithEmailAndPassword(email, password);
    setUser(response.user);
  };

  const logout = async () => {
    // Leave room if joined
    if (room) {
      await room.leave();
      setRoom(null);
    }
    
    // Sign out from auth
    await client.auth.signOut();
    setUser(null);
  };

  const setCurrentRoom = (newRoom: Room<WritingGameState> | null) => {
    setRoom(newRoom);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      client,
      room,
      setCurrentRoom 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}