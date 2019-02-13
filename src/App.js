import React, { Fragment } from "react";
import { Router, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import Footer from "./components/footer/Footer";
import Vouchers from "./components/Vouchers";
import Cart from "./components/cart/Cart";
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
                width: "100vw",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <img src={loaderGif} alt="Loading indicator" />
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
                  <PrivateRoute
                    exact
                    path="/cart"
                    isloggedIn={isAuth}
                    component={Cart}
                  />
                  <PrivateRoute
                    exact
                    path="/vouchers"
                    isloggedIn={isAuth}
                    component={Vouchers}
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
