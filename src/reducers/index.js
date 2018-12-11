import {combineReducers} from 'redux';
import commonReducer from './commonReducer.js';
// import logReducer from './logReducer';
let rootReducer=combineReducers({
    commonReducer,
    // logReducer
})
export default rootReducer;