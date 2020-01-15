import React from 'react';
import io from 'socket.io-client';
import { Helmet } from 'react-helmet';
import { emojify } from 'react-emojione';
import Linkify from 'react-linkify';

class Chat extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            message: '', 
            messages: [], 
            internalId: 0,
            messageLength: false,
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.socket = null;
    }

    componentDidMount(){
        this.socket = io('http://3.120.96.16:3000');
        this.socket.on('messages', data => {
            console.log(data);
            this.setState({messages: data});
        });
        this.socket.on('new_message', data =>{
            console.log(data);
            
            //add the message to this.state.messages
            this.setState({messages: [...this.state.messages, data]})
        });
    }

    componentWillUnmount(){
        this.socket.off(this.props.logOut);
        console.log('Disconnected')
    }
    
    onChange(e){
        if(/^.{0,200}$/.test(e.target.value)){
            this.setState({
                messageLength: true, 
                message: e.target.value});
        } else {
            this.setState({
                messageLength: false
            });
        }
    }

    onSubmit(e){
        e.preventDefault();
            if(this.state.message.length === 0){
                this.setState({messageLength: false});
                return;
            }
            //console.log("onsubmit: " + e.target.value)  
            //add to this.state.messages - a new message object with username ,id, content  
            let msg = {id: "internal-" + this.state.internalId, username: this.props.userName, content: e.target.value}
            this.setState({messages: [...this.state.messages, msg], internalId: this.state.internalId + 1, message: ''});
            //send message to server   
            this.socket.emit('message', {
                username: this.props.userName,
                content: this.state.message
            }, (response) => {
                console.log('EMITTED', response)
            }); 
        //}
    }  


    render(){
        //console.log("render triggered");
        console.log(this.state.messageLength);
        let p; 
        if(!this.state.messageLength){
            p = <p>You have entered invalid amount of characters</p>;
        }else {
            p = '';
        }
        return (
            <div className = 'chat'>
                <Helmet>
                    <title>Chat</title>
                </Helmet>
                <div className = 'displayMessages'>
                    <ul>
                        {this.state.messages.map(data => (
                            <div key={data.id}>
                                <li className="self">
                                    {data.username}: <Linkify>{emojify(data.content)}</Linkify>
                                </li>
                            </div>
                        ))}
                    </ul>
                </div>
                
                <form>
                    <textarea id = 'input' onChange = {this.onChange} value={this.state.message}></textarea><br />
                    {p}
                    <button onClick = {this.onSubmit} value={this.state.message} >Send</button>
                    <button onClick = {this.props.logOut} >Log out</button>
                </form>
            </div>
        );
    }
}

export default Chat;