import React from 'react';
import io from 'socket.io-client';

class Chat extends React.Component {
    constructor(props){
        super(props);
        this.state = {message: '', messages: []};
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.socket = null;
    }

    componentDidMount(){
        this.socket = io('http://3.120.96.16:3000');
        this.socket.on('messages', data => {
            console.log(data);
            this.setState({messages: data})
        });
        this.socket.on('new_message', data =>{
            console.log(data);
            //add the message to this.state.messages
            this.setState({messages: [...this.state.messages, data]})
        });
    }

    componentWillUnmount(){

    }
    
    onChange(e){
        this.setState({message: e.target.value});
        console.log("onchange: " + e.target.value)        
    }

    onSubmit(e){
        e.preventDefault();
        console.log("onsubmit: " + e.target.value)  
        //add to this.state.messages - a new message object with username ,id, content  
        let msg = {id: "123", username: "ksdjfhsd", content: e.target.value}
        this.setState({messages: [...this.state.messages, msg]})
        //send message to server    
    }  


    render(){
        console.log("render triggered");
        //console.log(this.state.messages);
        return (
            <div>
                <div className = 'displayMessages'>
                    <ul>
                        {this.state.messages.map(data => (
                            <div key={data.id}>
                                <li className="self">
                                    <div className="msg">
                                        <p>{data.username}: '{data.content}'</p>
                                    </div>
                                </li>
                            </div>
                        ))}
                    </ul>
                </div>
                <form>
                    <textarea onChange = {this.onChange} value={this.state.message}></textarea><br />
                    <button onClick = {this.onSubmit} value={this.state.message} >Send</button>
                    <button onClick = {this.props.logOut} >Log out</button>
                </form>
            </div>
        );
    }
}

export default Chat;