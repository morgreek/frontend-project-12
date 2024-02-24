import "bootstrap/dist/css/bootstrap.min.css";
import filter from "leo-profanity";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import App from "./App";
import "./i18next";
import store from "./slices/index.js";

filter.clearList();
filter.add(filter.getDictionary("en"));
filter.add(filter.getDictionary("fr"));
filter.add(filter.getDictionary("ru"));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>
  </React.StrictMode>,
);
