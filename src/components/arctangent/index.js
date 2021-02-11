import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {select} from "d3";

//import {setVis} from "../../reducers/rotatingArrowReducer";

// - visualisoinnin toteuttava D3 komponentti
import {arctanget} from "./arctanget";

const Arctangent = () => {

    const refElement = useRef(null);
    const visFunction = useRef(null)

    const dispatch = useDispatch();

    const {data, height, width} = useSelector(state => state.rotatingArrow)

    const initVis = () => {

        visFunction.current = arctanget()
            .data(data)
            .height(height)
            .width(width)

        select(refElement.current)
            .call(visFunction.current)
            
    }

    const updateVis = () => {
        visFunction.current
            .data(data)
    }

    useEffect(() => {

        if(data && data.length){

            if(visFunction.current === null)
                initVis()
            else
                updateVis()

        }
        

    }, [data])

    return (
        <>
         <div >
            <svg className="rot-arr-container" ref={refElement} id="mainSVG" width="600" height="500">
                <defs>
                    <g 
                        id="mySymbol" 
                        transform="translate(-50 -50) rotate(90, 50, 50)"
                    >
                        <path 
                            id="svg_3"
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
        </>
    );
};

export default Arctangent;