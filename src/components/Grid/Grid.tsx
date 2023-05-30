import React, {FC} from 'react';
import './Grid.css';

interface GridProps {
    size: number,
}

const createValueRow = (size: number, row: number): JSX.Element[] => {
    let result = Array<JSX.Element>();

    for (let col = 0; col < size; col++) {
        result.push(<div className="grid-value-item">{row * size + col}</div>)
        if (col < size - 1) {
            result.push(<div className="grid-vertical-gap"/>)
        }
    }

    return result;
}

const createGapRow = (size: number): JSX.Element[] => {
    let result = Array<JSX.Element>();

    for (let col = 0; col < size; col++) {
        result.push(<div className="grid-vertical-gap"/>)
        if (col < size - 1) {
            result.push(<div className="grid-neutral-gap"/>)
        }
    }

    return result;

}

const Grid: FC<GridProps> = ({size} : { size: number }) => {
    let cells = Array<JSX.Element>();

    for (let row = 0; row < size; row++) {
        cells = cells.concat(createValueRow(size, row))
        if (row < size - 1) {
            cells = cells.concat(createGapRow(size))
        }
    }

    return (
        <div className="Grid">
            {cells}
        </div>
    );
};

export default Grid;
