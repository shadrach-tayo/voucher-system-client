import React, { Component, Fragment } from "react";
import { Router, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import Footer from "./components/footer/Footer";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import { UserContext } from "./index";
import "./App.css";

export const history = createHistory();

function App() {
  return (
    <UserContext.Consumer>
      {({ user, isAuth, onLogin, onLogout }) => {
        console.log(user, isAuth, onLogin, onLogout);
        return (
          <Fragment>
            <Router history={history}>
              <Fragment>
                <Switch>
                  <PublicRoute
                    exact
                    path="/"
                    isloggedIn={isAuth}
                    component={<Login />}
                  />
                  <PrivateRoute
                    exact
                    path="/dashboard"
                    isloggedIn={isAuth}
                    component={<Dashboard />}
                  />
                </Switch>
              </Fragment>
            </Router>
            <Footer />
          </Fragment>
        );
      }}
    </UserContext.Consumer>
  );
}

export default App;
