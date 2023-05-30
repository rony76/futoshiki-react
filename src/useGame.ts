import {Game} from "./model/Game";
import {useState} from "react";
import {Coordinates} from "./model/Coordinates";

export function useGame(size: number): Game | null {
    const [game, setGame] = useState<Game | null>(null);

    setTimeout(() => {
        let newGame = new Game(size);
        newGame.setFixed(new Coordinates(4, 2), 2);

        newGame.setConstraintWithBelow(new Coordinates(1, 1), 'gt');
        newGame.setConstraintWithBelow(new Coordinates(1, 3), 'lt');
        newGame.setConstraintWithBelow(new Coordinates(1, 4), 'gt');

        newGame.setConstraintWithRight(new Coordinates(2, 1), 'gt');
        newGame.setConstraintWithBelow(new Coordinates(2, 3), 'lt');
        newGame.setConstraintWithBelow(new Coordinates(2, 4), 'gt');

        newGame.setConstraintWithRight(new Coordinates(3, 1), 'lt');
        newGame.setConstraintWithBelow(new Coordinates(3, 3), 'lt');
        newGame.setConstraintWithRight(new Coordinates(3, 4), 'gt');

        newGame.setConstraintWithRight(new Coordinates(4, 1), 'gt');
        newGame.setConstraintWithBelow(new Coordinates(4, 5), 'lt');

        newGame.setConstraintWithRight(new Coordinates(5, 2), 'gt');

        setGame(newGame);
    }, 800);

    return game;
}