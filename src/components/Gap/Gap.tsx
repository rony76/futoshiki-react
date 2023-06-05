import {ConstraintStatus, Game} from "../../model/Game";
import {Coordinates} from "../../model/Coordinates";
import React, {FC} from "react";
import {Constraint} from "../../model/Constraint";

interface GapProps {
    game: Game,
    coords: Coordinates
}

interface ConstraintInfoProvider {
    getConstraint: (game: Game, coords: Coordinates) => Constraint,
    getConstraintStatus: (game: Game, coords: Coordinates) => ConstraintStatus
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
        const status = infoProvider.getConstraintStatus(game, coords);

        let cn = className
        if (status === 'violated') {
            cn += ' violated-constraint'
        }
        return (
            <td className={cn}>{printConstraint(constraint)}</td>
        );
    };

export type {GapProps};
export {Gap};
