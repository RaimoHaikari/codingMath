import * as d3 from "d3";
import { 
    select
} from "d3";
import gravitationReducer from "../../reducers/gravitationReducer";

export const D3Gravity = () => {

    let svg;
    let gElem;
    let previewElem;

    let circles;
let previewDots; 

    let data = [];
    let preview = []

    let width = 200;
    let height = 200;
    let margin = {top: 10, right: 10, bottom: 10, left: 10};

    let updateData;
    let updateHeight;
    let updatePreview;
    let updateWidth;

    const drawPlanets = () => {
 
        circles = gElem
            .selectAll(".planets > circle")
            .data(data)

        circles
                .attr("cx", d => d.getVector().getX())
                .attr("cy", d => d.getVector().getY())
        
        circles
            .enter()
            .append("circle")
                .style("stroke", "none")
                .style("fill", d => d.getColor())
                .attr("r", d => d.getRadius())
                .attr("cx", d => d.getVector().getX())
                .attr("cy", d => d.getVector().getY());

    }

    const drawPreviewDots = () => {

        var t = d3.transition()
            .duration(750)
            .ease(d3.easeLinear);

        previewDots = previewElem
            .selectAll(".preview > circle")
            .data(preview);

        previewDots
            .transition(t)
                .attr("cx", d => d.x)
                .attr("cy", d => d.y)

        previewDots
            .enter()
            .append("circle")
                .style("stroke", "none")
                .style("fill", d => d.color)
                .attr("r", 1)
                .attr("cx", d => d.x)
                .attr("cy", d => d.y)

    }


    function chart(selection){

        /*
         *
         */
        selection.each(function(){

            svg = d3
                .select(this)
                //.append('svg')
                .attr("viewBox", [-width, -height, 3 * width, 3 * height])
                //.attr("viewBox", [0,0, width, height])

            /*
             * Planeettojen kiertoratojen esikatselu pisteille omistettu kerros
             */
            previewElem = svg
                .append('g')
                .classed("preview", true)
                .attr('transform', ` translate(${width/2},${height/2})`);

            drawPreviewDots();

            /*
             * Planeetat
             */
            gElem = svg
                .append('g')
                .classed("planets", true)
                .attr('transform', ` translate(${width/2},${height/2})`);

            drawPlanets();


            updateData = function() {
                drawPlanets();
            }

            updateHeight = function() {}

            updatePreview = function() {
               drawPreviewDots();                       
            }


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

    /*
     * Asetetaan / päivitetään planeettojen ratojen esikatselunäkymä
     *
     *  
     */
    chart.preview = function(val){

        if(!arguments.length) return preview;

        preview = val;

        if(typeof updatePreview === 'function')
            updatePreview();

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