import {Game} from "../../model/Game";
import {Coordinates} from "../../model/Coordinates";
import {Constraint} from "../../model/Cell";
import React, {FC} from "react";

interface GapProps {
    game: Game,
    coords: Coordinates
}

interface ConstraintInfoProvider {
    getConstraint: (game: Game, coords: Coordinates) => Constraint
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
            infoProvider: ConstraintInfoProvider) => FC<GapProps> =
    (className, infoProvider) => ({game, coords}: GapProps) => {
        const constraint = infoProvider.getConstraint(game, coords);
        return (
            <td className={className}>{printConstraint(constraint)}</td>
        );
    };

export type {GapProps};
export {Gap};
