import React, {FC, useState} from 'react';
import './GameBoard.css';
import ValueRow from "../ValueRow/ValueRow";
import GapRow from "../GapRow/GapRow";
import {Game} from "../../model/Game";
import {Coordinates, Direction} from "../../model/Coordinates";
import {ActiveCellContext} from '../../ActiveCellContext';

interface GameBoardProps {
    game: Game
}

function getArrowKeyDirection(key: string): Direction | null {
    switch (key) {
        case 'ArrowLeft':
            return 'left';
        case 'ArrowRight':
            return 'right';
        case 'ArrowUp':
            return 'up';
        case 'ArrowDown':
            return 'down';
        default:
            return null;
    }
}

const GameBoard: FC<GameBoardProps> = ({game}: GameBoardProps) => {
    const [activeCell, setActiveCell] = useState<Coordinates | null>(null);

    let cells = Array<JSX.Element>();

    const captureKeys = (e: React.KeyboardEvent) => {
        if (!activeCell) return;

        const dir: Direction | null = getArrowKeyDirection(e.key);

        if (dir !== null) {
            if (activeCell.canMove(dir, game.size)) {
                setActiveCell(activeCell.getNextGoing(dir, game.size))
            }
        } else if (e.key === 'Escape') {
            setActiveCell(null);
        }
    }

    for (let row = 1; row <= game.size; row++) {
        cells = cells.concat(<ValueRow game={game} row={row} key={"val" + row}/>)
        if (row < game.size) {
            cells = cells.concat(<GapRow game={game} afterRow={row} key={"gap" + row}/>)
        }
    }

    return (
        <table className="GameBoard" tabIndex={0} onKeyDown={captureKeys}>
            <tbody>
            <ActiveCellContext.Provider value={[activeCell, setActiveCell]}>
                {cells}
            </ActiveCellContext.Provider>
            </tbody>
        </table>
    );
};

export default GameBoard;
