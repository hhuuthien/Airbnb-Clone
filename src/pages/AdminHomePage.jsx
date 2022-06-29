import { QuestionCircleOutlined } from "@ant-design/icons";
import { Alert, Button, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { SIGN_OUT } from "../redux/const/constant";
import { ACCESS_TOKEN, USER_LOGIN } from "../util/setting";

export default function AdminHomePage(props) {
  const { user } = useSelector((state) => state.accountReducer);
  const dispatch = useDispatch();

  const signOut = () => {
    // xoá localStorage
    localStorage.removeItem(USER_LOGIN);
    localStorage.removeItem(ACCESS_TOKEN);
    // xoá user trong redux
    dispatch({
      type: SIGN_OUT,
    });
    props.history.push("/login");
  };

  const confirmToSignOut = () => {
    Modal.confirm({
      title: "Đăng xuất",
      icon: <QuestionCircleOutlined />,
      content: `Bạn có muốn đăng xuất khỏi tài khoản ${user.email} không?`,
      okText: "Đăng xuất",
      cancelText: "Cancel",
      onOk() {
        signOut();
      },
    });
  };

  const renderContent = () => {
    if (!localStorage.getItem(USER_LOGIN) || !localStorage.getItem(ACCESS_TOKEN) || !user.email) {
      // Nếu chưa đăng nhập
      return (
        <Alert
          style={{ marginTop: 30 }}
          message="Bạn chưa đăng nhập"
          description="Vui lòng đăng nhập bằng tài khoản admin để truy cập trang này"
          type="warning"
          showIcon
          action={
            <Button size="medium" type="primary" onClick={() => props.history.push("/login")}>
              Đăng nhập
            </Button>
          }
        />
      );
    } else {
      // Nếu đã đăng nhập nhưng không phải tài khoản admin
      if (user.type !== "ADMIN") {
        return (
          <Alert
            style={{ marginTop: 30 }}
            message="Không có quyền truy cập"
            description="Tài khoản của bạn không có quyền truy cập trang này. Vui lòng đăng xuất tài khoản hiện tại và đăng nhập lại bằng tài khoản admin"
            type="warning"
            showIcon
            action={
              <Button size="medium" type="primary" onClick={confirmToSignOut}>
                Đăng xuất
              </Button>
            }
          />
        );
      } else {
        return (
          <div className="admin-content">
            <Button type="primary" size="medium" onClick={() => props.history.push("/manage_location")}>
              Quản lý vị trí
            </Button>
            <Button type="primary" size="medium" onClick={() => props.history.push("/manage_user")}>
              Quản lý người dùng
            </Button>
          </div>
        );
      }
    }
  };

  return (
    <div className="admin-home-page">
      <div className="container">{renderContent()}</div>
    </div>
  );
}
