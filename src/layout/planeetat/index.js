import React, {useEffect, useRef} from 'react';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import SolarSystem from "../../components/gravity";
import ToolbarHolder from "../../components/toolbarHolder"
import Toolbar from "../../components/gravity/toolbar";

import './planeetat.css';

const Gravity = () => {

    return (
        <Container className="planeetatContainer">
            <Row>
                <Col m={4} md={3}>
                    <ToolbarHolder 
                        defaultActiveKey = {"1"}
                    >
                        <Toolbar />
                    </ToolbarHolder>
                </Col>
                <Col sm={8} md={9} className="bar" >
                    <SolarSystem />
                </Col>
            </Row>
        </Container>
    );
    
};

export default Gravity;