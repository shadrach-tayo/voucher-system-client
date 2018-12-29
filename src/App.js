import React, { Component } from "react";
import { Router, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import Footer from "./components/footer/Footer";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import "./App.css";

export const history = createHistory();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: this.props.isAuth,
      user: this.props.user
    };
  }

  onLogin = () => {
    this.props.onLogin();
  };

  onLogout = () => {
    this.setState({ isAuth: false, user: null });
    history.push("/");
  };

  render() {
    return (
      <div>
        <Router history={history}>
          <div>
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
            </Switch>
          </div>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
