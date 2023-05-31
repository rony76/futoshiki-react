class Coordinates {
    readonly row: number;
    readonly col: number;

    constructor(row: number, col: number) {
        if (row < 1 || col < 1) {
            throw new Error('Invalid value for coordinate');
        }
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

    isSameAs(other: Coordinates | null): boolean {
        if (this === other) return true;
        if (other === null) return false;
        return this.row === other.row && this.col === other.col;
    }

    isSiblingOf(other: Coordinates | null) {
        if (this === other) return true;
        if (other === null) return false;
        return this.row === other.row || this.col === other.col;
    }
}

export {Coordinates}
export function at(row: number, col: number): Coordinates {
    return new Coordinates(row, col);
}