'use client';

import { useState } from 'react';
import {
  Button,
  Field,
  Input,
  Stack,
  Alert,
} from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext';

interface RegisterFormProps {
  onSuccess: () => void;
}

export default function RegisterForm({ onSuccess }: RegisterFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();

 // In RegisterForm.tsx - add basic email validation
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    setError('Please enter a valid email address');
    setLoading(false);
    return;
  }

  try {
    await register(email, password, name);
    onSuccess();
  } catch (err: any) {
    // Handle specific auth errors
    if (err.message?.includes('email_already_in_use')) {
      setError('This email is already registered. Please login instead.');
    } else if (err.message?.includes('email_malformed')) {
      setError('Please enter a valid email address');
    } else {
      setError('Registration failed. Please try again.');
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap={4}>
        {error && (
          <Alert.Root status="error">
            <Alert.Indicator />
            <Alert.Title>{error}</Alert.Title>
          </Alert.Root>
        )}
        
        <Field.Root>
          <Field.Label>Name</Field.Label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </Field.Root>

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
            placeholder="Create a password"
          />
        </Field.Root>

        <Button
          type="submit"
          colorPalette="blue"
          width="full"
          loading={loading}
        >
          Sign Up
        </Button>
      </Stack>
    </form>
  );
}