import { Player } from "./modules/player.js";
import { Board } from "./modules/board.js";
import { Game } from "./modules/game-controller.js";
import { Opponent } from "./modules/opponent.js";
import "./modules/sound.js";
import "./modules/radar.js";
import "./modules/tabs.js";
import "./modules/fullscreen.js";
import "./modules/guide.js";
import {
    displayGameResults,
    saveGameResult,
} from "./modules/result-storage.js";

// Html elements
const playerBoard = document.querySelector("#player-board");
const opponentBoard = document.querySelector("#opponent-board");
const orientationLabel = document.querySelector(".orientation-label");
const resetButton = document.querySelector(".reset");
const playerLog = document.querySelector("#player-log");
const oppLog = document.querySelector("#opp-log");
const usernameField = document.querySelector("#username-field");
const cleatStorageButton = document.querySelector("#clear-storage");
const cssStyleLink = document.querySelector("#css-style-link");

// Variables, boards, player
let game = new Game();
let player = new Player();
let player_board = new Board();
let opponent_board = new Board();
let opponent = new Opponent(opponentBoard);

// Place ships on opponents board
function placeOpponentsShips() {
    opponent_board.placeShip(5, 0, 0, false);
    opponent_board.placeShip(4, 0, 1, false);
    opponent_board.placeShip(3, 0, 2, false);
    opponent_board.placeShip(3, 0, 3, false);
    opponent_board.placeShip(2, 0, 4, false);
}
placeOpponentsShips();

// Function to create a grid for the game board
function createGrid(board) {
    for (let i = 0; i < 100; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        board.appendChild(cell);
    }
    orientationLabel.textContent = player.orientation;
}

// handle ship placement on player board
playerBoard.addEventListener("mousedown", (f) => {
    const cellIndex = Array.from(f.currentTarget.children).indexOf(f.target);
    const row = Math.floor(cellIndex / 10);
    const col = cellIndex % 10;

    const cell = f.target; // The clicked cell

    if (f.button == 0) {
        //place ship if placement stage at the start of the game
        if (player.placementStage) {
            try {
                player_board.placeShip(
                    player.length,
                    row,
                    col,
                    player.isHorizontal()
                );
            } catch (Error) {
                addLog(Error, true);
                return;
            }

            for (let i = 0; i < player.length; i++) {
                if (player.isHorizontal()) {
                    const cellIndex = row * 10 + (col + i); // Calculate the cell index for the current position
                    const cell = playerBoard.children[cellIndex]; // Retrieve the cell element
                    cell.classList.add("ship"); // Add the ship class to the cell
                } else {
                    const cellIndex = (row + i) * 10 + col; // Calculate the cell index for the current position
                    const cell = playerBoard.children[cellIndex]; // Retrieve the cell element
                    cell.classList.add("ship"); // Add the ship class to the cell
                }
            }
            try {
                addLog("INFO - Placed a ship.", true);
                player.nextShip();
            } catch (Error) {
                addLog(Error, false);
                game.startGame();
                if (game.playerTurn) {
                    addLog("Your turn", true);
                } else {
                    addLog("Opponents turn", false);

                    let iA = opponent.playTurn();
                    while (player_board.coordsUsed(iA[0], iA[1])) {
                        iA = opponent.playTurn();
                        addLog(`new coords: ${iA}`, false);
                    }
                    const cellIndex = iA[0] * 10 + iA[1];

                    addLog(`Attacked square [${iA[0]}, ${iA[1]}]`, false);

                    if (player_board.handleAttack(iA[0], iA[1])) {
                        opponent.markHit(iA[0], iA[1]);
                        playerBoard.children[cellIndex].classList.add("hit");
                    } else {
                        playerBoard.children[cellIndex].classList.add("miss");
                        opponent.markMiss(iA[0], iA[1]);
                    }
                    game.changeTurn();
                }
            }
        }
    }
});

// Add event listener to change rotation of the to be placed ship, if right clicked at player board
playerBoard.addEventListener("mousedown", (f) => {
    if (f.button === 2 && player.isPlacementStage()) {
        player.changeOrientation();
        orientationLabel.textContent = player.orientation;

        addLog(
            `INFO: Changed player orientation to ${player.orientation}`,
            true
        );

        clearOutlines();
        showShipOutline(f);
    }
});

// Add event listener that resets the grid if 'r' key is pressed
document.addEventListener("keydown", (f) => {
    if (f.key === "r") {
        resetGrid();
    }
});

