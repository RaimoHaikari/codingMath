import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from "react-redux";
import store from "./store";
import './index.css';

import App from './App';
import Trigonometry from './components/trigonometry'
import Timer from './components/timer';
import LissajousCurve from './layout/flies';
import RotatingArrow from "./layout/rotatingArrow";
import LandingPage from "./layout/landingPage";

import 'bootstrap/dist/css/bootstrap.min.css';
/*

<LissajousCurve />
<Timer />
<RotatingArrow />

*/
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
