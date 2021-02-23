import React from 'react';
import styled from "styled-components";

import {FaPlay, FaStop} from "react-icons/fa";
import {VscDebugStepOver} from "react-icons/vsc";

const Icon = styled(FaPlay).attrs(props => {

        return({
            size: props.size || "2em",
            color: "black",
        })

  })`

    background: ${props => props.styles.background};
    padding: ${props => props.styles.padding};
    margin: ${props => props.styles.margin};
    cursor: pointer;
    border: ${props => props.styles.border};
    border-radius: ${props => props.styles.padding};

    &:hover {
        background: ${props => props.styles.hoverBg};
    }

`;

/*
 * ${props => props.styles.background};
 */
const StepIcon = styled(VscDebugStepOver).attrs(props => {

    return({
        size: props.size || "2em",
        color: "black",
    })

})`

background: ${props => props.accessible ? props.styles.background : '#dddddd'};
padding: ${props => props.styles.padding};
margin: ${props => props.styles.margin};
cursor: ${props => props.accessible ? 'pointer' : 'default'};;
border-radius: ${props => props.styles.padding};
border: ${props => props.accessible ? props.styles.border : '#dddddd'};

&:hover {
    background: ${props => props.accessible ? props.styles.hoverBg : '#dddddd'};
}

`;

const StopIcon = styled(FaStop).attrs(props => {

        return({
            size: props.size || "2em",
            color: "black",
        })

  })`

    background: ${props => props.styles.background};
    padding: ${props => props.styles.padding};
    margin: ${props => props.styles.margin};
    cursor: pointer;
    border-radius: ${props => props.styles.padding};
    border: ${props => props.styles.border};

    &:hover {
        background: ${props => props.styles.hoverBg};
    }

`;

const defaultStyles = {
    background: "white",
    padding: "5px",
    margin: "0 5px 0 0",
    borderRadius: "5px",
    border: "1px solid black",
    hoverBg: "red"
}

export const Play = (props) => {
    return (
        <>
            <Icon 
                size = {props.size}
                styles = {defaultStyles}
                onClick = {props.clickHandler}
            />
        </>
    );
};

export const Step = (props) => {
    return (
        <>
            <StepIcon 
                size = {props.size}
                styles = {defaultStyles}
                onClick = {props.clickHandler}
                accessible = {props.accessible}
            />
        </>
    );
};

export const Stop = (props) => {
    return (
        <>
            <StopIcon 
                size = {props.size}
                styles = {defaultStyles}
                onClick = {props.clickHandler}
            />
        </>
    );
};

// export default Play;