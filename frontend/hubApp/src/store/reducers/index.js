import { combineReducers } from "redux";
import tagReducer from './tagReducer';
import postReducer from './postReducer';
import userReducer from './userReducer';
const rootReducer = combineReducers({
    tag : tagReducer,
    post: postReducer,
    user: userReducer,
});

export default rootReducer;
