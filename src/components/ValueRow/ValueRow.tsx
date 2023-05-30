import React, {FC} from 'react';
import './ValueRow.css';
import {Game} from "../../model/Game";

interface ValueRowProps {
    game: Game,
    row: number
}

const ValueRow: FC<ValueRowProps> = ({game, row}: ValueRowProps) => {
    let result = Array<JSX.Element>();

    for (let col = 1; col <= game.size; col++) {
        const cell = game.getCell([row, col]);
        result.push(<div className="grid-value-item">{cell.value}</div>)
        if (col < game.size) {
            result.push(<div className="grid-vertical-gap"/>)
        }
    }

    return (
        <>
            {result}
        </>
    );
}

export default ValueRow;
