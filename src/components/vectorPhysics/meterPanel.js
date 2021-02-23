import React from 'react';
import {useSelector} from "react-redux";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import './vectorPhysics.css';

/* 
 * What html markups to use for displaying label/value data?
 * https://stackoverflow.com/questions/1687733/what-html-markups-to-use-for-displaying-label-value-data
 */
const MeterPanel = () => {

    const {data} = useSelector(state => state.vector)

    return (
        <dl>
            <dt>Active Particles</dt>
            <dd>{data.length}</dd>
        </dl>
    );
};

export default MeterPanel;