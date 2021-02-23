import styled from "styled-components";

export const Container = styled.div`
    border: 1px dotted #cccccc;
    padding: 10px;
    font : .8em "typewriter", sans-serif;
`;

/*
     display: flex;
    margin: 0;
    flex-flow: row wrap;
 */
export const FormGroup = styled.div`

    display: flex;
    flex-direction: row; 

    @media screen and (min-width: 576px){
        flex-direction: column; 
    } 

    @media screen and (max-width: 350px){
        flex-direction: column; 
    }   
`;

/*
 * - If both items are set to flex-shrink:1, they will both take up half of the viewport (they shrink equally to 50%)
 * - If both are items set to flex-shrink:0, neither will shrink and they will both take up 100% of the viewport width, growing the width of the flexbox to twice that of the viewpor
 */
export const RadioColName = styled.div`

    margin-bottom: 5px;
    margin-right: 5px;

    @media screen and (min-width: 400px){
        align-self: center;
    }

    @media screen and (min-width: 992px){
        align-self: flex-start;
    }
`

export const SettingsLabel = styled.label`
    font-size: 1em;
    font-weight: bold;
    margin: 0;
`;

/*

 */
export const RadioColValue = styled.div`

    flex: 1; 

    display: flex;
    flex-direction: column;
    flex-shrink: 0;

    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);

    @media screen and (min-width: 400px){
        flex-direction: row;
    }

    @media screen and (min-width: 576px){
        flex-direction: column;
    }

`

export const RadioWrapper = styled.div`
    flex: 1;   
`;


export const RadioLabel = styled.label`
   
    padding: 8px 14px;
    margin: 0px;
    font-size: 14px;
    font-family: sans-serif;
    color: #ffffff;

    display: block;
    width: 100%;
    max-width: 100%;

    background: #009578;
    cursor: pointer;

    transition: background 0.1s;
`;

export const RadioInput = styled.input`
    display: none; 

    &:checked + ${RadioLabel} {
        background: #006B56; 
    }
`

