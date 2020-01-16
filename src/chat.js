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
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.socket = null;
        this.scrollBar = React.createRef();
        this.handleScrollBar = this.handleScrollBar.bind(this);
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
        this.socket.off();
        console.log('Disconnected');
    }

    componentDidUpdate() {
        this.handleScrollBar();
    }
    
    onChange(e){
        console.log(e.target.value, e.target.value.length);
        if(e.target.value.length <= 200){
            this.setState({
                message: e.target.value});
        }
    }

    onSubmit(e){
        e.preventDefault();
        if(this.state.message.length === 0){
            return;
        }
        let msg = {id: "internal-" + this.state.internalId, username: this.props.userName, content: e.target.value};
        this.setState({messages: [...this.state.messages, msg], internalId: this.state.internalId + 1, message: ''});
        this.socket.emit('message', {
            username: this.props.userName,
            content: this.state.message
        }, (response) => {
            console.log('EMITTED', response);
        }); 
    }

    handleScrollBar() {
        this.scrollBar.current.scrollTo(0, this.scrollBar.current.scrollHeight);
    }


    render(){
        let p; 
        if(this.state.message.length >= 200){
            p = <p>Your message can only be between 1-200 characters</p>;
        } else {
            p = '';
        }
        return (
            <div className = 'chat' >
                <Helmet>
                    <title>Chat</title>
                </Helmet>
                <div className = 'displayMessages' ref={this.scrollBar}>
                    <ul>
                        {this.state.messages.map(data => (
                            <li key={data.id}>
                                {data.username}: <Linkify>{emojify(data.content)}</Linkify>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className = 'enterMessageBox'>
                    <form>
                        <textarea id = 'input' onChange = {this.onChange} value={this.state.message}></textarea><br />
                        {p}
                        <button onClick = {this.onSubmit} value={this.state.message} >Send</button>
                        <button onClick = {this.props.logOut} >Log out</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Chat;