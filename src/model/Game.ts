import {Coordinates} from "./Coordinates";
import {Cell, EmptyCell, ValueCell} from "./Cell";

class Game {
    readonly size: number;
    private readonly cells: Array<Cell>;

    constructor(size: number) {
        if (size <= 0) {
            throw new Error('invalid game size');
        }

        this.size = size;
        this.cells = new Array(size * size);
    }

    setFixed(coords: Coordinates, value: number): void {
        this.cells[coords.toIndex(this.size)] = new ValueCell('fixed', value);
    }

    getCell(coords: Coordinates): Cell {
        return this.cells[coords.toIndex(this.size)] || EmptyCell.get()
    }
}

export {Game};