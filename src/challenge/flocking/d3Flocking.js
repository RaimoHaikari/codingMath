import * as d3 from "d3";
import { 
    select
} from "d3";

export const d3Flocking = () => {

    let svg;
    let gElem;

let circles;

    let gBoids;
    let boids;

let gVelocity;
let velocity;

let firstUpd = true;
let gVelocityUpd;
let velocityUpd;

let velocityLineScale = 5

    let data = []

    // "Kankaan" leveys ja korkeus
    let width = 200;        
    let height = 200;

    // Vertailtavan objektin korostus
    let perceptionRadius;
    let perceptionCircle;
    let gActiveBoid;
    let activeBoid;

    let updateData;
    let updateHeight;
    let updateWidth;


    function chart(selection){


        const displayPerceptionCircle = () => {

            perceptionCircle = gActiveBoid
                .selectAll("circle")
                .data(activeBoid)
                .enter()
                .append("circle")
                    .style("stroke", "gray")
                    .style("fill", 'none')
                    .attr("r", perceptionRadius)
                    .attr("cx", d => {
                        return d.getVector().getX()
                    })
                    .attr("cy", d => d.getVector().getY())
        }

        const displayBoids = () => {

            boids = gBoids
                .selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                    .style("stroke", "gray")
                    .style("fill", d => {
                        //d.isUnderObservation() ? 'red' : 'black'
                        return d.isUnderObservation()
                            ? 'red'
                            : d.isPerceived()
                                ? 'yellow'
                                : 'navy'
                    })
                    .attr("r", d => d.getRadius())
                    .attr("cx", d => {
                        return d.getVector().getX()
                    })
                    .attr("cy", d => d.getVector().getY())
        }


        const displayOriginalVelocity = () => {

            velocity = gVelocity
                .selectAll("line")
                .data(data)
                .enter()
                .append("line")
                    .style("stroke", "rgb(255,0,0)")
                    .attr("x1", d => d.getVector().getX())
                    .attr("y1", d => d.getVector().getY())
                    .attr("x2", d => {return d.getVector().getX() + (velocityLineScale * d.getVelocity().getX())})
                    .attr("y2", d => {
//console.log(d.getId(), d.getVelocity().getLength())
                        return d.getVector().getY() + (velocityLineScale * d.getVelocity().getY())
                    })
        }

        const displayVelocity = () => {

            velocityUpd = gVelocityUpd
                .selectAll("line")
                .data(data)
                .enter()
                .append("line")
                    .style("stroke", "#0062cc")
                    .attr("x1", d => d.getVector().getX())
                    .attr("y1", d => d.getVector().getY())
                    .attr("x2", d => {
//console.log(d.getId(), d.getVelocity().getLength())
                        return d.getVector().getX() + (velocityLineScale * d.getVelocity().getX())}
                    )
                    .attr("y2", d => {return d.getVector().getY() + (velocityLineScale * d.getVelocity().getY())})
        }

        const updateBoids = () => {

            boids
                .data(data)
                    .attr("cx", d => d.getVector().getX())
                    .attr("cy", d => d.getVector().getY())
                    .style("fill", d => {
                        return d.isUnderObservation()
                            ? 'red'
                            : d.isPerceived()
                                ? 'yellow'
                                : 'navy'
                    })
        }

        const updatePerceptionCircle = () => {

            perceptionCircle
                .data(activeBoid)
                    .attr("cx", d => {
                        return d.getVector().getX()
                    })
                    .attr("cy", d => d.getVector().getY())
        }

        const updateVelocities = () => {

            if(firstUpd){
//console.log("Eka päivitys")
                firstUpd = false
                displayVelocity()
            } else {
                velocityUpd
                    .data(data)
                        .attr("x1", d => d.getVector().getX())
                        .attr("y1", d => d.getVector().getY())
                        .attr("x2", d => {
//console.log(d.getId(), d.getVelocity().getLength())
                            return d.getVector().getX() + (velocityLineScale * d.getVelocity().getX())}
                        )
                        .attr("y2", d => {return d.getVector().getY() + (velocityLineScale * d.getVelocity().getY())})               
            }

        }



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

            gActiveBoid = gElem.append('g')
            //if(activeBoid !== null)
                //displayPerceptionCircle()

            gBoids = gElem.append('g')
                displayBoids();

            gVelocity= gElem.append('g')
                //displayOriginalVelocity()

            gVelocityUpd =gElem.append('g')



            updateData = function() {
                //console.log("D3 PÄIVITYS")

                /*
                
                */
                updateBoids()
                //updatePerceptionCircle()
                //updateVelocities()
                
            }

            updateHeight = function() {}

            updateWidth = function() {}

        })
    }


    /*
     * Vertailussa olevan havaitoympräristöä esittävän ympyrän säde 
     */
    chart.activeBoid = function(val){

        if(!arguments.length) return activeBoid;

        activeBoid = val;
   
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

    /*
     * Vertailussa olevan havaitoympräristöä esittävän ympyrän säde 
     */
    chart.perceptionRadius = function(val){

        if(!arguments.length) return perceptionRadius;

        perceptionRadius = val;
   
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


    return chart

}