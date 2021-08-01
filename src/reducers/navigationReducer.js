import * as AiIcons from "react-icons/ai"
import * as IoIcons from "react-icons/io";

import {
    BiTestTube
} from "react-icons/bi"

const getHomeIcon = () => {
    return <AiIcons.AiOutlineClose />
}

const getFliesIcon = () => {
    return <IoIcons.IoMdDesktop />
}

const getFireworksIcon = () => {
    return <IoIcons.IoMdJet />
}

const getAccelerationIcon = () => {
    return <IoIcons.IoMdUmbrella />
}

const getGravityIcon = () => {
    return <IoIcons.IoMdGrid />
}

/*
const getTestareIcon = () => {
    return <IoIcons.IoMdTennisball />
}
*/


/*
         <Link style={padding} to="/">Home</Link>
        <Link style={padding} to="/flies">Kärpäset</Link>
        <Link style={padding} to="/vector">Ilotulitus</Link>
        <Link style={padding} to="/acceleration">Acceleration</Link>
        <Link style={padding} to="/gravity">Gravity</Link>
        <Link style={padding} to="/testi">Testarea</Link>
        */
const initialState = {
    pages: [
        {
            title: 'Coding Math',
            path: '/',
            icon: getHomeIcon(),
            cName: 'siteLogo'
        },
        {
            title: 'Kärpäset',
            path: '/flies',
            icon: getFliesIcon(),
            cName: 'item nav-text'
        },
        {
            title: 'Ilotulitus',
            path: '/vector',
            icon: getFireworksIcon(),
            cName: 'item nav-text'
        },
        {
            title: 'Acceleration',
            path: '/acceleration',
            icon: getAccelerationIcon(),
            cName: 'item nav-text'
        },
        {
            title: 'Fractal',
            path: '/fractal',
icon: getGravityIcon(),
            cName: 'item nav-text'
        },
        {
            title: 'Flocking',
            path: '/flocking',
            icon: <IoIcons.IoMdBowtie />,
            cName: 'item nav-text'
        },
        {
            title: 'Gravity',
            path: '/gravity',
            icon: getGravityIcon(),
            cName: 'item nav-text'
        },
        {
            title: 'Bouncing',
            path: '/bouncing',
            icon: <IoIcons.IoMdTennisball />,
            cName: 'item nav-text'
        },
        {
            title: 'Testarea',
            path: '/testi',
            icon: <BiTestTube />,
            cName: 'nav-text item'
        },
    ]
}

/*
 *
 */
const toggleMenu = (state) => {

    console.log("Täällä sitä jo mennään")

    let newPages = state.pages.map((page,i) => {

        let pageClass = page.cName;

        /*
         * Kuuluuko sivu item -luokkaan
         */
        if(pageClass.includes("item")){

            if(pageClass.includes("active")){
                pageClass = pageClass.replace(" active", "")
            } else {
                pageClass = pageClass.concat(" active")
            }

        }


        return {
            ...page,
            cName: pageClass
        };
    })

    return {
        ...state,
        pages: newPages
    }

}

/*
 * A C T I O N S
 *
 * Kytketään animaation käynnistävä muuttuja joko päälle tai pois päältä
 * - muuttuja: isActive
 */
export const toggleActiveState = () => {

    return dispatch => {

        dispatch({
            type: 'NAVIGATION_TOGGLE',
            data: {}
        })
    }
}

/*
 *             
 */
const navigationReducer = (state = initialState, action) => {

    switch(action.type) {

        case 'NAVIGATION_TOGGLE':

            return toggleMenu(state);

        default:
            return state;
    }
}

export default navigationReducer;

