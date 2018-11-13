import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux'
import  './Chat.css'
import {compose} from 'redux'
import {firebaseConnect} from 'react-redux-firebase';
import ItemChat from "./ItemChat";
import Uploader from "../Uploader";
class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: '',
            star: false,
            picture: false
        }
    }
    handleText = e => {
        this.setState({message: e.target.value})
    }

    handlePicture = e => this.setState({picture: e.target.value})

    handleSubmit= () => {

        let _message = {
            send: {uid: this.props.sender.uid, displayName: this.props.sender.displayName},
            receive: {uid: this.props.receive.uid, displayName: this.props.receive.displayName},
            message: this.state.message,
            time: this.props.firebase.database.ServerValue.TIMESTAMP
        }
        this.props.firebase.database().ref('/messages').push(_message);
        this.setState({
            message: ''
        })
    }

    setStar = () => {
        this.props.firebase.database().ref(`/star/${this.props.receive.uid}/${this.props.meUid}`).set(true);
    }
    setUnStar = () => {
        this.props.firebase.database().ref(`/star/${this.props.receive.uid}/${this.props.meUid}`).set(false);
    }

    closeUploader = () => this.setState({picture: false})

    componentWillReceiveProps(newProps){
        if(newProps.receive && newProps.meUid){
            this.props.firebase.database().ref(`/star/${newProps.receive.uid}/${newProps.meUid}`).on('value', snapshot => {
                this.setState({star: snapshot.val()})
            })
        }
    }

    sendUrl = (url) => {
        let _message = {
            send: this.props.sender,
            receive: this.props.receive,
            message: url,
            time: this.props.firebase.database.ServerValue.TIMESTAMP
        }
        this.props.firebase.database().ref('messages').push(_message);
    }
    render() {
        if(this.props.receive){
            console.log(this.props.receive)
            var list = makelist(this.props.messages, this.props.sender.uid, this.props.receive.uid)
        }
        return (
            <div className={'chat'}>
                {
                    this.props.receive && <Fragment>
                        <div className="chat-header clearfix">
                            <img src={`${this.props.receive.photoUrl}`}/>
                            <div className="chat-about">
                                <div className="chat-with">Chat with {this.props.receive.displayName}</div>
                            </div>
                            {
                                this.state.star &&
                                <div onClick={() => this.setUnStar()}><i className="fas fa-star" style={{
                                    color: 'yellow',
                                    cursor: 'pointer'
                                }}></i></div>
                            }
                            {
                                   !this.state.star && <div onClick={() => this.setStar()}><i className="far fa-star"></i></div>

                            }

                        </div>
                        <div className={'chat-history'}>
                            <ul>
                                {
                                    list && list.map(item => <ItemChat data={item} meuid={this.props.meUid}/>)
                                }
                            </ul>
                        </div>
                        <div className="chat-message">
                            {
                                this.state.picture ? <Uploader sendUrl={this.sendUrl} closeUploader={this.closeUploader}/> :  <textarea name="message-to-send" id="message-to-send" placeholder="Type your message"
                                                                                                                                        rows="3" onChange={this.handleText} value={this.state.message}></textarea>
                            }

                            <div onClick={() => this.setState({picture: !this.state.picture})}>
                                <i className="far fa-file-image"></i>

                            </div>

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