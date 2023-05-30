import {Game} from "./model/Game";

export function useGame(size: number): Game {
    const game = new Game(size);

    for (let row = 1; row <= size; row++) {
        for (let col = 1; col <= size; col++) {
            let val = (size + col - (row - 1)) % size;
            if (val === 0) val = 5;
            game.setFixed([row, col], val);
        }
    }
    return game;
}