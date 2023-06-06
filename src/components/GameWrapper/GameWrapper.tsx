import React, {FC} from 'react';
import './GameWrapper.css';
import GameBoard from "../GameBoard/GameBoard";
import Instructions from "../Instructions/Instructions";
import {Coordinates} from "../../model/Coordinates";
import {Game} from "../../model/Game";

interface GameWrapperProps {
    game: Game,
    onUserValue: (coords: Coordinates, value: number | null) => void
}

const GameWrapper: FC<GameWrapperProps> = ({game, onUserValue}: GameWrapperProps) => {
    return (
        <div className="GameWrapper">
            <GameBoard game={game} onUserValue={onUserValue}/>
            <Instructions size={game.size}/>
        </div>
    );
};

export default GameWrapper;
