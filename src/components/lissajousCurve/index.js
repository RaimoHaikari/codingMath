import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {select} from "d3";

import {lissajous} from './lissajous'
import {animate, liikuta, resetAnimation, toggleActiveState} from "../../reducers/lissajousReducer";

let vis = null;


/*
 * https://dev.to/emmaadesile/build-a-timer-using-react-hooks-3he2
 */
const LissajousCurve = () => {


    const refElement = useRef(null);
    const dispatch = useDispatch();

    const {data, height, isActive, width} = useSelector(state => {

        return {
            ...state.lissajous
        }
    })

    const initVis = () => {

        vis = lissajous()
            .data(data)
            .height(height)
            .width(width)

        select(refElement.current)
            .call(vis)
            
    }

    const updateVis = () => {

        vis
            .data(data)
    }


    useEffect(() => {
            
        if(data && data.length){

            if(vis === null)
                initVis()
            else
                updateVis()
        }

    }, [data])

    useEffect(() => {

        dispatch(animate())

    }, [isActive])


    return (
       <>
         <div ref={refElement} className="trig-container">
        </div>
        <button
            onClick={() => dispatch(toggleActiveState())}
        >{isActive?'Pysäytä':'Käynnistä'}</button>	  
        <button
            onClick={() => dispatch(resetAnimation())}
        >Resetoi</button>
       </>      
    );
}

export default LissajousCurve;