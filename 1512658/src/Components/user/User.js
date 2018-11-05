import React, { Component, Fragment } from 'react';
import './StyleUser.css'
import moment from 'moment'
import {connect} from 'react-redux'


class User extends Component{
    constructor(props) {
        super(props);
        this.state = {
            message: 'offline',
            time: null
        }

    }

    

    render(){
        let {info, click, Sender, Receiver} = this.props;
        return(
                <li className="clearfix" onClick={() => click(Sender, Receiver)}>
                    <img src={info.avatarUrl} alt="avatar"/>
                    <div className="about">
                        <div className="name">{info.displayName}</div>
                        <div className="status">
                            {
                                info.online &&<Fragment><i className="fa fa-circle online">online</i> </Fragment>
                            }
                            {
                                !info.online &&<Fragment><i className="fa fa-circle offline">{this.state.message}</i> </Fragment>
                            }
                        </div>
                    </div>
                </li>

        );
    }
}


const mapDispatchToProps = dispatch => {
    return {
        click: (sender, receiver) => dispatch({type: 'ADD_SENDER_RECEIVER', sender, receiver})
    }
}
export  default connect(null, mapDispatchToProps)(User);