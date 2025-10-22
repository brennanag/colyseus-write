Got it! Here's the exact function flow:

## 🔍 **DETAILED FUNCTION FLOW**

### **1. USER CLICKS "JOIN WRITING ROOM"**

**File:** `page.tsx/joinRoom()`
→ Calls `client.joinOrCreate("writing_room", {})`
→ Calls `setCurrentRoom(gameRoom)`
→ Sets up event listeners: `onStateChange`, `onMessage`

### **2. CLIENT JOINS COLYSEUS ROOM**

**File:** `WritingRoom.ts/onJoin()`
→ Creates `new Player()` object
→ Sets player properties: `playerId`, `playerName`, `email`, etc.
→ Adds player to game state: `this.state.players.set(client.sessionId, player)`
→ Calls `this.checkLobbyStart()`

### **3. PLAYER CLICKS "LET'S WRITE!"**

**File:** `LobbyPhase.tsx/onToggleReady` prop
→ Calls `page.tsx/toggleReady()`
→ Calls `room.send("toggleReady", {})`

**File:** `WritingRoom.ts/onMessage("toggleReady")`
→ Calls `this.handlePlayerReady(client)`
→ Toggles `player.isReady = !player.isReady`
→ Updates `this.state.readyStates.set(client.sessionId, player.isReady)`
→ Calls `this.checkLobbyStart()`

### **4. SERVER STARTS COUNTDOWN**

**File:** `WritingRoom.ts/checkLobbyStart()`
→ Checks if all players ready: `readyPlayers === totalPlayers`
→ Calls `this.startLobbyCountdown()`

**File:** `WritingRoom.ts/startLobbyCountdown()**
→ Sets timer: `this.state.timerEndsAt = Date.now() + 5000ms`→ Starts timeout:`setTimeout(() => this.startWritingPhase(), 5000)`→ Calls`this.startTimerUpdates()` for countdown display

### **5. TRANSITION TO WRITING PHASE**

**File:** `WritingRoom.ts/startWritingPhase()`
→ Clears previous timeout
→ Sets phase: `this.state.phase = "writing"`
→ If first round: calls `this.initializeStories()`
→ If later round: calls `this.rotateStoryAssignments()`
→ Sets writing timer: `setTimeout(() => this.handleRoundCompletion(), 25000)`

### **6. STORY ASSIGNMENT**

**File:** `WritingRoom.ts/initializeStories()`
→ Creates `new Story()` for each player
→ Sets `story.originalPrompt = this.getRandomPrompt()`
→ Assigns stories: `this.state.currentAssignments.set(playerId, storyId)`

**File:** `WritingRoom.ts/rotateStoryAssignments()`
→ Rotates stories: `(playerIndex + currentRound) % storiesArray.length`
→ Updates assignments: `this.state.currentAssignments.set(playerId, storyId)`

### **7. PLAYER WRITES & SUBMITS**

**File:** `WritingPhase.tsx/onSubmitWriting()`
→ Calls `page.tsx/submitWriting()`
→ Calls `room.send("submitWriting", { content: writingText })`

**File:** `WritingRoom.ts/onMessage("submitWriting")`
→ Calls `this.handleWritingSubmission(client, content)`
→ Finds player's assigned story
→ Adds segment: `story.segments.set(playerId, text)`
→ Updates content: `story.accumulatedContent += text`
→ Sets `player.hasSubmitted = true`
→ Checks if all submitted → calls `this.handleRoundCompletion()`

### **8. ROUND COMPLETION**

**File:** `WritingRoom.ts/handleRoundCompletion()`
→ Increments: `this.state.currentRound++`
→ If more rounds: calls `setTimeout(() => this.startWritingPhase(), 3000)`
→ If final round: calls `this.startReadingPhase()`

### **9. READING PHASE & LOBBY RETURN**

**File:** `WritingRoom.ts/startReadingPhase()`
→ Sets phase: `this.state.phase = "reading"`
→ Resets player states: `player.isReady = false`

**File:** `ReadingPhase.tsx/onBackToLobby()`
→ Calls `page.tsx/backToLobby()`
→ Calls `room.send("backToLobby", {})`

**File:** `WritingRoom.ts/onMessage("backToLobby")`
→ Calls `this.handleBackToLobby()`
→ Clears all game state
→ Sets phase: `this.state.phase = "lobby"`
→ Resets everything for new game

This is the exact function-by-function call chain!
