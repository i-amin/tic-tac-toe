import {State} from './State';

describe('State', () => {
    test('State object exist', () => {
        const state = new State();
        expect(state).toBeDefined();
    });

    test('create new state from old state', () => {
        const state01 = new State();
        state01.board = ['E'];
        const state02 = new State(state01);
        state01.board[0] = 'X';
        expect(state02.board[0]).toBe('E');
    });

    test('empty cells', () => {
        const state = new State();
        state.board = ['E', 'E', 'E', 'X', 'O'];
        expect(state.emptyCells()).toEqual([0, 1, 2]);
    });

    test('advance turn and switch between the X and O', ()=>{
        const state = new State();
        state.advanceTurn();
        expect(state.turn).toBe('O');
        state.advanceTurn();
        expect(state.turn).toBe('X');
    });

    test('apply new action', ()=>{
        const state= new State();
        state.turn="O"
        expect(state.applyAction({
            movePosition: 0
        }).board[0]).toBe('O');
    })

    describe('game termination', () => {
        let state = null;

        beforeEach(() => {
            state = new State();
        });

        test('terminate game when there is a row of X', () => {
            state.board = [
                'X', 'X', 'X',
                'O', 'O', 'E',
                'E', 'E', 'E'
            ];
            expect(state.isTerminal()).toBeTruthy();
            expect(state.result).toBe('X-won');
        });

        test('terminate game when there is a column of X', () => {
            state.board = [
                'X', 'E', 'O',
                'X', 'O', 'E',
                'X', 'E', 'O'
            ];
            expect(state.isTerminal()).toBeTruthy();
        });

        test('terminate game when there is a diagonal of X stated at (0,0)', () => {
            state.board = [
                'X', 'E', 'O',
                'O', 'X', 'E',
                'E', 'E', 'X'
            ];
            expect(state.isTerminal()).toBeTruthy();
            expect(state.result).toBe('X-won');
        });

        test('terminate game when there is a diagonal of o started at (2,2)', () => {
            state.board = [
                'E', 'X', 'o',
                'X', 'o', 'E',
                'o', 'E', 'X'
            ];
            expect(state.isTerminal()).toBeTruthy();
            expect(state.result).toBe('o-won');
        });

        test('terminate game when there is draw and no empty cells found', () => {
            state.board = [
                'o', 'X', 'o',
                'X', 'X', 'o',
                'o', 'o', 'X'
            ];
            expect(state.isTerminal()).toBeTruthy();
            expect(state.result).toBe('draw');
        });

        test('Cannot terminate the game while there is empty cells with no winning', () => {
            state.board = [
                'o', 'X', 'o',
                'X', 'X', 'o',
                'E', 'E', 'X'
            ];
            expect(state.isTerminal()).toBeFalsy();
            expect(state.result).toBe('running');
        });
    });
})