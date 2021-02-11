import React, {useEffect, useRef, useState} from 'react';

import { select } from "d3";

const TestArea = () => {

    const [data, setData] = useState(['red']);

    const refElement = useRef(null);
    const visFunction = useRef(null);

    const initVis = () => {

        visFunction.current = d3Chart()
            .data(data)

        select(refElement.current)
            .call(visFunction.current)
            
    }

    const updateVis = () => {

        visFunction.current
            .data(data);
             
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
            <div ref={refElement} className="d3container"></div>
            <button onClick={() => setData(['blue'])}>Update</button>
        </>
    );
};


const d3Chart = () => {

    let svg;
    let gElem;
    let circles;

    let data = []
    let width = 200;
    let height = 200;

    let updateData;

    function chart(selection){

        selection.each(function(){

            svg = select(this)
                .append('svg')

            gElem = svg
                .append('g')
                .attr('transform', ` translate(${width/2},${height/2})`)

            circles = gElem
                .selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                    .style("stroke", "none")
                    .style("fill", d => d)
                    .attr("r", 10)
                    .attr("cx", 0)
                    .attr("cy", 0)

            updateData = function() {

                circles = gElem
                    .selectAll("circle")
                    .data(data)
                        .style("fill", d => d)

            }

        })
    }

    chart.data = function(val){

        if(!arguments.length) return data;

        data = val;

        if(typeof updateData === 'function')
            updateData();
   
        return chart

    }

    return chart

}


export default TestArea;