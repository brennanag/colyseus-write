AH! Now I understand completely! Thank you for the clarification.

## 🎯 PARALLEL SEQUENTIAL STORIES MODE - COMPLETE PLAN

### 🔄 Game Flow (Multiple Stories Circulating)

```
LOBBY → WRITING (Each player starts a story) → PASS → WRITING (Each continues someone else's) → PASS → ... → READING
```

### 📊 How It Works

- **Number of Stories = Number of Players**
- **Each player starts one story** in Round 1
- **Stories rotate** to next player each round
- **Every player writes on every story** over the game
- **Final result**: N complete collaborative stories, each touched by every player

### ⚙️ Core Configuration

- **ROUNDS_PER_GAME**: Must equal NUMBER_OF_PLAYERS
- **Each story makes one complete circuit** around all players

### 📝 Writing Phase Details

**Round 1 (Story Start):**

- Each player: Gets a prompt, starts a new story
- Result: N beginning stories

**Round 2 (Story Continuation):**

- Each player: Gets someone else's story from Round 1, continues it
- Stories rotate systematically
- Result: N stories, each with 2 segments

**Round 3, 4, etc:**

- Continue rotating stories
- Each player always gets a different story to continue

**Final Round:**

- Each player adds the concluding segment to one story
- Every story has been touched by every player

### 📖 Reading Phase Changes

**What's Displayed:**

- **All N complete stories** side by side
- **Each story shows all contributors** in order
- **Visual timeline** of how each story evolved

**Example Reading View:**

```
STORY 1: "The Mysterious Key"
• Beginning: Player A
• Continued: Player C
• Middle: Player B
• Conclusion: Player D

[Full story text with attribution markers]

STORY 2: "The Forgotten Castle"
• Beginning: Player B
• Continued: Player D
• Middle: Player A
• Conclusion: Player C

[Full story text with attribution markers]
```

### 🔄 Story Rotation System

**For 4 Players:**

```
Round 1: A→A, B→B, C→C, D→D  (Everyone starts own story)
Round 2: A→B, B→C, C→D, D→A  (Stories rotate +1)
Round 3: A→C, B→D, C→A, D→B  (Stories rotate +2)
Round 4: A→D, B→A, C→B, D→C  (Stories rotate +3)
```

### 🎮 Player Experience

**Each Writing Turn:**

- See: One incomplete story (started by someone else)
- Task: Continue this specific story naturally
- Context: See full story history so far
- Goal: Make coherent addition that respects previous contributions

### 🔧 Technical Considerations

**Schema Needs:**

- `stories: Map<storyId, StoryObject>`
- `StoryObject: { segments: Array<{playerId, text, roundNumber}> }`
- `currentRound: number`
- `storyAssignments: Map<playerId, storyId>` (who writes what this round)

**Future Rich Text:**

- **Color coding per player** in final stories
- **Segment boundaries** clearly marked
- **Contributor timeline** for each story

This creates a truly collaborative experience where everyone contributes to every story, and you get multiple complete narratives from one game session!

Does this now match your vision?
