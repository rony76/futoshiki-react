import {at, Coordinates, Direction} from "../../model/Coordinates";
import React from "react";
import {Game} from "../../model/Game";
import {CellValue} from "../../model/Cell";

type KeyHandler = (e: React.KeyboardEvent,
                   game: Game,
                   activeCell: Coordinates | null,
                   setActiveCell: (c: Coordinates | null) => void,
                   onUserValue: (c: Coordinates, value: number | null) => void) => boolean;

const escHandler: KeyHandler = (e, game, activeCell, setActiveCell) => {
    if (e.key !== 'Escape') return false;
    setActiveCell(null);
    return true;
}

const arrowHandler: KeyHandler = (e, game, activeCell, setActiveCell) => {
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
    if (activeCell) {
        if (activeCell.canMove(dir, game.size)) {
            setActiveCell(activeCell.getNextGoing(dir, game.size))
        }
    } else {
        setActiveCell(at(1, 1))
    }
    return true;
}

function cellCanBeEdited(cell: CellValue) {
    return cell.type !== 'fixed';
}

const valueHandler: KeyHandler = (e, game, activeCell, setActiveCell, onUserValue) => {
    const val = parseInt(e.key);
    if (isNaN(val)) return false;

    function isValidValue() {
        return val > 0 && val <= game.size;
    }

    if (activeCell) {
        const cell = game.getCellValue(activeCell);
        if (isValidValue() && cellCanBeEdited(cell)) {
            onUserValue(activeCell, val);
        }
    }

    return true;
}

const deleteHandler: KeyHandler = (e, game, activeCell, setActiveCell, onUserValue) => {
    if (e.key !== 'Delete' && e.key !== 'Backspace' && e.key !== ' ') return false;

    if (activeCell) {
        const cell = game.getCellValue(activeCell);
        if (cellCanBeEdited(cell)) {
            onUserValue(activeCell, null);
        }
    }

    return true;
}

const handlers: KeyHandler[] = [escHandler, arrowHandler, valueHandler, deleteHandler];

export const keyHandler = (game: Game,
                           activeCell: Coordinates | null,
                           setActiveCell: (c: Coordinates | null) => void,
                           onUserValue: (c: Coordinates, value: number | null) => void): (e: React.KeyboardEvent) => void => e => {
    for (let i = 0; i < handlers.length; i++) {
        if (handlers[i](e, game, activeCell, setActiveCell, onUserValue))
            return;
    }

    console.log('Unhandled ', e.key)
};