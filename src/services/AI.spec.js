import {AI} from './AI';
import {State} from './State';

describe.only('AI system', () => {
    describe('test minimax calculation', () => {
        test('minimax should give a number', () => {
            const state = new State();
            state.board = [
                'X', 'X', 'E',
                'O', 'E', 'E',
                'E', 'E', 'E'
            ];
            state.turn = 'O';
            expect(AI.miniMaxValue(state)).not.toBeNull();
        })
    });

    describe.only('test moves taking by AI', ()=>{
        test('should give the best move', ()=>{
            const state = new State();
            state.board = [
                'X', 'O', 'O',
                'O', 'X', 'X',
                'X', 'E', 'E'
            ];
            state.turn = 'O';
            expect(AI.takeMove('O', state).board).toEqual([
                'X', 'O', 'O',
                'O', 'X', 'X',
                'X', 'E', 'O'
            ]);
        });
    })
})