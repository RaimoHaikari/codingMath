import React from 'react';

import Accordion from "react-bootstrap/Accordion";
import {IconContext} from "react-icons";

const ToolbarHolder = (props) => {

    return (
        <IconContext.Provider value={{color: 'white', size: 28}}>
            <Accordion defaultActiveKey={props.defaultActiveKey}>
                {props.children}
            </Accordion>
        </IconContext.Provider>
    );
};

export default ToolbarHolder;