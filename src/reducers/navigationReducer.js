import * as AiIcons from "react-icons/ai"
import * as IoIcons from "react-icons/io";


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

const getTestareIcon = () => {
    return <IoIcons.IoMdTennisball />
}


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
            title: 'Home',
            path: '/',
            icon: getHomeIcon(),
            cName: 'nav-text'
        },
        {
            title: 'Kärpäset',
            path: '/flies',
            icon: getFliesIcon(),
            cName: 'nav-text'
        },
        {
            title: 'Ilotulitus',
            path: '/vector',
            icon: getFireworksIcon(),
            cName: 'nav-text'
        },
        {
            title: 'Acceleration',
            path: '/acceleration',
            icon: getAccelerationIcon(),
            cName: 'nav-text'
        },
        {
            title: 'Gravity',
            path: '/gravity',
            icon: getGravityIcon(),
            cName: 'nav-text'
        },
        {
            title: 'Testarea',
            path: '/testi',
            icon: getTestareIcon(),
            cName: 'nav-text'
        },
    ]
}

/*
 *             
 */
const navigationReducer = (state = initialState, action) => {

    switch(action.type) {

        default:
            return state;
    }
}

export default navigationReducer;

