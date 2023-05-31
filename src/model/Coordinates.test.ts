import {at, Coordinates} from "./Coordinates";


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
