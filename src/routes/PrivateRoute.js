import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ isloggedIn, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={props =>
        isloggedIn ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRoute;
