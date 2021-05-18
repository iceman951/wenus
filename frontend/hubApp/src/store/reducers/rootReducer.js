import postReducer from './postReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    post: postReducer,
})

export default rootReducer