I have no more questions - you've given me everything needed to create a comprehensive refactoring plan.

## 🏗️ **Complete System Redesign Plan**

### **NEW ARCHITECTURE OVERVIEW**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   AuthContext   │    │   RoomContext   │    │   GameContext   │
│                 │    │                 │    │                 │
│ - user state    │◄──►│ - room state    │◄──►│ - game state    │
│ - auth methods  │    │ - room methods  │    │ - game methods  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                         Component Tree                          │
├─────────────────┐ ┌─────────────────┐ ┌───────────────────────┐ │
│   AuthForms     │ │   LobbySystem   │ │      GameSystem       │ │
│                 │ │                 │ │                       │ │
│ - Login         │ │ - LobbyEntry    │ │ - GameView            │ │
│ - Register      │ │ - LobbyBrowser  │ │ - PlayerList          │ │
│                 │ │ - RoomCreator   │ │ - PhaseComponents     │ │
└─────────────────┘ └─────────────────┘ └───────────────────────┘ │
┌─────────────────────────────────────────────────────────────────┘
│                           page.tsx                              │
│                     (Orchestration Layer)                       │
└─────────────────────────────────────────────────────────────────┘
```

### **📁 NEW FILE STRUCTURE**

```
/src
  /contexts
    AuthContext.tsx           # Only authentication
    RoomContext.tsx           # Only room management
    GameContext.tsx           # Only game state
  /components
    /auth
      AuthForms.tsx           # Existing, unchanged
    /lobby
      LobbyEntry.tsx          # "Enter Lobby" button
      LobbyBrowser.tsx        # Room list + create room
      RoomCreator.tsx         # Room creation modal/form
    /game
      GameView.tsx            # Main game container
      PlayerList.tsx          # Players display
      /phases
        LobbyPhase.tsx        # Game lobby (ready up)
        WritingPhase.tsx      # Writing interface
        ReadingPhase.tsx      # Story reading
  /app
    page.tsx                  # Clean orchestration
```

### **🔄 DATA FLOW REDESIGN**

**Current Flow:**

```
User → AuthContext (auth+rooms) → page.tsx (everything) → Mixed UI
```

**New Flow:**

```
User → AuthContext (auth only)
     → RoomContext (room selection)
     → GameContext (game state)
     → Specialized Components
```

### **🔧 SPECIFIC REFACTORING TASKS**

#### **Phase 1: Create New Contexts**

1. **`RoomContext.tsx`** - Room management only
2. **`GameContext.tsx`** - Game state management only
3. **Update `AuthContext.tsx`** - Remove room logic

#### **Phase 2: Create Component System**

1. **`LobbyEntry.tsx`** - Simple "Enter Lobby" component
2. **`LobbyBrowser.tsx`** - Room list + creation interface
3. **`GameView.tsx`** - Main game container
4. **`PlayerList.tsx`** - Reusable player display

#### **Phase 3: Clean Up page.tsx**

1. Extract all state management to contexts
2. Replace complex logic with clean component rendering
3. Add proper TypeScript types throughout

#### **Phase 4: Update Phase Components**

1. Modify to use `GameContext` instead of props
2. Ensure clean separation of concerns

### **🎯 KEY BENEFITS**

1. **Single Responsibility** - Each file does one thing well
2. **Testable** - Easy to mock and test individual pieces
3. **Maintainable** - Changes are isolated and predictable
4. **Scalable** - Easy to add new room types or game modes
5. **Developer Friendly** - Clear boundaries and responsibilities

### **🚀 IMPLEMENTATION ORDER**

1. Start with contexts (foundation)
2. Build lobby components (user flow)
3. Build game components (core experience)
4. Clean up page.tsx (orchestration)
5. Test and refine

**Ready to begin implementation?** I'll provide the complete code for each file with clear comments explaining the architecture.
