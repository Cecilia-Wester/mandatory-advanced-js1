import React from 'react';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {UserName: ''}
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    onSubmit(e){
        e.preventDefault()
    }
    
    onChange(event) {
        this.setState({name: event.target.value});
    }

    render(){
        return(
            <>
                <p>Enter username:</p>
                <form onSubmit = {this.onSubmit}>
                <input value={this.props.UserName} type='text' onChange= {this.onChange}/>
                </form>
            </>
        );
    }
}

export default Login;
