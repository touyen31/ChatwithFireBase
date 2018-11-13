import React, {Component} from 'react';
import './ItemChat.css'
import isImageUrl from 'is-image-url'

class ItemChat extends Component {
    _convertTimetoDate(){
        return Intl.DateTimeFormat('vi', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(this.props.data.time);
    }
    render() {
        console.log(this.props.data)
        return (
                <li className={`${this.props.data.send.uid === this.props.meuid ? 'float-right' : 'float-left'}`}>
                    {this.props.data.send.uid === this.props.meuid ?  <div className="message-data">
                        <span className="message-data-time">{this._convertTimetoDate()}</span> &nbsp; &nbsp;
                        <span className="message-data-name">{this.props.data.send.displayName}</span>
                    </div>
                        :  <div className="message-data">
                            <span className="message-data-name">{this.props.data.send.displayName}</span>
                            <span className="message-data-time">{this._convertTimetoDate()}</span> &nbsp; &nbsp;
                        </div>
                    }

                    <div className="message other-message">
                        {isImageUrl(this.props.data.message) ? <img src={this.props.data.message} style={{width: 100, height: 100}}/> : this.props.data.message}
                    </div>
                </li>
        );
    }
}



export default ItemChat;