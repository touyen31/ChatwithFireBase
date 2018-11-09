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
            star: null,
            picture: false
        }
    }
    handleText = e => {
        this.setState({message: e.target.value})
    }

    handlePicture = e => this.setState({picture: e.target.value})

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

    setStar = () => this.props.firebase.database().ref(`/presence/${this.props.receive.uid}/star/${this.props.meUid}`).set(true);
    setUnStar = () => this.props.firebase.database().ref(`/presence/${this.props.receive.uid}/star/${this.props.meUid}`).set(false);

    closeUploader = () => this.setState({picture: false})

    componentWillReceiveProps(newProps){
        if(newProps.receive && newProps.meUid){
            this.props.firebase.database().ref(`/presence/${newProps.receive.uid}/star/${newProps.meUid}`).on('value', snapshot => {
                console.log('snapshot: ', snapshot.val())
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
            var list = makelist(this.props.messages, this.props.sender.uid, this.props.receive.uid)
        }
        console.log('star', this.state.star)
        return (
            <div className={'chat'}>
                {
                    this.props.receive && <Fragment>
                        <div className="chat-header clearfix">
                            <img src={`${this.props.receive.avatarUrl}`}/>
                            <div className="chat-about">
                                <div className="chat-with">Chat with {this.props.receive.displayName}</div>
                            </div>
                            {
                                this.state.star ?
                                    <div>
                                        <i className="fas fa-star" style={{color: 'yellow'}} onClick={this.setUnStar}></i>
                                    </div>
                                    :<div><i className="fas fa-star" onClick={this.setStar}></i></div>

                            }

                        </div>
                        <div className={'chat-history'}>
                            <ul>
                                {
                                    list && list.map(item => <ItemChat data={item} meuid={this.props.meUid}/>)
                                }
                            </ul>
                        </div>
                        <div className="chat-message clearfix">
                            {
                                this.state.picture ? <Uploader sendUrl={this.sendUrl} closeUploader={this.closeUploader}/> :  <textarea name="message-to-send" id="message-to-send" placeholder="Type your message"
                                                                                                                                        rows="3" onChange={this.handleText} value={this.state.message}></textarea>
                            }

                            <div onClick={() => this.setState({picture: true})}>
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