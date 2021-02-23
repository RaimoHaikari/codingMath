import {Partile, Vector} from "../services/vector";

function getRandomColor() {

    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;

}

/*
 * https://stackoverflow.com/questions/287903/what-is-the-preferred-syntax-for-defining-enums-in-javascript

     let newData = fireWorks(state);
    //let newData = deLaFontaine(state);
 */
const ANIMATION = {
    FIREWORKS : {
        name: 'Fire',
        value: 'firework', 
        description: "The amazing Coding Math firework",
        setup: function(n){
            return getFireworksData(n);
        },
        newState: function(state){
            return fireWorks(state);
        }
    }, 
    FOUNTAIN: {
        name: 'Fountain',
        value: 'fountain', 
        description: "The Mind-Blowing Coding Math Fountain",
        setup: function(n){
            return getFountainData(n);
        },
        newState: function(state){
            return deLaFontaine(state);
        }
    }, 
};

const getInitialAllowedRangeHeight = () => getInitialHeight() * 0.75;
const getInitialAllowedRangeWidth = () => getInitialWidth() * 0.75;

const getInitialAnimationType = () => ANIMATION.FIREWORKS;

const getInitialWidth = () => 600;

const getInitialHeight = () => 500;

const getInitialNumberOfParticles = () => 100

/*
 * Alustetaan aineisto valitun animaation mukaisilla partikkeleilla
 *
 * @param aType minkä tyyppinen animaatio halutaan esittää
 * @param n montako partikkelia alustetaan
 */
const getData = (aType, n) => aType.setup(n);


/*
 * Alustetaan aineisto ilotulituksessa esitettävillä partikkeleilla
 */
const getFireworksData = (n) => {

    let particles = [];

    for(var i = 0; i < n; i++){
        particles.push(getFireworksParticle());
    }

    return particles;
}


/* 
 * Alustetaan yksittäinen ilotulituksessa käytettävä partikkeli
 */
const getFireworksParticle = (posY) => {

    return new Partile(
        0,
        0,
        Math.random() * 5 + 2,
        Math.random() * Math.PI * 2,
        getRandomColor()
    )   
}

/*
 * Alustetaan aineisto "suihkulähteessä" esitettävillä partikkeleilla
 * - edge detection menetelmä on Emitter
 */
const getFountainData = (n) => {

    let particles = [];

    let originY = getInitialAllowedRangeHeight() / 2;


    for(var i = 0; i < n; i++){
        particles.push(getFountainParticle(originY))
    }

    return particles;
}

/*
 * Yksittäisen suihkulähteessä esitettävän partikkelin alustus
 */
const getFountainParticle = (posY) => {

    return new Partile(
        0,
        posY,
        Math.random() * 8 + 5,
        -Math.PI / 2 + (Math.random() * 0.2 - 0.1),
       'navy'
    );    
}

/* 
 * S E T U P   I N I T I A L   V A L U E S
 */
const initialState = {

    animation: getInitialAnimationType(),
    animationTypes: ANIMATION,
    allowedRangeWidth: getInitialAllowedRangeWidth(),
    allowedRangeHeight: getInitialAllowedRangeHeight(),
    numberOfParticles: getInitialNumberOfParticles(),
    minNumberOfParticles: getInitialNumberOfParticles() * 0.01,
    maxNumberOfParticles: getInitialNumberOfParticles() * 2.0,
    data: getData(getInitialAnimationType(), getInitialNumberOfParticles()),
    isActive: false,
    height: getInitialHeight(),
    width: getInitialWidth(),
    round: 0
}

/*
 * R E A C T I O N S   T O W A R D S    A C T I O N S
 */

 /*
  * Partikkelien uuden sijaintipaikan laskeminen
  *
  * Välitetään tehtävä käytössä olevan animaatiotyypin mukaiselle funktiolle: 
  * - deLaFontaine mikäli suihkulähde
  * - fireWorks mikäli ilotulitus
  */
const getNewState = (aType, state) => aType.newState(state);

  /*
  * EDGE DETECTION: kierrätetään aktiiviselta aluuelta poistuvat partikkelit
  * - seurataan vain "pohja ja reunojen vuotoa", korkeussuunta ei nyt kiinnosta
  */
