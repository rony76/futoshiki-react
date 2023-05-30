class Coordinates {
    readonly row: number;
    readonly col: number;

    constructor(row: number, col: number) {
        this.row = row;
        this.col = col;
    }

    toIndex(boardSize: number): number {
        if (this.row < 1 || this.row > boardSize) {
            throw new Error('invalid row coordinate ' + this.row);
        }
        if (this.col < 1 || this.col > boardSize) {
            throw new Error('invalid column coordinate ' + this.col);
        }
        return (this.row - 1) * boardSize + (this.col - 1);
    }

    toString(): string {
        return `[${this.row}, ${this.col}]`
    }
}

export {Coordinates}
export function at(row: number, col: number): Coordinates {
    return new Coordinates(row, col);
}