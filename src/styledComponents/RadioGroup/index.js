import React from 'react';

import {
    Container,
    FormGroup,
    RadioColName,
    SettingsLabel,
    RadioColValue,
    RadioWrapper,
    RadioInput,
    RadioLabel
} from "./inputElements";

/*

*/
const RadioGroup = (props) => {
    return (
        <Container name="Container">
            <FormGroup name="FormGroup">

                <RadioColName name="FormColName">
                    <SettingsLabel>{props.title}</SettingsLabel>
                </RadioColName>

                <RadioColValue className="RadioColValue">
                    
                    {
                        props.options.map(o => {
                            return (
                                <RadioWrapper key={o.value}>
                                    <RadioInput 
                                        value={o.value}
                                        type="radio"
                                        name={o.value}
                                        id={o.value}
                                        checked={o.isActive}
                                        onChange={(e) => props.changeHandler(e.target.value)}
                                    />

                                    <RadioLabel className = "RadioLabel"
                                        htmlFor={o.value}
                                    >{o.name}</RadioLabel>
                                </RadioWrapper>
                            )
                        })
                    }

                </RadioColValue>
            </FormGroup>
        </Container>
    );
};

/*

                <RadioColName name="FormColName">
                    <SettingsLabel>{props.title}</SettingsLabel>
                </RadioColName>

                <RadioColValue>

                    {
                        props.options.map(o => {
                            return (
                                <div key={o.value}>
                                    
                                    <RadioInput 
                                        value={o.value}
                                        type="radio"
                                        name={o.value}
                                        id={o.value}
                                        checked={o.isActive}
                                        onChange={(e) => props.changeHandler(e.target.value)}
                                    />

                                    <RadioLabel htmlFor={o.value}>{o.name}</RadioLabel>
                                </div>
                            )
                        })
                    }

                </RadioColValue>

*/

export default RadioGroup;