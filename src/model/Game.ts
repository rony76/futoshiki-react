import {Coordinates} from "./Coordinates";
import {Cell} from "./Cell";

class Game {
    readonly size: number;
    private cells: Array<number>;

    constructor(size: number) {
        if (size <= 0) {
            throw new Error('invalid game size');
        }

        this.size = size;
        this.cells = new Array(size * size);
    }

    setFixed(coords: Coordinates, value: number): void {
        this.cells[this.coordsToIndex(coords)] = value;
    }

    getCell(coords: Coordinates): Cell {
        const value = this.cells[this.coordsToIndex(coords)];
        return {at: coords, value};
    }

    private coordsToIndex(coords: Coordinates): number {
        if (coords[0] <= 0 || coords[0] > this.size) {
            throw new Error('invalid row coordinate');
        }
        if (coords[1] <= 0 || coords[1] > this.size) {
            throw new Error('invalid column coordinate');
        }
        return (coords[0] - 1) * this.size + (coords[1] - 1);
    }
}

export {Game};