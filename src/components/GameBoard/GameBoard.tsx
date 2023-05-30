import React, {FC} from 'react';
import './GameBoard.css';
import ValueRow from "../ValueRow/ValueRow";
import GapRow from "../GapRow/GapRow";

interface GameBoardProps {
    size: number,
}
const GameBoard: FC<GameBoardProps> = ({size} : { size: number }) => {
    let cells = Array<JSX.Element>();

    for (let row = 0; row < size; row++) {
        cells = cells.concat(<ValueRow row={row} size={size} />)
        if (row < size - 1) {
            cells = cells.concat(<GapRow size={size}/>)
        }
    }

    return (
        <div className="GameBoard">
            {cells}
        </div>
    );
};

export default GameBoard;
