import styled from "styled-components";

export const H3 = styled.h3`
    font-size: 1em;
    font-weight: bold;    
`;

export const Input = styled.input``;

export const Label = styled.label`
    padding: 5px;
    margin: 0px;
    background: #d7d3cf;

    &:hover {
        cursor: pointer;
    }
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

    max-width: 100%;
    margin: 2px;
    padding: 2px;

    background-color: #f3f2f1;

    
    ${Input} {
        display: none;
    }

    ${Input}:checked + ${Label} {
        background-color: #fff;
    }

    ${Input}:checked + ${Label} + ${Content} {
        background-color: white;
        display: block;
    }
    */
`;
