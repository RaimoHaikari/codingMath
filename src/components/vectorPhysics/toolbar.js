import React from 'react';


import {IoMdSettings} from "react-icons/io";
import {VscDashboard} from "react-icons/vsc";
import {VscDebug} from "react-icons/vsc";

import ToolbarGroub from "../toolbarHolder/toolbarGroub";

import MeterPanel from "./meterPanel";
import SettingsPanel from "./settingsPanel";
import DebugControls from "./debugControls";

const Toolbar = () => {

    return (
        <>

            <ToolbarGroub
                eventKey = "1"
                title = "Mittaristo"
                icon = {<VscDashboard />}
            >
                <MeterPanel />
            </ToolbarGroub>

            <ToolbarGroub
                eventKey = "0"
                title = "Settings"
                icon = {<IoMdSettings />}
            >
                <SettingsPanel />
            </ToolbarGroub>

            <ToolbarGroub
                eventKey = "2"
                title = "Debug"
                icon = {<VscDebug />}
            >
                <DebugControls />
            </ToolbarGroub>

        </>
    );
};

export default Toolbar;