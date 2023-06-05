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

const violates = (c: Constraint, v1: number, v2: number): boolean => {
    switch (c) {
        case "none":
            return false;
        case "lt":
            return v1 >= v2;
        case "gt":
            return v1 <= v2;
    }
};

export {Constraints};
export type {Constraint};
export {violates};