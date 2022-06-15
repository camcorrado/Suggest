import App from "./components/App/App";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import "./fonts/ProzaLibre-Regular.ttf";
import "./fonts/OpenSans-Light.ttf";
import "./fonts/OpenSans-Regular.ttf";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
