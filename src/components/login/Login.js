import React, { Component } from "react";
import firebase from "firebase";
import { Button, Input } from "react-materialize";
import Header from "../header/Header";
import "./login.css";

var config = {
  apiKey: "AIzaSyBiS4uhTLJ9nyvYraWlfp-2ONr23DBpuqA",
  authDomain: "voucher-system-221216.firebaseio.com",
  databaseURL: "https://voucher-system-221216.firebaseio.com",
  projectId: "voucher-system-221216",
  storageBucket: "voucher-system-221216.appspot.com",
  messagingSenderId: "523304708732"
};
firebase.initializeApp(config);

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: " ",
      email: " ",
      password: " ",
      confirmPassword: " ",
      LoginError: '',
      signUpError: ''
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(
      this
    );
  }

  handleUsernameChange(e) {
    let { value } = e.target;
    this.setState({ username: value });
  }

  handleEmailChange(e) {
    let { value } = e.target;
    this.setState({ email: value });
  }

  handlePasswordChange(e) {
    let { value } = e.target;
    this.setState({ password: value });
  }

  handleConfirmPasswordChange(e) {
    let { value } = e.target;
    this.setState({ confirmPassword: value });
  }

  googleSignIn() {
    // const provider = new firebase.auth.GoogleAuthProvider();
    // const promise = firebase.auth().signInWithPopup(provider);
    // promise
    //   .then(result => {
    //     console.log("auth result is: ", result);
    //     // TODO: SEND USER PROFILE TO SERVER AND SAVE
    //     // SAVE USER TO
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    window.location = "auth/google";
  }

  handleLogin() {
    if (this.state.email !== " " && this.state.password !== " ") {
      let data = {
        email: this.state.email,
        password: this.state.password
      };
      console.log(data);
      fetch("api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        if(!res.success) {
          this.setState({LoginError: res.message})
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({LoginError: err}) 
      })
    }
  }
  
  handleSignUp() {
    if (
      this.state.username !== " " &&
      this.state.password !== " " &&
      this.state.email !== " "
    ) {
      if (this.state.password !== this.state.confirmPassword) {
        this.setState({
          signUpError: "password and confirm password not equal"
        });
        return;
      }
      let data = {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword
      };
      console.log(data);
      fetch("api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(res => {
          console.log(res)
          if(!res.success) {
            this.setState({signUpError: res.message})
          }
          window.location.reload();
        })
        .catch(err => {
          console.error(err)
          this.setState({signUpError: err})
        })
    }
  }

  render() {
    const {signUpError, LoginError} = this.state;
    return (
      <div>
        <Header isLoggedIn={false} />
        <div className="login-card">
          {/* <Button className="red login-btn" onClick={this.googleSignIn}>
            Sign in with Google
          </Button> */}
          <h3>Login</h3>
          {LoginError && <p>{LoginError}</p>}
          <Input
            type="email"
            name="email"
            placeholder="sample@gmail.com"
            onChange={this.handleEmailChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            onChange={this.handlePasswordChange}
          />
          <Button onClick={this.handleLogin}>Login</Button>
          <h3>Sign up</h3>
          {
            signUpError && <p className="error">signUpError</p>
          }
          <Input
            type="text"
            name="username"
            placeholder="Username"
            onChange={this.handleUsernameChange}
          />
          <Input
            type="email"
            name="email"
            placeholder="sample@gmail.com"
            onChange={this.handleEmailChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            onChange={this.handlePasswordChange}
          />
          <Input
            type="password"
            name="confirm"
            placeholder="confirm"
            onChange={this.handleConfirmPasswordChange}
          />
          <Button onClick={this.handleSignUp}>Sign up</Button>
        </div>
      </div>
    );
  }
}

export default Login;
/* <Button className="red login-btn" onClick={this.googleSignIn}>Sign in with Google</Button>
<Button className="blue login-btn" onClick={this.googleSignIn}>Sign in with Twitter</Button> */
