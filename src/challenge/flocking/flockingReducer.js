import { randomBates } from "d3";
import {Boid, Vector} from "./Vector"

// {x: 10.629491010233924,y: 20.27021022090776, speed: 5, direction: 2.183530491580548, id: 'no1'},
const MOCKDATA = [
    {x: 10.629491010233924,y: 20.27021022090776, speed: 5, direction: 2.183530491580548, id: 'no1'},
    {x: 93.57427297010335 ,y: 19.2834088776445, speed: 5 , direction: 0.7088897208315498, id: 'no2'},
    {x:-23.79632196289197, y: 17.39287469404846, speed: 5, direction: 2.245509880915584, id: 'no3'},    
    {x: -58.2496832084185, y: -84.44108368560433, speed: 5, direction: 1.7992644802615956, id: 'no4'},    
    {x: 102.26575963709455, y: -31.1341626776509, speed: 5, direction: 0.2659307848422521, id: 'no5'},    
    {x: -102.85397038756787, y: -35.1449957331792, speed: 5, direction: 2.7607831406843357, id: 'no6'},    
    {x: 25.2090799971156, y: 44.04157725387055, speed: 5, direction:  2.966018206246715, id: 'no7'},    
    {x: 18.679399801727, y: 93.59697392679374, speed: 5, direction: 4.3249371164895685, id: 'no8'},    
    {x: -64.76981436087044, y: -22.7173211361601, speed: 5, direction: 1.5036811925116484, id: 'no9'},    
    {x: 56.93616708720157, y: -46.1687539637287, speed: 5, direction: 4.524251645009789, id: 'no10'}
];

// Canvas
const HEIGHT = 500
const WIDTH = 500

// Circle (Boid) radius
const BOID_RADIUS = 4;

const NUMBER_OF_BOIDS = 50

const PERCEPTIONRADIUS = 100
const UNDER_OBSERVATION = 0

/*
 * Initial values: Alignment, cohesion, separation 
 */
const INITIAL_ALIGNMENT_VALUES =  {min: 0.1, value: 5, max: 10, step: 0.1}
const INITIAL_COHESION_VALUES =  {min: 0.1, value: 5, max: 10, step: 0.1}
const INITIAL_SEPARATION_VALUES =  {min: 0.1, value: 5, max: 10, step: 0.1}

const INITIAL_PERCEPTION_RADIUS =  {min: 10, value: 50, max: 100, step: 1}

const ID_PREFIX = 'b-';


/* 
 * A L I G N M E N T
 *
 * Alignment: steer towards the average heading of local flockmates
 */
const align = (current, boids, perceptionRadius) => {

    let desired = new Vector(0,0);
    let counter = 0;

    /*
     * Selvitetään lähiympäristön objektit ja lasketaan näiden yhdistetty 
     * suuntavektori...
     */
    for(let other of boids){

        let dist = Vector.distanceOf(current.getVector(), other.getVector());

        if((current.getId() !== other.getId()) && dist < perceptionRadius){
            desired = desired.add(other.getVelocity())
            counter++;
        }
    }

    /*
     * Otetaan keskiarvo, mikäli lähistön kartoituksessa on huomioitu enemmän kuin yksi
     * Boid -objekti
     */
    if(counter > 1) desired = desired.divide(counter)

    /*
     * Rajataan kurssin korjaus asetuksissa määrättyyn maksimipituuteen
     
    if(desired.getLength() > maxForce) {
//console.log("Rajoitus", current.getId(), desired.getLength(), maxForce)
        desired = desired.setLength(maxForce)
    }
    */


    return desired

}

/*
 *
 */
const getDesiredAlignment = (boid, boids, perceptionRadius, maxForce) => {

    let desiredAlignment = align(
        boid, 
        boids, 
        perceptionRadius
    )

    if(desiredAlignment.getLength() > maxForce) {
        //console.log(": ali E:", desiredAlignment.getLength())
        desiredAlignment = desiredAlignment.setLength(maxForce)
        //console.log(": ali J:",  desiredAlignment.getLength())
    }

    //console.log("- ali", desiredAlignment.getX(), desiredAlignment.getY())

    return desiredAlignment

}


/*
 * C O H E S I O N 
 *
 * Steer to move towards the average position (center of mass) of local flockmates
 * (kulje kohti lähiryhmän keskusta)
 * - mikäli lähikeskusta ei voida määrittää, palauttaa null
 */
