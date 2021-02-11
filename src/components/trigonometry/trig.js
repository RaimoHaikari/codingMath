import * as d3 from "d3";
import { 
    select, 
    min,
    max, 
    extent,
    scaleLinear 
} from "d3";

export const sinWave = () => {

    let svg;
    let gElem;

    let data = []
    let width = 200;
    let height = 200;
    let margin = {top: 10, right: 10, bottom: 10, left: 10};

    let xScale;
    let yScale;

    let updateData;
    let updateHeight;
    let updateWidth;

    function chart(selection){

        /*


        */
        selection.each(function(){

            console.log(d3.extent(data.map(d => Math.sin(d))))

            xScale = d3.scaleLinear()
                .domain(d3.extent(data))                   // unit: phenomeon
                .range([margin.left, (width-margin.left)]) // unit: pixels


            yScale = d3.scaleLinear()
                .domain(d3.extent(data.map(d => Math.sin(d))))  // unit: phenomeon
                .range([margin.top, (height-margin.bottom)])    // unit: pixels

            svg = d3
                .select(this)
                .append('svg')
                .attr("viewBox", [0,0, width, height])

            gElem = svg
                .append("g")
                .attr('transform', `scale(1, -1) translate(${0},${-height})`)
                //.attr('transform', `translate(${0},${height/2})`)
                // scale(1, -1)

            gElem
                .selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                    .style("fill", "black")
                    .attr("r", 1)
                    .attr("cx", d => xScale(d))
                    .attr("cy", d => yScale(Math.sin(d)))

            updateData = function() {}
            updateHeight = function() {}
            updateWidth = function() {}

        })
    }

    chart.data = function(val){

        if(!arguments.length) return data;

        data = val;

        if(typeof updateData === 'function')
            updateData();
   
        return chart

    }

    chart.height = function(val){

        if(!arguments.length) return height;

        height = val;

        if(typeof updateHeight === 'function')
            updateHeight();
   
        return chart

    }

    chart.width = function(val){

        if(!arguments.length) return width;

        width = val;

        if(typeof updataWidth === 'function')
            updateWidth();
   
        return chart

    }

    return chart

}