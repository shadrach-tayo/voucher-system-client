import React, { Component } from "react";
import { Button, Input } from "react-materialize";
import { history } from "../../App";
import "./login.css";
import background from "../../images/background.jpg";

const buttonStyles = {
  background: "rgb(113, 19, 160)"
};

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: " ",
      email: " ",
      password: " ",
      confirmPassword: " ",
      LoginError: "",
      signUpError: "",
      signUpPasswordError: ""
    };

    // set document title to login
    document.title = "Voucher system | Login";

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

  handleLogin(e) {
    e.preventDefault();
    if (this.state.email !== " " && this.state.password !== " ") {
      let data = {
        email: this.state.email.toLocaleLowerCase().trim(),
        password: this.state.password
      };
      fetch("api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(res => {
          if (!res.success) {
            return this.setState({ LoginError: res.message });
          }
          // this.props.onLogin();
          window.location.reload();
        })
        .catch(err => {
          console.log(err);
          this.setState({
            LoginError: "Cannot login: check you internet connectivity"
          });
        });
    } else {
      this.setState({ LoginError: "email or password cannot be empty" });
    }
  }

  handleSignUp(e) {
    e.preventDefault();
    this.setState({
      signUpError: "",
      signUpPasswordError: ""
    });
    if (
      this.state.username !== " " &&
      this.state.password !== " " &&
      this.state.email !== " "
    ) {
      if (this.state.password !== this.state.confirmPassword) {
        this.setState({
          signUpPasswordError: "password and confirm password not equal"
        });
        return;
      }
      let data = {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword
      };
      fetch("api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(res => {
          if (res.success === false) {
            return this.setState({ signUpError: res.message });
          }
          // window.location.reload();
          console.log(history.location.pathname);
          history.push("/dashboard");
        })
        .catch(err => {
          console.error(err);
          this.setState({
            signUpError: "Cannot login: check you internet connectivity"
          });
        });
    } else {
      this.setState({ signUpError: "Fields cannot be empty" });
    }
  }

  render() {
    const { signUpError, LoginError, signUpPasswordError } = this.state;
    return (
      <div
        className="login-page"
        style={{
          background: `url(${background})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "100%"
        }}
      >
        <h3 className="pitch-text">Welcome to E-Voucher Pay</h3>
        <div className="form-container">
          <div className="login-card">
            <h3>Login</h3>
            <form onSubmit={this.handleLogin}>
              {LoginError && <p className="form-error">{LoginError}</p>}
              <Input
                type="email"
                name="email"
                placeholder="sample@gmail.com"
                onChange={this.handleEmailChange}
                required
              />
              <Input
                type="password"
                name="password"
                placeholder="Password"
                onChange={this.handlePasswordChange}
                required
              />
              <Button onClick={this.handleLogin} style={buttonStyles}>
                Login
              </Button>
            </form>
          </div>
          <div className="login-card">
            <form onSubmit={this.handleSignUp}>
              <h3>Sign up</h3>
              {signUpError && <p className="form-error">{signUpError}</p>}
              {signUpPasswordError && (
                <p className="form-error">{signUpPasswordError}</p>
              )}
              <Input
                type="text"
                name="username"
                placeholder="Username"
                onChange={this.handleUsernameChange}
                required
              />
              <Input
                type="email"
                name="email"
                placeholder="sample@gmail.com"
                onChange={this.handleEmailChange}
                required
              />
              <Input
                type="password"
                name="password"
                placeholder="Password"
                onChange={this.handlePasswordChange}
                required
              />
              <Input
                type="password"
                name="confirm"
                placeholder="confirm password"
                onChange={this.handleConfirmPasswordChange}
                required
              />
              <Button onClick={this.handleSignUp} style={buttonStyles}>
                Sign up
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
