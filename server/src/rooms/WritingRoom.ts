import { Room, Client } from "@colyseus/core";
import { WritingGameState, Player } from "./schema/WritingGameState";

export class WritingRoom extends Room<WritingGameState> {
  maxClients = 6; // Reasonable for a writing game
  
  // Pre-defined writing prompts
  private prompts = [
    "Once upon a time, in a world where dreams were real...",
    "The mysterious package arrived with no return address...", 
    "She discovered the old diary in the attic and...",
    "The last message from the Mars colony was...",
    "In a city where everyone has a superpower, except me..."
  ];

  onCreate(options: any) {
    this.setState(new WritingGameState());
    
    console.log("Writing room created!", this.roomId);

    // Phase management
    this.onMessage("player_ready", (client) => {
      this.handlePlayerReady(client);
    });

    this.onMessage("submit_writing", (client, data) => {
      this.handleWritingSubmission(client, data);
    });

    this.onMessage("submit_vote", (client, data) => {
      this.handleVoteSubmission(client, data);
    });

    // this.onMessage("next_phase", (client) => {
    //   this.handleNextPhase(client);
    // });
  }

  onJoin(client: Client, options: any) {
    console.log(client.sessionId, "joined writing room!");

    const player = new Player();
    player.id = client.sessionId;
    player.name = `Writer${this.clients.length}`;
    
    this.state.players.set(client.sessionId, player);
    
    // Update lobby status
    this.broadcast("player_joined", { 
      playerId: client.sessionId, 
      playerName: player.name 
    });
  }

onLeave(client: Client, consented: boolean) {
    this.state.players.delete(client.sessionId);
    
    // Pause game if we drop below minimum players
    if (this.state.phase !== "lobby" && this.state.players.size < 2) {
        this.state.phase = "paused";
        this.broadcast("game_paused", { reason: "not_enough_players" });
    }
}

  private handlePlayerReady(client: Client) {
    const player = this.state.players.get(client.sessionId);
    if (player) {
        player.isReady = true;
        
        // Check minimum players requirement
        if (this.allPlayersReady() && this.state.players.size >= 2) {
            this.startWritingPhase();
        } else if (this.state.players.size < 2) {
            // Not enough players - show waiting message
            this.broadcast("waiting_for_players", {
                current: this.state.players.size,
                needed: 2 - this.state.players.size
            });
        }
    }
}

  private allPlayersReady(): boolean {
    let allReady = true;
    this.state.players.forEach((player) => {
      if (!player.isReady) allReady = false;
    });
    return allReady && this.state.players.size >= 2; // Need at least 2 players
  }

  private startWritingPhase() {
    this.state.phase = "writing";
    this.state.round = 1;
    this.state.storyPrompt = this.prompts[Math.floor(Math.random() * this.prompts.length)];
    
    const writingDuration = 120000; // 2 minutes in milliseconds
    let timeRemaining = writingDuration / 1000; // Convert to seconds
    
    // Broadcast time updates every second
    const timeInterval = this.clock.setInterval(() => {
        timeRemaining--;
        this.broadcast("time_update", { 
            timeRemaining: timeRemaining,
            minutes: Math.floor(timeRemaining / 60),
            seconds: timeRemaining % 60
        });
        
        if (timeRemaining <= 0) {
            timeInterval.clear();
            if (this.state.phase === "writing") {
                this.startReviewPhase();
            }
        }
    }, 1000);
    
    this.broadcast("phase_changed", { 
        phase: "writing", 
        prompt: this.state.storyPrompt,
        duration: writingDuration 
    });
    
    console.log("Writing phase started with prompt:", this.state.storyPrompt);
}

  private handleWritingSubmission(client: Client, data: any) {
    if (this.state.phase !== "writing") return;
    
    const player = this.state.players.get(client.sessionId);
    if (player && data.text) {
      player.currentSubmission = data.text;
      console.log(`Player ${player.name} submitted writing`);
      
      // Check if all players have submitted
      if (this.allPlayersSubmitted()) {
        this.startReviewPhase();
      }
    }
  }

  private allPlayersSubmitted(): boolean {
    let allSubmitted = true;
    this.state.players.forEach((player) => {
      if (!player.currentSubmission) allSubmitted = false;
    });
    return allSubmitted;
  }

  private startReviewPhase() {
    this.state.phase = "review";
    this.broadcast("phase_changed", { phase: "review" });
    console.log("Review phase started");
    
    // Auto-advance to voting after 30 seconds
    this.clock.setTimeout(() => {
      if (this.state.phase === "review") {
        this.startVotingPhase();
      }
    }, 30000);
  }

  private startVotingPhase() {
    this.state.phase = "voting";
    this.broadcast("phase_changed", { phase: "voting" });
    console.log("Voting phase started");
  }

  private handleVoteSubmission(client: Client, data: any) {
    if (this.state.phase !== "voting") return;
    
    const player = this.state.players.get(client.sessionId);
    if (player && data.voteFor) {
      player.vote = data.voteFor;
      console.log(`Player ${player.name} voted for ${data.voteFor}`);
      
      if (this.allPlayersVoted()) {
        this.calculateResults();
      }
    }
  }

  private allPlayersVoted(): boolean {
    let allVoted = true;
    this.state.players.forEach((player) => {
      if (!player.vote) allVoted = false;
    });
    return allVoted;
  }

  private calculateResults() {
    // Count votes
    const voteCounts = new Map<string, number>();
    this.state.players.forEach((player) => {
      if (player.vote) {
        voteCounts.set(player.vote, (voteCounts.get(player.vote) || 0) + 1);
      }
    });
    
    // Find winner
    let winnerId = "";
    let maxVotes = 0;
    voteCounts.forEach((count, playerId) => {
      if (count > maxVotes) {
        maxVotes = count;
        winnerId = playerId;
      }
    });
    
    const winner = this.state.players.get(winnerId);
    if (winner) {
      // Add winner's submission to the story
      this.state.currentStory += winner.currentSubmission + " ";
      
      this.broadcast("round_results", {
        winner: winner.name,
        winningSubmission: winner.currentSubmission,
        currentStory: this.state.currentStory
      });
      
      console.log(`Round ${this.state.round} winner: ${winner.name}`);
    }
    
    this.state.phase = "results";
  }
}