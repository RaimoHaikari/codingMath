import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {animate, liikuta, toggleActiveState} from "../../reducers/vectorReducer";

import {select} from "d3";

import {physics} from "./physics";

const VectorPhysics = () => {

    const dispatch = useDispatch()

    const refElement = useRef(null);
    const visFunction = useRef(null);

    const {data, height, isActive, width, opacity} = useSelector(state => {
        let opacity = (100 - state.vector.round)/100;

        return {
            ...state.vector,
            opacity: opacity>0.2?opacity:0.2
        }

    })

    const initVis = () => {

        visFunction.current = physics()
            .data(data)
            .height(height)
            .width(width)

        select(refElement.current)
            .call(visFunction.current)
            
    }

    const updateVis = () => {

        visFunction.current
            .opacity(opacity)
            .data(data)
            
        
    }

    useEffect(() => {

        //if(data && data.length){

            if(visFunction.current === null)
                initVis()
            else
                updateVis()

        //}
        
    }, [data])

    useEffect(() => {

        dispatch(animate())

    }, [isActive])

    return (
        <>
            <div ref={refElement} className="trig-container">
            </div>
            <button onClick={() => dispatch(toggleActiveState())}>
                {isActive?'Pysäytä':'Räjäytä'}
            </button>
            <button onClick={() => dispatch(liikuta())}>
                Liikuta
            </button>	  
        </>
    );

};

export default VectorPhysics;