import styled from "styled-components";

export const Input = styled.input``;

export const Label = styled.label`
    padding: 10px;
    background: #e2e2e2;
`;

export const Content = styled.div`
    order: 1;

    display: none;

    width: 100%;
    padding: 5px;
`;


export const Container = styled.div`
    display: flex;
    flex-wrap: wrap;

    max-width: 95%;
    margin: 2px;
    padding: 2px;

    border: 1px solid red;

    
    ${Input} {
        display: none;
    }

    ${Input}:checked + ${Label} {
        background-color: #2196f3;
    }

    ${Input}:checked + ${Label} + ${Content} {
        display: block;
    }
    */

    /* 
     * kun valittu, etsii seuraavaa elementtiä jonka pitää olla 
     * LABEL jotta toimisi
     * 
     *  + ${Content}
    
    ${Input}:checked + ${Label} {
        display: block;
        background-color: red;
    }
    */
`;




export const H2 = styled.h2`
    font-size: 1.25em;
`;

export const P = styled.p``;