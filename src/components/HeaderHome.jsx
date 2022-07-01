import { QuestionCircleOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Modal, Image } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { SIGN_OUT } from "../redux/const/constant";
import { ACCESS_TOKEN, USER_LOGIN } from "../util/setting";

export default function HeaderHome(props) {
  const { user } = useSelector((root) => root.accountReducer);
  const dispatch = useDispatch();

  const handleLogoClick = () => {
    props.history.push("/");
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

  const goToAccountPage = () => {
    props.history.push("/account");
  };

  const goToAdminPage = () => {
    props.history.push("/admin");
  };

  const goToLoginPage = () => {
    props.history.push("/login");
  };

  const goToSignupPage = () => {
    props.history.push("/signup");
  };

  const signOut = () => {
    // xoá localStorage
    localStorage.removeItem(USER_LOGIN);
    localStorage.removeItem(ACCESS_TOKEN);
    // xoá user trong redux
    dispatch({
      type: SIGN_OUT,
    });
  };

  const menuClient = (
    <Menu
      items={[
        {
          label: <div onClick={goToAccountPage}>Trang cá nhân</div>,
        },
        {
          label: <div onClick={confirmToSignOut}>Đăng xuất</div>,
        },
      ]}
    />
  );

  const menuAdmin = (
    <Menu
      items={[
        {
          label: <div onClick={goToAccountPage}>Trang cá nhân</div>,
        },
        {
          label: <div onClick={goToAdminPage}>Trang quản trị</div>,
        },
        {
          label: <div onClick={confirmToSignOut}>Đăng xuất</div>,
        },
      ]}
    />
  );

  const menuNonUser = (
    <Menu
      items={[
        {
          label: <div onClick={goToLoginPage}>Đăng nhập</div>,
        },
        {
          label: <div onClick={goToSignupPage}>Đăng kí tài khoản</div>,
        },
      ]}
    />
  );

  const renderDropDown = () => {
    if (localStorage.getItem(USER_LOGIN) && localStorage.getItem(ACCESS_TOKEN) && user.email) {
      if (user.type === "ADMIN") {
        return (
          <Dropdown overlay={menuAdmin} placement="bottomRight">
            <div className="avatar">
              <Image width={30} height={30} alt={user.name} src={user.avatar || "/img/user-blank-color.png"} fallback={"/img/user-blank.png"} preview={false} />
            </div>
          </Dropdown>
        );
      } else {
        return (
          <Dropdown overlay={menuClient} placement="bottomRight">
            <div className="avatar">
              <Image width={30} height={30} alt={user.name} src={user.avatar || "/img/user-blank-color.png"} fallback={"/img/user-blank.png"} preview={false} />
            </div>
          </Dropdown>
        );
      }
    } else {
      return (
        <Dropdown overlay={menuNonUser} placement="bottomRight">
          <div className="avatar">
            <img src="/img/user-blank.png" alt="User image" />
          </div>
        </Dropdown>
      );
    }
  };

  return (
    <div className="header-home">
      <div className="container">
        <div className="logo">
          <img src="/img/logo-text.png" alt="Airbnb logo" onClick={handleLogoClick} />
        </div>
        <div className="account">{renderDropDown()}</div>
      </div>
    </div>
  );
}
