import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

/*
import Trigonometry from './components/trigonometry'
import Timer from './components/timer';
import LissajousCurve from './layout/flies';
import RotatingArrow from "./layout/rotatingArrow";
import LandingPage from "./layout/landingPage";
*/

//import Navbar from "./components/navbar"
import ResponsiveNavBar from "./components/navbar/responsiveNavBar"


import AdvancedAcceleration from "./layout/advancedAcceleration";
import Bouncing from "./layout/bouncing";
import Flocking from './layout/flocking';
import Fractal from "./layout/fractal"
import Gravity from "./layout/planeetat";
import LissajousCurve from './layout/flies';
import LandingPage from "./layout/landingPage";
import Vectors from "./layout/vector";
import TestArea from "./layout/tyomaa"
import RotatingArrow from "./layout/rotatingArrow"

const App = () => {



  /*     
   *
   */
  return (
    <Router>

      <ResponsiveNavBar />
    
      <Switch>
        <Route path="/flies">
          <LissajousCurve />
        </Route>
        <Route path="/vector">
          <Vectors />
        </Route>
        <Route path="/acceleration">
          <AdvancedAcceleration />
        </Route>
        <Route path="/fractal">
          <Fractal />
        </Route>
        <Route path="/flocking">
          <Flocking />
        </Route>
        <Route path="/gravity">
          <Gravity />
        </Route>
        <Route path="/bouncing">
          <Bouncing />
        </Route>
        <Route path="/testi">
          <TestArea />
        </Route>      
        <Route path="/">
          <LandingPage />
        </Route>
      </Switch>
    </Router>
  );

};

export default App;