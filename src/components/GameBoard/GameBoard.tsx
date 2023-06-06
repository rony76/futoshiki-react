import React, {FC, useEffect, useRef, useState} from 'react';
import './GameBoard.css';
import {Game} from "../../model/Game";
import {Coordinates} from "../../model/Coordinates";
import {ActiveCellContext} from '../../ActiveCellContext';
import {keyHandler} from "./KeyHandler";
import GameTable from "../GameTable/GameTable";

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

    const onKeyDown = keyHandler(game, activeCell, setActiveCell, onUserValue);

    return (
        <div className="GameBoard" onKeyDown={onKeyDown} tabIndex={0} ref={tableRef}>
            <ActiveCellContext.Provider value={[activeCell, setActiveCell]}>
                <GameTable game={game} />
            </ActiveCellContext.Provider>
        </div>
    );
};

export default GameBoard;
