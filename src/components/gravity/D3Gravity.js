import * as d3 from "d3";
import { 
    select
} from "d3";
import gravitationReducer from "../../reducers/gravitationReducer";

export const D3Gravity = () => {

    let svg;
    let gElem;
    let circles;

    let data = []
    let width = 200;
    let height = 200;
    let margin = {top: 10, right: 10, bottom: 10, left: 10};

    let updateData;
    let updateHeight;
    let updateWidth;

    function chart(selection){

        /*
         *
         */
        selection.each(function(){

            svg = d3
                .select(this)
                //.append('svg')
                .attr("viewBox", [0,0, width, height])

            gElem = svg
                .append('g')
                .attr('transform', ` translate(${width/2},${height/2})`)

            circles = gElem
                .selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                    .style("stroke", "none")
                    .style("fill", d => {console.log(d.getColor()); return d.getColor()})
                    .attr("r", d => d.getRadius())
                    .attr("cx", d => d.getVector().getX())
                    .attr("cy", d => d.getVector().getY())

            updateData = function() {

                circles
                    .data(data)
                        .attr("r", d => d.getRadius())
                        .attr("cx", d => d.getVector().getX())
                        .attr("cy", d => d.getVector().getY())

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