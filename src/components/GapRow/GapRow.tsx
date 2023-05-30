import React, {FC} from 'react';
import './GapRow.css';
import {Constraint, Game} from "../../model/Game";
import {Coordinates} from "../../model/Coordinates";

interface GapRowProps {
    game: Game,
    afterRow: number
}

const printConstraint = (c: Constraint) => {
    switch (c) {
        case "none":
            return '';
        case "lt":
            return '⋀';
        case "gt":
            return '⋁';
    }
}

const GapRow: FC<GapRowProps> = ({game, afterRow}: GapRowProps) => {
    let result = Array<JSX.Element>();

    for (let col = 1; col <= game.size; col++) {
        const coords = new Coordinates(afterRow, col);
        let constraint = game.getConstraintWithBelow(coords);
        result.push(<div className="grid-v-gap">{printConstraint(constraint)}</div>)
        if (col < game.size) {
            result.push(<div className="grid-neutral-gap"/>)
        }
    }

    return (
        <>
            {result}
        </>
    );
};

export default GapRow;
