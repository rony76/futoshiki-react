import React, {FC} from 'react';
import './ValueRow.css';
import {Game} from "../../model/Game";
import ValueCell from "../ValueCell/ValueCell";

interface ValueRowProps {
    game: Game,
    row: number
}

const ValueRow: FC<ValueRowProps> = ({game, row}: ValueRowProps) => {
    let result = Array<JSX.Element>();

    for (let col = 1; col <= game.size; col++) {
        const cell = game.getCell([row, col]);
        result.push(<ValueCell cell={cell} />)
        if (col < game.size) {
            result.push(<div className="grid-h-gap"/>)
        }
    }

    return (
        <>
            {result}
        </>
    );
}

export default ValueRow;
