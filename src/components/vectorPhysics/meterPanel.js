import React from 'react';
import {useSelector} from "react-redux";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const MeterPanel = () => {

    const {data} = useSelector(state => state.vector)

    return (
        <div>
            Mittaripaneli {data.length}
        </div>
    );
};

export default MeterPanel;