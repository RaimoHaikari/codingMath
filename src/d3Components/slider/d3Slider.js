import * as d3 from "d3";

/*
 * https://bl.ocks.org/johnwalley/e1d256b81e51da68f7feb632a53c3518
 */
export const D3Slider = () => {

    let svg;
    let gElem;

    let data = []
    let width = 200;
    let height = 200;
    let margin = {top: 10, right: 10, bottom: 10, left: 10};

    let xTranslate = 0;
    let yTranslate = 0;


    let updateData;
    let updateHeight;
    let updateWidth;


    function chart(selection){

        /*
         *<circle cx="150" cy="100" r="80" fill="green" />

  <text x="150" y="125" font-size="60" text-anchor="middle" fill="white">SVG</text>
         */
        selection.each(function(){

            svg = d3
                .select(this)
                .append('svg')
                .attr("width", width)
                .attr("height", height)
                //.attr("viewBox", [0,0, width, height])

            gElem = svg
                .append('g')
                .attr('transform',`translate(${xTranslate},${yTranslate})`);

            gElem
                .append('rect')
                    .attr("x",0)
                    .attr("y",0)
                    .attr("width","100%")
                    .attr("height", "100%")
                    .attr("fill", "red")

            gElem
                .append('circle')
                    .attr("cx",150)
                    .attr("cy",100)
                    .attr("r",80)
                    .attr("fill", "green")


            gElem
                .append('text')
                    .attr("x",150)
                    .attr("y",125)
                    .attr("font-size","60")
                    .attr("text-anchor", "middle")
                    .attr("fill", "white")
                    .text("SVG");


            updateData = function() {
                console.log("Päivitä  hyvä mies")
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