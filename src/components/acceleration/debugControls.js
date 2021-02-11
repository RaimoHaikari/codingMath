import React, {useState} from 'react';
import {useDispatch} from "react-redux";

import {
    kaannaVasen,
    kaannaOikea, 
    kiihdyta,
    liikuta
} from "../../reducers/advAccelerationReducer";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {IconContext} from "react-icons";
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";


const DebugControls = () => {

    const [tooltip, setTooltip] = useState(null)

    const dispatch = useDispatch()

    return (
        <IconContext.Provider value={{color: 'navy', size: 28}}>
            <Container className="acceleration-toolbar-debug-container">
                <Row>
                    <Col className="text-center">
                        <FaIcons.FaArrowAltCircleLeft 
                            style={{color: 'navy'}} 
                            onClick={() => dispatch(kaannaVasen())}
                            onMouseOver={() => setTooltip("Käännä vasemmalle")}
                            onMouseOut={() => setTooltip(null)}
                        />
                    </Col>
                    <Col className="text-center">
                        <IoIcons.IoIosAirplane 
                            onClick={() => dispatch(liikuta())}
                            onMouseOver={() => setTooltip("Askel menosuuntaan")}
                            onMouseOut={() => setTooltip(null)}
                        />                   
                    </Col>
                    <Col className="text-center">
                        <FaIcons.FaArrowAltCircleRight 
                            onClick={() => dispatch(kaannaOikea())}
                            onMouseOver={() => setTooltip("Käännä oikealle")}
                            onMouseOut={() => setTooltip(null)}
                        />                    
                    </Col>
                    <Col className="text-center">
                        <IoIcons.IoIosAddCircleOutline 
                            onMouseOver={() => setTooltip("Kiihdytä vauhtia")}
                            onMouseOut={() => setTooltip(null)}
                            style={{color: 'red'}} 
                            onClick={() => dispatch(kiihdyta())}
                        />                    
                    </Col>
                </Row>
                <Row  className="acceleration-toolbar-debug-tooltip-holder">
                    <Col>
                    {
                        tooltip
                        ? <span className="acceleration-toolbar-debug-tooltip">{tooltip}</span>
                        : null
                    }
                    </Col>
                </Row>
            </Container>
        </IconContext.Provider>
    );
};

export default DebugControls;