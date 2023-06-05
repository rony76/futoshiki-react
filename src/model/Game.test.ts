import {Game} from "./Game";
import {at, Coordinates} from "./Coordinates";
import {Constraint} from "./Cell";


it('cannot be created with non positive size', () => {
    expect(() => {
        Game.emptyForSize(-1)
    }).toThrow();

    expect(() => {
        Game.emptyForSize(0)
    }).toThrow();
});

describe('a valid game of size 5', () => {
    const size = 5;
    let game: Game;

    beforeEach(() => {
        game = Game.emptyForSize(size)
    })

    it('allows to retrieve all cells, 1 based', () => {
        for (let row = 1; row <= size; row++) {
            for (let column = 1; column <= size; column++) {
                let cell = game.getCellValue(at(row, column));
                expect(cell).not.toBeNull();
            }
        }
    })

    const badCoords: [string, Coordinates][] = [
        ['below', at(6, 2)],
        ['right', at(2, 6)]
    ];
    it.each(badCoords)('complains for bad cell coordinates when too %s', (where: string, coords: Coordinates) => {
        expect(() => {
            game.getCellValue(coords);
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

        const cellBefore = game.getCellValue(coords);
        expect(cellBefore.value).not.toBeTruthy();
        expect(cellBefore.type).toEqual('empty');
    })

    it('can assign fixed values', () => {
        const coords = at(4, 2);

        const cellBefore = game.getCellValue(coords);
        expect(cellBefore.value).not.toBeTruthy();
        expect(cellBefore.type).toEqual('empty');

        const fixedValue = 2;
        game.setFixedValue(coords, fixedValue);

        const cellAfter = game.getCellValue(coords);
        expect(cellAfter.value).toEqual(fixedValue);
        expect(cellAfter.type).toEqual('fixed');
    })

    it('can assign user values to empty cells', () => {
        const coords = at(5, 3);

        expect(game.getCellValue(coords).type).toEqual('empty');

        const fixedValue = 2;
        let updatedGame = game.withUserValue(coords, fixedValue);

        const cellAfter = updatedGame.getCellValue(coords);
        expect(cellAfter.value).toEqual(fixedValue);
        expect(cellAfter.type).toEqual('user');
    })

    it('can override user values', () => {
        const coords = at(1, 3);

        expect(game.getCellValue(coords).type).toEqual('empty');

        const firstValue = 5;
        let updatedGame = game.withUserValue(coords, firstValue);

        const cellAfterFirstSet = updatedGame.getCellValue(coords);
        expect(cellAfterFirstSet.value).toEqual(firstValue);
        expect(cellAfterFirstSet.type).toEqual('user');

        const secondValue = 3;
        updatedGame = game.withUserValue(coords, secondValue);

        const cellAfterSecondSet = updatedGame.getCellValue(coords);
        expect(cellAfterSecondSet.value).toEqual(secondValue);
        expect(cellAfterSecondSet.type).toEqual('user');
    })

    it('cannot override fixed values with user values', () => {
        const coords = at(1, 3);

        expect(game.getCellValue(coords).type).toEqual('empty');

        const firstValue = 5;
        game.setFixedValue(coords, firstValue);

        const cellAfterFirstSet = game.getCellValue(coords);
        expect(cellAfterFirstSet.value).toEqual(firstValue);
        expect(cellAfterFirstSet.type).toEqual('fixed');

        const secondValue = 3;
        expect(() => {
            game.withUserValue(coords, secondValue);
        }).toThrow();
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
