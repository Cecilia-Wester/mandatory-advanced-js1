import React from 'react';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {userName: ''};
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(e){
        e.preventDefault();
        let regEx = /^[A-ZÅÄÖa-zåäö\d\s-_]{1,12}$/;
        if(regEx.test(this.state.userName)){
            this.props.onSubmitUserName(this.state.userName);
        } 
    }
    
    onChange(e) {
        this.setState({userName: e.target.value});

    }

    render(){
        return(
            <>
                <p>Enter username:</p>
                <form onSubmit={this.onSubmit}>
                    <input value={this.props.userName} type='text' onChange= {this.onChange}/><br />
                    <button >Log in</button>
                </form>
            </>
        );
    }
}

export default Login;
