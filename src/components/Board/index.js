import React from 'react';
import './style.css';
import {Cell} from '../Cell';

export default class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cells: (new Array(9)).fill('')
        }
    }

    cellClickHandler(a) {
        console.log(a);
    }

    renderCells(state) {
        return state.map((cell, key) => <Cell
            key={key}
            testClick={this.cellClickHandler}
        />);
    }

    render(props, state) {
        return (
            <div className="board">
                {this.renderCells(this.state.cells)}
            </div>
        )
    }
}
