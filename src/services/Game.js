import {State} from './State';
import {AI} from './AI';
import {AIAction} from './AIAction';

export class Game {

    constructor(autoPlayer) {
        this.ai = autoPlayer;
        this.currentState = new State();
        this.status = 'beginning';
    }

    setState(state) {
        this.currentState = state;

        if (state.isTerminal()) {
            this.status = "ended";
        }
        else {
            //the game is still running
            if (this.currentState.turn !== "X" && this.ai) {
                //notify the AI player its turn has come up
                this.setState(AI.takeMove("O", state));
            }
        }
    }

    setPos(pos) {
        const state = this.currentState.applyAction(new AIAction(pos));
        this.setState(state);
    }

    static calcScore(state) {
        if (state.result !== "running") {
            if (state.result === "X-won") {
                return 10 - state.AIMovesCount;
            } else if (state.result === "O-won") {
                return -10 + state.AIMovesCount;
            } else {
                return 0
            }
        }
    }
}