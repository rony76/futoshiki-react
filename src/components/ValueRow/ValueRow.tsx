import React, {FC} from 'react';
import './ValueRow.css';

interface ValueRowProps {
    row: number,
    size: number
}

const ValueRow: FC<ValueRowProps> = ({row, size}: ValueRowProps) => {
    let result = Array<JSX.Element>();

    for (let col = 0; col < size; col++) {
        result.push(<div className="grid-value-item">{row * size + col}</div>)
        if (col < size - 1) {
            result.push(<div className="grid-vertical-gap"/>)
        }
    }

    return (
        <>
            {result}
        </>
    );
}

export default ValueRow;
