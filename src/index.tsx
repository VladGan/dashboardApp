import React from "react";
import App from "./App";
import { render } from 'react-dom';
import { Provider } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import {store} from "./store";

const container = document.getElementById('root');
render(
  <React.StrictMode>
    <CssBaseline/>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>, container
);