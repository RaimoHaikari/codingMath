import React from 'react';

import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";

const ToolbarGroub = (props) => {
    return (
        <Card>

            <Accordion.Toggle 
                as={Card.Header} 
                eventKey={props.eventKey}
                className="p-1 acceleration-toolbar-title"
            >
                {props.icon}
                <span className="ml-2">
                    {props.title}
                </span>
            </Accordion.Toggle>

        <Accordion.Collapse eventKey={props.eventKey}>
            <Card.Body className="m-0 p-1">
                {props.children}
            </Card.Body>
        </Accordion.Collapse>

        </Card>       
    );
};

export default ToolbarGroub;