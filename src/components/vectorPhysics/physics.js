import * as d3 from "d3";
import { 
    select
} from "d3";

export const physics = () => {

    let svg;
    let gElem;
    let backgroundRect;
    let circles;

    let data = []

    // "Kankaan" leveys ja korkeus
    let width = 600;        
    let height = 600;

    // millä alueella objektien pitää pysyä
    let heightOfAllowedRange = 400;
    let widthOfAllowedRange = 400;

    let margin = {top: 10, right: 10, bottom: 10, left: 10};

    let opacity = 1;

    let updateData;
    let updateHeight;
    let updateWidth;
    let updateAllowedRange;

    function chart(selection){

        /*
         *
         */
        selection.each(function(){

            svg = d3
                .select(this)
                .append('svg')
                .attr("viewBox", [0,0, width, height]);
                    //.attr("width", width)
                    //.attr("height", height);

            gElem = svg
                .append('g')
                .attr('transform', ` translate(${width/2},${height/2})`)

                
            backgroundRect = gElem
                .append('rect')
                    .attr("x", -widthOfAllowedRange/2)
                    .attr("y", -heightOfAllowedRange/2)
                    .attr("width", widthOfAllowedRange)
                    .attr("height", heightOfAllowedRange)
                    .attr("stroke","pink")
                    .attr("stroke-width","5")
                    .attr("fill", "none");
                    

            circles = gElem
                .selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                    .style("stroke", "none")
                    .style("fill", "navy")
                    .attr("r", 6)
                    .attr("cx", d => d.getVector().getX())
                    .attr("cy", d => d.getVector().getY())
                    .attr("fill-opacity", opacity)



            updateData = function() {

                circles = gElem
                    .selectAll("circle")
                    .data(data)

                circles
                        .style("fill", d => d.getColor())
                        .attr("cx", d => d.getVector().getX())
                        .attr("cy", d => d.getVector().getY())
                        .attr("fill-opacity", opacity)

                circles
                    .enter()
                        .append("circle")
                            .style("stroke", "none")
                            .style("fill", "navy")
                            .attr("r", 6)
                            .attr("cx", d => d.getVector().getX())
                            .attr("cy", d => d.getVector().getY())
                            .attr("fill-opacity", opacity)

                circles
                    .exit()
                    .remove()

            }

            updateHeight = function() {}

            updateWidth = function() {}

            updateAllowedRange = function() {

                backgroundRect
                    .attr("x", -widthOfAllowedRange/2)
                    .attr("y", -heightOfAllowedRange/2)
                    .attr("width", widthOfAllowedRange)
                    .attr("height", heightOfAllowedRange)

                
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

    chart.height = function(val){

        if(!arguments.length) return height;

        height = val;

        if(typeof updateHeight === 'function')
            updateHeight();
   
        return chart

    }

    /*
     * Objektien pitää pysyä rajatun alueen sisällä, alue on pienempi kuin
     * animaation esittämiseen käytetty SVG -elementti, jotta nähdään
     * objektit pysyvät annetuissa rajoissa
     */
    chart.heightOfAllowedRange = function(val){

        if(!arguments.length) return heightOfAllowedRange;

        heightOfAllowedRange = val;

        if(typeof updateAllowedRange === 'function')
            updateAllowedRange();
   
        return chart

    }

    chart.opacity = function(val){
 
        if(!arguments.length) return opacity;

        opacity = val;
   
        return chart       
    }

    /*
     * Animaation esittämiseen käytettävän SVG -elementin leveys
     */ 
    chart.width = function(val){

        if(!arguments.length) return width;

        width = val;

        if(typeof updateWidth === 'function')
            updateWidth();
   
        return chart

    }


    /*
     * Objektien pitää pysyä rajatun alueen sisällä, alue on pienempi kuin
     * animaation esittämiseen käytetty SVG -elementti, jotta nähdään
     * objektit pysyvät annetuissa rajoissa
     */
    chart.widthOfAllowedRange = function(val){

        if(!arguments.length) return widthOfAllowedRange;

        widthOfAllowedRange = val;

        if(typeof updateAllowedRange === 'function')
            updateAllowedRange();
   
        return chart

    }

    return chart

}