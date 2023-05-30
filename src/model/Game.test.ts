import {Constraint, Game} from "./Game";
import {at, Coordinates} from "./Coordinates";


it('cannot be created with non positive size', () => {
    expect(() => {
        new Game(-1)
    }).toThrow();

    expect(() => {
        new Game(0)
    }).toThrow();
});

describe('a valid game of size 5', () => {
    const size = 5;
    let game: Game;

    beforeEach(() => {
        game = new Game(5);
    })

    it('allows to retrieve all cells, 1 based', () => {
        for (let row = 1; row <= size; row++) {
            for (let column = 1; column <= size; column++) {
                let cell = game.getCell(at(row, column));
                expect(cell).not.toBeNull();
            }
        }
    })

    const badCoords: [string, Coordinates][] = [
        ['above', at(0, 2)],
        ['above', at(-3, 2)],
        ['below', at(6, 2)],
        ['left', at(2, -3)],
        ['left', at(2, 0)],
        ['right', at(2, 6)]
    ];
    it.each(badCoords)('complains for bad cell coordinates when too %s', (where: string, coords: Coordinates) => {
        expect(() => {
            game.getCell(coords);
        }).toThrow();
    })

    const cellCoords = [
        [1, 1],
        [5, 5],
        [2, 4],
        [4, 2],
    ];
    it.each(cellCoords)('has cell <%d, %d> defaulting to empty', (r, c) => {
        const coords = at(r, c);

        const cellBefore = game.getCell(coords);
        expect(cellBefore.value).not.toBeTruthy();
        expect(cellBefore.type).toEqual('empty');
    })

    it('can assign fixed values', () => {
        const coords = at(4, 2);

        const cellBefore = game.getCell(coords);
        expect(cellBefore.value).not.toBeTruthy();
        expect(cellBefore.type).toEqual('empty');

        const fixedValue = 2;
        game.setFixed(coords, fixedValue);

        const cellAfter = game.getCell(coords);
        expect(cellAfter.value).toEqual(fixedValue);
        expect(cellAfter.type).toEqual('fixed');
    })

    const constraints: Constraint[][] = [['lt'], ['gt']];
    it.each(constraints)('allows setting "%s" row constraint', (constraint: Constraint) => {
        const row = 2;
        const leftCellColumn = 3;

        expect(game.getConstraintWithRight(at(row, leftCellColumn))).toEqual('none');

        game.setConstraintWithRight(at(row, leftCellColumn), constraint);

        expect(game.getConstraintWithRight(at(row, leftCellColumn))).toEqual(constraint);
    })

    it.each(constraints)('allows setting "%s" column constraint', (constraint: Constraint) => {
        const column = 4;
        const aboveCellRow = 3;

        expect(game.getConstraintWithBelow(at(aboveCellRow, column))).toEqual('none');

        game.setConstraintWithBelow(at(aboveCellRow, column), constraint);

        expect(game.getConstraintWithBelow(at(aboveCellRow, column))).toEqual(constraint);
    })
})
