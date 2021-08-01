import {Bouncer} from "../services/vector";

/*
 * Get a random number between 0.0200 and 0.120 
 * - https://stackoverflow.com/questions/17726753/get-a-random-number-between-0-0200-and-0-120-float-numbers
 */
function generateRandomNumber() {
    var min = 0.0,
        max = 2.0,
        highlightedNumber = Math.random() * (max - min) + min;

    return highlightedNumber;
};

const ANIMATION = {
    SPRING : {
        name: "Up'n Down",
        value: 'spring', 
        description: "Ball bouncing up and down",
        angle: 0,
        speed: 0.1,
        offset: 500 * 0.4,
        newState: function(state){
            return bounceVertical(state);
        },
        color: "navy"
    }, 
    BOUNCING: {
        name: 'Bouncing off the walls',
        value: 'bouncer', 
        description: "Ball bouncing off the walls",
        angle: Math.PI * generateRandomNumber(),
        speed: 50,
        offset: null,
        newState: function(state){
            return bounce(state);
        },
        color: "red"
    }, 
};

// Starting Position
const X = 0
const Y = 0

// Dimension of the Canvas
const HEIGHT = 500
const WIDTH = 500


const getInitialAnimationType = () => ANIMATION.SPRING


const getData = (aType, x, y, width, height) => {

    let name = aType.description;

    return new Bouncer(
        x, 
        y, 
        aType.speed, 
        aType.angle, 
        width, 
        height, 
        aType.color, 
        aType.offset
    );

}

/*
 * Alustetaan aineisto 
 */

const initialState = {
    animation: getInitialAnimationType(),
    animationTypes: ANIMATION,
    isActive: false,
    height: HEIGHT,
    width: WIDTH,
    datum: getData(getInitialAnimationType(),X,Y,WIDTH,HEIGHT),
    x: X,
    y: Y,
}

/*
 * R E A C T I O N   T O W A R D S   A C T I O N S
 */

/*
 * E D G E   D E T E C T I O N
 */

/*
 * Seinistä kimmokkeen ottava pallo
 */
const bounce = (state) => state.datum.accelerate()

/*
 * Pallon liikuttaminen ylös .... alas
 */
const bounceVertical = (state) => state.datum.doTheBounce()


/*
 * Lasketaan partikkelien uudet sijaintipaikat
 */
const calculateNewState = (state) => {

    let newData = getNewState(state.animation, state);

    return {
        ...state,
        datum: newData
    }
}

/*
 * Asetetaan esitettävän animaation tyyppi
 * - vaihtoehtoina ovat Firework ja Fountain
 */
const changeAnimationType = (state, data) => {

    const {x,y,width, height} = state;

    const newActive = Object.entries(state.animationTypes)
        .filter(([key, value]) => {
            return  value.value === data.type;
        })[0][1];


    let newData = getData(newActive,x,y,width, height);
    
    return {
        ...state,
        animation: newActive,
        datum: newData
    }
}

 /*
  * Partikkelien uuden sijaintipaikan laskeminen
  *
  * Välitetään tehtävä käytössä olevan animaatiotyypin mukaiselle funktiolle: 
  * - deLaFontaine mikäli suihkulähde
  * - fireWorks mikäli ilotulitus
  */
 const getNewState = (aType, state) => aType.newState(state);


/*
 * A C T I O N S
 */
export const animate = () => {

    return (dispatch, state) => {

        let intervalId;

        /*
         * Voidaanko animaatio käynnistää?
         * - ei liity ajastimeen, vaan siihen onko käyttäjä käynnistänyt toiminnon
         * - toggleActiveState toimii kytkimenä
         */
        let isActive = state().bouncing.isActive;

        // - onko jo juoksemassa
        let timerRunning = state().timer.running;
        let timerId = state().timer.id;
        
        if(timerRunning) {
            clearInterval(timerId);
            dispatch({type: 'TIMER_CLEAR'});
        } 

        if(isActive){

            intervalId = setInterval(() => {

                dispatch({
                    type: 'BOUNCER_UPDATE_POSTION',
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

/*
 * Tarviiko erikeseen ???? 
 */
export const stopAnimation = () => {

    return (dispatch,state) => {

        // - onko jo juoksemassa
        let timerRunning = state().timer.running;
        let timerId = state().timer.id;
        
        if(timerRunning) {
            clearInterval(timerId);
            dispatch({type: 'TIMER_CLEAR'});
        } 

        dispatch({
            type: 'RESET_BOUNCER',
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
            type: 'TOGGLE_ACTIVE',
            data: {}
        })
    }
}

/*
 * Liikuttaan palloa valitun animaation tyypin mukaisesti yhden askeleen eteenpäin
 */
export const oneStepForward = () => {

    return dispatch => {

        dispatch({
            type: 'BOUNCER_UPDATE_POSTION',
            data: {}
        })
    }
}

/*
 * Kytketään animaation käynnistävä muuttuja joko päälle tai pois päältä
 * - muuttuja: isActive
 */
export const setAnimationType = (val) => {

    return dispatch => {

        dispatch({
            type: 'BOUNCER_SET_ANIMATION_TYPE',
            data: {
                type: val
            }
        })
    }
}


/*
 *             
 */
const bouncingReducer = (state = initialState, action) => {

    switch(action.type) {

        case "RESET_BOUNCER":

            return initialState

        case 'TOGGLE_ACTIVE':

            const newState = !state.isActive

            return {
                ...state,
                isActive: newState
            }

        case 'BOUNCER_SET_ANIMATION_TYPE':
            return changeAnimationType(state, action.data);

        case 'BOUNCER_UPDATE_POSTION':
            return calculateNewState(state)

        default:
            return state;
    }
}

export default bouncingReducer;

