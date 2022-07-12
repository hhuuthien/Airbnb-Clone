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
import AdminTemplate from "./templates/AdminTemplate";
import HeaderFooterTemplate from "./templates/HeaderFooterTemplate";

// component
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <Switch>
          <HeaderFooterTemplate path="/login" component={LoginPage} />
          <HeaderFooterTemplate path="/signup" component={SignupPage} />
          <HeaderFooterTemplate path="/account" component={AccountPage} />
          <AdminTemplate path="/admin" component={AdminHomePage} />
          <AdminTemplate path="/manage_location" component={AdminLocationPage} />
          <AdminTemplate path="/location/:lid" component={AdminLocationDetailPage} />
          <AdminTemplate path="/manage_user" component={AdminUserPage} />
          <AdminTemplate path="/user/:uid" component={AdminUserDetailPage} />
          <HeaderFooterTemplate path="/l/:lid" component={LocationDetailPage} />
          <HeaderFooterTemplate path="/r/:rid" component={RoomDetailPage} />
          <AdminTemplate path="/manage_room" component={AdminRoomPage} />
          <AdminTemplate path="/room/:rid" component={AdminRoomDetailPage} />
          <HeaderFooterTemplate path="/" component={HomePage} />
        </Switch>
      </ScrollToTop>
    </BrowserRouter>
  );
}

export default App;
