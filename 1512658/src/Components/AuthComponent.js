import {connect}from 'react-redux';
import {isEmpty} from 'react-redux-firebase'
import {Route, Redirect} from 'react-router-dom'
import React from 'react'

const AuthComponent = ({ component: Component, auth, ...rest }) =>
<Route {...rest} render={props => !isEmpty(auth) ? <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}/>

const mapAuthToProps = ({ firebase: { auth } }) => ({ auth });

export default connect(mapAuthToProps)(AuthComponent);