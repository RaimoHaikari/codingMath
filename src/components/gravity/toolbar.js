import React from 'react';

import {VscDebug} from "react-icons/vsc";
import {IoMdSettings} from "react-icons/io";

import ToolbarGroub from "../toolbarHolder/toolbarGroub";

import DegubControls from "./DegubControls";
import Settings from "./settings"


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
                <DegubControls />
            </ToolbarGroub>
        </>
    );
};

export default Toolbar;