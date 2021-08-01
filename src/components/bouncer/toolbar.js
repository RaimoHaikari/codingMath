import React from 'react';

import {IoMdSettings} from "react-icons/io";
import {VscDebug} from "react-icons/vsc";

import ToolbarGroub from "../toolbarHolder/toolbarGroub";

import Controls from "./controls";
import Settings from "./settings"

const Toolbar = () => {
    return (
        <>
            <ToolbarGroub
                eventKey = "0"
                title = "Settings"
                icon = {<IoMdSettings />}
            >
                <Settings />
            </ToolbarGroub>
            <ToolbarGroub
                eventKey = "1"
                title = "Controls"
                icon = {<VscDebug />}
            >
                <Controls />
            </ToolbarGroub>
        </>
    );
};

export default Toolbar;