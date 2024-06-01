export class Player {
    orientation = null; //orientation of piece being placed

    length = null; //length of p.b.p
    lastOutlineRow = null; // Store the last outline row
    lastOutlineCol = null; // Store the last outline column
    name = "DEFAULT"; //default username to prevent null username incase no username is entered

    placementStage = null; //indicates if all ships have been placed yet
    #lengths = [5, 4, 3, 3, 2]; //lengths of ships
    #index = 0; //index of current ship being placed (from the lengths arr)

    constructor() {
        this.orientation = "horizontal"; //default orientation
        this.placementStage = true;
        this.length = this.#lengths[this.#index];
    }

    isHorizontal() {
        return this.orientation == "horizontal";
    }

    isPlacementStage() {
        return this.placementStage;
    }

    //changes orientation
    changeOrientation() {
        if (!this.placementStage) {
            return;
        }
        if (this.orientation == "horizontal") {
            this.orientation = "vertical";
        } else {
            this.orientation = "horizontal";
        }
    }

    // Iterates through ship lengths to find the next, stops at length 2, ends placement stage after
    nextShip() {
        this.#index++;
        if (this.#index == 5) {
            this.placementStage = false;
            this.length = this.#lengths[this.#index];

            throw `INFO - Beginning attack phase.`;
        } else {
            this.length = this.#lengths[this.#index];
        }
    }
}