// Function to handle clicks on the opponent's board (for attacks)
function handlePlayerAttack(event) {
    if (!game.playerTurn) {
        return;
    }
    const cell = event.target;
    /* logic:
        - if hit (cell : 1), show hit (cell : 3) (explosion3.png)
        - if miss (cell : 0) show miss (cell : 2)
    */

    const cellIndex = Array.from(event.currentTarget.children).indexOf(
        event.target
    );
    const row = Math.floor(cellIndex / 10);
    const col = cellIndex % 10;

    // If coords have been attacked before, return immediately
    if (opponent_board.coordsUsed(row, col)) {
        return;
    }

    // board.handleattack returns true if ship present and marks hit
    if (opponent_board.handleAttack(row, col)) {
        cell.classList.add("hit"); // Add a class to indicate a hit
    } else {
        cell.classList.add("miss"); // Add a class to indicate a miss
    }

    // If the number of hit tiles == number of ship tiles (17) => end the game (requires manual reset, allows for evaluation of game state)
    if (opponent_board.isWin()) {
        addLog("You won", true);
        game.endGame();
        saveUsername();
        saveGameResult(player.name, game.getElapsedTime() / 1000);
        displayGameResults();
    } else {
        game.changeTurn();
        setTimeout(() => {
            const iA = opponent.playTurn();
            const cellIndex = iA[0] * 10 + iA[1];

            addLog(`Attacked square [${iA[0]}, ${iA[1]}]`, false);

            if (player_board.handleAttack(iA[0], iA[1])) {
                opponent.markHit(iA[0], iA[1]);
                playerBoard.children[cellIndex].classList.add("hit");
            } else {
                playerBoard.children[cellIndex].classList.add("miss");
                opponent.markMiss(iA[0], iA[1]);
            }
            if (player_board.isWin()) {
                addLog(`Opponent won`, false);
            } else {
                game.changeTurn();
            }
        }, 1);
    }
}

// Function that shows the to-be-placed ship outline when hovering mouse over the player board
function showShipOutline(event) {
    const cell = event.target;

    const cellIndex = Array.from(cell.parentNode.children).indexOf(cell); // Index of the clicked cell

    const row = Math.floor(cellIndex / 10); // Row index of the clicked cell
    const col = cellIndex % 10; // Column index of the clicked cell

    const adjacentPositions = [];

    const length = player.length;

    for (let i = 0; i < length; i++) {
        if (player.isHorizontal()) {
            adjacentPositions.push({ row: row, col: col + i });
        } else {
            adjacentPositions.push({ row: row + i, col: col });
        }
    }

    // Iterate through adjacent positions
    adjacentPositions.forEach((pos) => {
        // Check if the position is within the grid boundaries
        if (pos.row >= 0 && pos.row < 10 && pos.col >= 0 && pos.col < 10) {
            // Calculate the index of the adjacent cell
            const adjacentIndex = pos.row * 10 + pos.col;
            // Retrieve the adjacent cell element
            const adjacentCell = cell.parentNode.children[adjacentIndex];

            try {
                adjacentCell.classList.add("ship-outline");
            } catch (error) {
                // console.log(error);
            }
        }
    });

    cell.classList.add("ship-outline");

    // Store the last outline position
    player.lastOutlineRow = row;
    player.lastOutlineCol = col;
}

// Clears the outline from the grid - used when
function clearOutlines() {
    for (const node of playerBoard.childNodes) {
        node.classList.remove("ship-outline");
    }
}

// Adds text = log to the appropriate status window, player = true for player, false for opponent
function addLog(text, player) {
    var timestamp = new Date();

    var h = timestamp.getHours();
    var m = timestamp.getMinutes();

    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;

    var time = h + ":" + m;

    if (player) {
        playerLog.textContent += time + " " + text + "\n\n";
        playerLog.scrollTop = playerLog.scrollHeight;
    } else {
        oppLog.textContent += text + "\n\n";
        oppLog.scrollTop = oppLog.scrollHeight;
    }
}

// Resets the grid, removes classes indicating changed board state
function resetGrid() {
    for (const node of playerBoard.childNodes) {
        node.classList.remove("ship");
        node.classList.remove("hit");
        node.classList.remove("miss");
    }

    for (const node of opponentBoard.childNodes) {
        node.classList.remove("miss");
        node.classList.remove("hit");
    }

    playerLog.textContent = null;
    oppLog.textContent = null;

    addLog("INFO - Starting a new game", true);

    player_board = new Board();
    opponent_board = new Board();
    opponent = new Opponent();
    player = new Player();
    game = new Game();

    placeOpponentsShips();

    clearOutlines();
}

function saveUsername() {
    const username = usernameField.value;
    if (username) {
        player.name = username;
    }
    console.log(player.name);
}

function clearStorage() {
    if (confirm("Are you sure you want to delete all leaderboard entries?")) {
        localStorage.clear();
    } else {
    }
}

window.addEventListener("offline", (e) => {
    cssStyleLink.href = "./css/offline.css";
    console.log("Enabled offline mode");
    addLog(
        "INFO - Entered offline mode, music player is disabled, sprites altered.",
        true
    );
});

window.addEventListener("online", (e) => {
    cssStyleLink.href = "./css/main.css";
    console.log("Enabled online mode");
    addLog("INFO - Entered online mode, functionality back to normal.", true);
});

// add the initial log with simple guide
addLog(
    `INTRO - Click ? button for guide,
    press 'space' to go fullscreen,
    press 'r' to reset the game.`,
    true
);

// Add event listeners
opponentBoard.addEventListener("click", handlePlayerAttack);
playerBoard.addEventListener("mouseover", showShipOutline);
// playerBoard.addEventListener("mouseout", removeShipOutline);
playerBoard.addEventListener("mouseout", clearOutlines);

resetButton.addEventListener("click", resetGrid);
cleatStorageButton.addEventListener("click", clearStorage);
playerBoard.addEventListener("contextmenu", (event) => event.preventDefault());

// Initialize the game (generates the cells inside the grids)
createGrid(playerBoard);
createGrid(opponentBoard);
