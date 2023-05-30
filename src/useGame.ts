import {Game} from "./model/Game";
import {useState} from "react";
import {createSampleGame} from "./model/SampleGame";

export function useGame(size: number): Game | null {
    const [game, setGame] = useState<Game | null>(null);

    setTimeout(() => {
        setGame(createSampleGame(size));
    }, 800);

    return game;
}