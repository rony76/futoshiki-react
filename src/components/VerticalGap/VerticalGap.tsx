import React, {FC} from 'react';
import './VerticalGap.css';
import {Gap, GapProps} from "../Gap/Gap";

const VerticalGap: FC<GapProps> = Gap('VerticalGap',
    {
        getConstraint: (g, c) => g.getConstraintWithBelow(c),
        getConstraintStatus: (g, c) => g.getConstraintStatusWithBelow(c)
    });


export default VerticalGap;
