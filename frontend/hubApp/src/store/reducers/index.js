import { combineReducers } from "redux";
import tagReducer from './tagReducer';
import postReducer from './postReducer';
const rootReducer = combineReducers({
    tag : tagReducer,
    post: postReducer,
});

export default rootReducer;
