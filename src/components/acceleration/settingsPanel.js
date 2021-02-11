import React  from 'react';
import {useDispatch, useSelector} from "react-redux";
import styled from 'styled-components';

import {updateStepValue} from "../../reducers/advAccelerationReducer";

import Slider from "../../styledComponents/slider/"

import './acceleration.css';

const SettingsPanel = () => {

    const dispatch = useDispatch()

    const {step} = useSelector(state => state.acceleration);

    let handleStepChange = (event) => {
        //dispatch(updateStepValue({stepValue: parseInt(event.target.value)}))
        //setValue(parseInt(event.target.value))
    }


    return (
        <>
            <Slider
                changeHandler = {(value) => {
                    dispatch(updateStepValue({stepValue: parseFloat(value)}))
                }}
                color="#0074D9"
                step={step.step}
                minValue = {step.min}
                value = {step.val}
                maxValue = {step.max}
                name = "Step"
                id = "step"
            />
        </>
    );
};

export default SettingsPanel;