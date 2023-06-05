import React, {FC} from 'react';
import './HorizontalGap.css';
import {Constraint} from "../../model/Cell";
import {Game} from "../../model/Game";
import {Coordinates} from "../../model/Coordinates";

interface HorizontalGapProps {
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

const HorizontalGap: FC<HorizontalGapProps> = ({ game, coords }: HorizontalGapProps) => {
    let constraint = game.getConstraintWithRight(coords);
    return (
        <td className="HorizontalGap">{printConstraint(constraint)}</td>
    );
};

export default HorizontalGap;
