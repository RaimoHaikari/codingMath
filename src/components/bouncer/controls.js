import React from 'react';

import {Play, Step, Stop} from "../../styledComponents/Icons";

import {useDispatch, useSelector} from "react-redux";

import {
    animate, 
    stopAnimation, 
    toggleActiveState,
    oneStepForward
} from "../../reducers/bouncingReducer";

const Controls = () => {

    const dispatch = useDispatch()

    const {isActive } = useSelector(state => {

        return {
            ...state.bouncing
        }

    })

    const stepHandler = () => {
        if(!isActive){
            dispatch(oneStepForward())
        }
    }


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


/*
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

*/
};

export default Controls;