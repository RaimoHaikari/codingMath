import React from 'react';

import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";

import {VscDashboard} from "react-icons/vsc";
import {VscDebug} from "react-icons/vsc";
import {IoMdSettings} from "react-icons/io";


import DebugControls from "./debugControls"
import MeterPanel from "./meterPanel"
import SettingsPanel from "./settingsPanel";

/*
    <Accordion.Toggle as={Card.Header} eventKey="0">
      Click me!
    </Accordion.Toggle>
    <Accordion.Collapse eventKey="0">
      <Card.Body>Hello! I'm the body</Card.Body>
    </Accordion.Collapse>
*/

const Toolbar = () => {

    const depugPanel = () => {
        return (
            <Card>

                <Accordion.Toggle 
                    as={Card.Header} 
                    eventKey="1"
                    className="p-1 acceleration-toolbar-title"
                >
                    <VscDebug />
                    <span className="ml-2">
                        Debug
                    </span>
                </Accordion.Toggle>

                <Accordion.Collapse eventKey="1">
                    <Card.Body className="m-0 p-1">
                        <DebugControls />
                    </Card.Body>
                </Accordion.Collapse>

            </Card>      
        )
    }


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

                {depugPanel()}
            
        </>
    );
};

export default Toolbar;