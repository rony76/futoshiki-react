import {Game} from "../../model/Game";
import {Coordinates} from "../../model/Coordinates";
import {Constraint} from "../../model/Cell";
import React, {FC} from "react";

interface GapProps {
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

const Gap: (className: string,
            constraintExtractor: (game: Game, coords: Coordinates) => Constraint) => FC<GapProps> =
    (className, constraintProvider) => ({game, coords}: GapProps) => {
        const constraint = constraintProvider(game, coords);
        return (
            <td className={className}>{printConstraint(constraint)}</td>
        );
    };

export type {GapProps};
export {Gap};
