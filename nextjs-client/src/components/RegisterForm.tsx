// src/components/RegisterForm.tsx
'use client';

import { useState } from 'react';
import {
  Button,
  Field,
  Input,
  Stack,
  Text,
  Alert,
} from '@chakra-ui/react';

interface RegisterFormProps {
  onSuccess: () => void;
}

export default function RegisterForm({ onSuccess }: RegisterFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Registering:', { email, password, name });
      onSuccess();
    } catch (err) {
      setError('Registration failed. Please try again.');
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