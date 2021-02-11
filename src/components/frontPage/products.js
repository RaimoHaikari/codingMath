import React from 'react';

import {ReactComponent as Spiral} from "../../svgImages/sprial.svg";
import {ReactComponent as Tahti} from "../../svgImages/tahti.svg";
import {ReactComponent as Lahtikko} from "../../svgImages/lahtikko.svg";

const Products = () => {
    return (
        <section className="our-products">

            <div className="container">

                <h2 className="section-title">Tuottehemme</h2>

                <article className="product product-red spacing">
                    <Spiral />
                    <h3 className="product-title">Attributes</h3>
                    <p className="product-description">Blinking and flashing animation can be problematic for people</p>
                    <a href="" className="btn">Kerro lisää</a>
                </article>

                <article className="product product-yellow spacing">
                    <Tahti />
                    <h3 className="product-title">Kolpakko</h3>
                    <p className="product-description">Näin huutaa huutosakki loppusoinnuton</p>
                    <a href="" className="btn">Tell me more</a>
                </article>

                <article className="product product-green spacing">
                    <Lahtikko />
                    <h3 className="product-title">Rahapussi</h3>
                    <p className="product-description">Höpö höpö löpö</p>
                    <a href="" className="btn">Visa mig</a>
                </article>

            </div>

        </section>
    );
};

export default Products;