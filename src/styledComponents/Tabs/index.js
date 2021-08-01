import React from 'react';
import {useDispatch, useSelector} from "react-redux";

import {updateCelestialBodySettings} from "../../reducers/gravitationReducer"

import Slider from "../slider";
import Tab from "./tab";

import {
    Container
} from "./elements"

/*
 * How to Create Tabs with only HTML & CSS
 * - https://www.youtube.com/watch?v=oLqdy95LZSw
 */
const Tabs = (props) => {

    const dispatch = useDispatch();

    const {celestialBodies} = useSelector(state => state.gravitation)

    /*
     * Format number to always show 2 decimal places
     * - https://stackoverflow.com/questions/6134039/format-number-to-always-show-2-decimal-places
     */
    const roundTo = (num) => (Math.round(num * 100) / 100).toFixed(0);

    /*
     * How can I get sin, cos, and tan to use degrees instead of radians?
     * - https://stackoverflow.com/questions/9705123/how-can-i-get-sin-cos-and-tan-to-use-degrees-instead-of-radians
     */
    const toDegrees = (angle) => {
        return angle * (180 / Math.PI);
    }

    const toRadians = (angle) => {
        return angle * (Math.PI / 180);
    }

    /*
     *
     */
    const direction = (cb) => {

        return (
            <Slider 
                changeHandler = {(value) => {
                    dispatch(updateCelestialBodySettings({
                        name: cb.name,
                        setting: 'direction',
                        value: toRadians(parseFloat(value))                       
                    }))
                }}
                color="#0074D9"
                step={0.1}
                minValue = {roundTo(toDegrees(cb.directionMin))}
                value = {roundTo(toDegrees(cb.direction))}
                maxValue = {roundTo(toDegrees(cb.directionMax))}
                name = "Direction"  
                id = {`direction-${cb.name}`}           
            />
        );

    }

    /*
     *
     */
    const mass = (cb) => {

        return (
            <Slider 
                changeHandler = {(value) => {
                    dispatch(updateCelestialBodySettings({
                        name: cb.name,
                        setting: 'mass',
                        value: parseInt(value)                      
                    }))
                }}
                color="#0074D9"
                step={1}
                minValue = {cb.massMin}
                value = {cb.mass}
                maxValue = {cb.massMax}
                name = "Mass"  
                id = {`mass-${cb.name}`}           
            />
        );

    }

    /*
     *
     */
    const speed = (cb) => {

        return (
            <Slider 
                changeHandler = {(value) => {
                    dispatch(updateCelestialBodySettings({
                        name: cb.name,
                        setting: 'speed',
                        value: parseInt(value)                       
                    }))
                }}
                color="#0074D9"
                step={1}
                minValue = {cb.speedMin}
                value = {cb.speed}
                maxValue = {cb.speedMax}
                name = "Speed"  
                id = {`speed-${cb.name}`}           
            />
        );

    }

    const sEtD = (cb) => {
        return (
            <>  
                {speed(cb)}
                {direction(cb)}
            </>
        )
    }

    return (
        <Container>
            {
                celestialBodies
                    .map((cb,index) => {
                        return (
                            <Tab 
                                checked = {index===0}
                                key={index}
                                name={cb.name}
                                icon={cb.icon}
                                changeHandler = {() => {return null}}
                            >
                                {
                                    cb.name !== "Eridanus"
                                    ? sEtD(cb)
                                    : mass(cb)
                                }
                            </Tab>
                        )
                    })
            }
        </Container>
    );
};

export default Tabs;