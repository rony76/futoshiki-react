import React, {FC, useCallback} from 'react';
import './GameLoader.css';
import {useGame} from "../../hooks/useGame";
import {Coordinates} from "../../model/Coordinates";
import Loading from "../Loading/Loading";
import GameWrapper from "../GameWrapper/GameWrapper";

interface GameLoaderProps {}

const GameLoader: FC<GameLoaderProps> = () => {
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
        <div className="GameLoader">
            {game && <GameWrapper game={game} onUserValue={onUserValue}/>}
            {!game && <Loading/>}
        </div>
    );
};

export default GameLoader;
