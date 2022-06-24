import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { ACCESS_TOKEN, USER_LOGIN } from "../util/setting";

export default function AccountPage() {
  // Nếu chưa đăng nhập, redirect về trang login để người dùng đăng nhập
  // Nếu đã đăng nhập thì ở lại trang này render thông tin ra
  // Điều kiện đã đăng nhập phải có đủ: USER_LOGIN, ACCESS_TOKEN và user trong redux

  const { user } = useSelector((state) => state.userReducer);

  if (!localStorage.getItem(USER_LOGIN) || !localStorage.getItem(ACCESS_TOKEN) || !user.email) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="account-page">
      <div className="container">
        <div className="info">
          <div className="avatar">
            <img src={user.avatar} alt={user.name} />
          </div>
          <div className="data">
            <div className="name">{user.name}</div>
            <div className="email">
              <i className="fa-solid fa-envelope"></i>
              {user.email}
            </div>
            <div className="phone">
              <i className="fa-solid fa-phone-flip"></i>
              {user.phone}
            </div>
            <div className="address">
              <i className="fa-solid fa-location-dot"></i>
              {user.address}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
