"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Client } from "colyseus.js";

// Create the Colyseus client instance
const client = new Client("ws://localhost:2567");

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
  isInitialized: boolean; // NEW: Track when auth is fully loaded
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false); // NEW: Track initialization

  // Load user from localStorage AFTER component mounts (client-side only)
  useEffect(() => {
    const saved = localStorage.getItem('colyseus-user');
    if (saved) {
      setUser(JSON.parse(saved));
    }
    setIsInitialized(true);
  }, []);

  const register = async (email: string, password: string, name: string) => {
    const response = await client.auth.registerWithEmailAndPassword(
      email,
      password,
      { name }
    );
    setUser(response.user);
    localStorage.setItem('colyseus-user', JSON.stringify(response.user));
  };

  const login = async (email: string, password: string) => {
    const response = await client.auth.signInWithEmailAndPassword(
      email,
      password
    );
    setUser(response.user);
    localStorage.setItem('colyseus-user', JSON.stringify(response.user));
  };

  const logout = async () => {
    await client.auth.signOut();
    setUser(null);
    localStorage.removeItem('colyseus-user');
    localStorage.removeItem('colyseus-last-room');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        client,
        isInitialized, // NEW
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}