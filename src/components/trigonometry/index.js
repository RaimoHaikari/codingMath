import React, {useEffect, useRef, useState} from 'react';

import {interpolateCividis, select} from "d3";

import './trigonometry.css';

import {sinWave} from "./trig";

let vis = null;

/*
 * 
 */
const Trigonometry = () => {

    const[data, setData] = useState(null)

    const[height, setHeight] = useState(500)
    const[width, setWidth] = useState(500)

    const refElement = useRef(null)

    const getData = () => {

        let angles = []

        for(var angle = 0; angle < Math.PI * 2;  angle += 0.05){
            angles.push(angle)
        }
        
        return angles
    }

    const initVis = () => {

        vis = sinWave()
            .data(data)
            .height(height)
            .width(width)

        select(refElement.current)
            .call(vis)
    }

    const updateVis = () => {}



    useEffect(() => {

        if(data === null){
            setData(getData())
        }
            

        if(data && data.length){

            if(vis === null)
                initVis()
            else
                updateVis()
        }

    }, [data])

    return (
        <div ref={refElement} className="trig-container">
        </div>	       
    );
}

export default Trigonometry;