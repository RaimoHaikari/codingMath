import React from 'react';
import {useDispatch, useSelector} from "react-redux";

import {updateCelestialBodySettings} from "../../reducers/gravitationReducer"

import Slider from "../slider";
import Tab from "./tab"

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

    const direction = (cb) => {

        return (
            <Slider 
                changeHandler = {(value) => {
                    dispatch(updateCelestialBodySettings({
                        name: cb.name,
                        setting: 'direction',
                        value: parseFloat(value)                       
                    }))
                }}
                color="#0074D9"
                step={0.1}
                minValue = {cb.directionMin}
                value = {cb.direction}
                maxValue = {cb.directionMax}
                name = "Speed"  
                id = {`speed-${cb.name}`}           
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

    return (
        <Container>
            {
                celestialBodies
                    .filter(cb => cb.name !== "sun")
                    .map((cb,index) => {
                        return (
                            <Tab 
                                key={index}
                                name={cb.name}
                                changeHandler = {() => {return null}}
                            >
                                 {speed(cb)}
                                 {direction(cb)}
                            </Tab>
                        )
                    })
            }
        </Container>
    );
};

export default Tabs;