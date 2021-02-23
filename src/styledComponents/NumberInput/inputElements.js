import styled from "styled-components";

/*
 * https://www.w3.org/WAI/WCAG21/Techniques/css/C38
 */
export const Container = styled.div`
    border: 1px dotted #cccccc;
    padding: 10px;
    font : .8em "typewriter", sans-serif;
`;

export const FormGroup = styled.div`
    display: flex;
    margin: 0;
    flex-flow: row wrap;
`;

/*
 * - If both items are set to flex-shrink:1, they will both take up half of the viewport (they shrink equally to 50%)
 * - If both are items set to flex-shrink:0, neither will shrink and they will both take up 100% of the viewport width, growing the width of the flexbox to twice that of the viewpor
 */
export const FormColName = styled.div`
    flex: 0 1 100%;
    padding: 0.2rem 0;
    align-self: center;;

    @media screen and (min-width: 576px){
        flex: 0 0 66.66667%;
        max-width: 66.66667%;
    }   
`

export const FormColValue = styled.div`
    flex: 0 1 100%;
    padding: 0.2rem 0;

    @media screen and (min-width: 576px){
        flex: 0 0 33.33333%; 
        max-width: 33.33333%;
    }   
`

export const SettingsLabel = styled.label`
    /* display: block; width: 100%; max-width: 100%; */
    font-size: 1em;
    font-weight: bold;
    margin: 0;
`;

export const Input = styled.input`
    display: block;
    /* width: 100%; */
    height: 100%
`;

export const Info = styled.p`
    background: papayawhip;
    padding: 0.5rem 0.5rem;
    margin-top: 0.5rem;
`