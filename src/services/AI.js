import {AIAction} from './AIAction';
import {Game} from './Game';

export class AI {

    static takeMove(turn, currentState) {
        let availablePos = currentState.emptyCells();

        // get all available actions with minimax value for each one
        let availableActions = availablePos.map(pos => {
            let action = new AIAction(pos);
            let newState = currentState.applyAction(action);
            action.minimaxValue = this.miniMaxValue(newState);
            return action;
        });

        // sort the action list according to the move
        // from AI prospective it must maximize the X and minimize the O
        availableActions.sort(turn === "X" ? AIAction.DSC : AIAction.ASC);

        // apply the most desirable action
        const newState = currentState.applyAction(availableActions[0]);
        return newState;
    }

    static miniMaxValue(state) {

        if (state.isTerminal()) {
            return Game.calcScore(state);
        }

        let stateScore;
        if (state.turn === "X")
            stateScore = -1000;
        else
            stateScore = 1000;

        const availablePositions = state.emptyCells();

        const availableStates = availablePositions.map((pos) => {
            const action = new AIAction(pos);
            return state.applyAction(action);
        });

        availableStates.map((nextState) => {
            let newScore = this.miniMaxValue(nextState);

            if (state.turn === "X" && newScore > stateScore) {
                stateScore = newScore;
            }
            else if (state.turn === "O" && newScore < stateScore) {
                stateScore = newScore
            }
            return nextState;
        });

        return stateScore;
    }
}
