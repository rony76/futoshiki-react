import {Game} from "./Game";
import * as ohm from 'ohm-js';
import {at, Coordinates} from "./Coordinates";

type Direction = 'right' | 'below'
type ComparisonOperator = 'lt' | 'gt'

function parseGame(definition: string): Game {
    const grammar = ohm.grammar(String.raw`
        FutoshikiGameGrammar {
            GameDef = SizeDef Configurations

            SizeDef = "size" ":" num

            Configurations = FixedValues Constraints

            FixedValues = FixedValue* 
            FixedValue = Coordinates ":" num

            Constraints = Constraint*
            Constraint = Coordinates Comparison Direction
            Comparison = "greater" "than" -- gt
                | "less" "than"           -- lt
            Direction = "right"           -- right
                | "below"                 -- below
            
            Coordinates = "[" num "," num "]"
            num = digit+
        }
    `);

    let semantics = grammar.createSemantics();

    semantics.addOperation<Game>('game', {
        GameDef(sizeDef, configurations) {
            const game = sizeDef.asGame();
            configurations.configure(game);
            return game;
        },
    })
    semantics.addOperation<Game>('asGame', {
        SizeDef(_size, _colon, size) {
            return Game.emptyForSize(size.asNum());
        }
    })
    semantics.addOperation<void>('configure(g)', {
        Configurations(fixedValues, constraints) {
            const game: Game = this.args.g;
            fixedValues.configure(game);
            constraints.configure(game);
        },
        FixedValues(f) {
            const game: Game = this.args.g;
            f.children.forEach(fv => fv.configure(game));
        },
        FixedValue(coords, _colon, val) {
            const game: Game = this.args.g;
            game.setFixedValue(coords.asCoords(), val.asNum());
        },
        Constraints(c) {
            const game: Game = this.args.g;
            c.children.forEach(c => c.configure(game));
        },
        Constraint(coords, comparison, direction) {
            const game: Game = this.args.g;
            switch (direction.asDir()) {
                case 'right':
                    game.setConstraintWithRight(coords.asCoords(), comparison.asOp());
                    break;
                case 'below':
                    game.setConstraintWithBelow(coords.asCoords(), comparison.asOp());
                    break;
            }
        }
    })
    semantics.addOperation<Coordinates>('asCoords', {
        Coordinates(_openBracket, row, _comma, column, _closedBracket) {
            return at(row.asNum(), column.asNum());
        }
    })
    semantics.addOperation<Direction>('asDir', {
        Direction_right(_r) {
            return 'right'
        },
        Direction_below(_l) {
            return 'below'
        }
    })
    semantics.addOperation<ComparisonOperator>('asOp', {
        Comparison_lt(_l, _t) {
            return 'lt'
        },
        Comparison_gt(_g, _t) {
            return 'gt'
        }
    })
    semantics.addOperation<number>('asNum', {
        num(_e) {
            return parseInt(this.sourceString, 10);
        }
    })

    let match = grammar.match(definition);
    if (match.failed()) {
        console.error("Parse error: ", match.message)
        throw new Error('Failed matching the grammar')
    }

    return semantics(match).game();
}

export {parseGame};