import React from 'react';
import './App.css';
import Login from './login'
import Chat from './chat'

class App extends React.Component {
  render(){
    return (
      <div>
        <Login></Login>
        <Chat></Chat>
      </div>
    );
  }
}

export default App;
