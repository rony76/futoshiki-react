import React, {FC} from 'react';
import './ValueCell.css';
import {Cell} from "../../model/Cell";

interface ValueCellProps {
    cell: Cell,
    isActive: boolean,
    onClick: () => void
}

const ValueCell: FC<ValueCellProps> = ({cell, isActive, onClick}: ValueCellProps) => {
    let className = "ValueCell";
    if (isActive) className += " active-cell"
    return (
        <td className={className} onClick={onClick}>
            {cell.value}
        </td>
    );
};

export default ValueCell;
