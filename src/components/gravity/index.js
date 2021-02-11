import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {liikuta} from "../../reducers/gravitationReducer";

import {select} from "d3";

import {D3Gravity} from "./D3Gravity";


const SolarSystem = () => {

    const dispatch = useDispatch();

    const refElement = useRef(null);
    const visFunction = useRef(null);

    const {data, height, isActive, width} = useSelector(state => state.gravitation);

    /*
     * d3 -komponentin alustus
     */
    const initVis = () => {

        visFunction.current = D3Gravity()
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
            <div style={{border: "1px solid navy", margin: "auto", maxWidth:"600px"}}>
                <svg ref={refElement} id="mainSVG">
                </svg>
            </div>
            <button onClick={() => dispatch(liikuta())}>Liikuta</button>
        </>
    );
};

export default SolarSystem;