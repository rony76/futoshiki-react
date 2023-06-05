import React, {FC} from 'react';
import './HorizontalGap.css';
import {Gap, GapProps} from "../Gap/Gap";

const HorizontalGap: FC<GapProps> = Gap('HorizontalGap',
    (game, coords) => game.getConstraintWithRight(coords))

export default HorizontalGap;
