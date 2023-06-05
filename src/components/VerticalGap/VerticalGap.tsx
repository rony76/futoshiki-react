import React, {FC} from 'react';
import './VerticalGap.css';
import {Constraint} from "../../model/Cell";
import {Game} from "../../model/Game";
import {Coordinates} from "../../model/Coordinates";

interface VerticalGapProps {
    game: Game,
    coords: Coordinates
}

const printConstraint = (c: Constraint) => {
    switch (c) {
        case 'gt':
            return '>';
        case 'lt':
            return '<';
        case 'none':
            return '';
    }
}


const VerticalGap: FC<VerticalGapProps> = ({game, coords}: VerticalGapProps) => {
    const constraint = game.getConstraintWithBelow(coords);

    return (
        <td className="VerticalGap">
            {printConstraint(constraint)}
        </td>
    );
};

export default VerticalGap;
