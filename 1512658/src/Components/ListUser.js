import React, { Component } from 'react';
import User from './user/User'
import {compose } from 'redux'
import {firebaseConnect} from 'react-redux-firebase'
import {connect} from 'react-redux'

class ListUser extends Component{
    render(){
        let list = makeList(this.props.UserInfo, this.props.UserOnlines)
        return(
           <ul className='list'>
               {
                  list &&  list.map(item => <User info={item} Sender={this.props.Sender} Receiver={item}/>)
               }
           </ul>
        );
    }
}

const makeList = (UserInfo, UserOnlines) => {
    if(!UserInfo || !UserOnlines)
        return null;
    let list = [];
    list = Object.keys(UserOnlines).map(item => UserOnlines[item])
    list = list.map(item => ({...item, displayName: UserInfo[item.uid].displayName, email: UserInfo[item.uid].email, avatarUrl: UserInfo[item.uid].avatarUrl }))
    console.log(list);
    return list;
}

const mapStateToProps = state => {
    return {
        UserInfo: state.firebase.data.users,
        UserOnlines: state.firebase.data.presence,
        Sender: {displayName: state.firebase.auth.displayName, email: state.firebase.auth.email, avatarUrl: state.firebase.auth.photoURL, uid: state.firebase.auth.uid }
    }
}

export default compose(
    firebaseConnect(props => [{path: 'presence', queryParams: ['orderByChild=time']}, {path: 'users'}]),
    connect(mapStateToProps)
)(ListUser);