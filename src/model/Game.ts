import {Coordinates} from "./Coordinates";
import {Cell, EmptyCell, ValueCell} from "./Cell";

type Constraint = 'none' | 'lt' | 'gt';

class Game {
    readonly size: number;
    private readonly cells: Array<Cell>;
    private readonly rowConstraints: Array<Constraint>;
    private readonly colConstraints: Array<Constraint>;

    private constructor(size: number, cells: Array<Cell>, rowConstraints: Array<Constraint>, colConstraints: Array<Constraint>) {
        this.size = size;
        this.cells = cells;
        this.rowConstraints = rowConstraints;
        this.colConstraints = colConstraints;
    }

    public static emptyForSize(size: number): Game {
        if (size <= 0) {
            throw new Error('invalid game size');
        }
        const cells = new Array(size * size);
        cells.fill(EmptyCell.instance);
        const rowConstraints = new Array(size * size);
        const colConstraints = new Array(size * size);

        return new Game(size, cells, rowConstraints, colConstraints);
    }

    setFixedValue(coords: Coordinates, value: number): void {
        this.cells[coords.toIndex(this.size)] = new ValueCell('fixed', value);
    }

    withUserValue(coords: Coordinates, value: number): Game {
        let index = coords.toIndex(this.size);
        if (this.cells[index].type === 'fixed') {
            throw new Error('Cannot override fixed value with user value')
        }

        return new Game(
            this.size,
            this.cells.map((cell, idx) => idx === index ? new ValueCell('user', value) : cell),
            this.rowConstraints,
            this.colConstraints);
    }

    getCell(coords: Coordinates): Cell {
        return this.cells[coords.toIndex(this.size)]
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

    public toString = () : string => {
        return `Game of size ${this.size}`;
    }
}

export type {Constraint};
export {Game};