import React, {FC, useEffect, useRef, useState} from 'react';
import './GameBoard.css';
import {Game} from "../../model/Game";
import {Coordinates} from "../../model/Coordinates";
import {ActiveCoordsContext} from '../../ActiveCoordsContext';
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

    const [activeCoords, setActiveCoords] = useState<Coordinates | null>(null);

    const onKeyDown = keyHandler(game, activeCoords, setActiveCoords, onUserValue);

    return (
        <div className="GameBoard" onKeyDown={onKeyDown} tabIndex={0} ref={tableRef}>
            <ActiveCoordsContext.Provider value={[activeCoords, setActiveCoords]}>
                <GameTable game={game} />
            </ActiveCoordsContext.Provider>
        </div>
    );
};

export default GameBoard;
