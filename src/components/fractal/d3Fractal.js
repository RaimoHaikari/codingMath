import * as d3 from "d3";
import { 
    select
} from "d3";

/*
 * http://bl.ocks.org/pstuffa/8e9e4218e19fee84638b
 */
export const D3Fractal = () => {

    let svg;
    let gElem;
let fooElem;

    let data = []
    let width = 200;
    let height = 200;
    let margin = {top: 10, right: 10, bottom: 10, left: 10};

    let linetype = "polygon"

    let lineGenerator;

    let updateData;
    let updateHeight;
    let updateWidth;
    let updateLineType;

    const initializeVars = () => {

        lineGenerator = d3
            .line()
            .x(d => d.x)
            .y(d => d.y)    
    }

    /*
     *
     */
    const pointsToPolygon = (d) => {

        let bar = d.map(point => `${point.x},${point.y}`)
        return bar.join(" ")
    }


    /*
     * fractalTree
     */
    const fractalTree = () => {

        clearCanvas()

        gElem
            .selectAll("path")
            .data(data)
            .enter()
            .append("path")
                .attr('d', d => {
                    return lineGenerator(d)
                })
                .attr("class", "fractalTree")
            
    }


    const pGon = () => {

        clearCanvas()

        gElem
            .selectAll("polygon")
            .data(data)
            .enter()
            .append("polygon")
                .attr("points", d => pointsToPolygon(d.points))
                //.attr("points", d => pointsToPolygon(d))
                //.attr("fill", d => d.color)
                .attr("class", d => d.className)        
    }

    const clearCanvas = () => {

        gElem
            .selectAll("path")
            .remove()

        gElem
            .selectAll("polygon")
            .remove();

    }


    function chart(selection){

        /*
         *
         */
        selection.each(function(){

            initializeVars()

            svg = d3
                .select(this)
                //.append('svg')
                .attr("viewBox", [0,0, margin.left + width + margin.right, margin.top + height + margin.bottom])

            /*
             <rect x="0" y="0" width="100%" height="100%"/>
             */
            svg 
                .append("rect")
                .attr("x", 0)
                .attr("y", 0)
                .attr("width","100%")
                .attr("height","100%")


            gElem = svg
                .append('g')
                .attr('transform', `translate(${margin.left},${margin.top})`);

            fooElem = svg
                .append('g')
                .attr('transform', `translate(${margin.left},${margin.top})`)

            

            if(linetype === "path"){
                fractalTree(); 
            }
            else
                pGon();


            updateData = function() {

                if(linetype === "path")
                    fractalTree(); 
                else
                    pGon();

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

    chart.linetype = function(val){

        if(!arguments.length) return linetype;

        linetype = val;
   
        return chart

    } 

    chart.width = function(val){

        if(!arguments.length) return width;

        width = val;

        if(typeof updateWidth === 'function')
            updateWidth();
   
        return chart

    }

    return chart

}