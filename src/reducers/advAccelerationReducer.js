import {Ship, Vector} from "../services/vector";

function getRandomColor() {

    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;

}

const getInitialHeight = () => 600
const getInitialNumberOfParticles = () => 1
const getInitialRotation = () => 0
const getInitialWidth = () => 600
const getInitialXscale = () => 0.25
const getInitialYscale = () => 0.25

const getInitialData = (n, height, width, rotation) => {

    let data = [];

    for(var i = 0; i < n; i++){
        data.push(
            new Ship(
                0,
                0,
                0,
                0,
                width,
                height,
                getInitialXscale(),
                getInitialYscale(),
                rotation
            )
        )
    }

    return data
}


const initialState = {

    numberOfParticles: getInitialNumberOfParticles(),
    data: getInitialData(getInitialNumberOfParticles(),getInitialHeight(),getInitialWidth(),getInitialRotation()),
    isActive: false,
    thrust: new Vector(0,0),
    step: {min: 0.0, val: 0.1, max: 1.0, step: 0.01},
    thrusting: false,
    turningLeft: false,
    turningRight: false,
    height: getInitialHeight(),     // Tulostukseen käytettävän SVG -elementin korkeus
    width: getInitialWidth(),       // Tulostukseen käytettävän SVG -elementin leveys
    xScale: getInitialXscale(),     // Alusta esittävän nuolen leveyden skaalaus
    yScale: getInitialYscale()                     // Alusta esittävän nuolen korkeuden skaalaus
}


/*
 *
 */
const calculateNewState = (state) => {

    let angle = state.turningLeft
                ? -0.05
                : state.turningRight
                    ? 0.05
                    : 0    

    let newThrust 

    let newData = state.data.map(p => {

        let bar = p.setRotation(angle)  // Aluksen nokkaa käännetään aina kun painike pohjassa

        newThrust =  new Vector(0,0)

        /*
         * Siirretäänkö alusta
         */
        if(state.thrusting)
            newThrust = newThrust.setLength(state.step.val)
    
        newThrust = newThrust.setAngle(bar.getRotation())

        return bar.accelerate(newThrust)
    })


    return {
        ...state,
        data: newData,
        thrust: newThrust
    }
}

/*
 * @todo: Jos jompikumpi ArrowLeft tai ArrowRight on painettuna, toisen painikkeen
 *        painamiseen ei tällöin reagoida
 */
const thrustAccelerate = (state, data) => {
    
    return {
        ...state,
        thrusting: data.key==='ArrowUp'?true:state.thrusting,
        turningLeft:  data.key==='ArrowLeft'?true:state.turningLeft,
        turningRight:  data.key==='ArrowRight'?true:state.turningRight,
        isActive: true
    }
}

/*
 * N O L L A A   A I N O A S T A A N    V A P A U T E T T U !
 */
const thrustSlowdown = (state, data) => {
    
    return {
        ...state,
        thrusting: data.key==='ArrowUp'?false:state.thrusting,
        turningLeft:  data.key==='ArrowLeft'?false:state.turningLeft,
        turningRight:  data.key==='ArrowRight'?false:state.turningRight,
        isActive: false
    }
}


/*
 * A C T I O N S
 */

export const accelerate = (val) => {

    return (dispatch) => {

        dispatch({
            type: 'THRUST_ACCELERATE',
            data: val
        })
    }    

}


/*
 * Animaation pyöritys
 * - alkuosa nollaa timerin, mikäli animaatio on ollut pyörimässä, pysäytetään se
 * - mikäli animaation halutaan käyvän (isActive === true), käynnistetään 
 *   timeri, joka pyörittää seuraavan  aseman laskevaa tilapäivitystä
 * - mikäli action-kutsu tulee sen jälkeen, kun isActive -tila on vaihtunut
 *   suoritetaan vain alkuosa, eli pyörivän timerin sulkeminen...
 */
export const animate = () => {

    return (dispatch, state) => {

        /*
         * Napataan ajastimen id talteen, jotta sille voidaan antaa pysäytyskäsky
         */
        let intervalId;

        /*
         * Voidaanko animaatio käynnistää?
         * - ei liity ajastimeen, vaan siihen onko käyttäjä käynnistänyt toiminnon
         */
        let isActive = state().acceleration.isActive;

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
                    type: 'THRUST_ANIMATE',
                    data: {}
                })
    
            }, 25)

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

export const kaannaOikea = () => {

    return dispatch => {

        dispatch({
            type: 'THRUST_ACCELERATE',
            data: {key: 'ArrowRight'}
        })

        dispatch({
            type: 'THRUST_ANIMATE',
            data: {}
        })

        dispatch({
            type: 'THRUST_SLOWDOWN',
            data: {key: 'ArrowRight'}
        })
           
    }
}

export const kaannaVasen = () => {

    return dispatch => {

        dispatch({
            type: 'THRUST_ACCELERATE',
            data: {key: 'ArrowLeft'}
        })

        dispatch({
            type: 'THRUST_ANIMATE',
            data: {}
        })

        dispatch({
            type: 'THRUST_SLOWDOWN',
            data: {key: 'ArrowLeft'}
        })
           
    }
}

export const kiihdyta = () => {

    return dispatch => {

        dispatch({
            type: 'THRUST_ACCELERATE',
            data: {key: 'ArrowUp'}
        })
        
        dispatch({
            type: 'THRUST_ANIMATE',
            data: {}
        })

        dispatch({
            type: 'THRUST_SLOWDOWN',
            data: {key: 'ArrowUp'}
        })
        
    }
}


export const liikuta = () => {

    return dispatch => {

        dispatch({
            type: 'THRUST_ANIMATE',
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
            type: 'THRUST_TOGGLE_ACTIVE',
            data: {}
        })
    }
}


export const slowdown = (val) => {

    return (dispatch) => {

        dispatch({
            type: 'THRUST_SLOWDOWN',
            data: val
        })
    }    

}

/*
 * Step määrittää kiihtyvyyden säätämisen perusyksikön, siis kuinka paljon
 * aluksen vauhti kiihtuu, kun "kaasua painetaan yhden kerran"
 */
export const updateStepValue= (val) => {

    return (dispatch) => {

        dispatch({
            type: 'THRUST_SET_STEP_VALUE',
            data: val
        })
    }    

}



const advancedAccelerationReducer = (state = initialState, action) => {

    switch(action.type) {

        case 'THRUST_ANIMATE':

            return calculateNewState(state);

        case 'THRUST_ACCELERATE':

            return thrustAccelerate(state, action.data);

        case 'THRUST_PUSH_ONE_ON':

            return {
                ...state,
                thrusting: true
            };

        case 'THRUST_ROTATE_ONE_OFF':

            return {
                ...state,
                isActive: false
            };

        case 'THRUST_SLOWDOWN':

            return thrustSlowdown(state, action.data);

        case 'THRUST_SET_STEP_VALUE':

            const updatedStep = {
                ...state.step,
                val: action.data.stepValue
            }

            return {
                ...state,
                step: updatedStep
            };

        case 'THRUST_TOGGLE_ACTIVE':

            const newActiveState = !state.isActive

            return {
                ...state,
                isActive: newActiveState
            }

        

        default:
            return state;
    }
}

export default advancedAccelerationReducer;
