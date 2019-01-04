import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { history } from "./App";

const { Provider, Consumer } = React.createContext();

class UserProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuth: false,
      loading: false,
      onLogin: this.onLogin,
      onLogout: this.onLogout
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.getUser()
      .then(user => {
        this.setState({ user, isAuth: true, loading: false });
      })
      .catch(err => {
        console.log("loggin error: ", err);
        this.setState({ loading: false, isAuth: false, user: null });
      });
  }

  onLogout = () => {
    this.setState({ user: null, isAuth: false });
    history.push("/");
  };

  onLogin = () => {
    this.setState({ loading: true });
    this.getUser()
      .then(user => {
        this.setState({ user, isAuth: true, loading: false });
      })
      .catch(err => {
        console.log("loggin error: ", err);
        this.setState({ isAuth: false, loading: false });
      });
  };

  getUser = () => {
    return fetch("api/current_user", {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    }).then(res => res.json());
  };

  render() {
    return <Provider value={this.state}>{this.props.children};</Provider>;
  }
}

// const Loader = () => <div>Loading...</div>;

ReactDOM.render(
  <UserProvider>
    <App />
  </UserProvider>,
  document.getElementById("root")
);

// registerServiceWorker()

export { Consumer as UserConsumer };
