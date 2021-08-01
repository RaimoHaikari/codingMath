import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";

//import {animate, liikuta} from "../../reducers/gravitationReducer";

import "./fractal.css"

import {select} from "d3";

import {D3Fractal} from "./d3Fractal";

const Canvas = () => {

    const dispatch = useDispatch();

    const refElement = useRef(null);
    const visFunction = useRef(null);

    const {data, height, lineType, width} = useSelector(state => {

        let fractal = state.fractal;

        return {
            data: fractal.data,
            height: fractal.height,
            lineType: fractal.animation.lineType,
            width: fractal.width
        }
    });

    /*
     * d3 -komponentin alustus
     */
    const initVis = () => {
        
        visFunction.current = D3Fractal()
            .height(height)
            .width(width)
            .linetype(lineType)
            .data(data)

        select(refElement.current)
            .call(visFunction.current)   
    }

    /*
     * D3 -komponentin päivitys
     */
    const updateVis = () => {

        visFunction.current
            .linetype(lineType)
            .data(data)
            
            
    }

    useEffect(() => {

        if(visFunction.current === null)
            initVis()
        else
            updateVis()
        
    }, [data])

    return (
        <>
            <svg ref={refElement} />
        </>
    );
};

export default Canvas;