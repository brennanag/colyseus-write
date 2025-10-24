Absolutely! Let me walk you through creating a "Back to Lobby" button that takes people back to the room browsing interface.

## Step-by-Step Implementation:

### 1. **Create the Button Component**

First, create a reusable button component or add it to your existing layout:

```typescript
// components/BackToLobbyButton.tsx
"use client";

import { useRouter } from "next/navigation";
import { useRoom } from "../contexts/RoomContext";

export function BackToLobbyButton() {
  const router = useRouter();
  const { room, leaveRoom } = useRoom(); // Assuming you have leaveRoom in context

  const handleBackToLobby = async () => {
    try {
      // Leave the current room if connected
      if (room) {
        await leaveRoom(); // Or room.leave() if you have direct access
      }
      
      // Navigate back to the main lobby
      router.push("/"); // Or "/lobby" depending on your routes
    } catch (error) {
      console.error("Failed to leave room:", error);
      // Still navigate to lobby even if room leave fails
      router.push("/");
    }
  };

  return (
    <button 
      onClick={handleBackToLobby}
      className="btn btn-secondary" // Use your CSS classes
    >
      ← Back to Lobby
    </button>
  );
}
```

### 2. **Update Your RoomContext (if needed)**

Make sure your `RoomContext` has a `leaveRoom` method:

```typescript
// contexts/RoomContext.tsx
export function RoomProvider({ children }) {
  const [room, setRoom] = useState<Room | null>(null);

  const leaveRoom = async () => {
    if (room) {
      await room.leave(); // Colyseus method to leave room
      setRoom(null); // Clear room from context
    }
  };

  return (
    <RoomContext.Provider value={{ room, setRoom, leaveRoom }}>
      {children}
    </RoomContext.Provider>
  );
}
```

### 3. **Add the Button to Your Game Layout**

Place the button in your game layout or specific game phases:

**Option A: In your game layout** (always visible):
```typescript
// app/game/room/layout.tsx
import { BackToLobbyButton } from "../../../components/BackToLobbyButton";

export default function RoomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="room-container">
      <header className="room-header">
        <BackToLobbyButton />
        <h1>Writing Game</h1>
      </header>
      {children}
    </div>
  );
}
```

**Option B: In specific phases** (like lobby phase):
```typescript
// components/game/phases/LobbyPhase.tsx
import { BackToLobbyButton } from "../../BackToLobbyButton";

export function LobbyPhase({ gameState, currentPlayer, onToggleReady, formatTime, roomId }) {
  return (
    <div className="lobby-phase">
      <div className="lobby-header">
        <BackToLobbyButton />
        <h2>Game Lobby</h2>
      </div>
      {/* Rest of your lobby content */}
    </div>
  );
}
```

### 4. **Route Structure Considerations**

Make sure your routing is set up properly:

- **`/`** or **`/lobby`** - Main lobby where users browse/create rooms
- **`/game/room/[id]`** - Individual game room (where the button takes you back from)

### 5. **Enhanced Version with Confirmation**

For a better UX, add a confirmation dialog:

```typescript
// components/BackToLobbyButton.tsx (enhanced)
"use client";

import { useRouter } from "next/navigation";
import { useRoom } from "../contexts/RoomContext";
import { useState } from "react";

export function BackToLobbyButton() {
  const router = useRouter();
  const { room, leaveRoom } = useRoom();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleBackToLobby = async () => {
    try {
      if (room) {
        await leaveRoom();
      }
      router.push("/");
    } catch (error) {
      console.error("Failed to leave room:", error);
      router.push("/");
    }
  };

  if (showConfirm) {
    return (
      <div className="confirmation-dialog">
        <p>Leave this game and return to lobby?</p>
        <button onClick={handleBackToLobby} className="btn btn-warning">
          Yes, Leave Game
        </button>
        <button onClick={() => setShowConfirm(false)} className="btn btn-secondary">
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button 
      onClick={() => setShowConfirm(true)}
      className="btn btn-secondary"
    >
      ← Back to Lobby
    </button>
  );
}
```

## Key Points:

1. **Use `useRouter()`** from Next.js for navigation
2. **Clean up room connection** properly with `room.leave()`
3. **Update RoomContext state** to reflect the disconnection
4. **Handle errors gracefully** - still navigate even if room leave fails
5. **Consider UX** with confirmation dialogs for intentional actions

Where would you like to place this button in your current UI? 🎮