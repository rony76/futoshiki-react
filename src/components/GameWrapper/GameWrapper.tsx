import React, {FC} from 'react';
import './GameWrapper.css';
import GameBoard from "../GameBoard/GameBoard";
import {useGame} from "../../hooks/useGame";
import Loading from "../Loading/Loading";
import Instructions from "../Instructions/Instructions";

interface GameWrapperProps {
}

const GameWrapper: FC<GameWrapperProps> = () => {
    const game = useGame();
    return (
        <div className="GameWrapper">
            {game && <GameBoard game={game}/>}
            {!game && <Loading/>}
            {game && <Instructions size={game.size}/>}
        </div>
    );
};

export default GameWrapper;
