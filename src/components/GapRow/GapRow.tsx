import React, {FC} from 'react';
import './GapRow.css';

interface GapRowProps {
    size: number
}

const GapRow: FC<GapRowProps> = ({size}: GapRowProps) => {
    let result = Array<JSX.Element>();

    for (let col = 0; col < size; col++) {
        result.push(<div className="grid-h-gap"/>)
        if (col < size - 1) {
            result.push(<div className="grid-neutral-gap"/>)
        }
    }

    return (
        <>
            {result}
        </>
    );
};

export default GapRow;
