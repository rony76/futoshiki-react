import React, {FC} from 'react';
import './HorizontalGap.css';
import {Gap, GapProps} from "../Gap/Gap";

const HorizontalGap: FC<GapProps> = Gap('HorizontalGap',
    {
        getConstraint: (g, c) => g.getConstraintWithRight(c),
        getConstraintStatus: (g, c) => g.getConstraintStatusWithRight(c)
    });

export default HorizontalGap;
