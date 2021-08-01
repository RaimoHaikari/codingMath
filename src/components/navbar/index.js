import React, {useState} from 'react';
import {useSelector} from "react-redux";

import { Link } from "react-router-dom";

import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import {IconContext} from "react-icons";


import './navbar.css'

const Navbar = () => {

    const [sidebar, setSidebar] = useState(false)

    const {pages} = useSelector(state => state.navigation);

    const showSidebar = () => {
        setSidebar(!sidebar)
    }


    const padding = {
        padding: 5
    }

    return (
        <>
            <IconContext.Provider value={{color: '#fff'}}>

                <div className="navbar">
                    <Link to="#" className="menu-bars">
                        <FaIcons.FaBars onClick={showSidebar}/>
                    </Link>
                </div>

                <nav className={sidebar ? "nav-menu active" : "nav-menu"}>

                    <ul className="nav-menu-items" onClick={showSidebar}>

                        <li className="navbar-toggle">
                            <Link to="#" className="menu-bars">
                                <AiIcons.AiOutlineClose />
                            </Link>
                        </li>

                        {
                            pages.map((item, index) => {
                                return (
                                    <li key={index} className={item.cName}>
                                        <Link to={item.path}>
                                            {item.icon}
                                            <span className="navbar-span">
                                                {item.title}
                                            </span>
                                            
                                        </Link>
                                    </li>
                                )
                            })
                        }

                    </ul>

                </nav>

            </IconContext.Provider>

      </>
    );
};


export default Navbar;