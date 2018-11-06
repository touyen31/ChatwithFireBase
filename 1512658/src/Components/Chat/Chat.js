import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux'
import  './Chat.css'
import {compose} from 'redux'
import {firebaseConnect} from 'react-redux-firebase';
import ItemChat from "./ItemChat";
import User from "../user/User";
class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: ''
        }
    }
    handleText = e => {
        this.setState({message: e.target.value})
    }


    handleSubmit= () => {
        let _message = {
            send: this.props.sender,
            receive: this.props.receive,
            message: this.state.message,
            time: this.props.firebase.database.ServerValue.TIMESTAMP
        }
        this.props.firebase.database().ref('messages').push(_message);
        this.setState({
            message: ''
        })
    }

    render() {

            if(this.props.receive){
                var list = makelist(this.props.messages, this.props.sender.uid, this.props.receive.uid)
                console.log(makelist(this.props.messages, this.props.sender.uid, this.props.receive.uid))
            }
            return (
                <div className={'chat'}>
                    {
                        this.props.receive && <Fragment>
                            <div className="chat-header clearfix">
                                <img src={`${this.props.receive.avatarUrl}`}/>
                                <div className="chat-about">
                                    <div className="chat-with">Chat with {this.props.receive.displayName}</div>
                                </div>
                                <i className="fa fa-star"></i>
                            </div>
                            <div className={'chat-history'}>
                                <ul>
                                    {
                                        list && list.map(item => <ItemChat data={item} meuid={this.props.meUid}/>)
                                    }
                                </ul>
                            </div>
                            <div className="chat-message clearfix">
                                <textarea name="message-to-send" id="message-to-send" placeholder="Type your message"
                                          rows="3" onChange={this.handleText} value={this.state.message}></textarea>

                                <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
                                <i className="fa fa-file-image-o"></i>

                                <button onClick={this.handleSubmit}>Send</button>

                            </div>

                        </Fragment>
                    }
                </div>
            );
        }
}

const makelist = (messages, sendUid, recvUid) => {
    let list = [];
    if(!messages) return [];
    list = Object.keys(messages).map(item => messages[item]);

    list = list.filter(item => (item.send.uid === sendUid && item.receive.uid === recvUid) || (item.send.uid === recvUid && item.receive.uid === sendUid))
    return list;
}

const mapStateToProps = state => {
    return {
        sender: state.chatReducer.send,
        receive: state.chatReducer.receive,
        messages: state.firebase.data.messages,
        meUid: state.firebase.auth.uid
    }
}

export default compose(
    firebaseConnect(props => [{path: 'messages'}]),
    connect(mapStateToProps)
)(Chat);