import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginAPI } from "../redux/actions/loginAction";
import { Button, Checkbox, Form, Input } from "antd";

export default function LoginPage(props) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {}, []);

  const onInputChange = (e) => {
    switch (e.target.id) {
      case "input-email":
        setEmail(e.target.value);
        break;
      case "input-password":
        setPassword(e.target.value);
        break;
      default:
        break;
    }
  };

  const onSubmit = () => {
    const loginInfo = { email, password };
    dispatch(loginAPI(loginInfo));
  };

  return (
    <div className="login-page">
      <div className="overlay">
        <div className="container">
          <div className="login-form">
            <h2>Đăng nhập</h2>
            <div className="email">
              <label>Email</label>
              <Input className="input-email" onChange={onInputChange} id="input-email" />
            </div>
            <div className="password">
              <label>Mật khẩu</label>
              <Input.Password className="input-password" onChange={onInputChange} id="input-password" />
            </div>
            <Button type="primary" className="btn-login" onClick={onSubmit}>
              Đăng nhập
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
