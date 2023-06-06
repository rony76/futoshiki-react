import React, {FC, useEffect, useRef, useState} from 'react';
import './GameBoard.css';
import ValueRow from "../ValueRow/ValueRow";
import GapRow from "../GapRow/GapRow";
import {Game} from "../../model/Game";
import {Coordinates} from "../../model/Coordinates";
import {ActiveCellContext} from '../../ActiveCellContext';
import {keyHandler} from "./KeyHandler";

interface GameBoardProps {
    game: Game,
    onUserValue: (coords: Coordinates, value: number | null) => void
}

const GameBoard: FC<GameBoardProps> = ({game, onUserValue}: GameBoardProps) => {
    const tableRef = useRef<HTMLTableElement>(null);
    useEffect(() => {
        if (tableRef.current) {
            tableRef.current.focus();
        }
    }, [])

    const [activeCell, setActiveCell] = useState<Coordinates | null>(null);

    let cells = Array<JSX.Element>();

    const onKeyDown = keyHandler(game, activeCell, setActiveCell, onUserValue);

    for (let row = 1; row <= game.size; row++) {
        cells = cells.concat(<ValueRow game={game} row={row} key={"val" + row}/>)
        if (row < game.size) {
            cells = cells.concat(<GapRow game={game} afterRow={row} key={"gap" + row}/>)
        }
    }

    return (
        <table className="GameBoard" tabIndex={0} onKeyDown={onKeyDown} ref={tableRef}>
            <tbody>
            <ActiveCellContext.Provider value={[activeCell, setActiveCell]}>
                {cells}
            </ActiveCellContext.Provider>
            </tbody>
        </table>
    );
};

export default GameBoard;
