import React from 'react';
import {useDispatch, useSelector} from "react-redux";

import RadioGroup from "../../styledComponents/RadioGroup";

import {setAnimationType} from "../../reducers/bouncingReducer"

const Settings = () => {

    const dispatch = useDispatch();

    const {animation, animationTypes } = useSelector(state => {

        return {
            ...state.bouncing
        }

    })

    const changeHandler = (val) => {

        dispatch(setAnimationType(val))
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

    return (
        <>
            {
                animationType()
            }
        </>
    );
};

export default Settings;