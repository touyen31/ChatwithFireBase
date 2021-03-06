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

    calc = time => {
        let sub = moment() - moment(time);
        let minus = Math.round(sub / 60000);
        let hour = Math.round(minus / 60);
        if(minus < 1){
            return 'offline';
        }
        if(hour < 1)
            return `left ${minus} min ago`
        else
            return `left ${hour} hours ago`
    }

    calcTimeOut = time => setInterval(() => {
        this.calc(time);
    }, 60000)

    componentWillReceiveProps(props){
        if(props.info.online === false && props.info.time !== this.state.time){
            clearInterval(this.calcTimeOut);
            this.setState({message: this.calc(props.info.time), time: props.info.time}, () => this.calcTimeOut(props.info.time))
        }
    }
    componentDidMount(){
        if(this.props.info.online === false){
            this.setState({message: this.calc(this.props.info.time), time: this.props.info.time}, () => this.calcTimeOut(this.props.info.time))
        }
    }

    componentWillUnmount(){
        clearInterval(this.calcTimeOut);
    }

    render(){
        let {info, click, Sender, Receiver, index} = this.props;
        return(
            <Fragment>
                <li className="clearfix" onClick={() => click(Sender, Receiver)} key={index}>
                    <img src={info.photoUrl} alt="avatar"/>
                    <div className="about">
                        <div className="name">{info.displayName}</div>
                        <div className="status">
                            {
                                info.online &&<div><i className="fas fa-circle online"></i>  online</div>
                            }
                            {
                                !info.online &&<div><i className="fas fa-circle offline"></i>  {this.state.message} </div>
                            }
                        </div>
                    </div>

                </li>
                <div className="line"></div>
            </Fragment>
        );
    }
}


const mapDispatchToProps = dispatch => {
    return {
        click: (sender, receiver) => dispatch({type: 'ADD_SENDER_RECEIVER', sender, receiver})
    }
}
export  default connect(null, mapDispatchToProps)(User);