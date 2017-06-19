import React from 'react';
import './style.css';


export function Cell({mark, testClick}) {

    function renderChar(c) {
        return (
            <div
                onClick={testClick.bind(this)}
                className="cell mark-o">
            </div>
        )
    }

    return renderChar(mark);
}

