import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {animate, toggleActiveState} from "../../reducers/vectorReducer";

import {select} from "d3";

import {physics} from "./physics";

const VectorPhysics = () => {

    const dispatch = useDispatch()

    const refElement = useRef(null);
    const visFunction = useRef(null);

    const {
        allowedRangeHeight, 
        allowedRangeWidth, 
        data, 
        height, 
        isActive, 
        width, 
        opacity
    } = useSelector(state => {

        let opacity = (100 - state.vector.round)/100;

        return {
            ...state.vector,
            opacity: opacity>0.2?opacity:0.2
        }

    })

    /*
     * D3 -grafiikan alustus
     */
    const initVis = () => {

        visFunction.current = physics()
            .data(data)
            .height(height)
            .width(width)
            .heightOfAllowedRange(allowedRangeHeight)
            .widthOfAllowedRange(allowedRangeWidth)

        select(refElement.current)
            .call(visFunction.current)
            
    }

    /*
     * D3-grafiikan (aineiston) päivitys
     */
    const updateVis = () => {

        visFunction.current
            .opacity(opacity)
            .data(data)
              
    }

    /*
     * Partikkeleille sallitusn alueen korkeuden päivitys
     */
    useEffect(() => {

        if(visFunction.current !== null){

            visFunction.current
                .heightOfAllowedRange(allowedRangeHeight);         
        }

        return () => { console.log('width cleanup') };

    }, [allowedRangeHeight])


    useEffect(() => {

        if(visFunction.current !== null){

            visFunction.current
                .widthOfAllowedRange(allowedRangeWidth);         
        }

        return () => { console.log('width cleanup') };

    }, [allowedRangeWidth])

    useEffect(() => {

        //if(data && data.length){

            if(visFunction.current === null)
                initVis()
            else
                updateVis()

        //}

            if(data.length == 0) {
                dispatch(toggleActiveState())
            }

        return () => {
            console.log('data cleanup')
        }
        
    }, [data])

    useEffect(() => {

        dispatch(animate())

        return () => {
            console.log('isActive cleanup')
        }

    }, [isActive])

    return (
        <>
            <div ref={refElement} className="cm-vectorPhysics-container">
            </div>  
        </>
    );

};

export default VectorPhysics;