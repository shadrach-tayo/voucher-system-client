import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

const Loader = () => <div>Loading...</div>;
let hasRendered = false;

let authState = { isAuth: false, user: null };
export const onLogout = () => {
  authState = { isAuth: false, user: null };
  renderApp();
};

const onLogin = () => {
  console.log("onLoggedIn called");
  getUser().then(user => {
    console.log("getting user on login: ", authState);
    authState = { isAuth: true, user };
    renderApp();
  });
};

const renderApp = () => {
  console.log("rendering app -- authState is: ", authState);
  ReactDOM.render(
    <App
      isAuth={authState.isAuth}
      user={authState.user}
      onLogin={onLogin}
      onLogout={onLogout}
    />,
    document.getElementById("root")
  );
};

if (!hasRendered) {
  ReactDOM.render(<Loader />, document.getElementById("root"));
  hasRendered = true;
}

const getUser = () => {
  return fetch("api/current_user", {
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  }).then(res => res.json());
};

getUser()
  .then(user => {
    console.log("user is logged in: ", user);
    authState.isAuth = true;
    authState.user = user;
    ReactDOM.render(
      <App isAuth={true} user={user} onLogout={onLogout} />,
      document.getElementById("root")
    );
  })
  .catch(err => {
    console.log("rendering login page");
    authState.isAuth = false;
    authState.user = null;
    ReactDOM.render(
      <App isAuth={false} user={null} onLogin={onLogin} />,
      document.getElementById("root")
    );
  });

registerServiceWorker();
