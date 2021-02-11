import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {select} from "d3";

import useEventListener from "../../hooks/useEventListener";

import {
    accelerate, 
    animate, 
    kaannaVasen,
    kaannaOikea, 
    liikuta, 
    slowdown, 
    toggleActiveState
} from "../../reducers/advAccelerationReducer";

import {d3Acceleration} from "./d3Acceleration";

import './acceleration.css';

const DynamicAcceleration = () => {

    const dispatch = useDispatch()

    const refElement = useRef(null);
    const visFunction = useRef(null)

    const {data, height, isActive, width, xScale, yScale} = useSelector(state => state.acceleration)

    /*
     * d3 -komponentin alustus
     */
    const initVis = () => {

        visFunction.current = d3Acceleration()
            .data(data)
            .height(height)
            .width(width)
            .xScale(xScale)
            .yScale(yScale)

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


    /*
     * Painikkeiden tapahtumakäsittelijät
     * https://stackoverflow.com/questions/5203407/how-to-detect-if-multiple-keys-are-pressed-at-once-using-javascript
     */
    const keyDownHandler = ({ key }) => {

        switch(String(key)) {
            case 'ArrowUp':
                dispatch(accelerate({key: 'ArrowUp'}))
                break;

            case 'ArrowRight':
                dispatch(accelerate({key: 'ArrowRight'}))
                break;

            case 'ArrowLeft':
                dispatch(accelerate({key: 'ArrowLeft'}))
                break;

            default:
                // code block
        } 
    }

    const keyUpHandler = ({ key }) => {

        switch(String(key)) {
            case 'ArrowUp':
                dispatch(slowdown({key: 'ArrowUp'}))
                break;
 
            case 'ArrowRight':
                dispatch(slowdown({key: 'ArrowRight'}))
                break;
   
            case 'ArrowLeft':
                dispatch(slowdown({key: 'ArrowLeft'}))
                break;
   
            default:
                // code block
        } 
    }

    useEventListener('keydown', keyDownHandler);
    useEventListener('keyup', keyUpHandler);

    useEffect(() => {

        if(data && data.length){

            if(visFunction.current === null)
                initVis()
            else
                updateVis()

        }
        
    }, [data])

    useEffect(() => {

        dispatch(animate())

    }, [isActive])


    /*
     * transform="translate(-50 -50) rotate(90, 50, 50) scale(1.0,1.0)
     * transform="translate(-5 -5) rotate(0, 5, 5) scale(0.1,0.1)"
     */
    return (
        <>
            <div style={{border: "1px solid navy", margin: "auto", maxWidth:"600px"}}>
                <svg ref={refElement} id="mainSVG">
                    <defs>
                        <g id="mySymbol">
                            <path 
                                id="theShip"
                                d="m0,50l50,-50l50,50l-25,0l0,50l-50,0l0,-50l-25,0z" 
                                strokeLinecap="null" 
                                strokeLinejoin="null" 
                                strokeDasharray="null" 
                                strokeWidth="0" 
                                fill="#000000"
                            />
                        </g>
                    </defs>
                </svg>
            </div>
            <button onClick={() => dispatch(toggleActiveState())}>
                {isActive?'Pysäytä':'Käynnistä'}
            </button>
            <p>Korjaa: Ei kiihdytä!</p>
        </>
    );


};

export default DynamicAcceleration;