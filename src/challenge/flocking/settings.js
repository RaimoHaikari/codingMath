import React from 'react';
import {useDispatch, useSelector} from "react-redux";

import {updateVelocitySpec} from "./flockingReducer"

import Slider from "../../styledComponents/slider"

const Settings = () => {

    const dispatch = useDispatch()

    const {maxForce, maxSpeed} = useSelector(state => state.flocking);

    return (
        <>

            <Slider 
                changeHandler = {(value) => {
                    dispatch(updateVelocitySpec({type: 'maxForce', value: parseFloat(value)}))
                }}
            color="#0074D9"
            step={maxForce.step}
            minValue = {maxForce.min}
            value = {maxForce.value}
            maxValue = {maxForce.max}
            name = "Max Force"
            id = "maxForce"
            />

            <Slider 
                changeHandler = {(value) => {
                    dispatch(updateVelocitySpec({type: 'maxSpeed', value: parseFloat(value)}))
                }}
            color="#0074D9"
            step={maxSpeed.step}
            minValue = {maxSpeed.min}
            value = {maxSpeed.value}
            maxValue = {maxSpeed.max}
            name = "Max Speed"
            id = "maxSpeed"
            />            
        </>
    );
};

export default Settings;