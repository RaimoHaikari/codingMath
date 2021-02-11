import React from 'react';
import styled from "styled-components";

const sliderThumbStyles = (props) => {

    return(`
    width: 10px;
    height: 10px;
    background: ${props.color};
    cursor: pointer;
    outline: 5px solid #333;
    opacity: ${props.opacity};
    -webkit-transition: .2s;
    transition: opacity .2s;
`)};

const Styles = styled.div`
    border: 1px dotted #cccccc;
    padding: 10px;
    font : .8em "typewriter", sans-serif;

    .cmSettingsLabel {
        font-size: 1em;
    }

    .cmSettingsSliderValues {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 5px;
    }


    .cmSettingsValue {
        text-align: center;
        max-width: 30%;
    }

    .cmSettingsSlider {

        -webkit-appearance: none;
        width: 100%;
        height: 10px;
        border-radius: 5px;
        background: #efefef;
        outline: none;

        &::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            ${props => sliderThumbStyles(props)}
        }

        &::-moz-range-thumb {
            ${props => sliderThumbStyles(props)}
        }
    }
`;

/*
 *
 */
export default class Slider extends React.Component {

    render() {
        return (
            <Styles 
                color={this.props.color}
                opacity={this.props.value > 10 ? (this.props.value / 255): 0.1}
            >
                <label className="cmSettingsLabel" htmlFor={this.props.id}>{this.props.name}</label>

                <input 
                        id={this.props.id}
                        type="range"
                        min={this.props.minValue}
                        max={this.props.maxValue}
                        value={this.props.value}
                        step={this.props.step}
                        className="cmSettingsSlider"
                        onChange={e => this.props.changeHandler(e.target.value)}

                />  

                <div className="cmSettingsSliderValues">
                    <div className="cmSettingsValue">{this.props.minValue}</div>
                    <div className="cmSettingsValue">{this.props.value}</div>
                    <div className="cmSettingsValue">{this.props.maxValue}</div>
                </div>

            </Styles>
        )
    }

}

