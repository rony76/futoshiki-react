import {parseGame} from "./GameParser";
import {at} from "./Coordinates";

it('can parse empty game with size', () => {
    const size = 5;
    const game = parseGame(`
        size: ${size}
    `);

    expect(game).toBeTruthy();
    expect(game.size).toEqual(size);

    for (let row = 1; row < size; row++) {
        for (let col = 1; col < size; col++) {
            let cell = game.getCellValue(at(row, col));
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

    expect(game.getCellValue(at(2, 1)).value).toEqual(4);
    expect(game.getCellValue(at(3, 4)).value).toEqual(5);

});

it('can parse game with constraints', () => {
    const size = 5;
    const game = parseGame(`
        size: ${size}
        [2, 1] greater than right
        [3, 4] less than below 
    `);

    expect(game.getConstraintWithRight(at(1, 1))).toEqual('none');
    expect(game.getConstraintWithRight(at(2, 1))).toEqual('gt');
    expect(game.getConstraintWithBelow(at(3, 4))).toEqual('lt');
});

it('can parse game with values and constraints', () => {
    const size = 5;
    const game = parseGame(`
        size: ${size}
        [1, 5]: 5
        [4, 5]: 4
        [2, 1] greater than right
        [3, 4] less than below 
    `);

    expect(game.getCellValue(at(1, 5)).value).toEqual(5);
    expect(game.getCellValue(at(4, 5)).value).toEqual(4);
    expect(game.getConstraintWithRight(at(1, 1))).toEqual('none');
    expect(game.getConstraintWithRight(at(2, 1))).toEqual('gt');
    expect(game.getConstraintWithBelow(at(3, 4))).toEqual('lt');
});
