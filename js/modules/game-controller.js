export class Game {
    playerTurn = null;
    gameStartTime = 0;
    gameEndTime = 0;

    // Randomizes who starts the game, 50% chance
    startGame() {
        Math.random() >= 0.5
            ? (this.playerTurn = true)
            : (this.playerTurn = false);
        // this.playerTurn = true;
        this.gameStartTime = performance.now();
    }

    endGame() {
        this.playerTurn = false;
        this.gameEndTime = performance.now();
    }

    getElapsedTime() {
        const timeElapsed = this.gameEndTime - this.gameStartTime;
        console.log(timeElapsed);
        return timeElapsed;
    }

    // Changes whose turn it is
    changeTurn() {
        if (this.playerTurn) {
            this.playerTurn = false;
        } else {
            this.playerTurn = true;
        }
    }
}
