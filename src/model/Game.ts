import {Coordinates} from "./Coordinates";
import {Cell} from "./Cell";

class Game {
    readonly size: number;
    private readonly cells: Array<number>;

    constructor(size: number) {
        if (size <= 0) {
            throw new Error('invalid game size');
        }

        this.size = size;
        this.cells = new Array(size * size);
    }

    setFixed(coords: Coordinates, value: number): void {
        this.cells[coords.toIndex(this.size)] = value;
    }

    getCell(coords: Coordinates): Cell {
        const value = this.cells[coords.toIndex(this.size)];
        return {at: coords, value};
    }
}

export {Game};