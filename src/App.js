import React from 'react';
import './App.css';
import Login from './login'
import Chat from './chat'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
      userName: ''
    }
    this.onSubmitUserName = this.onSubmitUserName.bind(this);
    this.logOut = this.logOut.bind(this);
  }
  
  onSubmitUserName(userName){
    this.setState({
      loggedIn: true,
      userName: userName
    });
  }

  logOut(){
    this.setState({loggedIn: false})
  }

  render(){
    return (
      <div className = "page">
        {
          this.state.loggedIn?<Chat logOut={this.logOut}/>:<Login onSubmitUserName={this.onSubmitUserName}/>
        }
      </div>
    );
  }
}

export default App;
