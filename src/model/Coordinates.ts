class Coordinates {
    readonly row: number;
    readonly col: number;

    constructor(row: number, col: number) {
        this.row = row;
        this.col = col;
    }

    toIndex(boardSize: number): number {
        if (this.row < 1 || this.row > boardSize) {
            throw new Error('invalid row coordinate');
        }
        if (this.col < 1 || this.col > boardSize) {
            throw new Error('invalid column coordinate');
        }
        return (this.row - 1) * boardSize + (this.col - 1);
    }
}

export {Coordinates}