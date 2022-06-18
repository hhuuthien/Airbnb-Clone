import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// setup antd
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
