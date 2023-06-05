import React, {FC} from 'react';
import './GapRow.css';
import {Game} from "../../model/Game";
import {at} from "../../model/Coordinates";
import VerticalGap from "../VerticalGap/VerticalGap";

interface GapRowProps {
    game: Game,
    afterRow: number
}
const GapRow: FC<GapRowProps> = ({game, afterRow}: GapRowProps) => {
    let result = Array<JSX.Element>();

    for (let col = 1; col <= game.size; col++) {
        const coords = at(afterRow, col);
        result.push(<VerticalGap key={"val" + col} game={game} coords={coords} />)
        if (col < game.size) {
            result.push(<td className="grid-neutral-gap" key={"gap" + col}/>)
        }
    }

    return (
        <tr className="GapRow">
            {result}
        </tr>
    );
};

export default GapRow;
