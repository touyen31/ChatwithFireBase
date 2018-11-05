import {combineReducers} from 'redux'
import {firebaseReducer} from 'react-redux-firebase'
import chatReducer from './chatReducer'

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    chatReducer
})

export  default  rootReducer;