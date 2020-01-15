import React from 'react';
import { Helmet } from 'react-helmet';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userName: '', 
            error: null
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(e){
        e.preventDefault();
        let regEx = /^[A-Za-z\d\s-_]{1,12}$/;
        if(regEx.test(this.state.userName)){
            this.setState({error: null});
            this.props.onSubmitUserName(this.state.userName);
        } else {
            this.setState({error: "Invalid username, username can only contain a-z, A-Z, space, -, _ and 1-20 characters"});
            return;
        }
    }
    
    onChange(e) {
        this.setState({userName: e.target.value});
    }

    render(){
        let error;
        if (this.state.error) {
            error = <p className = 'errorMessage'>{this.state.error}</p>;
        }
        return(
            <div className = 'logIn'>
            <Helmet>
                <title>Log in</title>
            </Helmet>
                <div className = 'loginBox'>
                    <p>Enter username:</p>
                    <form onSubmit={this.onSubmit}>
                        <input value={this.props.userName} type='text' onChange= {this.onChange}/><br />
                        <button >Log in</button>
                    </form>
                    {error}
                </div>
            </div>
        );
    }
}

export default Login;
