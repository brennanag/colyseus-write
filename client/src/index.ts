import { Client } from "colyseus.js";

const client = new Client("ws://localhost:2567");
let room: any = null;
let currentUser: { username: string, userId: string } | null = null;

// Auth state management
function showAuthSection() {
    document.getElementById('authSection')!.classList.remove('hidden');
    document.getElementById('gameSection')!.classList.add('hidden');
}

function showGameSection() {
    document.getElementById('authSection')!.classList.add('hidden');
    document.getElementById('gameSection')!.classList.remove('hidden');
}

function updateUserInfo(user: { username: string, userId: string }) {
    currentUser = user;
    document.getElementById('userName')!.textContent = user.username;
}

// Sign in function
async function signIn() {
    const playerNameInput = document.getElementById('playerName') as HTMLInputElement;
    const tokenInput = document.getElementById('authToken') as HTMLInputElement;
    const authStatus = document.getElementById('authStatus')!;
    
    const playerName = playerNameInput.value.trim();
    const authToken = tokenInput.value.trim();
    
    if (!playerName) {
        authStatus.textContent = "Please enter your name";
        authStatus.style.color = "red";
        return;
    }
    
    if (!authToken) {
        authStatus.textContent = "Please enter an auth token";
        authStatus.style.color = "red";
        return;
    }
    
    try {
        authStatus.textContent = "Signing in...";
        authStatus.style.color = "blue";
        
        // Store user info locally
        const userInfo = {
            username: playerName,
            userId: "user_" + Date.now() // In real app, this would come from server
        };
        
        // Store for auto-login
        localStorage.setItem('gameAuthToken', authToken);
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        
        // Connect to game with auth
        await connectToGame(authToken, userInfo);
        
        // Update UI for authenticated state
        updateUserInfo(userInfo);
        showGameSection();
        authStatus.textContent = "";
        
    } catch (error: any) {
        authStatus.textContent = "Sign in failed: " + error.message;
        authStatus.style.color = "red";
        
        // Clear invalid stored data
        localStorage.removeItem('gameAuthToken');
        localStorage.removeItem('userInfo');
    }
}

// Sign out function
function signOut() {
    if (room) {
        room.leave();
        room = null;
    }
    currentUser = null;
    
    // Clear stored tokens
    localStorage.removeItem('gameAuthToken');
    localStorage.removeItem('userInfo');
    
    // Show auth section
    showAuthSection();
}

// Updated connectToGame function
async function connectToGame(authToken: string, userInfo: any) {
    try {
        document.getElementById('status')!.textContent = "Connecting...";
        
        room = await client.joinOrCreate("writing_room", {
            token: authToken,
            username: userInfo.username  // Send username to server too
        });
        
        document.getElementById('status')!.textContent = `Connected to room: ${room.id}`;
        
        // Set up room listeners
        setupRoomListeners();
        
        // Start in lobby phase
        showPhase('lobby');
        updatePlayerList();
        
    } catch (error: any) {
        document.getElementById('status')!.textContent = "Connection failed";
        console.error("Connection failed:", error);
        throw error; // Re-throw so signIn can handle it
    }
}

// Check for existing session on page load
function checkExistingSession() {
    const storedToken = localStorage.getItem('gameAuthToken');
    const storedUser = localStorage.getItem('userInfo');
    
    if (storedToken && storedUser) {
        // Auto-signin with stored credentials
        const userInfo = JSON.parse(storedUser);
        updateUserInfo(userInfo);
        connectToGame(storedToken, userInfo)
            .then(() => showGameSection())
            .catch(() => {
                // Fallback to auth if auto-signin fails
                showAuthSection();
                localStorage.removeItem('gameAuthToken');
                localStorage.removeItem('userInfo');
            });
    } else {
        showAuthSection();
    }
}

// Phase display management (YOUR EXISTING FUNCTION - PRESERVED)
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

// Event listeners
document.getElementById('signInBtn')!.addEventListener('click', signIn);
document.getElementById('signOutBtn')!.addEventListener('click', signOut);

// Button handlers (YOUR EXISTING HANDLERS - PRESERVED)
document.getElementById('readyBtn')!.addEventListener('click', () => {
    if (room) {
        room.send("player_ready");
        document.getElementById('readyBtn')!.textContent = "Waiting for others...";
        document.getElementById('readyBtn')!.disabled = true;
    }
});

// Start the app with session check instead of auto-connect
checkExistingSession();