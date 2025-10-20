"use client";

import { AuthProvider } from "../contexts/AuthContext";
import { ChakraProvider } from "@chakra-ui/react";
import { system } from "@/lib/theme";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={system}>
      <AuthProvider>{children}</AuthProvider>
    </ChakraProvider>
  );
}
