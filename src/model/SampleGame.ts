import {Game} from "./Game";
import {parseGame} from "./GameParser";

export function createSampleGame(): Game {
    return parseGame(`
       size: 5
       
       [4, 2]: 2

       [1, 1] greater than below
       [1, 3] less than below
       [1, 4] greater than below

       [2, 1] greater than right
       [2, 3] less than below
       [2, 4] greater than below

       [3, 1] less than right
       [3, 3] less than below
       [3, 4] greater than right

       [4, 1] greater than right
       [4, 5] less than below

       [5, 2] greater than right
    `);
}