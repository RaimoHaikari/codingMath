import React from 'react';

import Hero from "./Hero"
import Testi from "./Testi"

import './landingPage.css';

/*
            <Header />
            <main>
                <Featured />
                <Products />
            </main>
*/
const LandingPage = () => {

    return (
        <div className="svgHolder">
            <Hero />
        </div>
    );

};

/*
      viewBox="0 0 396.87 171.98"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      {...props}

*/

export default LandingPage;