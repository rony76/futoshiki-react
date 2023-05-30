import {parseGame} from "./GameParser";
import {Coordinates} from "./Coordinates";

it('can parse empty game with size', () => {
    const size = 5;
    const game = parseGame(`
        size: ${size}
    `);

    expect(game).toBeTruthy();
    expect(game.size).toEqual(size);

    for (let row = 1; row < size; row++) {
        for (let col = 1; col < size; col++) {
            let cell = game.getCell(new Coordinates(row, col));
            expect(cell).toBeTruthy();
            expect(cell.type).toEqual('empty');
        }
    }
});

it('can parse game with two fixed values', () => {
    const size = 5;
    const game = parseGame(`
        size: ${size}
        [2, 1]: 4
        [3, 4]: 5
    `);

    expect(game).toBeTruthy();
    expect(game.size).toEqual(size);
    expect(game.getCell(new Coordinates(2, 1)).value).toEqual(4);
    expect(game.getCell(new Coordinates(3, 4)).value).toEqual(5);

});
