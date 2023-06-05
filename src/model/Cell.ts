type CellValueType = 'fixed' | 'user' | 'empty'

type Constraint = 'none' | 'lt' | 'gt';

class Constraints {
    readonly right: Constraint;
    readonly below: Constraint;

    private constructor(right: Constraint, below: Constraint) {
        this.right = right;
        this.below = below;
    }

    static none(): Constraints {
        return new Constraints('none', 'none');
    }

    constrainRight(constraint: Constraint): Constraints {
        return new Constraints(constraint, this.below);
    }

    constrainBelow(constraint: Constraint): Constraints {
        return new Constraints(this.right, constraint);
    }
}

class Cell {
    readonly constraints: Constraints
    readonly value: CellValue

    private constructor(constraints: Constraints, value: CellValue) {
        this.constraints = constraints;
        this.value = value;
    }

    static empty(): Cell {
        return new Cell(Constraints.none(), EmptyCell.get())
    }

    withValue(value: CellValue): Cell {
        return new Cell(this.constraints, value);
    }

    withRightConstraint(constraint: Constraint): Cell {
        return new Cell(this.constraints.constrainRight(constraint), this.value);
    }

    withBelowConstraint(constraint: Constraint): Cell {
        return new Cell(this.constraints.constrainBelow(constraint), this.value);
    }
}

interface CellValue {
    type: CellValueType,
    value: number | null
}

class ValueCell implements CellValue {
    readonly type: CellValueType;
    readonly value: number;

    constructor(type: CellValueType, value: number) {
        this.value = value;
        this.type = type;
    }

    toString(): string {
        return `${this.value} (${this.type})`;
    }
}

class EmptyCell implements CellValue {
    readonly type = 'empty';
    readonly value = null;

    private constructor() {
    }

    static instance: CellValue = new EmptyCell();

    static get(): CellValue {
        return EmptyCell.instance;
    }

    toString(): string {
        return 'empty';
    }
}

export type {CellValue, CellValueType, Constraint}
export {ValueCell, EmptyCell, Cell, Constraints}