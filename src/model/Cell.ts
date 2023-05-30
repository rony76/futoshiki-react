import {Coordinates} from "./Coordinates";

interface Cell {
    at: Coordinates,
    value?: number;
}

export type {Cell}