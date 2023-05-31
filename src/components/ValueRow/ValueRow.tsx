import React, {FC, useContext} from 'react';
import './ValueRow.css';
import {Constraint, Game} from "../../model/Game";
import ValueCell from "../ValueCell/ValueCell";
import {at} from "../../model/Coordinates";
import {ActiveCellContext} from "../../ActiveCellContext";

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
    const [activeCell, setActiveCell] = useContext(ActiveCellContext);

    let result = Array<JSX.Element>();

    for (let col = 1; col <= game.size; col++) {
        const coords = at(row, col);
        const cell = game.getCell(coords);
        const cellIsActive = (coords.isSameAs(activeCell));

        result.push(<ValueCell
            key={"val" + col}
            cell={cell}
            isActive={cellIsActive}
            onClick={() => setActiveCell(coords)}/>)

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
