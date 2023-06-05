import React, {FC, useContext} from 'react';
import './ValueCell.css';
import {Coordinates} from "../../model/Coordinates";
import {Game} from "../../model/Game";
import {ActiveCellContext} from "../../ActiveCellContext";

interface ValueCellProps {
    game: Game,
    coords: Coordinates
}

const ValueCell: FC<ValueCellProps> = ({game, coords}: ValueCellProps) => {
    const [activeCell, setActiveCell] = useContext(ActiveCellContext);

    const cell = game.getCellValue(coords);
    const cellIsActive = coords.isSameAs(activeCell);
    const cellIsSibling = !cellIsActive && coords.isSiblingOf(activeCell);

    const onClick = () => {
        if (cell.type === 'fixed') {
            return;
        }
        setActiveCell(coords);
    };

    let className = 'ValueCell';
    if (cellIsActive) className += ' active-cell'
    if (cellIsSibling) className += ' sibling-cell'
    if (cell.type === 'user') className += ' user-value'
    if (cell.type === 'fixed') className += ' fixed-value'
    return (
        <td className={className} onClick={onClick}>
            {cell.value}
        </td>
    );
};

export default ValueCell;
