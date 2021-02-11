import { 
    applyMiddleware,
    combineReducers,
    createStore
 } from "redux";

import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

import advancedAccelerationReducer from "./reducers/advAccelerationReducer";
import bouncingReducer from "./reducers/bouncingReducer";
import gravitationReducer from "./reducers/gravitationReducer";
import lissajousReducer from "./reducers/lissajousReducer";
import navigationReducer from "./reducers/navigationReducer";
import rotatingArrowReducer from "./reducers/rotatingArrowReducer";
import timerReducer from "./reducers/timerReducer"
import trigReducer from "./reducers/trigReducer"
import vectorReducer from "./reducers/vectorReducer";

 const reducer = combineReducers({
     acceleration: advancedAccelerationReducer,
     bouncing: bouncingReducer,
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