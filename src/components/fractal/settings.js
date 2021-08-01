import React from 'react';
import {useDispatch, useSelector} from "react-redux";

import RadioGroup from "../../styledComponents/RadioGroup";
import NumberInput from "../../styledComponents/NumberInput";

import {
    setFractalType,
    setNumberOfIterations,
    setParameter
} from '../../reducers/fractalReducer'

import Slider from "../../styledComponents/slider/";

const Settings = () => {

    const dispatch = useDispatch()

    /*
    *
    */
    const {
        animation, 
        animationTypes,
        iterations,
        minNumberOfIterations,
        maxNumberOfIterations
    } = useSelector(state => state.fractal);

    const changeHandler = (val) => {
        dispatch(setFractalType(val))
    }

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
    const iterationDepth = () => {

        return(
            <NumberInput 
                title="Number of iterations"
                id="numberOfIterations"
                changeHandler={(value) => dispatch(setNumberOfIterations(value))}
                value = {iterations}
                min = {minNumberOfIterations}
                max = {maxNumberOfIterations}
            />
        )

    }

    /*
    * Desimaalifunktion pyöristämisessä käyettävä apufunktio
    *
    * Lähde:
    * ---------------------------------------------------------------------------------------------
    * How do you round to 1 decimal place in Javascript?
    * https://stackoverflow.com/questions/7342957/how-do-you-round-to-1-decimal-place-in-javascript
    */
    const round = (value, precision) => {
        var multiplier = Math.pow(10, precision || 0);
        return Math.round(value * multiplier) / multiplier;
    }

    /*
     *
     */
    const setAlpha = () => {
        return (
            <>
                <Slider
                    changeHandler = {(value) => {
                        dispatch(setParameter('alpha', parseFloat(value)))
                    }}
                    color="#0074D9"
                    step={0.1}
                    minValue = {round(animation.settings.alpha.min,2)}
                    value = {round(animation.settings.alpha.value,2)}
                    maxValue = {round(animation.settings.alpha.max,2)}
                    name = "Alpha"
                    id = "alpha"
                />
            </>
        )        
    }

    /*
     *
     */
    const setBeta = () => {
        return (
            <>
                <Slider
                    changeHandler = {(value) => {
                        dispatch(setParameter('beta', parseFloat(value)))
                    }}
                    color="#0074D9"
                    step={0.1}
                    minValue = {round(animation.settings.beta.min,2)}
                    value = {round(animation.settings.beta.value,2)}
                    maxValue = {round(animation.settings.beta.max,2)}
                    name = "Beta"
                    id = "beta"
                />
            </>
        )        
    }

    const sliderInput = (key, step, min, max, value, name) => {
        return (
            <Slider
                changeHandler = {(value) => {
                    dispatch(setParameter(key, parseFloat(value)))
                }}
                color="#0074D9"
                step={step}
                minValue = {round(min,2)}
                value = {round(value,2)}
                maxValue = {round(max,2)}
                name = {name}
                id = {key}
                key={key}
            />
        )        
    }

    const numberInput = (key, name, min, max, value) => {

        return(
            <NumberInput 
                title={name}
                id={key}
                changeHandler={(val) => dispatch(setParameter(key, parseInt(val)))}
                value = {value}
                min = {min}
                max = {max}
                key = {key}
            />
        )
    
    }

    const printSettings = () => {

        return(
            Object.entries(animation.settings)
            .map(([key, value]) => {

                switch (value.tool) {

                    case 'Slider':
                        
                        return sliderInput(
                            key,
                            value.step,
                            value.min,
                            value.max,
                            value.value,
                            value.name
                        );

                    case 'NumberInput':

                        return numberInput(
                            key,
                            value.name,
                            value.min,
                            value.max,
                            value.value
                        )
                
                }
            })  
        );  

    }

    /*
        {setAlpha()}
        {setBeta()}
        {iterationDepth()}

    */
    return (
        <>
            {animationType()}
            {printSettings()}
        </>
    );
};

export default Settings;