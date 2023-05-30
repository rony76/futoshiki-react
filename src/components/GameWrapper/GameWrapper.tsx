import React, {FC} from 'react';
import './GameWrapper.css';
import GameBoard from "../GameBoard/GameBoard";
import {useGame} from "../../useGame";

interface GameWrapperProps {
    size: number
}

const GameWrapper: FC<GameWrapperProps> = ({size}: GameWrapperProps) => {
    const game = useGame(size);
    return (
        <div className="GameWrapper">
            <GameBoard game={game}/>
        </div>
    );
};

export default GameWrapper;
