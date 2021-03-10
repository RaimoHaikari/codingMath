import React from 'react';

import {
    Input,
    Label,
    Content,
    H2,
    P
} from "./elements"

const Tab = (props) => {

    const {name, changeHandler} = props

    return (
        <>
            <Input type="radio" id={`tab-${name}`} name="cMathTabs" onChange={changeHandler}/>
            <Label htmlFor={`tab-${name}`}>{name}</Label>
            <Content>
                {props.children}
            </Content>           
        </>
    );
};

export default Tab;