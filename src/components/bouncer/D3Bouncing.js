import * as d3 from "d3";
import { 
    select 
} from "d3";

export const D3Bouncing = () => {

    let svg;
    let gElem;
    let circle;

    let data = []
    let width = 200;
    let height = 200;
    let margin = {top: 10, right: 10, bottom: 10, left: 10};

    let centerX = 0
    let centerY = 0


    let count = 0;
    let offset;
    let speed = 0.1;
    let angle = 0;

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
                .append('svg')
                .attr("viewBox", [0,0, width, height])

            gElem = svg
                .append('g')
                .attr('transform', ` translate(${width/2},${height/2})`)

            circle = gElem
                .selectAll("circle")
                .data([data])
                .enter()
                .append("circle")
                    .attr("cy", d => d.getVector().getY())
                    .attr("cx", d => d.getVector().getX())
                    .attr("r", d => d.getRadius())
                    .attr("fill", d => d.getColor())
            
            updateData = function() {

                circle = gElem
                    .selectAll("circle")
                    .data([data])

                circle
                    .attr("cy", d => d.getVector().getY())
                    .attr("cx", d => d.getVector().getX())
                    .attr("fill", d => d.getColor())
                    
            }

            updateHeight = function() {}
            updateWidth = function() {}

        })
    }

    chart.centerX = function(val){

        if(!arguments.length) return centerX;

        centerX = val;

        if(typeof updateData === 'function')
            updateData();
   
        return chart

    }

    chart.centerY = function(val){

        if(!arguments.length) return centerY;

        centerY = val;

        if(typeof updateData === 'function')
            updateData();
   
        return chart

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