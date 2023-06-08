import React, {FC, useContext} from 'react';
import './ValueCell.css';
import {Coordinates} from "../../model/Coordinates";
import {Game} from "../../model/Game";
import {ActiveCoordsContext} from "../../ActiveCoordsContext";

interface ValueCellProps {
    game: Game,
    coords: Coordinates
}

const ValueCell: FC<ValueCellProps> = ({game, coords}: ValueCellProps) => {
    const [activeCoords, setActiveCoords] = useContext(ActiveCoordsContext);

    const cell = game.getCellValue(coords);
    const cellIsActive = coords.isSameAs(activeCoords);
    const cellIsSibling = !cellIsActive && coords.isSiblingOf(activeCoords);

    const onClick = () => {
        if (cell.type === 'fixed') {
            return;
        }
        setActiveCoords(coords);
    };

    let className = 'ValueCell';
    if (cellIsActive) className += ' active-cell'
    if (cellIsSibling) className += ' sibling-cell'
    if (cell.type === 'user') className += ' user-value'
    if (cell.type === 'fixed') className += ' fixed-value'
    if (game.getStatus(coords) === "not-unique") className += ' non-unique-value';

    return (
        <td className={className} onClick={onClick}>
            {cell.value}
        </td>
    );
};

export default ValueCell;
