import "./App.css";

// setup router
import { BrowserRouter, Switch } from "react-router-dom";

// pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AccountPage from "./pages/AccountPage";
import AdminHomePage from "./pages/AdminHomePage";
import AdminLocationPage from "./pages/AdminLocationPage";
import AdminLocationDetailPage from "./pages/AdminLocationDetailPage";
import AdminUserPage from "./pages/AdminUserPage";
import AdminUserDetailPage from "./pages/AdminUserDetailPage";
import HeaderTemplate from "./templates/HeaderTemplate";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <HeaderTemplate path="/login" component={LoginPage} />
        <HeaderTemplate path="/signup" component={SignupPage} />
        <HeaderTemplate path="/account" component={AccountPage} />
        <HeaderTemplate path="/admin" component={AdminHomePage} />
        <HeaderTemplate path="/manage_location" component={AdminLocationPage} />
        <HeaderTemplate path="/location/:lid" component={AdminLocationDetailPage} />
        <HeaderTemplate path="/manage_user" component={AdminUserPage} />
        <HeaderTemplate path="/user/:uid" component={AdminUserDetailPage} />
        <HeaderTemplate path="/" component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
