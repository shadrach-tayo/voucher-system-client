import React, { Component } from "react";
import { Router, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import "./App.css";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import Footer from "./components/footer/Footer";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";

export const history = createHistory();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: this.props.isAuth,
      user: this.props.user
    };
  }

  // componentDidMount() {
  //   this.getUser().then(user => {
  //     this.setState({ user });
  //   });
  // }

  // getUser = () => {
  //   return fetch("/api/current_user", {
  //     headers: {
  //       "Access-Control-Allow-Origin": "*"
  //     }
  //   })
  //     .then(res => {
  //       if (res.status === 204) return null;
  //       return res.json();
  //     })
  //     .catch(err => console.log("dashboard error: ", err));
  // };

  onLogin = () => {
    this.props.onLogin();
  };

  onLogout = () => {
    console.log("logging user out");
    this.setState({ isAuth: false, user: null });
    history.push("/");
  };

  render() {
    return (
      <div>
        <Router history={history}>
          <div>
            {/* <Route exact path="/" component={() => <Login />} /> */}
            <Switch>
              <PublicRoute
                exact
                path="/"
                isloggedIn={this.state.user ? true : false}
                component={() => <Login onLogin={this.onLogin} />}
              />
              <PrivateRoute
                exact
                path="/dashboard"
                isloggedIn={this.state.user ? true : false}
                component={() => (
                  <Dashboard user={this.state.user} onLogout={this.onLogout} />
                )}
              />
              {/* <Route
              path="/dashboard"
              render={() => <Dashboard user={this.state.user} />}
            /> */}
            </Switch>
          </div>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
