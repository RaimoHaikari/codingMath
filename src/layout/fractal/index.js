import React from 'react';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Canvas from "../../components/fractal";
import ToolbarHolder from "../../components/toolbarHolder"
import Toolbar from "../../components/fractal/toolbar"

const Fractal = () => {
    return (
        <Container className="fractalContainer">
            <Row>

                <Col sm={4} md={3}>
                    <ToolbarHolder 
                        defaultActiveKey = {"1"}
                    >
                        <Toolbar />
                    </ToolbarHolder>
                </Col>

                <Col sm={8} md={9} >
                    <Canvas />
                </Col>
            </Row>
        </Container>
    );
};

export default Fractal;