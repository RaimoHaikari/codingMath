import React from 'react';

import Recursion from "../../d3Components/recursion"
import './tyomaa.css';


const TestArea = () => {

    const a = () => {
        return (
            <Recursion />
        )
    }

    const b = () => {
        return (
            <div style={{background: "white"}}>
                <svg width="300" height="300">
                    <defs>
                        <linearGradient 
                            id="Gradient1"
                            x1="0.99" 
                            y1="0" 
                            x2="1"
                            y2="0"
                        >
                            <stop className="stopRed" offset="0" />
                            <stop className="stopYellow" offset="1" />
                        </linearGradient>
                    </defs>
                    <rect 
                        id="rect1" 
                        x="0" 
                        y="0" 
                        rx="1" 
                        ry="1" 
                        width="300" 
                        height="300"
                        fill="url(#Gradient1)"
                    />
                </svg>
            </div>           
        )
    }

    return (
         <>
            {a()}
         </>
    );
};


export default TestArea;