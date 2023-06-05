import React, {FC, useCallback} from 'react';
import './GameWrapper.css';
import GameBoard from "../GameBoard/GameBoard";
import {useGame} from "../../hooks/useGame";
import Loading from "../Loading/Loading";
import Instructions from "../Instructions/Instructions";
import {Coordinates} from "../../model/Coordinates";

interface GameWrapperProps {
}

const GameWrapper: FC<GameWrapperProps> = () => {
    const [game, setGame] = useGame();

    const onUserValue = useCallback((coords: Coordinates, value: number | null) => {
            if (game) {
                if (value)
                    setGame(game.withUserValue(coords, value));
                else
                    setGame(game.withBlank(coords));
            }
        },
        [game]
    )

    return (
        <div className="GameWrapper">
            {game && <GameBoard game={game} onUserValue={onUserValue}/>}
            {!game && <Loading/>}
            {game && <Instructions size={game.size}/>}
        </div>
    );
};

export default GameWrapper;
