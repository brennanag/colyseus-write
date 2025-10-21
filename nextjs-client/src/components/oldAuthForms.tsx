'use client';

import { useState } from 'react';
import { Box, Tabs } from '@chakra-ui/react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function AuthForms() {
  const [activeTab, setActiveTab] = useState('login');

  const handleTabChange = (details: { value: string }) => {
    setActiveTab(details.value);
  };

  return (
    <Box maxW="md" mx="auto" mt={8} p={6} borderWidth={1} borderRadius="lg">
      <Tabs.Root value={activeTab} onValueChange={handleTabChange}>
        <Tabs.List>
          <Tabs.Trigger value="login">Login</Tabs.Trigger>
          <Tabs.Trigger value="register">Register</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="login">
          <LoginForm onSuccess={() => console.log('Login successful!')} />
        </Tabs.Content>
        <Tabs.Content value="register">
          <RegisterForm onSuccess={() => {
            console.log('Registration successful!');
            setActiveTab('login');
          }} />
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
}