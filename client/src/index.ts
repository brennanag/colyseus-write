import { Client } from "colyseus.js";

const client = new Client("ws://localhost:2567");
let room: any = null;

// Phase display management
function showPhase(phaseName: string) {
    // Hide all phases
    document.querySelectorAll('.phase').forEach(phase => {
        phase.classList.remove('active');
    });
    
    // Show the active phase
    const activePhase = document.getElementById(phaseName + 'Phase');
    if (activePhase) {
        activePhase.classList.add('active');
    }
}

// Connection and basic setup
async function connectToGame() {
    try {
        document.getElementById('status')!.textContent = "Connecting...";
        
        room = await client.joinOrCreate("writing_room");
        document.getElementById('status')!.textContent = `Connected to room: ${room.id}`;
        
        // Set up room listeners
        setupRoomListeners();
        
        // Start in lobby phase
        showPhase('lobby');
        updatePlayerList();
        
    } catch (error) {
        document.getElementById('status')!.textContent = "Connection failed";
        console.error("Connection failed:", error);
    }
}

function setupRoomListeners() {
    // Phase changes
    room.onMessage("phase_changed", (data: any) => {
        console.log("Phase changed to:", data.phase);
        showPhase(data.phase);
        
        if (data.phase === "writing" && data.prompt) {
            document.getElementById('prompt')!.textContent = data.prompt;
        }
    });
    
    // Player management
    room.onMessage("player_joined", (data: any) => {
        console.log("Player joined:", data.playerName);
        updatePlayerList();
    });
    
    // Time updates
room.onMessage("time_update", (data: any) => {
    const timerElement = document.getElementById('timer');
    if (timerElement) {
        // Format as MM:SS
        const formattedTime = `${data.minutes}:${data.seconds < 10 ? '0' : ''}${data.seconds}`;
        timerElement.textContent = `Time remaining: ${formattedTime}`;
        
        // Optional: Add visual warning when time is low
        if (data.timeRemaining < 30) {
            timerElement.style.color = 'red';
            timerElement.style.fontWeight = 'bold';
        }
    }
});

    // State changes
    room.onStateChange((state: any) => {
        console.log("State updated:", state);
        updatePlayerList();
    });
}

function updatePlayerList() {
    const playerList = document.getElementById('playerList')!;
    playerList.innerHTML = '';
    
    if (room && room.state.players) {
        room.state.players.forEach((player: any, playerId: string) => {
            const playerDiv = document.createElement('div');
            playerDiv.className = `player ${player.isReady ? 'ready' : ''}`;
            playerDiv.textContent = `${player.name} ${player.isReady ? '✓ Ready' : '...'}`;
            playerList.appendChild(playerDiv);
        });
    }
}

// Button handlers
document.getElementById('readyBtn')!.addEventListener('click', () => {
    room.send("player_ready");
    document.getElementById('readyBtn')!.textContent = "Waiting for others...";
    document.getElementById('readyBtn')!.disabled = true;
});

// Start the connection when page loads
connectToGame();