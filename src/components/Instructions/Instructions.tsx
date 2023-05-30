import React, {FC} from 'react';
import './Instructions.css';

interface InstructionsProps {
    size: number
}

const Instructions: FC<InstructionsProps> = ({size}: InstructionsProps) => (
    <div className="Instructions">
        <p>Populate the board with numbers between 1 to {size}, <br/>
            respecting the indications on <strong>&lt;</strong> (less than) and <strong>&gt;</strong> (greater than), <br/>
            so that in each row and each column, all the numbers are unique.</p>
    </div>
);

export default Instructions;
