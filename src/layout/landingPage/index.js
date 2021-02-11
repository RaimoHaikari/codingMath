import React from 'react';

import Header from '../../components/frontPage/header'
import Featured from '../../components/frontPage/featured';
import Products from '../../components/frontPage/products';

const LandingPage = () => {

    return (
        <>
            <Header />
            <main>
                <Featured />
                <Products />
            </main>
        </>
    );

};

export default LandingPage;