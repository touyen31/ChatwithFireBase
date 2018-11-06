import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';


const UnAuthComponent = ({ component: Component, auth, ...rest }) =>
    <Route {...rest} render={props => isEmpty(auth) ? <Component {...props} /> : <Redirect to='/'/>}/>


const mapAuthToProps = ({ firebase: { auth } }) => ({ auth });

export default connect(mapAuthToProps)(UnAuthComponent);