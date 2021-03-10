import React from 'react';

import {Play, Step, Stop} from "../../styledComponents/Icons";

import {useDispatch, useSelector} from "react-redux";

import {liikuta, toggleActiveState} from "../../reducers/gravitationReducer";

const DegubControls = () => {

    const dispatch = useDispatch();

    const {isActive} = useSelector(state => {

        return {
            ...state.gravitation
        }
    })

    const stepHandler = () => {
        if(!isActive){
            dispatch(liikuta())
        }
    }


    return (
        <>
            {
                isActive
                ? <Stop clickHandler={() => dispatch(toggleActiveState())} />
                : <Play clickHandler = {() => dispatch(toggleActiveState())} />
            }
            <Step 
                 clickHandler = {stepHandler}
                 accessible = { isActive ? 0 : 1}           
            />
        </>
    );
};

export default DegubControls;