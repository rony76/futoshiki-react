import React, {FC} from 'react';
import './ValueRow.css';
import {Constraint, Game} from "../../model/Game";
import ValueCell from "../ValueCell/ValueCell";
import {at} from "../../model/Coordinates";

interface ValueRowProps {
    game: Game,
    row: number
}

const printConstraint = (c: Constraint) => {
    switch (c) {
        case 'gt': return '>';
        case 'lt': return '<';
        case 'none': return '';
    }
}

const ValueRow: FC<ValueRowProps> = ({game, row}: ValueRowProps) => {
    let result = Array<JSX.Element>();

    for (let col = 1; col <= game.size; col++) {
        const coords = at(row, col);
        const cell = game.getCell(coords);
        result.push(<ValueCell cell={cell} />)

        if (col < game.size) {
            let constraint = game.getConstraintWithRight(coords);
            result.push(<td className="grid-h-gap">{printConstraint(constraint)}</td>)
        }
    }

    return (
        <tr>
            {result}
        </tr>
    );
}

export default ValueRow;
