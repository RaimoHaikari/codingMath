import React, {useEffect, useRef} from 'react';

import {useDispatch, useSelector} from "react-redux";

import {select} from "d3";

import {
    animate,
    liikuta, 
    toggleActiveState
} from "./flockingReducer"
import {d3Flocking} from "./d3Flocking"

const Flocking = () => {

    const refElement = useRef(null);
    const visFunction = useRef(null);

    const dispatch = useDispatch()

    const {activeBoid, counter, data, height, isActive, perceptionRadius, width} = useSelector(state => {

        // state.flocking
        let flocking = state.flocking;

        let activeBoid = flocking.data.filter(b => b.isUnderObservation())

        return {
            ...flocking,
            activeBoid: activeBoid
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
            .perceptionRadius(perceptionRadius)
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
            console.log('data cleanup')
        }
        
    }, [data])

    return (
        <>
            <div ref={refElement} className="cm-FLOCKING-container" style={{width: "500px", height: '500px'}}>
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
            <span>{counter}</span>
        </>
    );
};

export default Flocking;