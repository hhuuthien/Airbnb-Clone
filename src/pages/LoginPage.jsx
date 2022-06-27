import { Alert, Button, Input } from "antd";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as YUB from "yup";
import { loginAPI } from "../redux/actions/loginAction";
import { END_LOGIN } from "../redux/const/constant";
import { ACCESS_TOKEN, USER_LOGIN } from "../util/setting";

export default function LoginPage(props) {
  const { user, loginStatus } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch({
        type: END_LOGIN,
      });
    };
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: YUB.object({
      email: YUB.string().required("Không được để trống ô này"),
      password: YUB.string().required("Không được để trống ô này"),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      dispatch(loginAPI(values));
    },
  });

  // Mỗi lần render lại đều kiểm tra xem đăng nhập xong chưa
  // Nếu đăng nhập xong (có ACCESS_TOKEN và USER_LOGIN trong localStorage, có thông tin user trong redux) thì quay lại trang account
  // Nếu đăng nhập chưa xong thì ở lại đây tiếp tục

  if (localStorage.getItem(USER_LOGIN) && localStorage.getItem(ACCESS_TOKEN) && user.email) {
    return <Redirect to="/account" />;
  }

  return (
    <div className="login-page">
      <div className="overlay">
        <div className="container">
          <div className="login-form">
            <h2>Đăng nhập</h2>
            <div className="email">
              <label>Email</label>
              <Input className="input-email" value={formik.values.email} onChange={formik.handleChange} name="email" allowClear />
              {formik.errors.email ? <Alert style={{ marginTop: 4 }} message={formik.errors.email} type="error" showIcon /> : null}
            </div>
            <div className="password">
              <label>Mật khẩu</label>
              <Input.Password className="input-password" value={formik.values.password} onChange={formik.handleChange} name="password" />
              {formik.errors.password ? <Alert style={{ marginTop: 4 }} message={formik.errors.password} type="error" showIcon /> : null}
            </div>
            {loginStatus === "start" ? (
              <Button type="primary" className="btn-login" loading>
                Đang đăng nhập
              </Button>
            ) : (
              <Button type="primary" className="btn-login" onClick={formik.handleSubmit}>
                Đăng nhập
              </Button>
            )}
            {loginStatus === "fail" ? (
              <Alert style={{ marginTop: 10 }} message="Đã xảy ra lỗi" description="Vui lòng kiểm tra lại email và mật khẩu" type="error" showIcon closable />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
