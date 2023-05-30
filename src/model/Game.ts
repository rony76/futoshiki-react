import {Coordinates} from "./Coordinates";
import {Cell, EmptyCell, ValueCell} from "./Cell";

type Constraint = 'none' | 'lt' | 'gt';

class Game {
    readonly size: number;
    private readonly cells: Array<Cell>;
    private readonly rowConstraints: Array<Constraint>;
    private readonly colConstraints: Array<Constraint>;

    constructor(size: number) {
        if (size <= 0) {
            throw new Error('invalid game size');
        }

        this.size = size;
        this.cells = new Array(size * size);
        this.rowConstraints = new Array(size * size);
        this.colConstraints = new Array(size * size);
    }

    setFixed(coords: Coordinates, value: number): void {
        this.cells[coords.toIndex(this.size)] = new ValueCell('fixed', value);
    }

    getCell(coords: Coordinates): Cell {
        return this.cells[coords.toIndex(this.size)] || EmptyCell.get()
    }

    getConstraintWithRight(coords: Coordinates): Constraint {
        return this.rowConstraints[coords.toIndex(this.size)] || 'none';
    }

    setConstraintWithRight(coords: Coordinates, constraint: Constraint) {
        this.rowConstraints[coords.toIndex(this.size)] = constraint;
    }

    getConstraintWithBelow(coords: Coordinates): Constraint {
        return this.colConstraints[coords.toIndex(this.size)] || 'none';
    }

    setConstraintWithBelow(coords: Coordinates, constraint: Constraint) {
        this.colConstraints[coords.toIndex(this.size)] = constraint;
    }
}

export type {Constraint};
export {Game};