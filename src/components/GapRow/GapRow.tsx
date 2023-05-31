import React, {FC} from 'react';
import './GapRow.css';
import {Constraint, Game} from "../../model/Game";
import {at} from "../../model/Coordinates";

interface GapRowProps {
    game: Game,
    afterRow: number
}

const printConstraint = (c: Constraint) => {
    switch (c) {
        case "none":
            return '';
        case "lt":
            return '<';
        case "gt":
            return '>';
    }
}

const GapRow: FC<GapRowProps> = ({game, afterRow}: GapRowProps) => {
    let result = Array<JSX.Element>();

    for (let col = 1; col <= game.size; col++) {
        const coords = at(afterRow, col);
        let constraint = game.getConstraintWithBelow(coords);
        result.push(<td className="grid-v-gap">{printConstraint(constraint)}</td>)
        if (col < game.size) {
            result.push(<td className="grid-neutral-gap"/>)
        }
    }

    return (
        <tr className="GapRow">
            {result}
        </tr>
    );
};

export default GapRow;
