import "./App.css";

// setup router
import { BrowserRouter, Route, Switch } from "react-router-dom";

// pages
import HomePage from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      {/* <Component cố định /> */}
      <Switch>
        <Route exact path={"/home"} component={HomePage} />
        <Route exact path={"/"} component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
