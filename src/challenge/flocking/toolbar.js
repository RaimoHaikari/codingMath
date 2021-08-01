import React from 'react';

import {VscDebug} from "react-icons/vsc";
import {IoMdSettings} from "react-icons/io";

import ToolbarGroub from "../../components/toolbarHolder/toolbarGroub";

import Settings from './settings';
import Controls from './controls';

const Toolbar = () => {
    return (
        <>
            <ToolbarGroub
                eventKey = "1"
                title = "Settings"
                icon = {<IoMdSettings />}            
            >
                <Settings />
            </ToolbarGroub>
            <ToolbarGroub
                eventKey = "2"
                title = "Debug"
                icon = {<VscDebug />}            
            >
                <Controls />
            </ToolbarGroub>
        </>
    );
};

export default Toolbar;