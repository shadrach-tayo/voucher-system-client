import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import loaderGif from "../src/images/loader.gif";

const Loader = () => (
  <div
    style={{
      width: "100vw",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}
  >
    <img src={loaderGif} alt="loading spinner Gif" />
  </div>
);

let hasRendered = false;

let authState = { isAuth: false, user: null };
export const onLogout = () => {
  authState = { isAuth: false, user: null };
  renderApp();
};

const onLogin = () => {
  ReactDOM.render(<Loader />, document.getElementById("root"));
  getUser().then(user => {
    authState = { isAuth: true, user };
    renderApp();
  });
};

const renderApp = () => {
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
    authState.isAuth = true;
    authState.user = user;
    ReactDOM.render(
      <App isAuth={true} user={user} onLogout={onLogout} />,
      document.getElementById("root")
    );
  })
  .catch(err => {
    authState.isAuth = false;
    authState.user = null;
    ReactDOM.render(
      <App isAuth={false} user={null} onLogin={onLogin} />,
      document.getElementById("root")
    );
  });

registerServiceWorker();
