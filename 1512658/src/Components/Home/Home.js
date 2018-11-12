import React, { Component } from 'react';
import ListUser from '../ListUser'
import './Home.css'
import Chat from '../Chat/Chat'
class Home extends Component {
    render() {
        return (
           <div className='container'>
               <div className='people-list'>

                   <ListUser/>
               </div>
               <Chat/>
           </div>
        );
    }
}
export default Home