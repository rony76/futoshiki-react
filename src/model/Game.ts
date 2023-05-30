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

    getRowConstraint(row: number, leftCellColumn: number): Constraint {
        return this.rowConstraints[new Coordinates(row, leftCellColumn).toIndex(this.size)] || 'none';
    }

    setRowConstraint(row: number, leftCellColumn: number, constraint: Constraint) {
        this.rowConstraints[new Coordinates(row, leftCellColumn).toIndex(this.size)] = constraint;
    }

    getColumnConstraint(column: number, aboveCellRow: number): Constraint {
        return this.colConstraints[new Coordinates(aboveCellRow, column).toIndex(this.size)] || 'none';
    }

    setColumnConstraint(column: number, aboveCellRow: number, constraint: Constraint) {
        this.colConstraints[new Coordinates(aboveCellRow, column).toIndex(this.size)] = constraint;
    }
}

export type {Constraint};
export {Game};