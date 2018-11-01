import React, { Component } from 'react';
import './App.css';
import Login from "./Components/Login/login";


class App extends Component {
  render() {
    return (
      <div style={ {justifyContent:'center', alignItems:'center', display: 'flex', height: '100vh'}}>
        <Login />
      </div>
    );
  }
}

export default App;
