import React, {useEffect, useRef} from 'react';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import SolarSystem from "../../components/gravity";
import Toolbar from "../../components/gravity";

import './planeetat.css';

const Gravity = () => {

    return (
        <Container className="planeetatContainer">
            <Row>
                <Col sm={4} md={3} className="bar">1 of 3</Col>
                <Col sm={8} md={9} className="foo">
                    <SolarSystem />
                </Col>
            </Row>
        </Container>
    );
    
};

export default Gravity;