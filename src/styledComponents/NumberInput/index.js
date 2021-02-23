import React from 'react';

import {
    Container,
    FormGroup,
    FormColName,
    FormColValue,
    SettingsLabel,
    Input,
    Info
} from "./inputElements";

const NumberInput = (props) => {

    return (
        <Container name="Container">
            <FormGroup
                name="FormGroup"
            >
                <FormColName
                    name="FormColName"
                >
                        <SettingsLabel
                            htmlFor={props.id}
                        >
                            {props.title}
                        </SettingsLabel>
                </FormColName>
                <FormColValue
                    name="FormColValue"
                >
                        <Input 
                            type="number"
                            id={props.id}
                            name={props.id}
                            min={props.min}
                            max={props.max}
                            value={props.value}
                            onChange={(e) => props.changeHandler(parseInt(e.target.value))}
                        />
                </FormColValue>                
            </FormGroup>

            <Info>
                A number between {props.min} and {props.max}
            </Info>
        </Container>
    );
};

export default NumberInput;