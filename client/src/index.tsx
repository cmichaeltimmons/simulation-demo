import React from "react";
import ReactDOM from "react-dom";
import { Demo } from "./Demo";
import { Provider } from "react-redux";
import store from "./store/store";
import { CssBaseline } from "@material-ui/core";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CssBaseline />
      <Demo />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
