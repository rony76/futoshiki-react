import React, {FC} from 'react';
import './VerticalGap.css';
import {Gap, GapProps} from "../Gap/Gap";

const VerticalGap: FC<GapProps> = Gap('VerticalGap',
    {
        getConstraint: (game, coords) => game.getConstraintWithBelow(coords)
    });


export default VerticalGap;
