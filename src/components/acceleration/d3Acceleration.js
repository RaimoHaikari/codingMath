import * as d3 from "d3";
import { 
    select
} from "d3";
import { accelerate } from "../../reducers/advAccelerationReducer";

export const d3Acceleration = () => {

    let svg;
    let gElem;

    let gCenterOfShip;   // Tapahtumapaikka 
    let gRotationOfShip; // Kuinka paljon alusta käännetään
    let gOriginOfShip;   // Aluksen keskipisteen siirto pyörittämisen origoon
    let gScalingOfShip;  // Skaalataan alusta esittävä kuva haluttuun kokoon
    let arrow;

    let data = []
    let width = 200;
    let height = 200;
    let margin = {top: 10, right: 10, bottom: 10, left: 10};

    let widthOfDefsElement = 100;
    let heightOfDefsElement = 100;
    let xScale = 1;
    let yScale = 1;

    let updateData;
    let updateHeight;
    let updateWidth;


    /*
     * Funktiot joiden avulla:
     * - määritetään aluksen sijaintipaikka
     * - haluttu kierto
     * - piirrettävän kuvan skaalaus haluttuun kokoon
     */
    const getCenterOfShip = (d) => {

//console.log("............ CENTER ..................")
//console.log(d.getVector().getX())

        return `translate(${d.getVector().getX()},${d.getVector().getY()})`
    }

    const getRotationOfShip = (d) => {

        let asDegrees = ((d.getRotation()) * 180 / Math.PI) + 90

        return `rotate(${asDegrees})`
    }

    const getShipCenterToOrigo = (d) => {
        let xTranslate = (widthOfDefsElement / -2) * xScale
        let yTranslate = (heightOfDefsElement / -2) * yScale

        return `translate(${xTranslate},${yTranslate})`
    }

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
                    .attr('transform', `translate(${width/2},${height/2})`)



            
            gCenterOfShip = gElem
                .selectAll('.ship')
                .data(data)
                .enter()
                .append('g')
                    .attr('transform', d => getCenterOfShip(d))
                    .attr('class','ship')

            gRotationOfShip = gCenterOfShip
                .append('g')
                .attr('transform', d => getRotationOfShip(d))  
                
            gOriginOfShip = gRotationOfShip
                .append('g')
                .attr('transform', d => getShipCenterToOrigo(d)) 

            gScalingOfShip = gOriginOfShip
                .append('g')
                .attr("transform", `scale(${xScale} ${yScale})`)

            arrow = gScalingOfShip
                .append("use")
                    .attr("href","#mySymbol")
                    .attr("id","fooBar")

                    gElem
                    .append("line")
                    .attr("x1", 0)
                    .attr("y1", 0)
                    .attr("x2", 300)
                    .attr("y2", 0)
                    .style("stroke", "red")
    
                gElem
                    .append("line")
                    .attr("x1", 0)
                    .attr("y1", 0)
                    .attr("x2", 0)
                    .attr("y2", 300)
                    .style("stroke", "red")
    
            

            updateData = function() {

                gCenterOfShip
                    .data(data)
                        .attr('transform', d => getCenterOfShip(d))

                gRotationOfShip
                    .data(data)
                        .attr('transform', d => getRotationOfShip(d))  

                gOriginOfShip
                    .data(data)
                        .attr('transform', d => getShipCenterToOrigo(d));

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

        if(typeof updateWidth === 'function')
            updateWidth();
   
        return chart

    }

    /*
     * Minkä verran alusta esittävän nuolen leveyttä skaalataan
     */
    chart.xScale = function(val){

        if(!arguments.length) return xScale;

        xScale = val;

        return chart

    }

    /*
     * Minkä verran alusta esittävän nuolen leveyttä skaalataan
     */
    chart.yScale = function(val){

        if(!arguments.length) return yScale;

        yScale = val;

        return chart

    }

    return chart

}