import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { history } from "./App";

export const UserContext = React.createContext();

const Loader = () => <div>Loading...</div>;
let hasRendered = false;

let authState = { isAuth: false, user: null };

const onLogout = () => {
  authState = { isAuth: false, user: null };
  history.push("/");
};

const onLogin = () => {
  getUser().then(user => {
    authState = { isAuth: true, user };
    renderApp();
  });
};

const renderApp = () => {
  ReactDOM.render(
    <UserContext.Provider
      value={{
        isAuth: authState.isAuth,
        user: authState.user,
        onLogin: onLogin,
        onLogout: onLogout
      }}
    >
      <App
        isAuth={authState.isAuth}
        user={authState.user}
        onLogin={onLogin}
        onLogout={onLogout}
      />
    </UserContext.Provider>,
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
    document.title = `Voucher System | ${this.props.user.username}`;

    ReactDOM.render(
      <UserContext.Provider
        value={{ isAuth: true, user: authState.user, onLogout, onLogin }}
      >
        <App isAuth={true} user={user} onLogin={onLogin} onLogout={onLogout} />
      </UserContext.Provider>,
      document.getElementById("root")
    );
  })
  .catch(err => {
    authState.isAuth = false;
    authState.user = null;
    console.log(authState);
    ReactDOM.render(
      <UserContext.Provider
        value={{ isAuth: false, user: authState.user, onLogin }}
      >
        <App isAuth={false} user={null} onLogin={onLogin} />
      </UserContext.Provider>,
      document.getElementById("root")
    );
  });

registerServiceWorker();
