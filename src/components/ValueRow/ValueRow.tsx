import React, {FC} from 'react';
import './ValueRow.css';
import {Game} from "../../model/Game";
import ValueCell from "../ValueCell/ValueCell";
import {at} from "../../model/Coordinates";
import HorizontalGap from "../HorizontalGap/HorizontalGap";

interface ValueRowProps {
    game: Game,
    row: number
}

const ValueRow: FC<ValueRowProps> = ({game, row}: ValueRowProps) => {
    const elements = Array<JSX.Element>();

    for (let col = 1; col <= game.size; col++) {
        const coords = at(row, col);

        elements.push(<ValueCell key={"val" + col} game={game} coords={coords}/>)

        if (col < game.size) {
            elements.push(<HorizontalGap key={"gap" + col} game={game} coords={coords}/>)
        }
    }

    return (
        <tr>{elements}</tr>
    );
}

export default ValueRow;
