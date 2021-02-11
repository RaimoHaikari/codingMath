import React, {useEffect, useRef} from 'react';
import {useSelector} from "react-redux";

import {select} from "d3";

import {D3Compass} from "../../d3Components/gauge/d3Compass";

const Compass = () => {

    const refElement = useRef(null);
    const visFunction = useRef(null);

    const visHeight = 150;
    const visWidth = 150;

    /*
function radians_to_degrees(radians)
{
  var pi = Math.PI;
  return radians * (180/pi);
}

    */

    const {rotation} = useSelector(state => {

        return {
            rotation: state.acceleration.data[0].getRotation() * (180 / Math.PI)
        }
        
    })

    const initVis = () => {

        visFunction.current = D3Compass()
            .data([rotation])
            .height(visHeight)
            .width(visWidth)

        select(refElement.current)
            .call(visFunction.current)
            
    }


    /*
     * D3 -komponentin päivitys
     */
    const updateVis = () => {

        visFunction.current
            .data([rotation])
            
    }

    useEffect(() => {

        if(visFunction.current === null)
            initVis()
        else 
            updateVis()
        
    
        
    }, [rotation])


    return (
        <>
            <div ref={refElement} style={{maxWidth: "500px", margin: "10px 10px"}}>
            </div>
        </>
    );
};

export default Compass;