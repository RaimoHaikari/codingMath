import { 
    applyMiddleware,
    combineReducers,
    createStore
 } from "redux";

import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

import advancedAccelerationReducer from "./reducers/advAccelerationReducer";
import bouncingReducer from "./reducers/bouncingReducer";
import fractalReducer from "./reducers/fractalReducer";
import gravitationReducer from "./reducers/gravitationReducer";
import lissajousReducer from "./reducers/lissajousReducer";
import navigationReducer from "./reducers/navigationReducer";
import rotatingArrowReducer from "./reducers/rotatingArrowReducer";
import timerReducer from "./reducers/timerReducer"
import trigReducer from "./reducers/trigReducer"
import vectorReducer from "./reducers/vectorReducer";

/*
 * C O D I N G   C H A L L E N G E
 */
import flockingReducer from "./challenge/flocking/flockingReducer";

 const reducer = combineReducers({
     acceleration: advancedAccelerationReducer,
     bouncing: bouncingReducer,
     flocking: flockingReducer,
     fractal: fractalReducer,
     gravitation: gravitationReducer,
     lissajous: lissajousReducer,
     navigation: navigationReducer,
     rotatingArrow: rotatingArrowReducer,
     timer: timerReducer,
     trigonometry: trigReducer,
     vector: vectorReducer
 })

 const store = createStore(
     reducer,
     composeWithDevTools(
         applyMiddleware(thunk)
     )
 )

 export default store