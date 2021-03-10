import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {animate, liikuta} from "../../reducers/gravitationReducer";

import {select} from "d3";

import {D3Gravity} from "./D3Gravity";


const SolarSystem = () => {

    const dispatch = useDispatch();

    const refElement = useRef(null);
    const visFunction = useRef(null);

    const {preview, data, height, isActive, width} = useSelector(state => state.gravitation);

    /*
     * d3 -komponentin alustus
     */
    const initVis = () => {
        
        visFunction.current = D3Gravity()
            .height(height)
            .width(width)
            .preview(preview)
            .data(data)

        select(refElement.current)
            .call(visFunction.current)
            
            
    }

    /*
     * D3 -komponentin päivitys
     */
    const updateVis = () => {

        visFunction.current
            .preview(preview)
            .data(data)
            
    }


    /*
     *
     
    useEffect(() => {

        if(data && data.length){

            if(visFunction.current !== null)
                console.log("Aika päivittää esikatselu")

        }
        
    }, [preview])
    */
    

    useEffect(() => {

        if(data && data.length){

            console.log("Aika päivittää data")

            if(visFunction.current === null)
                initVis()
            else
                updateVis()

        }
        
    }, [data, preview])



    /*
     * Animaation hallinta
     * - tarkkaillaan isActive -muuttujan tilaa
     * - aina kun tila muuttuu, ajetaan animate -kutsu, jonka toiminta
     *   riippuu siitä onko isActive -muuttujan tila true vai false
     */
    useEffect(() => {

        dispatch(animate())

        return () => {
            console.log('isActive cleanup')
        }

    }, [isActive])


    /*
, margin: "auto", maxWidth:"600px"
     */
    return (
        <>
            <svg ref={refElement} id="mainSVG"></svg>
        </>
    );
};

export default SolarSystem;