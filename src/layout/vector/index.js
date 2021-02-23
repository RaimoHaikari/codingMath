import React from 'react';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import ToolbarHolder from "../../components/toolbarHolder";
import VectorPhysics from "../../components/vectorPhysics";
import Toolbar from "../../components/vectorPhysics/toolbar";

/*
 *
 */
const Vectors = () => {

    return (
        <Container className="vectorPhysicsContainer">
            <Row>
                <Col sm={4} md={3}>
                    <ToolbarHolder 
                        defaultActiveKey = {"2"}
                    >
                        <Toolbar />
                    </ToolbarHolder>
                </Col>
                <Col sm={8} md={9}>
                    <VectorPhysics />
                </Col>
            </Row>
        </Container>
    );
};



export default Vectors;