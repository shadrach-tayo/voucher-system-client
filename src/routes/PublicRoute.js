import React from "react";
import { Route, Redirect } from "react-router-dom";

const PublicRoute = ({ isloggedIn, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={props =>
        isloggedIn ? <Redirect to="/dashboard" /> : <Component {...props} />
      }
    />
  );
};

export default PublicRoute;
