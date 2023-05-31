import {Game} from "../model/Game";
import {useEffect, useState} from "react";
import {createSampleGame} from "../model/SampleGame";

export function useGame(): [Game | null, (g: Game) => void] {
    const [game, setGame] = useState<Game | null>(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setGame(createSampleGame());
        }, 800);

        return () => {
            clearTimeout(timeout);
        }
    }, [])

    return [game, setGame];
}