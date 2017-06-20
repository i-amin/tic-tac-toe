export class State {
    turn = "";
    AIMovesCount = 0;
    result = "running";
    board = [];

    constructor(oldState) {
        // new state from the old one
        if (oldState) {
            return Object.assign(this, oldState, {
                board: [...oldState.board]
            });
        }
        // new start state
        this.board = new Array(9).fill("E");
        this.turn = "X";
    }

    /*
     * switch turns between 'O' and 'X'
     * */
    advanceTurn() {
        this.turn = this.turn === "X" ? "O" : "X";
    }

    applyAction(action) {
        const newState = new State(this);
        newState.board[action.movePosition] = this.turn;
        this.turn === "O" && newState.AIMovesCount++;
        newState.advanceTurn();
        return newState;
    }

    /*
     * get indexes of the empty cells
     * @return [Array]: indices of the empty cells
     * */
    emptyCells() {
        return this.board.reduce((indices, item, i) => {
            if (item === "E") indices.push(i);
            return indices;
        }, []);
    }

    /*
     * check if the state is terminal and the game should exit
     * */
    isTerminal() {
        let b = this.board;

        // rows check
        for (let i = 0; i <= 6; i = i + 3) {
            if (b[i] !== "E" && b[i] === b[i + 1] && b[i + 1] === b[i + 2]) {
                this.result = b[i] + "-won";
                return true;
            }
        }

        // columns check
        for (let i = 0; i <= 2; i++) {
            if (b[i] !== "E" && b[i] === b[i + 3] && b[i + 3] === b[i + 6]) {
                this.result = b[i] + "-won";
                return true;
            }
        }

        // diagonals check
        for (let i = 0, j = 4; i <= 2; i = i + 2, j = j - 2) {
            if (b[i] !== "E" && b[i] === b[i + j] && b[i + j] === b[i + 2 * j]) {
                this.result = b[i] + "-won";
                return true;
            }
        }

        /*
         * check for draw
         * */
        if (this.emptyCells().length === 0) {
            this.result = "Draw";
            return true;
        }

        return false;

    }

}