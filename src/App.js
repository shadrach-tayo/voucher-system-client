import React, { Fragment } from "react";
import { Router, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import Footer from "./components/footer/Footer";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import { UserConsumer } from "./UserContext";
import loaderGif from "./images/loader.gif";
import "./App.css";

export const history = createHistory();

function App() {
  return (
    <UserConsumer>
      {({ isAuth, loading }) => {
        if (loading)
          return (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              {loaderGif}
            </div>
          );
        return (
          <Fragment>
            <Router history={history}>
              <Fragment>
                <Switch>
                  <PublicRoute
                    exact
                    path="/"
                    isloggedIn={isAuth}
                    component={Login}
                  />
                  <PrivateRoute
                    exact
                    path="/dashboard"
                    isloggedIn={isAuth}
                    component={Dashboard}
                  />
                </Switch>
              </Fragment>
            </Router>
            <Footer />
          </Fragment>
        );
      }}
    </UserConsumer>
  );
}

export default App;
