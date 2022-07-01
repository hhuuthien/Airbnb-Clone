import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { ACCESS_TOKEN, USER_LOGIN } from "../util/setting";
import { Image, Tag } from "antd";

export default function AccountPage() {
  // Nếu chưa đăng nhập, redirect về trang login để người dùng đăng nhập
  // Nếu đã đăng nhập thì ở lại trang này render thông tin ra
  // Điều kiện đã đăng nhập phải có đủ: USER_LOGIN, ACCESS_TOKEN và user trong redux

  const { user } = useSelector((state) => state.accountReducer);

  if (!localStorage.getItem(USER_LOGIN) || !localStorage.getItem(ACCESS_TOKEN) || !user.email) {
    return <Redirect to="/login" />;
  }

  const color = user.type === "ADMIN" ? "blue" : "green";

  return (
    <div className="account-page">
      <div className="container">
        <div className="info">
          <div className="avatar">
            <Image width={"100%"} height={"100%"} alt={user.name} src={user.avatar || "/img/user-blank-color.png"} fallback={"/img/user-blank.png"} />
          </div>
          <div className="data">
            <div className="name">{user.name || "Người dùng chưa đặt tên"}</div>
            <div className="type">
              <Tag color={color}>{user.type}</Tag>
            </div>
            <div className="email">
              <i className="fa-solid fa-envelope"></i>
              {user.email || "Không có thông tin"}
            </div>
            <div className="phone">
              <i className="fa-solid fa-phone-flip"></i>
              {user.phone || "Không có thông tin"}
            </div>
            <div className="address">
              <i className="fa-solid fa-location-dot"></i>
              {user.address || "Không có thông tin"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
