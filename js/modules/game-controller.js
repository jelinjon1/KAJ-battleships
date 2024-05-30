export class Game {
    playerTurn = null;

    // Randomizes who starts the game, 50% chance
    startGame() {
        Math.random() >= 0.5
            ? (this.playerTurn = true)
            : (this.playerTurn = false);

        // this.playerTurn = true;
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
