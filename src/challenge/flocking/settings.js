import React from 'react';
import {useDispatch, useSelector} from "react-redux";

import {
    toggleTracking,
    updateVelocitySpec
} from "./flockingReducer"

import Slider from "../../styledComponents/slider"
import CheckBox from '../../styledComponents/CheckBox';

const Settings = () => {

    const dispatch = useDispatch()

    const {alignment, cohesion, separation, maxForce, maxSpeed, perceptionRadius, underObservation} = useSelector(state => state.flocking);

    return (
        <>
            <CheckBox 
                handler = {() => dispatch(toggleTracking())}
                checked = {underObservation!==null?true:false}
                title = 'Seuranta'
            />

            <Slider 
                changeHandler = {(value) => {
                    dispatch(updateVelocitySpec({type: 'alignment', value: parseFloat(value)}))
                }}
            color="#0074D9"
            step={alignment.step}
            minValue = {alignment.min}
            value = {alignment.value}
            maxValue = {alignment.max}
            name = "Alignment"
            id = "idAlignment"
            />

            <Slider 
                changeHandler = {(value) => {
                    dispatch(updateVelocitySpec({type: 'cohesion', value: parseFloat(value)}))
                }}
            color="#0074D9"
            step={cohesion.step}
            minValue = {cohesion.min}
            value = {cohesion.value}
            maxValue = {cohesion.max}
            name = "Cohesion"
            id = "idCohesion"
            />

            <Slider 
                changeHandler = {(value) => {
                    dispatch(updateVelocitySpec({type: 'separation', value: parseFloat(value)}))
                }}
            color="#0074D9"
            step={separation.step}
            minValue = {separation.min}
            value = {separation.value}
            maxValue = {separation.max}
            name = "Separation"
            id = "idSeparation"
            />

            <Slider 
                changeHandler = {(value) => {
                    dispatch(updateVelocitySpec({type: 'perceptionRadius', value: parseFloat(value)}))
                }}
            color="#0074D9"
            step={perceptionRadius.step}
            minValue = {perceptionRadius.min}
            value = {perceptionRadius.value}
            maxValue = {perceptionRadius.max}
            name = "Perception radius"
            id = "perceptionRadius"
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