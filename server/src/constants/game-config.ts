export const GAME_CONFIG = {
  timers: {
    lobbyCountdown: 15000, // 15 seconds
    writingPhase: 15000, // 15 seconds
    submissionGrace: 30000, // 30 seconds
    betweenRoundsBuffer: 3000, // 3 seconds
  },
  requirements: {
    minPlayers: 2,
    maxPlayers: 8,
  },
  prompts: [
    "Write a story that begins with: 'The door creaked open, and I knew I shouldn't have come back...'",
    "Describe a world where colors have been forgotten, and someone suddenly sees red for the first time",
    "A character finds a key that unlocks any door, but each use has a consequence",
    "Write about a conversation between two people who are lying to each other, but the reader knows the truth",
    "A mysterious package arrives with no return address and instructions: 'Do not open until the full moon'",
  ],
  // ADD AUTO-SAVE CONFIGURATION
  autoSave: {
    intervalMs: 15000, // 15 seconds
  },
} as const;
