import * as d3 from "d3";
import { 
    select
} from "d3";

/*
 * https://observablehq.com/@d3/d3v6-migration-guide#pointer
 * https://observablehq.com/@d3/multitouch
 */
export const arctanget = () => {

    let svg;
    let gElem;
    let arrow;

    let data = []
    let width = 200;
    let height = 200;
    let margin = {top: 10, right: 10, bottom: 10, left: 10};

    /*
     * Mihin kohtaa def:stä luettu nuoli sijoitetaan
     */
    let origoX
    let origoY

    let updateData;
    let updateHeight;
    let updateWidth;

    function chart(selection){

        /*
         *
         */
        selection.each(function(){

            origoX = width / 2
            origoY = height / 2

            svg = d3
                .select(this)
                //.append('svg')
                .attr("viewBox", [0,0, width, height])
                .on("mousemove", function(event) {
                    const {clientX, clientY} = event

                    let dx = clientX - origoX  //
                    let dy = clientY - origoY  // 

                    let angle = Math.atan2(dy, dx)
                    let asDegrees = (angle * 180 / Math.PI) + 90

                    d3
                        .select("#mySymbol")
                        .attr("transform", `translate(-50,-50) rotate(${asDegrees}, 50, 50)`);            
                })

            gElem = svg
                .append('g')
                .attr('transform', ` translate(${width/2},${height/2})`)

            arrow = gElem
                .selectAll("use")
                .data(data)
                .enter()
                .append("use")
                .attr("xlink:href","#mySymbol")
                
            updateData = function() {

                let str = "translate(50,50) rotate(45, 50, 50)"

                d3
                    .select("#mySymbol")
                    .attr("transform", str);
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