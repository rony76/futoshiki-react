import {Coordinates} from "./Coordinates";
import {Cell, CellValue, Constraint, ValueCell} from "./Cell";

class Game {
    readonly size: number;
    private readonly cells: Array<Cell>;

    private constructor(size: number, cells: Array<Cell>) {
        this.size = size;
        this.cells = cells;
    }

    public static emptyForSize(size: number): Game {
        if (size <= 0) {
            throw new Error('invalid game size');
        }
        const cells = new Array(size * size);
        cells.fill(Cell.empty());

        return new Game(size, cells);
    }

    setFixedValue(coords: Coordinates, value: number): void {
        this.updateCellAt(coords, c => c.withValue(new ValueCell('fixed', value)));
    }

    private updateCellAt(coords: Coordinates, cellUpdater: (c: Cell) => Cell) {
        const index = coords.toIndex(this.size);
        this.cells[index] = cellUpdater(this.cells[index]);
    }

    withUserValue(coords: Coordinates, value: number): Game {
        const index = coords.toIndex(this.size);
        if (this.cells[index].value.type === 'fixed') {
            throw new Error('Cannot override fixed value with user value')
        }

        let newValue = new ValueCell('user', value);
        return new Game(
            this.size,
            this.cells.map((cell, idx) => idx === index ? cell.withValue(newValue) : cell));
    }

    private getCell(coords: Coordinates) {
        return this.cells[coords.toIndex(this.size)];
    }

    getCellValue(coords: Coordinates): CellValue {
        return this.getCell(coords).value
    }

    getConstraintWithRight(coords: Coordinates): Constraint {
        return this.getCell(coords).constraints.right;
    }

    setConstraintWithRight(coords: Coordinates, constraint: Constraint) {
        this.updateCellAt(coords, c => c.withRightConstraint(constraint));
    }

    getConstraintWithBelow(coords: Coordinates): Constraint {
        return this.getCell(coords).constraints.below;
    }

    setConstraintWithBelow(coords: Coordinates, constraint: Constraint) {
        this.updateCellAt(coords, c => c.withBelowConstraint(constraint))
    }

    public toString = () : string => {
        return `Game of size ${this.size}`;
    }
}

export {Game};