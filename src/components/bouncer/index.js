import React, {useEffect, useRef, useState} from 'react';

import {useDispatch, useSelector} from "react-redux";

import {
    animate
} from "../../reducers/bouncingReducer";

import {D3Bouncing} from "./D3Bouncing";
import {select} from "d3";

let vis = null;

/*
 * https://dev.to/emmaadesile/build-a-timer-using-react-hooks-3he2
 */
const Bouncer = () => {

    const dispatch = useDispatch();
    const refElement = useRef(null);

    const {datum, height, isActive, width } = useSelector(state => {
        return {
            ...state.bouncing
        }
    })

    const initVis = () => {

        vis = D3Bouncing()
            .data(datum)
            .height(height)
            .width(width)

        select(refElement.current)
            .call(vis)

        
    }

    const updateVis = () => {

        vis.data(datum)
        
    }

    useEffect(() => {

        if(vis === null)
            initVis()
        else
            updateVis()
        
    }, [datum])


    /*
     * Pyöritää animointia....
     */
    useEffect(() => {

        dispatch(animate())

    },[isActive])
    
    return (
       <>
        <div ref={refElement} className="trig-container"></div>	 
       </>      
    );
}

export default Bouncer;