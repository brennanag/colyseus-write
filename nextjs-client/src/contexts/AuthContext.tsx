'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { auth } from '@colyseus/auth';

// Initialize auth client
auth.setEndpoint('http://localhost:2567');

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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = auth.user;
        if (currentUser) {
          setUser(currentUser);
        }
      } catch (error) {
        console.log('No existing auth session');
      }
    };
    
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await auth.signIn({ email, password });
    
    if (!response.user) {
      throw new Error('Login failed');
    }
    
    setUser(response.user);
  };

  const register = async (email: string, password: string, name: string) => {
    const response = await auth.signUp({ email, password, name });
    
    if (!response.user) {
      throw new Error('Registration failed');
    }
    
    setUser(response.user);
  };

  const logout = async () => {
    await auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
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