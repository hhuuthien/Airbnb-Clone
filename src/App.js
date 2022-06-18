import "./App.css";

// setup router
import { BrowserRouter, Route, Switch } from "react-router-dom";

// pages
import HomePage from "./pages/HomePage";
import HomeTemplate from "./templates/HomeTemplate";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <HomeTemplate path="/" component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
