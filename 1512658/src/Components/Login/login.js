import React, { Component } from 'react';
import GoogleButton from 'react-google-button'
import {auth, googleProvider} from "../Firebase/FirebaseConfig";

class Login extends Component{
    render(){
        return(
            <GoogleButton onClick={() => {auth.signInWithPopup(googleProvider) }}>
            </GoogleButton>
        );
    }
}
export default Login



