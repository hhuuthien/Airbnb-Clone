import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// setup antd
import "antd/dist/antd.css";

// setup redux
import { Provider } from "react-redux";
import { store } from "./redux/configStore";

// setup scss
import "./assets/scss/_styles.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
