import * as d3 from "d3";

/*
 * http://bl.ocks.org/msqr/3202712
 */
export const d3Component = () => {

    let svg;
    let gElem;
    let gRect;

    let defs;
    let linearGradient;
    let stopTwo;
    let stopTwoOffset = 0;

    let data = []
    let width = 200;
    let height = 200;
    let margin = {top: 10, right: 10, bottom: 10, left: 10};

    let updateData;
    let updateGradient;
    let updateHeight;
    let updateWidth;


    const drawCircle = (x, y, r) => {

        if(r > 5) {
            drawCircle(x + 1.2*r, y, r * 0.5)
            drawCircle(x - 1.2*r, y, r * 0.5)
            drawCircle(x, y + 1.2* r, r * 0.5)
            drawCircle(x, y - 1.2* r, r * 0.5)
        }

    }

    const drawRect = () => {

        gRect
            .selectAll("rect")
            .data([true])
            .enter()
            .append("rect")
                .style("fill", "url(#Gradient1)")
                .attr("x", 0)
                .attr("y", 0)
                .attr("width", "100%")
                .attr("height", "100%")

    }

    /*
     *
     */
    const drawRose = () => {

        gElem
            .selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
                .style("stroke", "gray")
                .style("fill", "black")
                .attr("r", 1)
                .attr("cx", d => d.x)
                .attr("cy", d => d.y);

    }


    function chart(selection){

        /*
         *
         */
        selection.each(function(){

            svg = d3
                .select(this)
                //.append('svg')
                .attr('class', 'rose')
                .attr("viewBox", [0,0, width, height])

            //appendDef();

            gRect = svg
                .append('g');

            gElem = svg
                .append('g')
                .attr('transform', "translate(" + ((width) / 2) + ", " + ((height) / 2) + ")");


            //drawCircle(0, 0, 60)
            drawRect();
            drawRose();

            updateData = function() {}

            updateGradient = function() {

                console.log("Stoppi", stopTwoOffset)
            }


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

    chart.gradient = function(val){

        if(!arguments.length) return stopTwoOffset;

        stopTwoOffset = val;

        if(typeof updateGradient === 'function')
            updateGradient();
   
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