import React from 'react';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import ToolbarHolder from "../../components/toolbarHolder";

import Toolbar from "../../components/bouncer/toolbar";
import Bouncer from "../../components/bouncer"

import './bouncing.css';

const Bouncing = () => {
    return (
        <Container className="bouncingContainer">
            <Row>
                <Col m={4} md={3}>
                    <ToolbarHolder 
                        defaultActiveKey = {"0"}
                    >
                        <Toolbar />
                    </ToolbarHolder>
                </Col>
                <Col sm={8} md={9} className="bouncing_bouncer_col" >
                    <Bouncer />
                </Col>
            </Row>
        </Container>
    );
};

/*

                    <ToolbarHolder 
                        defaultActiveKey = {"1"}
                    >
                        <Toolbar />
                    </ToolbarHolder>

<SolarSystem />

*/

export default Bouncing;