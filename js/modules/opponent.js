export class Opponent {
    #enemyBoard = null;
    #indexes = [1, 1];
    #cycles = 0;

    constructor() {
        this.#enemyBoard = this.initializeMatrix(10, 10);
    }

    // Generates coords of an attack
    // Shooting around already existing marked hits takes priority
    // Exploring the filed inn a checker pattern comes second
    generateAttack() {
        for (let i = 0; i < this.#enemyBoard.length; i++) {
            for (let j = 0; j < this.#enemyBoard[i].length; j++) {
                if (this.#enemyBoard[i][j] == 3) {
                    //top, right, down, left, check for empty space to shoot at
                    if (i - 1 >= 0 && this.#enemyBoard[i - 1][j] == 0) {
                        return [i - 1, j];
                    }
                    if (j + 1 <= 9 && this.#enemyBoard[i][j + 1] == 0) {
                        return [i, j + 1];
                    }
                    if (i + 1 <= 9 && this.#enemyBoard[i + 1][j] == 0) {
                        return [i + 1, j];
                    }
                    if (j - 1 >= 0 && this.#enemyBoard[i][j - 1] == 0) {
                        return [i, j - 1];
                    }
                }
            }
        }

        const copy = this.#indexes.concat();
        if (this.#indexes[0] == 9 && this.#indexes[1] == 9) {
            this.#indexes[0] = 0;
            this.#indexes[1] = -2;
            this.#cycles++;
        }

        if (this.#cycles == 0) {
            this.#indexes[1] += 2;
            if (this.#indexes[1] > 9) {
                this.#indexes[1] = 1;
                this.#indexes[0] += 2;
            }
        } else {
            this.#indexes[1] += 2;
            if (this.#indexes[1] > 8) {
                this.#indexes[1] = 0;
                this.#indexes[0] += 2;
            }
        }
        // console.log(copy);
        return copy;
    }

    // Initializes known opponent board with zeroes
    initializeMatrix(rows, cols) {
        var matrix = [];
        for (let i = 0; i < rows; i++) {
            matrix[i] = [];
            for (let j = 0; j < cols; j++) {
                matrix[i][j] = 0;
            }
        }
        return matrix;
    }

    // Generates an attack and returns it
    playTurn() {
        const res = this.generateAttack();
        return res;
    }

    // Marks a successful hit in know opponent board state
    markHit(row, col) {
        this.#enemyBoard[row][col] = 3;
    }

    // Marks an unsuccessful hit in know opponent board state
    markMiss(row, col) {
        this.#enemyBoard[row][col] = 2;
    }
}
