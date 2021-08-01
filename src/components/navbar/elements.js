import styled from "styled-components";

import {Link} from "react-router-dom";

import {BiTestTube} from "react-icons/bi";

export const NAV = styled.nav`
    background: #222;
    padding: 5px 20px;
`;

export const UL = styled.ul`
    list-style-type: none;

    &.menu {

        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;

        @media screen and (min-width: 468px){
            justify-content: center;
        }

        @media screen and (min-width: 768px){
            justify-content: space-between;
        }
    }
`;

export const LI = styled.li`
    font-size: 16px;
    padding: 10px 5px;

    &.item {
        order: 3;

        display: none; 

        width: 100%; 
        text-align: center;

        @media screen and (min-width: 768px){
            order: 1;

            display: block;
            width: auto;

            padding: 10px 10px;
        }

    }

    &.item.active {
        display: block;
    }

    &.siteLogo {
        order: 1;

        font-size: 20px;

        @media screen and (min-width: 468px){
            flex: 1;

            order: 1;
        }
    }

    &.toggle {
        order: 2;

        @media screen and (min-width: 768px){
            display: none;
        }        
    }
`;

export const LINK = styled(Link)`
    color: orange;
    text-decoration: none;

    display: block;

    &:hover {
        transition: all 0.2s ease-in-out;
        color: red;
        text-decoration: none;
    }
`;

export const BARS = styled(BiTestTube)`
    fill: red;
`;

export const ICON = styled.div`

    //position: absolute;
    //top: 1.2rem;
    //right: 1.5rem;
    //background: transparent;
    font-size: 1.2rem;
    cursor: pointer;
    //outline: none;
    border: 1px solid yellow;
`;
