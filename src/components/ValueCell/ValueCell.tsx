import React, {FC} from 'react';
import './ValueCell.css';
import {Cell} from "../../model/Cell";

interface ValueCellProps {
    cell: Cell
}

const ValueCell: FC<ValueCellProps> = ({cell}: ValueCellProps) => (
    <td className="ValueCell">
        {cell.value}
    </td>
);

export default ValueCell;
