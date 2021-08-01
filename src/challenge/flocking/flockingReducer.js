import { randomBates } from "d3";
import {Boid, Vector} from "./Vector"


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

const NUMBER_OF_BOIDS = 25

const PERCEPTIONRADIUS = 50
const UNDER_OBSERVATION = 0


/*
 * Asetetaan bitti onko objekti aktiivisen objektin tarkkailualueella
 */
const highlightPerceived = (activeBoid, boids, perceptionRadius) => {

    console.log("........ highlightPerceived .........")

    return boids.map(boid => {

        if(boid.getId() === activeBoid.getId())
            return boid.setPerceived(false)

        let dist = Vector.distanceOf(activeBoid.getVector(), boid.getVector());

        
        if(dist <= perceptionRadius)
            console.log(' . ', boid.getId(), dist)
            

        return boid.setPerceived(dist <= perceptionRadius)

    })

}

let seed = 1;

function random() {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

const getMockData = (width, height, r, active, perceptionRadius) => {

    let data = []

    let activeBoid = null;

    //{x: 10.629491010233924,y: 20.27021022090776, speed: 5, direction: 2.183530491580548, id: 'no1'},
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
            `b-${i}`,
            r,
            width,
            height,
            isActive
        ) 

        data.push(boid) 
    }

    if(activeBoid !== null)
        data = highlightPerceived(activeBoid, data, perceptionRadius)

    return data
}

/*
 * Esitettävien objektien alustus
 * - tarkkailtava objekti ilmoitetaan indeksi -numerolla.
 *   (Myöhemmin tunnistus isUnderObservation -metodilla)
 */
const getData = (n, width, height, r, active, perceptionRadius) => {

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
                `b-${i}`,
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
                `b-${i}`,
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

    if(activeBoid !== null)
        data = highlightPerceived(activeBoid, data, perceptionRadius)

    return data
}

/*
 *
 */
const initialState = {
    //data: getData(NUMBER_OF_BOIDS, WIDTH, HEIGHT, BOID_RADIUS, UNDER_OBSERVATION, PERCEPTIONRADIUS),
    data: getMockData(WIDTH, HEIGHT, BOID_RADIUS,UNDER_OBSERVATION, PERCEPTIONRADIUS),
    isActive: false,
    perceptionRadius: PERCEPTIONRADIUS,
    maxForce: {min: 0.1, value: 5, max: 9.9, step: 0.1},
    maxSpeed: {min: 0.1, value: 5, max: 9.9, step: 0.1},
    height: HEIGHT,
    underObservation: UNDER_OBSERVATION,
    width: WIDTH,
counter: 0 // SAA POISTAA .. kierroslaskuri
}


/*
 * Alignment: steer towards the average heading of local flockmates
 */
const align = (current, boids, perceptionRadius,maxForce) => {

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
     */
    if(desired.getLength() > maxForce) {
//console.log("Rajoitus", current.getId(), desired.getLength(), maxForce)
        desired = desired.setLength(maxForce)
    }

//desired = desired.setLength(maxForce)

    return desired

}

/*
 * R E A C T I O N S   T O W A R D S   A C T I O N S
 */
const calculateNewState = (state) => {

//console.log('..  calculateNewState  ..')
    
    let activeBoid = null;

    let newData = state.data.map(boid => {

        /*
         * Alignment: steer towards the average heading of local flockmates
         * 
         * Huom! Tuloksena vektori, ei kulma & matka...
         */
        let desiredVelocity = align(
            boid, 
            state.data, 
            state.perceptionRadius, 
            state.maxForce.value
        )

        let desiredCohesion = cohesion (
            boid, 
            state.data, 
            state.perceptionRadius, 
            state.maxForce.value
        )

        if(boid.getId() === 'b-0'){
            console.log("..........................")
            console.log(boid.getId(), boid.getVector().getX(), boid.getVector().getY(), ' - ', desiredCohesion.getX(), desiredCohesion.getY())    
        }

//console.log("- desired",boid.getId(), desiredVelocity.getX(), desiredVelocity.getY())

        if(boid.isUnderObservation())
            activeBoid = boid


        return boid.accelerate(desiredVelocity, state.maxSpeed.value)
    })

    /*
     * Päivitetään tarvittaessa seurantabitit
     */
    if(activeBoid !== null)
        newData = highlightPerceived(activeBoid, newData, state.perceptionRadius)

        console.log(state.counter)
    let newCounter = state.counter+1;

    return {
        ...state,
        data: newData,
        counter: newCounter
    }
}

/*
 * Steer to move towards the average position (center of mass) of local flockmates
 * (kulje kohti lähiryhmän keskusta)
 */
const cohesion = (current, boids, perceptionRadius) => {

    let desired = new Vector(0,0);
    let counter = 0;

    /*
     * Selvitetään lähiympäristön objektit ja lasketaan keskipiste
     */
    for(let other of boids){

        let dist = Vector.distanceOf(current.getVector(), other.getVector());

        if((current.getId() !== other.getId()) && dist < perceptionRadius){
            desired = desired.add(other.getVector())
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
console.log("Rajoitus", current.getId(), desired.getLength(), maxForce)
        desired = desired.setLength(maxForce)
    }
    */

    return desired

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
    
            }, 250)

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


export const updateVelocitySpec = (val) => {

    return dispatch => {

        switch (val.type) {

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

        default:
            return state;
    }
}

export default flockingReducer;
