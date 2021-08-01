import {CelestialBody, Vector} from "../services/vector";

import {Caleuche, Saffar, Sun} from "../iconComponents/Planets";

/*
* Format number to always show 2 decimal places
* - https://stackoverflow.com/questions/6134039/format-number-to-always-show-2-decimal-places
*/
const roundTo = (num) => (Math.round(num * 100) / 100).toFixed(0);

function getRandomColor() {

    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const celestialBodies = [
    {x: 0,y: 0,speed: 0, direction: 0, radius: 20, name: "Eridanus", icon: <Sun />, massMin: 5000, mass: 20000, massMax: 50000, color:"#f7e617"},
    {x: 200,y: 0,speedMin: 2, speed: 10, speedMax: 20, directionMin: -Math.PI, direction: -Math.PI / 2, directionMax: Math.PI, radius: 5, name: "Saffar", icon: <Saffar />, mass: 5, color: "#3f67cb"},
    {x: 250,y: 0,speedMin: 2, speed: 20, speedMax: 30, directionMin: -Math.PI, direction: -Math.PI /3, directionMax: Math.PI,  radius: 10, name: "Caleuche", icon: <Caleuche />, mass: 10, color: "#ff2211"}
]

const getInitialHeight = () => 500
const getInitialNumberOfPreviewSteps= () => 500
const getInitialWidth = () => 600

/* 
 * Alustetaan taivaankappaleita mallintavat objektit
 */
const getData = (cBodies) => {

    let val = [];

    for (const cb of cBodies){
        val.push(new CelestialBody(cb.x, cb.y, cb.speed, cb.direction, cb.radius, cb.name, cb.mass, cb.color));
    }

    return val;
}

/*
 * Lasketaan "esikatselukuva" planeettojen liikeradoista valituilla parametrien arvoilla
 */
const getPreviewData = (data, depth) => {

    let sun = data.filter(d => d.getName() === "Eridanus");
    let planets =  data.filter(d => d.getName() !== "Eridanus");

    let track = []; // Väliaikainen varasto, johon sijainnit talletetaan
    let preview = []

    /*
     * Vaihe 1:
     * - rekursiivisesti lasketaan planeettojen liikerataa eteenpäin
     */
    recursive(1, planets);

    function recursive(n, _planets){

        let updatedPlanets = _planets.map(cb => cb.update(sun[0]));
        track.push(updatedPlanets);

        if(n < depth)
            recursive(n+1, updatedPlanets)
    }

    /*
     * Vaihe 2:
     * - edellinen vaihe tuottaa joukon eri kohdissa sijaitsevia taivaankappaleita
     * - esikatseluun tarvitaan vain koordinaattitietoa, joten napataan nämä
     *   palautettavaan taulukkoon
     */
    let i = 0;
    for (const step of track){
        for(const particle of step){

            let pos = particle.getVector();

            if(i % 5 === 0){
                preview.push({
                    x: pos.getX(),
                    y: pos.getY(),
                    color: particle.getColor()
                })
            }
        }

        i++;
    }

    return preview;

}



const initialState = {

    data: getData(celestialBodies),
    celestialBodies: celestialBodies,
    isActive: false,
    height: getInitialHeight(),
    width: getInitialWidth(),
    preview: getPreviewData(getData(celestialBodies), getInitialNumberOfPreviewSteps())
}


/*
 * R E A C T I O N S   T O W A R D S    A C T I O N S
 */

const calculateNewState = (state) => {

    let sun = state.data.filter(d => d.getName() === "Eridanus");
    let planets =  state.data.filter(d => d.getName() !== "Eridanus");

    let updatedPlanets = planets.map(cb => cb.update(sun[0]))

    let newData = sun.concat(updatedPlanets)
    
    return {
        ...state,
        data: newData
    }
}

/*
 * Päivitetään taivaankappaleiden asetuksia

                name: param.name,
                setting: param.setting,
                value: param.value

 */
const changeCBSettings = (state, data) => {

    let oldCBValues = state.celestialBodies;

    let updatedCBValues = oldCBValues.map(cb => {

        let a = {
            ...cb
        }

        if(a.name === data.name) {

            a[data.setting] = data.value

            if(a.name === "Eridanus"){
 a['radius'] = roundTo(data.value/1000);
            }
        }

        return a;
    })

    let updatedData = getData(updatedCBValues);
    let updatedPreview = getPreviewData(getData(updatedCBValues), getInitialNumberOfPreviewSteps())

    return {
        ...state,
        data: updatedData,
        preview: updatedPreview,
        celestialBodies: updatedCBValues
    }
}

/* 
 * A C T I O N S
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
         * 
         * TÄHÄN PARAMETRI!!!!
         */
let isActive = state().gravitation.isActive;

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
                    type: 'GRAVITY_ANIMATE',
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

export const liikuta = () => {

    return dispatch => {

        dispatch({
            type: 'GRAVITY_ANIMATE',
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
            type: 'GRAVITY_TOGGLE_ACTIVE',
            data: {}
        })
    }
}

export const updateCelestialBodySettings = (param) => {

    return dispatch => {

        dispatch({
            type: 'GRAVITY_UPDATE_CB_SETTINGS',
            data: {
                name: param.name,
                setting: param.setting,
                value: param.value
            }
        })
    }
}



const gravitationReducer = (state = initialState, action) => {

    switch(action.type) {

        case 'GRAVITY_ANIMATE':

            return calculateNewState(state);

        case 'GRAVITY_TOGGLE_ACTIVE':

            const newActiveState = !state.isActive;

            return {
                ...state,
                isActive: newActiveState
            }

        case 'GRAVITY_UPDATE_CB_SETTINGS':

            return changeCBSettings(state, action.data);
        
        default:
            return state;
    }
}

export default gravitationReducer;