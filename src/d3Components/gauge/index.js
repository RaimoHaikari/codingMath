import React, {useEffect, useRef, useState} from 'react';

import {select} from "d3";

import {D3Compass} from "./d3Compass"

import './gauge.css'

/*
 * 
 */
const Compass = () => {

    const refElement = useRef(null);
    const visFunction = useRef(null);

    const [data, setData] = useState([0])
    const [height, setHeight] = useState(150)
    const [width, setWidth] = useState(150)

    const initVis = () => {

        visFunction.current = D3Compass()
            .data(data)
            .height(height)
            .width(width)

        select(refElement.current)
            .call(visFunction.current)
            
    }

    /*
     * D3 -komponentin päivitys
     */
    const updateVis = () => {

        visFunction.current
            .data(data)
            
    }

    useEffect(() => {

        if(data && data.length){

            if(visFunction.current === null)
                initVis()
            
            else 
                updateVis()
        
        }
        
    }, [data])

    let handleChange = (event) => {
        setData([event.target.value])
    }



    /*
<input type="range" min="0" max="360" value="0" id="slider" oninput="updateAngle(this.value)">
     */
    return (
        <>
            <input 
                type="range" 
                min="0" 
                max="360" 
                value={data[0]}
                onChange={handleChange}
            />
            <div ref={refElement} style={{maxWidth: "500px", margin: "10px 10px"}}>
            </div>
        </>
    );
};

export default Compass;