import React, {useEffect, useRef, useState} from 'react';

import {useDispatch, useSelector} from "react-redux";

import {animate, stopAnimation, toggleActiveState, updateYAndAngle} from "../../reducers/bouncingReducer";

import {bouncing} from "./bouncing";
import {select} from "d3";

let vis = null;


/*
 * https://dev.to/emmaadesile/build-a-timer-using-react-hooks-3he2
 */
const Timer = () => {

    const dispatch = useDispatch();
    const refElement = useRef(null);

    const {angle, data, height, isActive, offset, speed, width, x, y, } = useSelector(state => {
        return {
            ...state.bouncing
        }
    })


    const initVis = () => {

        vis = bouncing()
            .data(data)
            .height(height)
            .width(width)
            .centerX(x)
            .centerY(y)

        select(refElement.current)
            .call(vis)
    }

    function stopTimer() {

        console.log("Pitäs keskeyttää")

    }

    const updateVis = () => {

        vis
            .centerY(y)
    }

    useEffect(() => {
            
        if(data && data.length){

            if(vis === null)
                initVis()
            else
                updateVis()
        }

    }, [data, y])


    useEffect(() => {

        dispatch(animate())

        /*

        let intervalId;

        if(isActive){

            intervalId = setInterval(() => {

                dispatch(updateYAndAngle())

            }, 100)
        }

        return () => clearInterval(intervalId)
        */

    },[isActive, angle])
    


    return (
       <>
        <div ref={refElement} className="trig-container">
        </div>	 
        <div>
            <button
                //onClick={() => foobar()}
                onClick={() => dispatch(toggleActiveState())}
            >
                {isActive ? 'Pysäytä' : 'Käynnistä'}
            </button>
            <button
                onClick={() => dispatch(stopAnimation())}
            >
                Resetoi
            </button>
            <button
                onClick={() => dispatch(animate())}
            >
                FooBar
            </button>
        </div>
       </>      
    );
}

export default Timer;