const cohesionPoint = (current, boids, perceptionRadius) => {

    let desired = new Vector(0,0);
    let counter = 0;

    /*
     * Selvitetään lähiympäristön objektit ja lasketaan keskipiste
     * - huom! operoidaan objektien absoluuttisilla koordinaateilla
     */
    for(let other of boids){

        let dist = Vector.distanceOf(current.getVector(), other.getVector());

        if((current.getId() !== other.getId()) && dist < perceptionRadius){

            if(current.getId() === 'b-0101010'){
                console.log(" ----------",current.getId(),"---------- ")
                console.log(" diff " , other.getVector().getX(), other.getVector().getY(), `${other.getId()}`)
                console.log(".........................................")
             }


            desired = desired.add(other.getVector())
            counter++;
        }
    }

    /*
     * Otetaan keskiarvo, mikäli lähistön kartoituksessa on huomioitu enemmän kuin yksi
     * Boid -objekti
     */
    if(counter > 1) 
        desired = desired.divide(counter)
    else
        desired = null

    return desired

}

const cohesion = (current, boids, perceptionRadius) => {

    let cPoint = cohesionPoint (
        current, 
        boids, 
        perceptionRadius
    )

    let desiredCohesion = new Vector(0,0);

    if(cPoint !== null) {

        /*
         * huom! siirrytään absoluuttisista koordinaateista suhteellisiin
         */
        desiredCohesion = cPoint.subtract(current.getVector())

        if(current.getId() === 'b-01010101'){
            console.log(" ----------",current.getId(),"---------- ")
            console.log(" desired " , desiredCohesion.getX(), desiredCohesion.getY())
            console.log(".........................................")
         }

    }

    return desiredCohesion

}

const getDesiredCohesion = (boid, boids, perceptionRadius, maxForce) => {

    /*
     * Cohesion: steer to move towards the average position (center of mass) of local flockmates
     */
     let desiredCohesion = cohesion(
         boid, 
         boids, 
         perceptionRadius       
     )
 
     /*
      * Rajataan kurssin korjaus asetuksissa määrättyyn maksimipituuteen
      */
     if(desiredCohesion.getLength() > maxForce) {
         //console.log(": coh E:", desiredCohesion.getLength())
         desiredCohesion = desiredCohesion.setLength(maxForce)
         //console.log(": coh J:",  desiredCohesion.getLength())
     }
 
     return desiredCohesion
 
 }

/*
 * S E P A R A T I O N
 */
const separationPoint = (current, boids, perceptionRadius) => {

    let desired = new Vector(0,0);
    let counter = 0;

    /*
     * Selvitetään lähiympäristön objektit ja lasketaan keskipiste
     */
    for(let other of boids){

        let dist = Vector.distanceOf(current.getVector(), other.getVector());

        /*
         * - päinvastaiseen suutaan
         * - sitä kauemmas, mitä lähempänä naapuri on
         */
        if((current.getId() !== other.getId()) && dist < perceptionRadius){

            /*
             * Huom! Käsitellään suhteellisia koordinaatteja
             */
            let diff = current.getVector().subtract(other.getVector());
            let porpotional = diff.divide(dist)

 if(current.getId() === 'b-010101'){
    console.log(" ----------",current.getId(),"---------- ")
    console.log(" diff " , diff.getX(), diff.getY(), `${other.getId()}`)
    console.log(" dist " , dist)
    console.log(" por " , porpotional.getX(), porpotional.getY())
    console.log(".........................................")
 }


            desired = desired.add(porpotional)
            counter++;

        }
    }

    /*
     * Otetaan keskiarvo, mikäli lähistön kartoituksessa on huomioitu enemmän kuin yksi
     * Boid -objekti
     */
    if(counter > 1) 
        desired = desired.divide(counter)
    else
        desired = null

    return desired

}

const separation = (current, boids, perceptionRadius) => {

    let sPoint = separationPoint (
        current, 
        boids, 
        perceptionRadius
    )

    let desiredSeparation = (sPoint !== null) ? sPoint : new Vector(0,0);

    return desiredSeparation
}

/*

       let desiredSeparation = separation(
        boid, 
        state.data, 
        state.perceptionRadius        
    )

    if(desiredSeparation.getLength() > state.separation.value) {
        console.log(": sep E:", desiredSeparation.getLength())
        desiredSeparation = desiredSeparation.setLength(state.separation.value)
        console.log(": sep J:",  desiredSeparation.getLength())
    }
 */
const getDesiredSeparation = (boid, boids, perceptionRadius, maxForce) => {

    let desiredSeparation = separation(
        boid, 
        boids, 
        perceptionRadius        
    )

    if(desiredSeparation.getLength() > maxForce) {
        //console.log(": sep E:", desiredSeparation.getLength())
        desiredSeparation = desiredSeparation.setLength(maxForce)
        //console.log(": sep J:",  desiredSeparation.getLength())
    }

    return desiredSeparation;

}



