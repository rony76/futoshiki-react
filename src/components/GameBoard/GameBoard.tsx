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
        cells = cells.concat(<ValueRow game={game} row={row} key={"val" + row}/>)
        if (row < game.size) {
            cells = cells.concat(<GapRow game={game} afterRow={row} key={"gap" + row}/>)
        }
    }

    return (
        <table className="GameBoard">
            {cells}
        </table>
    );
};

export default GameBoard;
