import React from 'react';

import {ReactComponent as Tupu} from "../../svgImages/tupu.svg";
// import {ReactComponent as Hupu} from "../../svgImages/hupu.svg";
import {ReactComponent as Lupu} from "../../svgImages/lupu.svg";

import Hupu from '../../iconComponents/Hupu'
import IlotulitusRaketti from '../../iconComponents/IlotulitusRaketti';

const Featured = () => {
    return (
        <section className="featured">
            <div className="container">

                <h2 className="section-title">Featured products</h2>
                    
                <div className="split">

                    <a href="#" className="featured_item">
                        <IlotulitusRaketti />
                        <p className="featured_details"><span className="price">99$</span>homman nimi oli saunaan!</p>
                    </a>

                    <a href="#" className="featured_item">
                        <Hupu />
                        <p className="featured_details"><span className="price">99$</span>homman nimi oli saunaan!</p>
                    </a>

                    <a href="#" className="featured_item">
                        <Lupu />
                        <p className="featured_details"><span className="price">99$</span>homman nimi oli saunaan!</p>
                    </a>

                </div>
                
            </div>
        </section>
    );
};

export default Featured;