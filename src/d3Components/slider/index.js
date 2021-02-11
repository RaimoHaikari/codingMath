import React, {useEffect, useRef, useState} from 'react';

import {select} from "d3";

import {D3Slider} from "./d3Slider"

import './slider.css'


const Slider = () => {

    const [data, setData] = useState([0, 0.005, 0.01, 0.015, 0.02, 0.025])
    const [height, setHeight] = useState(200)
    const [width, setWidth] = useState(300)   

    const refElement = useRef(null);
    const visFunction = useRef(null);


    const initVis = () => {

        visFunction.current = D3Slider()
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


    return (
        <>
            <div ref={refElement} style={{maxWidth: "500px", margin: "10px 10px"}}>
            </div>
        </>
    );
};

export default Slider;