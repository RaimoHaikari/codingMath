const initialState = {
    isActive: false,
    height: 500,
    width: 500,
    data: [0],
    x: 0,
    y: 0,
    offset: 500 * 0.4,
    speed: 0.1,
    angle: 0
}

/*
 * A C T I O N S
 */

 /*
  *
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
                    type: 'Y_AND_ANGLE_UPD',
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
 * 
 */
export const updateYAndAngle = () => {

    return dispatch => {

        dispatch({
            type: 'Y_AND_ANGLE_UPD',
            data: {}
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

        case 'Y_AND_ANGLE_UPD':

            const newY = 0 + Math.sin(state.angle) * state.offset;
            const newAngle = state.angle + state.speed;

            return {
                ...state,
                angle: newAngle,
                y: newY
            }

            
        default:
            return state;
    }
}

export default bouncingReducer;

