import React, {FC} from 'react';
import './GameBoard.css';
import ValueRow from "../ValueRow/ValueRow";
import GapRow from "../GapRow/GapRow";
import {Game} from "../../model/Game";

interface GameBoardProps {
    game: Game
}

const GameBoard: FC<GameBoardProps> = ({game}: GameBoardProps) => {
    let cells = Array<JSX.Element>();

    for (let row = 1; row <= game.size; row++) {
        cells = cells.concat(<ValueRow game={game} row={row}/>)
        if (row < game.size) {
            cells = cells.concat(<GapRow size={game.size}/>)
        }
    }

    return (
        <div className="GameBoard">
            {cells}
        </div>
    );
};

export default GameBoard;
