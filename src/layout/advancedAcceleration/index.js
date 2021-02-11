import React from 'react';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import DynamicAcceleration from "../../components/acceleration";
import Toolbar from "../../components/acceleration/toolbar";

import ToolbarHolder from "../../components/toolbarHolder";

import './advancedAcceleration.css';

const AdvancedAcceleration = () => {


    /*
     * <Toolbar />
     */
    return (
        <Container className="accelerationContainer">
            <Row>
                <Col sm={4} md={3}>
                    <ToolbarHolder 
                        defaultActiveKey = {"0"}
                    >
                        <Toolbar />
                    </ToolbarHolder>
                </Col>
                <Col sm={8} md={9}>
                    <DynamicAcceleration />
                </Col>
            </Row>
        </Container>
    );
};

export default AdvancedAcceleration;