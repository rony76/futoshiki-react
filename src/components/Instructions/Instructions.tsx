import React, {FC} from 'react';
import './Instructions.css';

interface InstructionsProps {
    size: number
}

const Instructions: FC<InstructionsProps> = ({size}: InstructionsProps) => (
    <div className="Instructions">
        <p>Completate lo schema con i numeri da 1 a {size}, rispettando i segni di &lt; (minore) e &gt; (maggiore),
            in modo che in ciascuna riga e colonna i numeri siano tutti diversi tra loro.</p>
    </div>
);

export default Instructions;
