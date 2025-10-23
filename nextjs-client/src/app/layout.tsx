"use client";

import { AuthProvider } from "../contexts/AuthContext";
import { RoomProvider } from "../contexts/RoomContext";
import { GameProvider } from "../contexts/GameContext";
import "./globals.css"; // ← ADD THIS LINE

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <RoomProvider>
            <GameProvider>{children}</GameProvider>
          </RoomProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
