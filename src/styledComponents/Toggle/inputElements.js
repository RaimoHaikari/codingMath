import styled from "styled-components";

export const Label = styled.label`
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;

    border: 1px solid navy;
`;

export const Input = styled.input`
    opacity: 0;
    width: 0;
    height: 0;

    :checked + Span {
        background-color: #2196f3;
    }

    :checked + Span:before {
        transform: translate(26px);
    }
`;

export const Span = styled.span`
    position: absolute;
    cursor: pointer;

    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

border-radius: 34px; 

    background-color: #ccc;
    /* transition: 0.4s; */

    :before {
        position: absolute;
        content: '';
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;

border-radius: 50%;

        background-color: white;;

    }
`;