/*
 * Asetetaan bitti onko objekti aktiivisen objektin tarkkailualueella
 */
const highlightPerceived = (activeBoid, boids, alignmentSettings, cohesionSettings, separationSettings, perceptionRadius) => {

    //console.log(".. hP..")
    //console.log(cohesionSettings)

    return boids.map(boid => {

        if(boid.getId() === activeBoid.getId()){

            let desiredCohesion = getDesiredCohesion(boid, boids, perceptionRadius, cohesionSettings.value)
//console.log("- coh",desiredCohesion.getX(), desiredCohesion.getY())

            let desiredAlignment = getDesiredAlignment(boid, boids, perceptionRadius, alignmentSettings.value)

            let desiredSeparation = getDesiredSeparation(boid, boids, perceptionRadius, separationSettings.value)
//console.log("- sepa", desiredSeparation.getX(), desiredSeparation.getY())

            return boid
                .setPerceived(false)
                .setCohesionPoint(desiredCohesion)
                .setAlignmentPoint(desiredAlignment)
                .setSeparationPoint(desiredSeparation)
        }

        let dist = Vector.distanceOf(activeBoid.getVector(), boid.getVector());

        /*
         * @todo: TÄNNE TARKENNUS....
         * 
         */
        return boid.setPerceived(dist <= perceptionRadius)

    })

}

let seed = 1;

