import {Game} from "./model/Game";
import {useState} from "react";
import {createSampleGame} from "./model/SampleGame";

export function useGame(): Game | null {
    const [game, setGame] = useState<Game | null>(null);

    setTimeout(() => {
        setGame(createSampleGame());
    }, 800);

    return game;
}