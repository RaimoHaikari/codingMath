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

import Navbar from "./components/navbar"
import AdvancedAcceleration from "./layout/advancedAcceleration";
import Gravity from "./layout/planeetat";
import LissajousCurve from './layout/flies';
import LandingPage from "./layout/landingPage";
import Vectors from "./layout/vector";
import TestArea from "./layout/tyomaa"

const App = () => {



  /*      <div>
        <Link style={padding} to="/">Home</Link>
        <Link style={padding} to="/flies">Kärpäset</Link>
        <Link style={padding} to="/vector">Ilotulitus</Link>
        <Link style={padding} to="/acceleration">Acceleration</Link>
        <Link style={padding} to="/gravity">Gravity</Link>
        <Link style={padding} to="/testi">Testarea</Link>
      </div>
  */
  return (
    <Router>

      <Navbar />
    
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
        <Route path="/gravity">
          <Gravity />
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