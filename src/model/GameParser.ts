import {Game} from "./Game";
import * as ohm from 'ohm-js';

function parseGame(definition: string): Game {
    const grammar = ohm.grammar(String.raw`
        FutoshikiGameGrammar {
            GameDef = SizeDef

            SizeDef = "size" ":" num

            num = digit+
        }
    `);

    let semantics = grammar.createSemantics();

    semantics.addOperation<Game>('game', {
        GameDef(sizeDef) {
            return sizeDef.asGame();
        },
    })
    semantics.addOperation<Game>('asGame', {
        SizeDef(_size, _colon, size) {
            return new Game(size.asNum());
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