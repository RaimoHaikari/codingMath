import React from 'react';

import {
    Container,
    Label
} from "./inputElements"


const CheckBox = ({handler, checked, title}) => {

    return (
        <Container
            name="checkBoxContainer"
        >
            <Label>{title}
                <input 
                    type="checkbox" 
                    checked={checked} 
                    onChange={handler}
                />
                <span className="checkmark"></span>
            </Label>
        </Container>
    );
};

export default CheckBox;