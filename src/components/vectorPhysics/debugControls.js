import React from 'react';


import {Play, Step, Stop} from "../../styledComponents/Icons";

import {useDispatch, useSelector} from "react-redux";
import {liikuta, toggleActiveState} from "../../reducers/vectorReducer";

const DebugControls = () => {

    const dispatch = useDispatch()

    const {isActive } = useSelector(state => {

        return {
            ...state.vector
        }

    })

    const stepHandler = () => {
        if(!isActive){
            dispatch(liikuta())
        }
    }

    /* 
     * Huom! Animaation pyöritys tapahtuu index.js isActive -statusta tarkkailevass
     *        effectHookissa!!!
     */
    return (
        <>
            {
                isActive
                ? <Stop clickHandler = {() => dispatch(toggleActiveState())} />
                : <Play clickHandler = {() => dispatch(toggleActiveState())} />
            }
            <Step 
                clickHandler = {stepHandler}
                accessible = { isActive ? 0 : 1}
            />
        </>
    );
};

/*
 *
 */

export default DebugControls;