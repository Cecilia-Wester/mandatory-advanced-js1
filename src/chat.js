import React from 'react';
import io from 'socket.io-client';

class Chat extends React.Component {
    constructor(props){
        super(props);
        this.state = {message: ''}
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.socket = null;
    }

    componentDidMount(){
        this.socket = io('http://3.120.96.16:3000');
        this.socket.on('messages', data => {
            console.log(data);
        });
        this.socket.on('new_message', data =>{
            console.log(data);
        });
    }

    componentWillUnmount(){
       
    }
    
    onChange(e){
        this.setState({message: e.target.value});
    }

    onSubmit(e){
        e.preventDefault()

    }    

    render(){
        return (
            <div>
                <form>
                    <textarea onChange = {this.onChange} value={this.state.message}></textarea>
                    <button onClick = {this.props.logOut} >Log out</button>
                </form>
            </div>
        );
    }
}

export default Chat;