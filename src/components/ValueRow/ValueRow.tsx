import React, {FC} from 'react';
import './ValueRow.css';
import {Game} from "../../model/Game";
import ValueCell from "../ValueCell/ValueCell";
import {at} from "../../model/Coordinates";
import {Constraint} from "../../model/Cell";

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

        result.push(<ValueCell
            key={"val" + col}
            game={game}
            coords={coords}
        />)

        if (col < game.size) {
            let constraint = game.getConstraintWithRight(coords);
            result.push(<td
                key={"gap" + col}
                className="grid-h-gap"
                >{printConstraint(constraint)}</td>)
        }
    }

    return (
        <tr>
            {result}
        </tr>
    );
}

export default ValueRow;
