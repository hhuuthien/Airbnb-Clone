import "./App.css";

// setup router
import { BrowserRouter, Switch } from "react-router-dom";

// pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import HeaderTemplate from "./templates/HeaderTemplate";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <HeaderTemplate path="/login" component={LoginPage} />
        <HeaderTemplate path="/" component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
