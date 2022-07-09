import "./App.css";

// setup router
import { BrowserRouter, Switch } from "react-router-dom";

// pages
import AccountPage from "./pages/AccountPage";
import AdminHomePage from "./pages/AdminHomePage";
import AdminLocationDetailPage from "./pages/AdminLocationDetailPage";
import AdminLocationPage from "./pages/AdminLocationPage";
import AdminRoomDetailPage from "./pages/AdminRoomDetailPage";
import AdminRoomPage from "./pages/AdminRoomPage";
import AdminUserDetailPage from "./pages/AdminUserDetailPage";
import AdminUserPage from "./pages/AdminUserPage";
import HomePage from "./pages/HomePage";
import LocationDetailPage from "./pages/LocationDetailPage";
import LoginPage from "./pages/LoginPage";
import RoomDetailPage from "./pages/RoomDetailPage";
import SignupPage from "./pages/SignupPage";

// templates
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
        <HeaderTemplate path="/l/:lid" component={LocationDetailPage} />
        <HeaderTemplate path="/r/:rid" component={RoomDetailPage} />
        <HeaderTemplate path="/manage_room" component={AdminRoomPage} />
        <HeaderTemplate path="/room/:rid" component={AdminRoomDetailPage} />
        <HeaderTemplate path="/" component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
