import {CelestialBody, Vector} from "../services/vector";

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

/*
 *  x,y, speed, direction, radius, name, mass = 1
 */
const getInitialData = () => {

    let sun = new CelestialBody(0,0, 0, 0, 15, "sun", 20000, "#f7e617");
    let earth = new CelestialBody(200, 0, 10, -Math.PI / 2, 5, "earth", 1, "#3f67cb");
    let jupiter = new CelestialBody(250, 150, 20, -Math.PI , 6, "jupiter", 1, "#b400b9");

    return [sun, earth];
}

const initialState = {

    data: getInitialData(),
    isActive: false,
    height: getInitialHeight(),
    width: getInitialWidth()
}


const calculateNewState = (state) => {

    let sun = state.data.filter(d => d.getName() === "sun");
    let planets =  state.data.filter(d => d.getName() !== "sun");

    let updatedPlanets = planets.map(cb => cb.update(sun[0]))

    let newData = sun.concat(updatedPlanets)
    
    return {
        ...state,
        data: newData
    }
}
/* 
 * A C T I O N S
 */
export const liikuta = () => {

    return dispatch => {

        dispatch({
            type: 'GRAVITY_ANIMATE',
            data: {}
        })
    }
}



const gravitationReducer = (state = initialState, action) => {

    switch(action.type) {

        case 'GRAVITY_ANIMATE':

            return calculateNewState(state)
        
        default:
            return state;
    }
}

export default gravitationReducer;