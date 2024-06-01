// Define game variables
let grid = [];
let score = 0;
let gameOver = false;

// Initialize game grid
function initializeGrid() {
    grid = Array.from({ length: 4 }, () => Array(4).fill(0));
    addNewNumber();
    addNewNumber();
    // addNewNumber();
    updateGrid();
}

// Add a new number (2 or 4) to a random empty cell
function addNewNumber() {
    let emptyCells = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (grid[i][j] === 0) {
                emptyCells.push({ x: i, y: j });
            }
        }
    }
    if (emptyCells.length > 0) {
        const { x, y } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        grid[x][y] = Math.random() < 0.9 ? 2 : 4;
    }
}

// Update the game grid
function updateGrid() {
    const gameGrid = document.getElementById('game-grid');
    gameGrid.innerHTML = '';
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.textContent = grid[i][j] === 0 ? '' : grid[i][j];
            cell.style.backgroundColor = getCellColor(grid[i][j]);
            gameGrid.appendChild(cell);
        }
    }
}

// Get cell color based on the number value
function getCellColor(value) {
    switch (value) {
        case 2: return '#EEE4DA';
        case 4: return '#EDE0C8';
        case 8: return '#F2B179';
        case 16: return '#F59563';
        case 32: return '#F67C5F';
        case 64: return '#F65E3B';
        case 128: return '#EDCF72';
        case 256: return '#EDCC61';
        case 512: return '#EDC850';
        case 1024: return '#EDC53F';
        case 2048: return '#EDC22E';
        default: return '#CDC1B4';
    }
}

// Check if there are any available moves left
function checkGameOver() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (grid[i][j] === 0) {
                return false;
            }
            if (i < 3 && grid[i][j] === grid[i + 1][j]) {
                return false;
            }
            if (j < 3 && grid[i][j] === grid[i][j + 1]) {
                return false;
            }
        }
    }
    return true;
}

// Game over function
function endGame() {
    gameOver = true;
    const overlay = document.getElementById('overlay');
    const overlayText = document.getElementById('overlay-text');
    overlayText.textContent = 'Game Over';
    const scoreteller=document.createElement('p');
    scoreteller.innerText=`Score: ${score}`;
    scoreteller.style.color="white";
    overlay.appendChild(scoreteller);
    overlay.style.display = 'flex';
}

// Event listener for retry button
document.getElementById('retry-button').addEventListener('click', () => {
    resetGame();
});

// Reset the game
function resetGame() {
    grid = [];
    score = 0;
    gameOver = false;
    initializeGrid();
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
}

// Initialize the game
resetGame();

// Event listener for arrow key presses
document.addEventListener('keydown', (event) => {
    if (!gameOver) {
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            moveTiles(event.key);
        }
    }
});

// Move tiles based on the arrow key pressed
function moveTiles(direction) {
    let moved = false;
    switch (direction) {
        case 'ArrowUp':
            for (let j = 0; j < 4; j++) {
                for (let i = 1; i < 4; i++) {
                    if (grid[i][j] !== 0) {
                        for (let k = i; k > 0; k--) {
                            if (grid[k - 1][j] === 0) {
                                grid[k - 1][j] = grid[k][j];
                                grid[k][j] = 0;
                                moved = true;
                            } else if (grid[k - 1][j] === grid[k][j]) {
                                grid[k - 1][j] *= 2;
                                score += grid[k - 1][j];
                                grid[k][j] = 0;
                                moved = true;
                                break;
                            } else {
                                break;
                            }
                        }
                    }
                }
            }
            break;
        case 'ArrowDown':
            for (let j = 0; j < 4; j++) {
                for (let i = 2; i >= 0; i--) {
                    if (grid[i][j] !== 0) {
                        for (let k = i; k < 3; k++) {
                            if (grid[k + 1][j] === 0) {
                                grid[k + 1][j] = grid[k][j];
                                grid[k][j] = 0;
                                moved = true;
                            } else if (grid[k + 1][j] === grid[k][j]) {
                                grid[k + 1][j] *= 2;
                                score += grid[k + 1][j];
                                grid[k][j] = 0;
                                moved = true;
                                break;
                            } else {
                                break;
                            }
                        }
                    }
                }
            }
            break;
        case 'ArrowLeft':
            for (let i = 0; i < 4; i++) {
                for (let j = 1; j < 4; j++) {
                    if (grid[i][j] !== 0) {
                        for (let k = j; k > 0; k--) {
                            if (grid[i][k - 1] === 0) {
                                grid[i][k - 1] = grid[i][k];
                                grid[i][k] = 0;
                                moved = true;
                            } else if (grid[i][k - 1] === grid[i][k]) {
                                grid[i][k - 1] *= 2;
                                score += grid[i][k - 1];
                                grid[i][k] = 0;
                                moved = true;
                                break;
                            } else {
                                break;
                            }
                        }
                    }
                }
            }
            break;
        case 'ArrowRight':
            for (let i = 0; i < 4; i++) {
                for (let j = 2; j >= 0; j--) {
                    if (grid[i][j] !== 0) {
                        for (let k = j; k < 3; k++) {
                            if (grid[i][k + 1] === 0) {
                                grid[i][k + 1] = grid[i][k];
                                grid[i][k] = 0;
                                moved = true;
                            } else if (grid[i][k + 1] === grid[i][k]) {
                                grid[i][k + 1] *= 2;
                                score += grid[i][k + 1];
                                grid[i][k] = 0;
                                moved = true;
                                break;
                            } else {
                                break;
                            }
                        }
                    }
                }
            }
            break;
    }

    if (moved) {
        addNewNumber();
        updateGrid();
        if (checkGameOver()) {
            endGame();
        }
    }
}
