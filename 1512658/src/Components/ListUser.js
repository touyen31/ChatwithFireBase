import React, { Component } from 'react';
import User from './user/User'
import {compose } from 'redux'
import {firebaseConnect} from 'react-redux-firebase'
import {connect} from 'react-redux'

class ListUser extends Component{
    constructor(props){
        super(props)
        this.state={
            inputValue:''
        }
    }
    handleInputValue =(e)=>{
        this.setState({inputValue:e.target.value.toLowerCase()})
    }

    render(){

        let list = makeList(this.props.UserInfo, this.props.UserOnlines)
        list = list.sort((a,b) => compare(a,b,this.props.meUid))
        console.log('list', list)
        return(
            <div>
                <div className="search">
                    <input type="text" placeholder="search" onChange={this.handleInputValue} value={this.state.inputValue}/>
                    <i className="fa fa-search"></i>
                </div>
                <ul className='list'>
                    {
                        list && handleSearch(list, this.state.inputValue).map((item, index) => <User info={item} Sender={this.props.Sender} Receiver={item} key={index}/>)
                    }
                </ul>
            </div>

        );
    }
}
const handleSearch = (list, inputText)=>{
    list = list.filter(item => item.displayName.toLowerCase().includes(inputText))
    return list
}

const compare = (prev,next, me) => {
    if(prev.star && next.star){
        if(prev.star[me] && next.star[me]) return 0;
        if(prev.star[me] && !next.star[me]) return -1;
        if(!prev.star[me] && next.star[me]) return 1;
    }
    if(prev.star && !next.star){
        if(prev.star[me]) return -1;
    }
    if(!prev.star && next.star){
        if(next.star[me]) return 1;
    }
    if(prev.online && next.online){
        if(prev.displayName < next.displayName) return -1;
        if(prev.displayName = next.displayName) return 0;
        if(prev.displayName < next.displayName) return 1;
    }
    if(prev.online && !next.online) return -1;
    if(!prev.online && next.online) return 1;
    if(!prev.online && !next.online){
        if(prev.time > next.time) return -1;
        if(prev.time < next.time) return 1;
    }

    return 0;
}



const makeList = (UserInfo, UserOnlines) => {
    if(!UserInfo || !UserOnlines)
        return [];
    let list = [];
    list = Object.keys(UserOnlines).map(item => UserOnlines[item])
    list = list.map(item => ({...item, displayName: UserInfo[item.uid].displayName, email: UserInfo[item.uid].email, avatarUrl: UserInfo[item.uid].avatarUrl }))

    return list;
}

const mapStateToProps = state => {
    return {
        UserInfo: state.firebase.data.users,
        UserOnlines: state.firebase.data.presence,
        Sender: {displayName: state.firebase.auth.displayName, email: state.firebase.auth.email, avatarUrl: state.firebase.auth.photoURL, uid: state.firebase.auth.uid },
        meUid: state.firebase.auth.uid
    }
}

export default compose(
    firebaseConnect(props => [{path: 'presence', queryParams: ['orderByChild=time']}, {path: 'users'}]),
    connect(mapStateToProps)
)(ListUser);