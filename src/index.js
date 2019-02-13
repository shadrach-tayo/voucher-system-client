import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { UserProvider } from "./UserContext";
import { VoucherProvider } from "./VoucherContext";

ReactDOM.render(
  <UserProvider>
    <VoucherProvider>
      <App />
    </VoucherProvider>
  </UserProvider>,
  document.getElementById("root")
);

registerServiceWorker();
