import {at, Coordinates, Direction} from "./Coordinates";


const badCoords: [string, number, number][] = [
    ['negative row', -1, 4],
    ['zero row', 0, 4],
    ['negative col', 5, -2],
    ['zero col', 5, 0],

];
it.each(badCoords)('cannot be created with %s', (why: string, row: number, col: number) => {
    expect(() => {
        new Coordinates(row, col)
    }).toThrow();
});

it('provides a zero-based serialized index (corners)', () => {
    const boardSize = 4;
    expect(at(1, 1).toIndex(boardSize)).toEqual(0)
    expect(at(1, 4).toIndex(boardSize)).toEqual(4 - 1)
    expect(at(4, 1).toIndex(boardSize)).toEqual(16 - 4)
    expect(at(4, 4).toIndex(boardSize)).toEqual(16 - 1)
});

it('first element in second row has different indices depending on the size', () => {
    const firstCellOfSecondRow = at(2, 1);
    expect(firstCellOfSecondRow.toIndex(5)).toEqual(5)
    expect(firstCellOfSecondRow.toIndex(7)).toEqual(7)
});

it('will complain for coordinates out of board when turned to index', () => {
    expect(() => {
        at(1, 5).toIndex(4)
    }).toThrow()
})

it('can compare with itself', () => {
    const c = at(2, 2);
    expect(c.isSameAs(c)).toEqual(true);
})

it('can compare with other coordinates', () => {
    const c = at(2, 2);
    expect(c.isSameAs(at(2, 2))).toEqual(true);
    expect(c.isSameAs(at(3, 2))).toEqual(false);
    expect(c.isSameAs(at(3, 2))).toEqual(false);
    expect(c.isSameAs(null)).toEqual(false);
})

it('two cells on the same row are sibling', () => {
    expect(at(3, 3).isSiblingOf(at(3, 1))).toEqual(true);
    expect(at(3, 3).isSiblingOf(at(3, 3))).toEqual(true);
    expect(at(3, 3).isSiblingOf(at(3, 5))).toEqual(true);
})

it('two cells on the same column are sibling', () => {
    expect(at(3, 3).isSiblingOf(at(1, 3))).toEqual(true);
    expect(at(3, 3).isSiblingOf(at(3, 3))).toEqual(true);
    expect(at(3, 3).isSiblingOf(at(5, 3))).toEqual(true);
})

it('two cells on different rows and columns are not sibling', () => {
    expect(at(3, 3).isSiblingOf(at(1, 1))).toEqual(false);
    expect(at(3, 3).isSiblingOf(at(2, 2))).toEqual(false);
    expect(at(3, 3).isSiblingOf(at(1, 4))).toEqual(false);
    expect(at(3, 3).isSiblingOf(at(4, 1))).toEqual(false);
})

describe('Within a board of size 5', () => {
    const boardSize = 5;

    const directionChecks: [Direction, string, number, number, boolean][] = [
        ['left', 'center', 4, 2, true],
        ['left', 'left border', 4, 1, false],
        ['right', 'center', 2, 2, true],
        ['right', 'right border', 2, 5, false],
        ['up', 'center', 3, 3, true],
        ['up', 'top row', 1, 3, false],
        ['down', 'center', 3, 2, true],
        ['down', 'bottom row', 5, 2, false],
    ];
    it.each(directionChecks)('can detect if there is room to go %s from %s', (dir, position, row, col, expected) => {
        expect(at(row, col).canMove(dir, boardSize)).toEqual(expected)
    });

    const goodMovements: [Direction, number, number, number, number][] = [
        ['left', 2, 2, 2, 1],
        ['right', 4, 2, 4, 3],
        ['up', 2, 3, 1, 3],
        ['down', 4, 2, 5, 2],
    ];
    it.each(goodMovements)('gets next cell going %s from [%d, %d]', (dir, row1, col1, row2, col2) => {
        expect(at(row1, col1).getNextGoing(dir, boardSize).isSameAs(at(row2, col2))).toEqual(true);
    });

    const badMovements: [Direction, string, number, number][] = [
        ['left', 'left border', 4, 1],
        ['right', 'right border', 2, 5],
        ['up', 'top row', 1, 3],
        ['down', 'bottom row', 5, 2],
    ];
    it.each(badMovements)('gets next cell going %s from %s', (dir, position, row, col) => {
        expect(() => at(row, col).getNextGoing(dir, boardSize)).toThrow();
    });
});
