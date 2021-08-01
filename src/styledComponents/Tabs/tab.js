import React from 'react';

import {
    Input,
    Label,
    Content,
    H3
} from "./elements"

const Tab = (props) => {

    const {changeHandler, checked, name, icon} = props

    return (
        <>
            <Input defaultChecked={checked} type="radio" id={`tab-${name}`} name="cMathTabs" onChange={changeHandler}/>
            <Label htmlFor={`tab-${name}`} className="laablei">
                {icon}
            </Label>
            <Content className="contentti">
                <H3>{props.name}</H3>
                {props.children}
            </Content>           
        </>
    );
};

export default Tab;