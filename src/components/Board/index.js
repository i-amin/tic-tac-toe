import React from 'react';
import './style.css';
import {Cell} from '../Cell';
import {Game} from '../../services/Game';

export default class Board extends React.Component {
    game = new Game(true);

    constructor(props) {
        super(props);
        this.state = {
            currentState: this.game.currentState,
            AIEnabled: this.game.ai
        }
    }


    cellClickHandler(index) {
        this.game.setPos(index);
        this.setState({currentState: this.game.currentState});
    }

    renderCells(state) {
        return state.board.map((cell, key) => <Cell
            key={key}
            mark={cell === "E" ? state.turn : cell}
            selected={cell !== "E"}
            onClick={this.cellClickHandler.bind(this, key)}
        />);
    }

    changeAI({target: {checked}}) {
        this.game.ai = checked;
        this.setState({
            AIEnabled: this.game.ai
        })
    }

    render() {
        if (this.state.currentState.result !== 'running') {
            return (
                <div className="result">
                    <h1>{this.state.currentState.result}</h1>
                </div>
            );
        }
        return (
            <div>
                <div className="board">
                    {this.renderCells(this.state.currentState)}
                </div>
                <div className="controls">
                    <input id="box1" type="checkbox"
                           onChange={this.changeAI.bind(this)}
                           checked={this.state.AIEnabled}/>
                    <label htmlFor="box1">Enable AI Player (O)</label>
                </div>
            </div>
        );
    }
}
