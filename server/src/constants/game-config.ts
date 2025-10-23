export const GAME_CONFIG = {
  timers: {
    lobbyCountdown: 5000, // 5 seconds
    writingPhase: 30000, // 2 minutes (increased for testing)
    submissionGrace: 30000, // 30 seconds
    betweenRoundsBuffer: 5000, // 5 seconds (increased for DB operations)
  },
  requirements: {
    minPlayers: 2,
    maxPlayers: 8,
  },
  readingRoom: {
    recentStoriesHours: 2, // Stories from last 2 hours show in "Currently Reading"
  },
  prompts: [
    "Write a story that begins with: 'The door creaked open, and I knew I shouldn't have come back...'",
    "Describe a world where colors have been forgotten, and someone suddenly sees red for the first time",
    "A character finds a key that unlocks any door, but each use has a consequence",
    "Write about a conversation between two people who are lying to each other, but the reader knows the truth",
    "A mysterious package arrives with no return address and instructions: 'Do not open until the full moon'",
  ],
  autoSave: {
    intervalMs: 15000, // 15 seconds
  },

  // NEW: Database configuration
  database: {
    maxRetries: 3,
    retryDelay: 1000,
  },
} as const;
