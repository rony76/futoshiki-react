import {Game} from "./model/Game";
import {useState} from "react";
import {Coordinates} from "./model/Coordinates";

export function useGame(size: number): Game | null {
    const [game, setGame] = useState<Game | null>(null);

    setTimeout(() => {
        let newGame = new Game(size);
        for (let row = 1; row <= size; row++) {
            for (let col = 1; col <= size; col++) {
                let val = (size + col - (row - 1)) % size;
                if (val === 0) val = 5;
                newGame.setFixed(new Coordinates(row, col), val);
            }
        }
        setGame(newGame);
    }, 800);

    return game;
}