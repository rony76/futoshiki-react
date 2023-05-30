import {Game} from "./Game";
import * as ohm from 'ohm-js';
import {Coordinates} from "./Coordinates";

function parseGame(definition: string): Game {
    const grammar = ohm.grammar(String.raw`
        FutoshikiGameGrammar {
            GameDef = SizeDef FixedValues

            SizeDef = "size" ":" num

            FixedValues = FixedValue* 
            FixedValue = Coordinates ":" num
            
            Coordinates = "[" num "," num "]"

            num = digit+
        }
    `);

    let semantics = grammar.createSemantics();

    semantics.addOperation<Game>('game', {
        GameDef(sizeDef, fixedValues) {
            const game = sizeDef.asGame();
            fixedValues.configure(game);
            return game;
        },
    })
    semantics.addOperation<Game>('asGame', {
        SizeDef(_size, _colon, size) {
            return new Game(size.asNum());
        }
    })
    semantics.addOperation<void>('configure(g)', {
        FixedValues(f) {
            const game: Game = this.args.g;
            f.children.forEach(fv => fv.configure(game));
        },
        FixedValue(coords, _colon, val) {
            const game: Game = this.args.g;
            game.setFixed(coords.asCoords(), val.asNum());
        },
    })
    semantics.addOperation<Coordinates>('asCoords', {
        Coordinates(_openBracket, row, _comma, column, _closedBracket) {
            return new Coordinates(row.asNum(), column.asNum());
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