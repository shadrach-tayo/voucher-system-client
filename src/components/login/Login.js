import React, { Component } from 'react';
import { Button } from 'react-materialize';

import Header from '../header/Header';
import './login.css';

class Login extends Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this);
    this.googleSignIn = this.googleSignIn.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  googleSignIn() {
    window.location = 'auth/google';
    // fetch('auth/google', {
    //   headers: {
    //     'Access-Control-Allow-Origin': '*'
    //   },
    //   mode: 'no-cors'
    // }).then(res => {
    //   console.log(res);
    //   window.location.reload();
    // })
  }

  render() {
    return (
      <div>
        <Header isLoggedIn={false} />
        <div className="login-card">
        {/* <p>Login Or Signup</p> */}
        {/* <form id="signUpForm">
          <Input type="text" id="username" placeholder="Username" s={6} validate required/>
          <Input type="email" id="email" placeholder="example@gmail.com" s={6} required/>
          <Input type="password" id="password" label="password" s={6} required/>
          <Button waves='light' onClick={this.handleSubmit}>Sign up</Button>
        </form> */}
        <Button className="red login-btn" onClick={this.googleSignIn}>Sign in with Google</Button>
        <Button className="blue login-btn" onClick={this.googleSignIn}>Sign in with Twitter</Button>
      </div>
      </div>       
    );
  }
}

export default Login;