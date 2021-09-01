import React, {createContext, useEffect, useRef} from 'react';

import {useDispatch, useSelector} from "react-redux";

import {select} from "d3";

import {
    animate,
    liikuta, 
    toggleActiveState
} from "./flockingReducer"

import {d3Flocking} from "./d3Flocking"

import './flocking.css';

const Flocking = () => {

    const refElement = useRef(null);
    const visFunction = useRef(null);

    const dispatch = useDispatch()

    /*

     */
    const {activeBoid, data, displayCohesion, height, isActive, perceptionRadius, width} = useSelector(state => {

        // state.flocking
        let flocking = state.flocking;

        let displayCohesion = false;

        let activeBoid = flocking.data.filter(b => b.isUnderObservation())
        if(activeBoid.length === 1 && activeBoid[0].getCohesionPoint() !== null)
            displayCohesion = true

        return {
            ...flocking,
            activeBoid: activeBoid,
            displayCohesion: displayCohesion
        }

    });

    /*
     * D3 -grafiikan alustus
     */
    const initVis = () => {

        //data.forEach(element => {
        //    console.log(element.getVelocity().getX(), element.getVelocity().getY())
        //});

        visFunction.current = d3Flocking()
            .data(data)
            .height(height)
            .width(width)
            .perceptionRadius(perceptionRadius.value)
            .activeBoid(activeBoid)

        select(refElement.current)
            .call(visFunction.current)
            
    }

    /*
     * D3-grafiikan (aineiston) päivitys
     */
    const updateVis = () => {

        visFunction.current
            .activeBoid(activeBoid)
            .perceptionRadius(perceptionRadius.value)
            .data(data)

              
    }

    /*
     * Animaation hallinta
     * - tarkkaillaan isActive -muuttujan tilaa
     * - aina kun tila muuttuu, ajetaan animate -kutsu, jonka toiminta
     *   riippuu siitä onko isActive -muuttujan tila true vai false
     */
    useEffect(() => {

        dispatch(animate(isActive))

        return () => {
            console.log('isActive cleanup')
        }

    }, [isActive])

    useEffect(() => {

        if(data && data.length){

            if(visFunction.current === null)
                initVis()
            else
                updateVis()

        }


        return () => {

            let debug = false

            if(debug === true)
                console.log('data cleanup')
        }
        
    }, [data, perceptionRadius])

    /*
<polygon xmlns="http://www.w3.org/2000/svg" points="50,16 85,85 15,85 50,16" fill="none" stroke="black" stroke-width="1.2"/>
    */
    return (
        <>
            <div className="cm-FLOCKING-container" style={{width: "500px", height: '500px'}}>
                <svg ref={refElement}>
                    <defs>
                        <g id="pointToDisplay">
                            <line 
                                x1="-10"
                                y1="0"
                                x2="10"
                                y2="0"
                                strokeWidth="1"
                            />
                                <line 
                                x1="0"
                                y1="-10"
                                x2="0"
                                y2="10"
                                strokeWidth="1"
                            />
                        </g>
                        <g id="triangle">
                            <polygon  points="0,-5 5,5 -5,5 0,-5" strokeWidth="1.2" /> 
                        </g>
                    </defs>                    
                </svg>
            </div>
            <button
                onClick = {() => dispatch(liikuta())}
            >
                L
            </button>
            <button
                onClick = {() => dispatch(toggleActiveState())}
            >
                {
                    isActive?"Sammuta":"Käynnistä"
                }
            </button>
        </>
    );
};

export default Flocking;