const deLaFontaine = (state) => {
    /*
      * Piirtoalueena käytetään g-elementtiä, jonka origo on siirretty
      * esittävän SVG-elementin keskipisteeseen, jolloin piirtoalueen
      * rajat ovat puoli leveyttä/korkeutta keskipisteen molemmin puolin
      */
     let halfOfHeight = state.allowedRangeHeight / 2;
 
     let newData = state.data
         .map(p => p.accelerate())
         .map((p,i) => {
 
             let pos = p.getVector();
 
             // - onko korkeussuunnassa alueen sisällä
             if(pos.getY() > halfOfHeight){
                return getFountainParticle(halfOfHeight);
             }
 
             return p;
         })
 
     return newData;
 }

 /*
  * EDGE DETECTION: poistetaan aktiiviselta aluuelta poistuvat partikkelit
  */
const fireWorks = (state) => {
   /*
     * Piirtoalueena käytetään g-elementtiä, jonka origo on siirretty
     * esittävän SVG-elementin keskipisteeseen, jolloin piirtoalueen
     * rajat ovat puoli leveyttä/korkeutta keskipisteen molemmin puolin
     */
    let halfOfWidth = state.allowedRangeWidth / 2;
    let halfOfHeight = state.allowedRangeHeight / 2;

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

    return newData;
}

/*
 * Lasketaan partikkelien uudet sijaintipaikat
 */
const calculateNewState = (state) => {

    let newRound = state.round+1;
    let newData = getNewState(state.animation, state);

    return {
        ...state,
        data: newData.length > 0 ? newData : [],
        round: newRound
    }
}

/*
 * Muutetaan animoitavien partikkelien määrää
 */ 
const changeParticleCount = (state, data) => {

    let newNOP = data.particles;
    let newData = getData(state.animation, newNOP);

    return {
        ...state,
        numberOfParticles: newNOP,
        data: newData
    }

}

/*
 * Asetetaan esitettävän animaation tyyppi
 * - vaihtoehtoina ovat Firework ja Fountain
 */
const changeAnimationType = (state, data) => {

    const newActive = Object.entries(state.animationTypes)
        .filter(([key, value]) => {
            return  value.value === data.type;
        })[0][1];

    let newData = getData(newActive, state.numberOfParticles);


    return {
        ...state,
        animation: newActive,
        data: newData
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

/*
 * Partikkeleille sallitun alueen korkeuden säätö
 */
export const setAllowedRangeHeight = (val) => {

    return dispatch => {

        dispatch({
            type: 'PHYSICS_SET_HEIGHT',
            data: {
                allowedRangeHeight: val
            }
        })
    }
}

/*
 * Partikkeleille sallitun alueen leveyden säätö
 */
export const setAllowedRangeWidth = (val) => {

    return dispatch => {

        dispatch({
            type: 'PHYSICS_SET_WIDTH',
            data: {
                allowedRangeWidth: val
            }
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
            type: 'PHYSICS_SET_ANIMATION_TYPE',
            data: {
                type: val
            }
        })
    }
}

/*
 * Partikkeleille sallitun alueen korkeuden säätö
 */
export const setNumberOfParticles = (val) => {

    return dispatch => {

        dispatch({
            type: 'PHYSICS_SET_PARTICLE_COUNT',
            data: {
                particles: val
            }
        })
    }
}


const vectorReducer = (state = initialState, action) => {

    switch(action.type) {

        case 'PHYSICS_ANIMATE':

            return calculateNewState(state);

        case 'PHYSICS_SET_ANIMATION_TYPE':
            return changeAnimationType(state, action.data);

        case 'PHYSICS_SET_PARTICLE_COUNT':

            return changeParticleCount(state, action.data);

        case 'PHYSICS_SET_HEIGHT':

            return {
                ...state,
                allowedRangeHeight: action.data.allowedRangeHeight
            }

        case 'PHYSICS_SET_WIDTH':

            return {
                ...state,
                allowedRangeWidth: action.data.allowedRangeWidth
            }

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
