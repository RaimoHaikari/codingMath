// Circles
const CIRCLERADIUS = 2

// Canvas
const HEIGHT = 500
const WIDTH = 500

// Animation
const X_ANGLE = 0
const Y_ANGLE = 0
const X_RADIUS = 225
const Y_RADIUS = 225
const X_SPEED = 0.1
const Y_SPEED = 0.1

/*
 * Lähtötilanne
 */
const getInitialState = () => {

    let data = []

    for(var i = 0; i < 50; i++){


        let xAngle = 2 * Math.random() * Math.PI
        let yAngle = 2 * Math.random() * Math.PI

        /*
         *  -> 20
         * Math.floor(Math.random() * 16) + 5;
        */

        let xRadius = Math.floor(Math.random() * 176) + 50;
        let yRadius = Math.floor(Math.random() * 176) + 50;

        /* 
         * https://stackoverflow.com/questions/17726753/get-a-random-number-between-0-0200-and-0-120-float-numbers
         */
        let xSpeed = (Math.random() * (0.01 - 0.9) + 0.9)
        let ySpeed = (Math.random() * (0.01 - 0.9) + 0.9)

        
        let x = Math.cos(xAngle) * xRadius
        let y = Math.sin(yAngle) * yRadius

        data = data.concat({
            x: x,
            y: y,
            radius: CIRCLERADIUS,
            xAngle: xAngle + xSpeed,
            xRadius: xRadius,
            xSpeed: xSpeed,
            yAngle: yAngle + xSpeed,
            yRadius: yRadius,
            ySpeed: ySpeed
        })

    }

    return {
        data: data,
        height: HEIGHT,
        isActive: false,
        width: WIDTH
    }

}

/*
            x: x,
            y: y,
            radius: CIRCLERADIUS,
            xAngle: xAngle + X_SPEED,
            yAngle: yAngle + Y_SPEED
*/
const calculateNewState = (state) => {

    let data = state.data.map(d => {

        let newX = Math.cos(d.xAngle) * d.xRadius
        let newY = Math.sin(d.yAngle) * d.yRadius
        let newXAngle = d.xAngle + d.xSpeed
        let newYAngle = d.yAngle + d.ySpeed

        return {
            ...d,
            x: newX,
            y: newY,
            xAngle: newXAngle,
            yAngle: newYAngle
        }
    })

    return {
        ...state,
        data: data
    }

}

/*
 * A C T I O N I T
 */

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
        let isActive = state().lissajous.isActive;

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
                    type: 'LISSAJOUS_ANIMATE',
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

export const resetAnimation = () => {

    return (dispatch,state) => {

        // - onko jo juoksemassa
        let timerRunning = state().timer.running;
        let timerId = state().timer.id;
        
        if(timerRunning) {
            clearInterval(timerId);
            dispatch({type: 'TIMER_CLEAR'});
        } 

        dispatch({
            type: 'RESET_LISSAJOUS',
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
            type: 'LISSAJOUS_TOGGLE_ACTIVE',
            data: {}
        })
    }
}

export const liikuta = () => {

    return dispatch => {

        dispatch({
            type: 'LISSAJOUS_ANIMATE',
            data: {}
        })
    }
}


/*
 *             
 */
const lissajousReducer = (state = getInitialState(), action) => {

    switch(action.type) {

        case 'LISSAJOUS_ANIMATE':

            return calculateNewState(state)

        case 'LISSAJOUS_TOGGLE_ACTIVE':

            const newState = !state.isActive

            return {
                ...state,
                isActive: newState
            }

        case 'RESET_LISSAJOUS':

            return getInitialState()
            
        default:
            return state;
    }
}

export default lissajousReducer;

