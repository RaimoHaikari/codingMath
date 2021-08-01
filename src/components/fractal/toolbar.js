import React from 'react';
import {useDispatch, useSelector} from "react-redux";

import {IoMdSettings} from "react-icons/io";
import {VscDashboard} from "react-icons/vsc";
import {VscDebug} from "react-icons/vsc";

import ToolbarGroub from "../toolbarHolder/toolbarGroub";

import MeterPanel from "./meterPanel";
import SettingsPanel from "./settings";
// import SettingsPanel from "./settingsPanel";
// import DebugControls from "./debugControls";

const Toolbar = () => {

    const {data, height, isActive, width} = useSelector(state => state.fractal);

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
                title = "Asetukset"
                icon = {<VscDashboard />}
            >
                <SettingsPanel />
            </ToolbarGroub>


        </>
    );
};

export default Toolbar;