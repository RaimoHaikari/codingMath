import React from 'react';

import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";

import {IoMdSettings} from "react-icons/io";
import {VscDashboard} from "react-icons/vsc";

import MeterPanel from "./meterPanel";
import SettingsPanel from "./settingsPanel";


const Toolbar = () => {

    
    const instrumentPanel = () => {
        return (

            <Card>

                <Accordion.Toggle 
                    as={Card.Header} 
                    eventKey="0"
                    className="p-1 acceleration-toolbar-title"
                >
                    <VscDashboard />
                    <span className="ml-2">
                        Mittaristo
                    </span>
                </Accordion.Toggle>


                <Accordion.Collapse eventKey="0">
                    <Card.Body className="m-0 p-1">
                        <MeterPanel />
                    </Card.Body>
                </Accordion.Collapse>

            </Card>            
        )
    }

    const settingsPanel = () => {
        return (
            <Card>

                <Accordion.Toggle 
                    as={Card.Header} 
                    eventKey="2"
                    className="p-1 acceleration-toolbar-title"
                >
                    <IoMdSettings />
                    <span className="ml-2">
                        Settings
                    </span>
                </Accordion.Toggle>

                <Accordion.Collapse eventKey="2">
                    <Card.Body className="m-0 p-1">
                        <SettingsPanel />
                    </Card.Body>
                </Accordion.Collapse>

            </Card>             
        )
    }

    return (
        <>

                {instrumentPanel()}

                {settingsPanel()}

        </>

    );
};

export default Toolbar;