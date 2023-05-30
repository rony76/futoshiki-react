import {Game} from "./Game";
import {Coordinates} from "./Coordinates";

export function createSampleGame(size: number): Game {
    const g = new Game(size);
    g.setFixed(new Coordinates(4, 2), 2);

    g.setConstraintWithBelow(new Coordinates(1, 1), 'gt');
    g.setConstraintWithBelow(new Coordinates(1, 3), 'lt');
    g.setConstraintWithBelow(new Coordinates(1, 4), 'gt');

    g.setConstraintWithRight(new Coordinates(2, 1), 'gt');
    g.setConstraintWithBelow(new Coordinates(2, 3), 'lt');
    g.setConstraintWithBelow(new Coordinates(2, 4), 'gt');

    g.setConstraintWithRight(new Coordinates(3, 1), 'lt');
    g.setConstraintWithBelow(new Coordinates(3, 3), 'lt');
    g.setConstraintWithRight(new Coordinates(3, 4), 'gt');

    g.setConstraintWithRight(new Coordinates(4, 1), 'gt');
    g.setConstraintWithBelow(new Coordinates(4, 5), 'lt');

    g.setConstraintWithRight(new Coordinates(5, 2), 'gt');
    return g;
}