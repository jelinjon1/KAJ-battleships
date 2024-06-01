export class Board {
    /*
        cell: 0 => empty
        cell: 1 => ship
        cell: 2 => miss
        cell: 3 => hit
    */
    #matrix = null;
    #hit = null;

    constructor() {
        this.#matrix = this.initializeMatrix(10, 10);
        this.#hit = 0;
    }

    // Initializes matrix with zeroes
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

    // Returns true if coords were shot at before
    coordsUsed(row, col) {
        try {
            return this.#matrix[row][col] == 2 || this.#matrix[row][col] == 3;
        } catch {
            return false;
        }
    }

    // Places ship starting at row, col
    placeShip(length, row, col, horizontal) {
        //check if out of bounds
        if (horizontal) {
            if (col + length > 10) {
                throw `HorizontalalSpace Error - Length too large for size of field and given coords [${row} , ${col}] and length ${length}.`;
            }

            for (let j = col; j < col + length; j++) {
                if (this.#matrix[row][j] != 0) {
                    throw `OccupiedCoordinates Error - Ships overlap at coords [${row} , ${j}]`;
                }
            }

            for (let j = col; j < col + length; j++) {
                // console.log(`placing at ${row}, ${j}`);
                // addLog(`placing at ${row}, ${j}`);

                this.#matrix[row][j] = 1;
            }
        } else {
            if (row + length > 10) {
                throw `VerticalSpace Error - Length too large for size of field and given coords [${row} , ${col}] and length ${length}.`;
            }

            for (let j = row; j < row + length; j++) {
                if (this.#matrix[j][col] != 0) {
                    throw `OccupiedCoordinates Error - Ships overlap at coords [${j} , ${col}]`;
                }
            }

            for (let j = row; j < row + length; j++) {
                // console.log(`placing at ${j}, ${col}`);
                // addLog(`placing at ${j}, ${col}`);
                this.#matrix[j][col] = 1;
            }
        }
    }

    // Places hit if ship present at [row,col], places miss otherwise
    handleAttack(row, col) {
        if (row < 0 || col < 0) {
            return false;
        }
        //if ship, change to hit
        if (this.#matrix[row][col] === 1) {
            this.#matrix[row][col] = 3; //hit
            this.#hit++;
        } else {
            this.#matrix[row][col] = 2; //miss
        }

        return this.#matrix[row][col] === 3;
    }

    isWin() {
        return this.#hit === 17;
    }
}