function random() {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

const getMockData = (width, height, r, active, perceptionRadius, alignmentSettings, cohesionSettings, separationSettings) => {

    let data = []

    let activeBoid = null;

    for(var i  = 0; i < MOCKDATA.length; i++){

        let isActive = active === null
                        ? false
                        : i === active
                            ? true
                            : false

        let boid = new Boid(
            MOCKDATA[i].x,
            MOCKDATA[i].y, 
            MOCKDATA[i].speed,
            MOCKDATA[i].direction, 
            `${ID_PREFIX}${i}`,
            r,
            width,
            height,
            isActive
        ) 

        if (isActive)
            activeBoid = boid

        data.push(boid) 
    }

    if(activeBoid !== null){
        data = highlightPerceived(activeBoid, data, alignmentSettings, cohesionSettings, separationSettings, perceptionRadius.value)
    }

    return data
}

/*
 * Esitettävien objektien alustus
 * - tarkkailtava objekti ilmoitetaan indeksi -numerolla.
 *   (Myöhemmin tunnistus isUnderObservation -metodilla)
 */
const getData = (n, width, height, r, active, perceptionRadius, alignmentSettings, cohesionSettings, separationSettings) => {

    let seeded = false

    let data = []
    let activeBoid = null;

    for(var i = 0; i < n; i++){


        let boid

        let isActive = active === null
                        ? false
                        : i === active
                            ? true
                            : false

        if(seeded){

            let rnd = random()

            boid = new Boid(
                -0.25 * width + rnd * 0.5 * width,
                -0.25 * height + rnd * 0.5 * height, 
                rnd * 5 + 2,
                rnd * Math.PI * 2, 
                `${ID_PREFIX}${i}`,
                r,
                width,
                height,
                isActive
            )
        } else {

            boid = new Boid(
                -0.25 * width + Math.random() * 0.5 * width,
                -0.25 * height + Math.random() * 0.5 * height, 
                Math.random() * 5 + 2,
                Math.random() * Math.PI * 2, 
                `${ID_PREFIX}${i}`,
                r,
                width,
                height,
                isActive
            )    

        }

        if(isActive)
            activeBoid = boid

        data.push(boid) 
               
    }

    if(activeBoid !== null){
        data = highlightPerceived(activeBoid, data, alignmentSettings, cohesionSettings, separationSettings, perceptionRadius.value)
    }

    return data
}

/*
 * 
 */
const initialState = {
    //data: getData(NUMBER_OF_BOIDS, WIDTH, HEIGHT, BOID_RADIUS, UNDER_OBSERVATION, INITIAL_PERCEPTION_RADIUS, INITIAL_ALIGNMENT_VALUES, INITIAL_COHESION_VALUES, INITIAL_SEPARATION_VALUES),
    data: getMockData(WIDTH, HEIGHT, BOID_RADIUS, UNDER_OBSERVATION, INITIAL_PERCEPTION_RADIUS, INITIAL_ALIGNMENT_VALUES, INITIAL_COHESION_VALUES, INITIAL_SEPARATION_VALUES),
    isActive: false,
    perceptionRadius: INITIAL_PERCEPTION_RADIUS,
    maxForce: {min: 0.1, value: 5, max: 10, step: 0.1},
    maxSpeed: {min: 0.1, value: 5, max: 10, step: 0.1},
    alignment: INITIAL_ALIGNMENT_VALUES,
    separation: INITIAL_SEPARATION_VALUES,
    cohesion: INITIAL_COHESION_VALUES,
    height: HEIGHT,
    underObservation: UNDER_OBSERVATION,
    width: WIDTH,
counter: 0 // SAA POISTAA .. kierroslaskuri
}



/*
 * R E A C T I O N S   T O W A R D S   A C T I O N S
 */
const calculateNewState = (state) => {

    
    let activeBoid = null;

    let newData = state.data.map(boid => {

        let desiredAlignment = getDesiredAlignment(boid, state.data, state.perceptionRadius.value, state.alignment.value)
        let desiredCohesion = getDesiredCohesion(boid, state.data, state.perceptionRadius.value, state.cohesion.value)
        let desiredSeparation = getDesiredSeparation(boid, state.data, state.perceptionRadius.value, state.separation.value)
   

        if(boid.isUnderObservation())
            activeBoid = boid

        let allTogether = new Vector(0,0)
            .add(desiredCohesion)
            .add(desiredAlignment)
            .add(desiredSeparation)

        if(boid.getId() === 'b-0'){
            console.log(" ----------",boid.getId(),"---------- ")
            console.log(" ali " , desiredAlignment.getX(), desiredAlignment.getY())
            console.log(" sepa " , desiredSeparation.getX(), desiredSeparation.getY())
            console.log(" cohe " , desiredCohesion.getX(), desiredCohesion.getY())
            console.log(" ALL " , allTogether.getX(), allTogether.getY(), allTogether.getLength())
            console.log(".........................................")
        }

        boid = boid
            .accelerate(allTogether, state.maxSpeed.value)


        if(boid.getId() === 'b-010101'){
            console.log(" - ", allTogether.getX(), allTogether.getY())
            console.log("Velo", boid.getVelocity().getX(), boid.getVelocity().getY())
        }
            

        //return boid.accelerate(desiredVelocity, state.maxSpeed.value)
        return boid
    })

    /*
     * Päivitetään tarvittaessa seurantabitit
     */
    if(activeBoid !== null)
        newData = highlightPerceived(activeBoid, newData, state.alignment, state.cohesion,state.separation,state.perceptionRadius.value)

    let newCounter = state.counter+1;

    return {
        ...state,
        data: newData,
        counter: newCounter
    }
}

/*
 */
const toggleTrackingState = (data, active, alignmentSettings, cohesionSettings, separationSettings, perceptionRadius, maxForce) => {

    let activeBoid = null;

    let trackingOn = active === null?false:true;

    let newData = data.map(boid => {

        /* Selvitetään id-numeron perusteella objektin järjestysnumero */
        let no = parseInt(boid.getId().slice(ID_PREFIX.length));

        let isActive = active === null
                        ? false
                        : no === active
                            ? true
                            : false

        if(isActive){
            activeBoid = boid
            boid = boid.setUnderObservation(true)
        } else {
            boid = boid
                .setUnderObservation(false)
                .setPerceived(false)
        }

        return boid

    })

    /*
     * Päivitetään tarvittaessa seurantabitit
     */
    if(activeBoid !== null)
        newData = highlightPerceived(activeBoid, newData, alignmentSettings, cohesionSettings, separationSettings, perceptionRadius)

    return newData

}

/*

            const updatedSpeed = {
                ...state.maxSpeed,
                value: action.data.value
            }

            return {
                ...state,
                maxSpeed: updatedSpeed
            }


 */
const setPerceptionRadius = (val, state) => {

    const updatedPerceptionRadius = {
        ...state.perceptionRadius,
        value: val
    }

    let newData = toggleTrackingState(
        state.data, 
        state.underObservation,
        state.alignment,
        state.cohesion,
        state.separation,
        updatedPerceptionRadius.value, 
        state.maxForce,
    )

    return {
        ...state,
        perceptionRadius: updatedPerceptionRadius,
        data: newData
    }
}

const setTrackingState = (state) => {

    let newTrackingState = state.underObservation===null?0:null;

    let newData = toggleTrackingState(
        state.data, 
        newTrackingState, 
        state.alignment,
        state.cohesion,
        state.separation,
        state.perceptionRadius.value, 
        state.maxForce,
    )

    return {
        ...state,
        underObservation: newTrackingState,
        data: newData
    }
}



/*
 * Animate
 * 
 * @param isActive: Voidaanko animaatio käynnistää?
 * - ei liity ajastimeen, vaan siihen onko käyttäjä käynnistänyt toiminnon
 */

export const animate = (isActive) => {

    return (dispatch, state) => {

        /*
         * Napataan ajastimen id talteen, jotta sille voidaan antaa pysäytyskäsky
         */
        let intervalId;

        /*
         * Onko ajastin päällä.
         * - animaation sujuvuuden kannalta aikaisempi kierros pitää tarvittaessa keskeyttää?
         */
        let timerRunning = state().timer.running;
        let timerId = state().timer.id;

        if(timerRunning) {
            clearInterval(timerId);
            dispatch({type: 'TIMER_CLEAR'});
        } 

        if(isActive){

            intervalId = setInterval(() => {

                dispatch({
                    type: 'BOID_ANIMATE',
                    data: {}
                })
    
            }, 100)

            // kirjataan timerin käynnistys muistiin
            dispatch({
                type: 'TIMER_START',
                data: {
                    id: intervalId
                }
            })
        }
    }
}


export const liikuta = () => {

    return dispatch => {

        dispatch({
            type: 'BOID_ANIMATE',
            data: {}
        })

    }
}

/*
 * Kytketään animaation käynnistävä muuttuja joko päälle tai pois päältä
 * - muuttuja: isActive
 */
export const toggleActiveState = () => {

    return dispatch => {

        dispatch({
            type: 'BOID_TOGGLE_ACTIVE',
            data: {}
        })
    }
}


/*
 * Kytketään animaation käynnistävä muuttuja joko päälle tai pois päältä
 * - muuttuja: isActive
 */
export const toggleTracking = () => {

    return dispatch => {

        dispatch({
            type: 'BOID_TOGGLE_TRACKING',
            data: {}
        })
    }
}



export const updateVelocitySpec = (val) => {

    return dispatch => {

        switch (val.type) {

            case 'alignment':

                dispatch({
                    type: 'BOID_SET_ALIGNMENT',
                    data: val
                })        

                break;

            case 'cohesion':

                dispatch({
                    type: 'BOID_SET_COHESION',
                    data: val
                })

                break;

            case 'separation':

                dispatch({
                    type: 'BOID_SET_SEPARATION',
                    data: val
                })

                break;


            case 'maxForce':

                dispatch({
                    type: 'BOID_SET_MAX_FORCE',
                    data: val
                })        

                break;

            case 'maxSpeed':

                dispatch({
                    type: 'BOID_SET_MAX_SPEED',
                    data: val
                })        
    
                break;

            case 'perceptionRadius':

                dispatch({
                    type: 'BOID_SET_PERCEPTION_RADIUS',
                    data: val
                })        
    
                break;
        
            default:
                break;
        }


    }
}

/*
 *             
 */
const flockingReducer = (state = initialState, action) => {

    switch(action.type) {

        case 'BOID_ANIMATE':
            return calculateNewState(state);

        case 'BOID_TOGGLE_ACTIVE':

            const newActiveState = !state.isActive

            return {
                ...state,
                isActive: newActiveState
            }

        case 'BOID_TOGGLE_TRACKING':

            return setTrackingState(state);

        case 'BOID_SET_ALIGNMENT':

            const updatedAlignment= {
                ...state.alignment,
                value: action.data.value
            }
            
            return {
                ...state,
                alignment: updatedAlignment
            }

        case 'BOID_SET_COHESION':

            const updatedCohesion = {
                ...state.cohesion,
                value: action.data.value
            }
            
            return {
                ...state,
                cohesion: updatedCohesion
            }

        case 'BOID_SET_SEPARATION':

            const updatedSeparation = {
                ...state.separation,
                value: action.data.value
            }
            
            return {
                ...state,
                separation: updatedSeparation
            }        

        case 'BOID_SET_MAX_FORCE':

            const updatedForce = {
                ...state.maxForce,
                value: action.data.value
            }

            return {
                ...state,
                maxForce: updatedForce
            }

        case 'BOID_SET_MAX_SPEED':

            const updatedSpeed = {
                ...state.maxSpeed,
                value: action.data.value
            }

            return {
                ...state,
                maxSpeed: updatedSpeed
            }

        case 'BOID_SET_PERCEPTION_RADIUS':

            return setPerceptionRadius(action.data.value, state);
     
        default:
            return state;
    }
}

export default flockingReducer;
