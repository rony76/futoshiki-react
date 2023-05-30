import {Game} from "./Game";
import {Cell} from "./Cell";
import {Coordinates} from "./Coordinates";


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
                let cell = game.getCell([row, column]);
                expect(cell).not.toBeNull();
            }
        }
    })

    const badCoords: [string, Coordinates][] = [
        ['above', [0, 2]],
        ['above', [-3, 2]],
        ['below', [6, 2]],
        ['left', [2, -3]],
        ['left', [2, 0]],
        ['right', [2, 6]]
    ];
    it.each(badCoords)('complains for bad cell coordinates when too %s', (where: string, coords: Coordinates) => {
        expect(() => {
            game.getCell(coords);
        }).toThrow();
    })
})

it('can access valid cells', () => {
    const game = new Game(5);
    expect(() => {
        new Game(-1)
    }).toThrow();

    expect(() => {
        new Game(0)
    }).toThrow();
});

it('can be set fixed values', () => {
    const game = new Game(5);

    const coords1: Coordinates = [1, 1];
    const coords2: Coordinates = [4, 2];

    expect(game.getCell(coords1).value).not.toBeTruthy();
    expect(game.getCell(coords2).value).not.toBeTruthy();

    const fixedValue = 2;
    game.setFixed([4, 2], fixedValue);

    expect(game.getCell(coords1).value).not.toBeTruthy();
    expect(game.getCell(coords2).value).toEqual(fixedValue);
});