import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {
    setAnimationType,
    setAllowedRangeHeight, 
    setAllowedRangeWidth,
    setNumberOfParticles
} from "../../reducers/vectorReducer";

import Slider from "../../styledComponents/slider/";
import NumberInput from "../../styledComponents/NumberInput";
import Toggle from "../../styledComponents/Toggle";
import RadioGroup from "../../styledComponents/RadioGroup";

const SettingsPanel = () => {

    const [isToggled, setIsToggled] = useState(false);

    const dispatch = useDispatch();

    /*
     *
     */
    const {
        allowedRangeHeight,
        allowedRangeWidth,
        animation, // Aktiivinen vaihtoehto
        animationTypes,
        numberOfParticles, 
        maxAllowedRangeHeight,
        minAllowedRangeHeight,
        maxAllowedRangeWidth,
        minAllowedRangeWidth,
        minNumberOfParticles,
        maxNumberOfParticles
    } = useSelector(state => {

        let maxAllowedRangeWidth = state.vector.width * 0.9;
        let minAllowedRangeWidth = state.vector.width * 0.5;

        let maxAllowedRangeHeight = state.vector.height * 0.9;
        let minAllowedRangeHeight = state.vector.height * 0.5;

        return {
            ...state.vector,
            maxAllowedRangeHeight: maxAllowedRangeHeight,
            minAllowedRangeHeight: minAllowedRangeHeight,
            maxAllowedRangeWidth: maxAllowedRangeWidth,
            minAllowedRangeWidth: minAllowedRangeWidth,
        }
    });

    const changeHandler = (val) => {
        dispatch(setAnimationType(val))
    }

    /*
            <Toggle 
                isToggled={isToggled}
                onToggle={changeHandler}
            />
     */
    const animationType = () => {

        const values = Object.entries(animationTypes)
            .map(([key, value]) => {

                let active = value.value === animation.value;
                return {
                    isActive: active,
                    name: value.name,
                    value: value.value
                }
            });

        return (
            <RadioGroup 
                title="Type of Animation"
                options={values}
                changeHandler={changeHandler}
            />
        )
    }

    /*
     *
     */
    const particleCount = () => {

        return(
            <NumberInput 
                title="Number of particles"
                id="numberOfParticles"
                changeHandler={(value) => dispatch(setNumberOfParticles(value))}
                value = {numberOfParticles}
                min = {minNumberOfParticles}
                max = {maxNumberOfParticles}
            />
        )

    }

    /*
     * Partikkeleille sallitun alueen leveyden säätö
     */
    const rangeHeight = () => {
        return (
            <>
                <Slider
                    changeHandler = {(value) => {
                        dispatch(setAllowedRangeHeight(parseInt(value)))
                    }}
                    color="#0074D9"
                    step={10}
                    minValue = {minAllowedRangeHeight}
                    value = {allowedRangeHeight}
                    maxValue = {maxAllowedRangeHeight}
                    name = "Height"
                    id = "height"
                />
            </>
        )
    }

    /*
     * Partikkeleille sallitun alueen leveyden säätö
     */
    const rangeWidth = () => {
        return (
            <>
                <Slider
                    changeHandler = {(value) => {
                        dispatch(setAllowedRangeWidth(parseInt(value)))
                    }}
                    color="#d5ad00"
                    step={10}
                    minValue = {minAllowedRangeWidth}
                    value = {allowedRangeWidth}
                    maxValue = {maxAllowedRangeWidth}
                    name = "Width"
                    id = "width"
                />
            </>
        )
    }

    return (
        <div>
            {animationType()}
            {particleCount()}
            {rangeWidth()}
            {rangeHeight()}
        </div>
    );
};

export default SettingsPanel;