import { combineReducers } from "redux";
import tagReducer from './tagReducer';
import postReducer from './postReducer';
import userReducer from './userReducer';
import notificationReducer from './notificationReducer'
const rootReducer = combineReducers({
    tag : tagReducer,
    post: postReducer,
    user: userReducer,
    notification: notificationReducer,
});

export default rootReducer;
