import * as d3 from "d3";
import { 
    select, exit, remove
} from "d3";

export const d3Flocking = () => {

    let svg;
    let gElem;


    let gBoids;
    let boids;

    /* Objektin alkuperäinen liikevektori */
    let originalVelocityVisible = false
    let gVelocity;
    let velocity;

    /* Objektin päivitetty liikevektori */
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

    let gActiveBoid;
    let activeBoid;

    let updateData;
    let updateHeight;
    let updateWidth;


    function chart(selection){

        /*
         * Alignment -pisteen esittävän layerin siirto
         * - huom. syytä alustaa, vaikka joka kierroksella pistettä ei välttämättä ole
         */
        const transformToAlignmentPoint = (d) => { 

            //console.log(".. transformToAlignmentPoint  ..")
            //console.log(d.getVector().getX(), d.getVector().getY())
            //console.log(d.getAlignmentPoint().getX(), d.getAlignmentPoint().getY())
            
            let xTrans = d.getAlignmentPoint() === null ? 0 : d.getAlignmentPoint().getX() + d.getVector().getX();
            let yTrans = d.getAlignmentPoint() === null ? 0 : d.getAlignmentPoint().getY() + d.getVector().getY();

//console.log(xTrans, yTrans)

            return `translate(${xTrans},${yTrans})`
        } 

        const transformToBoidLocation = (d) => {

            let xTrans = d.getVector().getX();
            let yTrans = d.getVector().getY();

            let angle = d.getVelocity().getAngle()

            let asDegrees = ((d.getVelocity().getAngle()) * 180 / Math.PI) + 90
            let asRad = d.getVelocity().getAngle()

            if(d.getId() === 'b-0'){
                console.log(" : ", xTrans, yTrans, asRad, asDegrees)
            }

            //rotate(${asDegrees,xTrans,yTrans})
            return `translate(${xTrans},${yTrans}) rotate(${asDegrees})`

        }

        /*
         * Cohesio -pisteen esittävän layerin siirto
         * - huom. syytä alustaa, vaikka joka kierroksella pistettä ei välttämättä ole
         */
        const transformToCohesionPoint = (d) => { 
            
            let xTrans = d.getCohesionPoint() === null ? 0 : d.getCohesionPoint().getX() + d.getVector().getX();
            let yTrans = d.getCohesionPoint() === null ? 0 : d.getCohesionPoint().getY() + d.getVector().getY();

            return `translate(${xTrans},${yTrans})`
        }  
        
        /*
         * Cohesio -pisteen esittävän layerin siirto
         * - huom. syytä alustaa, vaikka joka kierroksella pistettä ei välttämättä ole
         */
        const transformToSeparationPoint = (d) => { 
            
            let xTrans = d.getSeparationPoint() === null ? 0 : d.getSeparationPoint().getX() + d.getVector().getX();
            let yTrans = d.getSeparationPoint() === null ? 0 : d.getSeparationPoint().getY() + d.getVector().getY();

            return `translate(${xTrans},${yTrans})`
        }   


        /*
         * @todo: yhdistä displayCohesionPoint ja displayAlignmentPoint
         */
        const displayAlignmentPoint = () => {

            const aPointUpdate = gElem
                .selectAll('.alignmentPointLayer')
                .data(activeBoid)

            const aPointEnter = aPointUpdate
                .enter()
                .append('g')
                .append("use")
                    .attr("href","#pointToDisplay")
                    .attr("id","alignmentPointID")
            
            const aPointExit = aPointUpdate
                .exit()
                .remove()

            aPointEnter
                .merge(aPointUpdate)
                    .attr('transform', d => transformToAlignmentPoint(d)
                    )
                    .attr('class', d => {
                        return d.getAlignmentPoint() !== null
                            ? "alignmentPointLayer"
                            : "alignmentPointLayer hide"
                    })

        }

        /*
         * @todo: entäs jos ei ole lähimmimmäisten keskipistettä
         * (return d.getCohesionPoint()!==null ? d.getCohesionPoint().getX()-5: 0;)
         */
        const displayCohesionPoint = () => {

            const cPointUpdate = gElem
                .selectAll('.cohesionPointLayer')
                .data(activeBoid)

            const cPointEnter = cPointUpdate
                .enter()
                .append('g')
                .append("use")
                    .attr("href","#pointToDisplay")
                    .attr("id","cohesionPointID")

            const cPointExit = cPointUpdate
                .exit()
                .remove()            
                
            cPointEnter
                .merge(cPointUpdate)
                    .attr('transform', d => transformToCohesionPoint(d)
                    )
                    .attr('class', d => {
                        return d.getCohesionPoint() !== null
                            ? "cohesionPointLayer"
                            : "cohesionPointLayer hide"
                    })

        }

        const displaySeparationPoint = () => {

            const sPointUpdate = gElem
                .selectAll('.separationPointLayer')
                .data(activeBoid)

            const sPointEnter = sPointUpdate
                .enter()
                .append('g')
                .append("use")
                    .attr("href","#pointToDisplay")
                    .attr("id","separationPointID")

            const sPointExit = sPointUpdate
                .exit()
                .remove()            
                
            sPointEnter
                .merge(sPointUpdate)
                    .attr('transform', d => transformToSeparationPoint (d)
                    )
                    .attr('class', d => {
                        return d.getSeparationPoint() !== null
                            ? "separationPointLayer"
                            : "separationPointLayer hide"
                    })
        }

        const displayPerceptionCircle = () => {

            const circleUpdate = gActiveBoid
                .selectAll("circle")
                .data(activeBoid)

            const circleEnter = circleUpdate
                .enter()
                .append("circle")

            const circleExit = circleUpdate
                .exit()
                .remove()

            circleEnter
                .merge(circleUpdate)
                    .attr("cx", d => d.getVector().getX())
                    .attr("cy", d => d.getVector().getY())
                    .attr("r", perceptionRadius)
                    .attr('class', 'perceptionCircle')                          

        }

        const displayBoids = () => {

            const bdsUpdate = gBoids
                .selectAll('.aBoid')
                .data(data)

            const bdsEnter = bdsUpdate
                .enter()
                .append('use')
                    .attr('href','#triangle')
                    .attr('id', d => `bd-${d.getId()}`)
                    .classed("aBoid", true);

            const bdsExit = bdsUpdate
                .exit()
                .remove()

            bdsEnter 
                .merge(bdsUpdate)
                    .attr('transform', d => transformToBoidLocation(d))
                    .style('fill', d => {
                        //d.isUnderObservation() ? 'red' : 'black'
                        return d.isUnderObservation()
                            ? 'red'
                            : d.isPerceived()
                                ? 'green'
                                : 'gray'
                    })

                /*
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
                    */
        }

        const displayBoidsBAK = () => {

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


        /*
         * Objektin lähtötilanteen liikevektori
         * - käytetään debuggauksessa
         */
        const displayOriginalVelocity = () => {

            velocity = gVelocity
                .selectAll("line")
                .data(data)
                .enter()
                .append("line")
                    .style("stroke", "rgb(0,0,0)")
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


        const bar = () => {
            let barElement = gElem
                .append('g')
                .append("use")
                .attr("href","#pointToDisplay")
                .attr("id","centerPointID")
        }

        /*
         *
         */
        selection.each(function(){

            svg = d3
                .select(this)
                //.append('svg')
                .attr("viewBox", [0,0, width, height]);
                    //.attr("width", width)
                    //.attr("height", height);

            gElem = svg
                .append('g')
                .attr('transform', ` translate(${width/2},${height/2})`)

            bar()

            gActiveBoid = gElem
                .append('g')
                    .attr("class","perceptionCircleLayer")

            displayPerceptionCircle()
            displayAlignmentPoint()
            displayCohesionPoint()
            displaySeparationPoint()


            gBoids = gElem
                .append('g')
                    .attr("class","boidsLayer")

            displayBoids();

            if(originalVelocityVisible){
                gVelocity= gElem.append('g')
                displayOriginalVelocity()

                gVelocityUpd =gElem.append('g')
            }






            updateData = function() {

                /*
                 *
                 */
                displayBoids()
//updateBoids()

                displayPerceptionCircle()
                displayAlignmentPoint()
                displayCohesionPoint()
                displaySeparationPoint()

                if(originalVelocityVisible){
                    updateVelocities()
                }


                
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