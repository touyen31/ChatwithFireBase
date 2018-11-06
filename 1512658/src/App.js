import React, { Component, Fragment } from 'react';
import './App.css';
import Login from "./Components/Login/login";
import Home from './Components/Home/Home'
import {BrowserRouter,Route, Switch}from 'react-router-dom'

import firebase from 'firebase'

const watchUserState = () =>{
    firebase.auth().onAuthStateChanged(user => {
        const db = firebase.database();

        var amOnline = db.refFromURL('https://chatfirebase-c235f.firebaseio.com/.info/connected');
        var userRef = db.refFromURL('https://chatfirebase-c235f.firebaseio.com/presence/' + user.uid);

        amOnline.on('value', snapshot => {
            if(snapshot.val()){
                userRef.onDisconnect().set({uid: user.uid, time: firebase.database.ServerValue.TIMESTAMP, online: false });
                userRef.set({uid: user.uid, time: firebase.database.ServerValue.TIMESTAMP, online: true })
            }
        })
    })
}



class App extends Component {
    componentDidMount(){
        watchUserState();
    }

  render() {
    return (
       <BrowserRouter>
         <Switch>
           <Route path='/login' exact={true} render={prop => <Login {...prop}/>}/>
             <Route path='/' exact={true} render={prop => <Home {...prop}/>}/>
         </Switch>
       </BrowserRouter>
    );
  }
}

export default App;
