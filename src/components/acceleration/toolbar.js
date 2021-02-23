import React from 'react';


import {VscDashboard} from "react-icons/vsc";
import {VscDebug} from "react-icons/vsc";
import {IoMdSettings} from "react-icons/io";

import ToolbarGroub from "../toolbarHolder/toolbarGroub";
import DebugControls from "./debugControls"
import MeterPanel from "./meterPanel"
import SettingsPanel from "./settingsPanel";

const Toolbar = () => {

    return (
        <>

            <ToolbarGroub
                eventKey = "0"
                title = "Mittaristo"
                icon = {<VscDashboard />}
            >
                <MeterPanel />
            </ToolbarGroub>

            <ToolbarGroub
                eventKey = "1"
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