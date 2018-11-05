import React, { Component } from 'react';
import GoogleButton from 'react-google-button'
import {compose} from 'redux'
import {withFirebase} from 'react-redux-firebase'

class Login extends Component{
    render(){
        return(
            <GoogleButton onClick={() => {this._login()}}>
            </GoogleButton>
        );
    }
    _login(){
        this.props.firebase.login({
            provider: 'google',
            type: 'popup'
        }).then(res => this.props.history.push('/'))
            .catch(err => console.log((err)))
    }
}

export default compose(
    withFirebase,
)(Login);



