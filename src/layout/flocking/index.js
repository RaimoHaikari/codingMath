import React from 'react';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Boids from '../../challenge/flocking'
import ToolbarHolder from "../../components/toolbarHolder"
import Toolbar from '../../challenge/flocking/toolbar';

import './flocking.css';

const Flocking = () => {

    return (
        <Container className="boidsContainer">
            <Row>
                <Col m={4} md={3}>
                    <ToolbarHolder 
                        defaultActiveKey = {"1"}
                    >
                        <Toolbar />
                    </ToolbarHolder>
                </Col>
                <Col sm={8} md={9} className="bar" >
                    <Boids />
                </Col>
            </Row>
        </Container>
    );

};

export default Flocking;