import React from 'react';
import io from 'socket.io-client';

const socket = io('http://3.120.96.16:3000');
class Chat extends React.Component {
    constructor(props){
        super(props);

    }
    render(){
        return (
            <div>
                
            </div>
        );
    }
}

export default Chat;