import {at, Coordinates} from "./Coordinates";
import {Cell, CellValue, Constraint, ValueCell} from "./Cell";

type CellStatus = 'ok' | 'not-unique'

const rowColIterate = (size: number, action: (row: number, col: number) => void) => {
    for (let row = 1; row <= size; row++) {
        for (let col = 1; col <= size; col++) {
            action(row, col);
        }
    }
}

class Game {
    readonly size: number;
    private readonly cells: Array<Cell>;
    private readonly statuses: Array<CellStatus>;

    private constructor(size: number, cells: Array<Cell>) {
        this.size = size;
        this.cells = cells;
        this.statuses = this.validate();
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

        const newValue = new ValueCell('user', value);
        const updatedCells = this.cells.map((cell, idx) => idx === index ? cell.withValue(newValue) : cell);
        return new Game(
            this.size,
            updatedCells);
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

    public toString = (): string => {
        return `Game of size ${this.size}`;
    }

    getStatus(coords: Coordinates): CellStatus {
        const index = coords.toIndex(this.size);
        return this.statuses[index];
    }

    private validate(): Array<CellStatus> {
        function initBidimensionalCheck(size: number) {
            const check = Array(size);
            for (let i = 0; i < size; i++) {
                check[i] = Array(size);
                check[i].fill(0);
            }
            return check;
        }

        const rowChecks = initBidimensionalCheck(this.size);
        const colChecks = initBidimensionalCheck(this.size);


        rowColIterate(this.size, (row, col) => {
            const index = at(row, col);
            const maybeValue = this.getCell(index).value.value
            if (maybeValue) {
                rowChecks[row - 1][maybeValue - 1]++;
                colChecks[col - 1][maybeValue - 1]++;
            }
        });

        const statuses = Array<CellStatus>(this.size * this.size);

        rowColIterate(this.size, (row, col) => {
            const index = at(row, col).toIndex(this.size);
            const maybeValue = this.cells[index].value.value
            if (maybeValue) {
                const rowConflict = rowChecks[row - 1][maybeValue - 1] > 1;
                const colConflict = colChecks[col - 1][maybeValue - 1] > 1;
                if (rowConflict || colConflict) {
                    statuses[index] = 'not-unique'
                } else {
                    statuses[index] = 'ok';
                }
            } else {
                statuses[index] = 'ok';
            }
        });

        return statuses;
    }
}

export {Game, rowColIterate};
export type {CellStatus};