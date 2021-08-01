import React from 'react';
import {useSelector, useDispatch} from "react-redux";

import {
    toggleActiveState
} from "../../reducers/navigationReducer"
 
import {
    NAV,
    UL,
    LI,
    LINK,
    ICON,
    BARS
} from "./elements"
import { format } from 'd3-format';

const ResponsiveNavBar = () => {

    const dispatch = useDispatch();

    const {pages} = useSelector(state => state.navigation);

    return (
        <NAV>
            <UL className="menu">


                {
                    pages.map((item, index) => {
                        return (
                            <LI key={index} className={item.cName}>
                                <LINK to={item.path}>
                                    <span className="navbar-span">
                                        {item.title}
                                    </span>
                                </LINK>
                            </LI>
                        )
                    })
                }

                <LI className="toggle">
                    <ICON
                        onClick={() => dispatch(toggleActiveState())}
                    >
                        <BARS />
                    </ICON>
                </LI>

            </UL>
        </NAV>
    );
};

export default ResponsiveNavBar;