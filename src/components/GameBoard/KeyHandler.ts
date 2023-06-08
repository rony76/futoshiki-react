import {at, Coordinates, Direction} from "../../model/Coordinates";
import React from "react";
import {Game} from "../../model/Game";
import {CellValue} from "../../model/Cell";

type KeyHandler = (e: React.KeyboardEvent,
                   game: Game,
                   activeCoords: Coordinates | null,
                   setActiveCoords: (c: Coordinates | null) => void,
                   onUserValue: (c: Coordinates, value: number | null) => void) => boolean;

const escHandler: KeyHandler = (e, game, activeCoords, setActiveCoords) => {
    if (e.key !== 'Escape') return false;
    setActiveCoords(null);
    return true;
}

const arrowHandler: KeyHandler = (e, game, activeCoords, setActiveCoords) => {
    const getArrowKeyDirection = (key: string): Direction | null => {
        switch (key) {
            case 'ArrowLeft':
                return 'left';
            case 'ArrowRight':
                return 'right';
            case 'ArrowUp':
                return 'up';
            case 'ArrowDown':
                return 'down';
            default:
                return null;
        }
    };

    const dir: Direction | null = getArrowKeyDirection(e.key);
    if (!dir) return false;
    if (activeCoords) {
        if (activeCoords.canMove(dir, game.size)) {
            setActiveCoords(activeCoords.getNextGoing(dir, game.size))
        }
    } else {
        setActiveCoords(at(1, 1))
    }
    return true;
}

function cellCanBeEdited(cell: CellValue) {
    return cell.type !== 'fixed';
}

const valueHandler: KeyHandler = (e, game, activeCoords, setActiveCoords, onUserValue) => {
    const val = parseInt(e.key);
    if (isNaN(val)) return false;

    function isValidValue() {
        return val > 0 && val <= game.size;
    }

    if (activeCoords) {
        const cell = game.getCellValue(activeCoords);
        if (isValidValue() && cellCanBeEdited(cell)) {
            onUserValue(activeCoords, val);
        }
    }

    return true;
}

const deleteHandler: KeyHandler = (e, game, activeCoords, setActiveCoords, onUserValue) => {
    if (e.key !== 'Delete' && e.key !== 'Backspace' && e.key !== ' ') return false;

    if (activeCoords) {
        const cell = game.getCellValue(activeCoords);
        if (cellCanBeEdited(cell)) {
            onUserValue(activeCoords, null);
        }
    }

    return true;
}

const handlers: KeyHandler[] = [escHandler, arrowHandler, valueHandler, deleteHandler];

export const keyHandler = (game: Game,
                           activeCoords: Coordinates | null,
                           setActiveCoords: (c: Coordinates | null) => void,
                           onUserValue: (c: Coordinates, value: number | null) => void): (e: React.KeyboardEvent) => void => e => {
    for (let i = 0; i < handlers.length; i++) {
        if (handlers[i](e, game, activeCoords, setActiveCoords, onUserValue))
            return;
    }

    console.log('Unhandled ', e.key)
};