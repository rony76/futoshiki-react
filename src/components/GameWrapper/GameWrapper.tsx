import React, {FC} from 'react';
import './GameWrapper.css';
import GameBoard from "../GameBoard/GameBoard";
import {useGame} from "../../useGame";
import Loading from "../Loading/Loading";

interface GameWrapperProps {
}

const GameWrapper: FC<GameWrapperProps> = () => {
    const game = useGame();
    return (
        <div className="GameWrapper">
            {game && <GameBoard game={game}/>}
            {!game && <Loading /> }
        </div>
    );
};

export default GameWrapper;
