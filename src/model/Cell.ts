type CellType = 'fixed' | 'user' | 'empty'

interface Cell {
    type: CellType,
    value: number | null
}

class ValueCell implements Cell {
    readonly type: CellType;
    readonly value: number;

    constructor(type: CellType, value: number) {
        this.value = value;
        this.type = type;
    }
}

class EmptyCell implements Cell {
    readonly type = 'empty';
    readonly value = null;

    private constructor() {
    }

    static instance: Cell = new EmptyCell();

    static get(): Cell {
        return EmptyCell.instance;
    }
}

export type {Cell}
export {ValueCell, EmptyCell}