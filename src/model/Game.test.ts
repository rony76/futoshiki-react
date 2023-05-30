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
                let cell = game.getCell(new Coordinates(row, column));
                expect(cell).not.toBeNull();
            }
        }
    })

    const badCoords: [string, Coordinates][] = [
        ['above', new Coordinates(0, 2)],
        ['above', new Coordinates(-3, 2)],
        ['below', new Coordinates(6, 2)],
        ['left', new Coordinates(2, -3)],
        ['left', new Coordinates(2, 0)],
        ['right', new Coordinates(2, 6)]
    ];
    it.each(badCoords)('complains for bad cell coordinates when too %s', (where: string, coords: Coordinates) => {
        expect(() => {
            game.getCell(coords);
        }).toThrow();
    })

    it('can be set fixed values', () => {
        const coords = new Coordinates(4, 2);

        expect(game.getCell(coords).value).not.toBeTruthy();

        const fixedValue = 2;
        game.setFixed(coords, fixedValue);

        expect(game.getCell(coords).value).toEqual(fixedValue);
    })

})
