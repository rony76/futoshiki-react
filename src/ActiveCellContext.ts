import {createContext} from "react";
import {Coordinates} from "./model/Coordinates";

type ActiveCellContextType = [Coordinates | null, (c: Coordinates | null) => void];

export const ActiveCellContext = createContext<ActiveCellContextType>([null, () => {
    throw new Error('Please initial state setter');
}]);