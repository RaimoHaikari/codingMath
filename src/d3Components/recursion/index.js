import React, {useEffect, useRef, useState} from 'react';

import {select} from "d3";

import {d3Component} from "./d3component"

import './style.css'

const Recursion = () => {

    const refElement = useRef(null);
    const visFunction = useRef(null);

    const [data, setData] = useState(null)
    const [height, setHeight] = useState(300)
    const [width, setWidth] = useState(300)

    const [stopOffset, setStopOffset] = useState(0.01)

    const [count, setCount] = useState(0)

    const [limit, setLimit] = useState({
        x1: 0,
        x2: 0
    });

    const [ready, setReady] = useState(false)
    const [intervaId, setIntervaId] = useState(null)


    const setupRose = () => {

        let d = 2;
        let n = 6;

        let points = []

        for(var a = 0; a < 4*Math.PI; a+=0.1){

            let r = 150 * Math.cos((n/d) * a);
            let x = r * Math.cos(a)
            let y = r * Math.sin(a)

            points.push({x: x,y: y})

        }     
        
        setData(points)
    }

    const initVis = () => {

        
        visFunction.current = d3Component()
            .data(data)
            .height(height)
            .gradient(stopOffset)
            .width(width)

        select(refElement.current)
            .call(visFunction.current)
            
            
    }

    /*
     * D3 -komponentin päivitys
     */
    const updateVis = () => {

        /*
        visFunction.current
            .data(data)
            */
            
    }

    const updateGradient = () => {

        let newOffset = stopOffset+0.01<=1?stopOffset+0.01:0;
        setStopOffset(newOffset)
    }
 
    useEffect(() => {

        if(data && data.length){

            if(visFunction.current === null)
                initVis()
        
        }
        
    }, [data])


    let handleChange = (event) => {
        setData([event.target.value])
    }

    useEffect(() => {

        if(data && data.length){

            if(visFunction.current === null)
                initVis()
        
        }
        
    }, [data])

    /*
    useEffect(() => {

        if(ready === true){
            console.log("Voisi lopettaa")
            console.log(intervaId)
        }
        
    }, [ready])
    */

    /*

     */
    useEffect(() => {

        setupRose();

        
        const interval = setInterval(() => {

            setLimit(l => {

                let x1 = l.x1 + 0.05
                let x2 = l.x2 + 0.02

                if(x1 >= 1 && x2 >= 1)
                    setReady(true)

                return {
                    x1: x1 <= 1?x1:1,
                    x2: x1 <= 1
                        ? 0
                        : x2 <= 1 ? x2 : 1
                }
            });     


        }, 25)

        if(ready === true){
            clearInterval(interval)
        }

        return () => {
            clearInterval(interval)
        }
        

    }, [ready])


    /*
<input type="range" min="0" max="360" value="0" id="slider" oninput="updateAngle(this.value)">
     */
    return (
        <>
            <div style={{maxWidth: "800px", margin: "10px 10px"}}>
                <svg ref={refElement}>
                    <defs>
                        <linearGradient 
                            id="Gradient1"
                            x1={limit.x1} 
                            y1="0" 
                            x2={limit.x2} 
                            y2="0"
                        >
                            <stop className="stop1" offset="0" />
                            <stop className="stop2" offset="1" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
            <button onClick={() => updateGradient() }>Tee Jotain</button>
            <p>: {limit.x1}</p>
            <p>: {limit.x2}</p>
        </>
    );    
};

export default Recursion;