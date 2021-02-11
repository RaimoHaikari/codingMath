import React from 'react';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Compass from "./compass";

const MeterPanel = () => {

    return (
        <Container className="acceleration-toolbar-meterPanel-container">
            <Row>
                <Col>
                    <Compass />
                </Col>
            </Row>
        </Container>
    );
};

export default MeterPanel;