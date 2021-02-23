import React from 'react';

import {
    Label,
    Input,
    Span
} from "./inputElements";

/*
 * React JS Tutorial | Creating a Toggle Switch | BEGINNER FRIENDLY
 * https://www.youtube.com/watch?v=bztDMD4HSL0
 */
const Toggle = ({isToggled, onToggle, rounded = false}) => {
    return (
        <Label>
            <Input 
                type="checkbox"
                checked={isToggled}
                onChange={onToggle}
            />
            <Span />
        </Label>
    );
};

export default Toggle;