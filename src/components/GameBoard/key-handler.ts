import {at, Coordinates, Direction} from "../../model/Coordinates";
import React from "react";
import {Game} from "../../model/Game";
import {CellValue} from "../../model/Cell";

type KeyHandler = (e: React.KeyboardEvent,
                   game: Game,
                   activeCell: Coordinates | null,
                   setActiveCell: (c: Coordinates | null) => void,
                   onUserValue: (c: Coordinates, value: number) => void) => boolean;

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

const valueHandler: KeyHandler = (e, game, activeCell, setActiveCell, onUserValue) => {
    const val = parseInt(e.key);
    if (isNaN(val)) return false;

    function isValidValue() {
        return val > 0 && val <= game.size;
    }

    function cellCanBeEdited(cell: CellValue) {
        return cell.type !== 'fixed';
    }

    if (activeCell) {
        const cell = game.getCellValue(activeCell);
        if (isValidValue() && cellCanBeEdited(cell)) {
            onUserValue(activeCell, val);
        }
    }

    return true;
}

const handlers: KeyHandler[] = [escHandler, arrowHandler, valueHandler];

export const keyHandler = (game: Game,
                           activeCell: Coordinates | null,
                           setActiveCell: (c: Coordinates | null) => void,
                           onUserValue: (c: Coordinates, value: number) => void): (e: React.KeyboardEvent) => void => e => {
    for (let i = 0; i < handlers.length; i++) {
        if (handlers[i](e, game, activeCell, setActiveCell, onUserValue))
            return;
    }
};