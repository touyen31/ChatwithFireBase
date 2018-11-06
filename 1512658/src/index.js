import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import  firebase from 'firebase'
import rootReducer from './reducers'
import './Firebase/FirebaseConfig';
import {Provider} from 'react-redux'
import {compose, createStore} from 'redux'
import {reactReduxFirebase} from 'react-redux-firebase'

const  config = {
    userProfile: 'users'
}

const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, config)
)(createStore)

const store = createStoreWithFirebase(rootReducer)



ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
