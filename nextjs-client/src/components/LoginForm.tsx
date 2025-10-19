'use client';

import { useState } from 'react';
import {
  Button,
  Field,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';

interface LoginFormProps {
  onSuccess: () => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

// In LoginForm.tsx handleSubmit
const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    try {
      const response = await fetch('http://localhost:2567/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        throw new Error('Login failed');
      }
  
      const data = await response.json();
      console.log('Login successful:', data);
      onSuccess();
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap={4}>
        {error && (
          <Text color="red.500">{error}</Text>
        )}
        
        <Field.Root>
          <Field.Label>Email</Field.Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </Field.Root>

        <Field.Root>
          <Field.Label>Password</Field.Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </Field.Root>

        <Button
          type="submit"
          colorPalette="blue"
          width="full"
          loading={loading}
        >
          Sign In
        </Button>
      </Stack>
    </form>
  );
}