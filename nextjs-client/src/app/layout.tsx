// Add this to your existing layout file to wrap all providers
"use client";

import { AuthProvider } from "../contexts/AuthContext";
import { RoomProvider } from "../contexts/RoomContext";
import { GameProvider } from "../contexts/GameContext";

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
