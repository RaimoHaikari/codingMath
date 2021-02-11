import {Partile, Vector} from "../services/vector";

function getRandomColor() {

    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;

}


const getInitialNumberOfParticles = () => 100

/*
 *
 */
const getInitialData = (n) => {

    let particles = [];

    for(var i = 0; i < n; i++){
        particles.push(
            new Partile(
                0,
                0,
                Math.random() * 5 + 2,
                Math.random() * Math.PI * 2,
                getRandomColor()
            )
        )
    }

    return particles
}


const initialState = {

    numberOfParticles: getInitialNumberOfParticles(),
    data: getInitialData(getInitialNumberOfParticles()),
    isActive: false,
    height: 800,
    width: 800,
    round: 0
}

/*
 *
 */
const calculateNewState = (state) => {

    /*
     * Piirtoalueena käytetään g-elementtiä, jonka origo on siirretty
     * esittävän SVG-elementin keskipisteeseen, jolloin piirtoalueen
     * rajat ovat puoli leveyttä/korkeutta keskipisteen molemmin puolin
     */
    let halfOfWidth = state.width / 2;
    let halfOfHeight = state.height / 2;

    let newRound = state.round+1;

    let newData = state.data
        .map(p => p.accelerate())
        .filter((p,i) => {

            let pos = p.getVector();

            // - onko leveyssuunnassa alueen sisällä
            if(pos.getX() < -halfOfWidth || pos.getX() > halfOfWidth){
                return false;
            }

            // - onko korkeussuunnassa alueen sisällä
            if(pos.getY() < -halfOfHeight || pos.getY() > halfOfHeight){
                return false;
            }

            return true;
        })

    
    return {
        ...state,
        data: newData.length > 0 ? newData : [],
        round: newRound
    }
}

/* 
 * A C T I O N S
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
        let isActive = state().vector.isActive;

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
                    type: 'PHYSICS_ANIMATE',
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
            type: 'PHYSICS_ANIMATE',
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
            type: 'PHYSICS_TOGGLE_ACTIVE',
            data: {}
        })
    }
}


const vectorReducer = (state = initialState, action) => {

    switch(action.type) {

        case 'PHYSICS_ANIMATE':

            return calculateNewState(state)

        case 'PHYSICS_TOGGLE_ACTIVE':

            const newActiveState = !state.isActive

            return {
                ...state,
                isActive: newActiveState
            }

        default:
            return state;
    }
}

export default vectorReducer;
