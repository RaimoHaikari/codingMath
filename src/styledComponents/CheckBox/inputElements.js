import styled from "styled-components";

/*
 * https://www.w3schools.com/howto/howto_css_custom_checkbox.asp
 */
export const Container = styled.div`
    border: 1px dotted #cccccc;
    padding: 20px 10px 10px 40px;
    font : .8em "typewriter", sans-serif;

    display: block;
    position: relative;

    margin-bottom: 12px;
    cursor: pointer;

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    /* Hide the browser's default checkbox */
    input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;        
    }

    /* Create a custom checkbox */
    .checkmark {
        position: absolute;
        top: 10px;
        left: 10px;
        height: 25px;
        width: 25px;
        background-color: #eee;
    }

    /* On mouse-over, add a grey background color */
    &:hover input ~ .checkmark {
        background-color: #ccc;
    }

    /* When the checkbox is checked, add a blue background */
    input:checked ~ .checkmark {
        background-color: #2196F3;
    }

    /* Create the checkmark/indicator (hidden when not checked) */
    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }

    /* Show the checkmark when checked */
    input:checked ~ .checkmark:after {
        display: block;
    }

    /* Style the checkmark/indicator */
    .checkmark:after {
        left: 9px;
        top: 5px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }

`;

export const Label = styled.label`
    font-weight: bold;
`;




