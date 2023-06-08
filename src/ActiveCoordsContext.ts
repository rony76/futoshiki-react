import {createContext} from "react";
import {Coordinates} from "./model/Coordinates";

type ActiveCoordsContextType = [Coordinates | null, (c: Coordinates | null) => void];

export const ActiveCoordsContext = createContext<ActiveCoordsContextType>([null, () => {
    throw new Error('Please initial state setter');
}]);