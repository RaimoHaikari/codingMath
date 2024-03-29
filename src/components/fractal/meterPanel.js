import React from 'react';
import {useSelector} from "react-redux";

//import './vectorPhysics.css';

/* 
 * What html markups to use for displaying label/value data?
 * https://stackoverflow.com/questions/1687733/what-html-markups-to-use-for-displaying-label-value-data
 */
const MeterPanel = () => {

    const {data} = useSelector(state => state.fractal);

    return (
        <dl>
            <dt>Number of triangles</dt>
            <dd>{data.length}</dd>
        </dl>
    );
};

export default MeterPanel;