import React from 'react';
import './style.css';


export function Cell({mark, selected, onClick}) {

    return (
        <div
            onClick={onClick}
            className={
                "cell "
                + (selected ? "checked " : "")
                + (mark === "X" ? "mark-x" : "mark-o")
            }>
        </div>
    )
}

