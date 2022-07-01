import { Alert, Button, Input } from "antd";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as YUB from "yup";
import { signupAPI } from "../redux/actions/signupAction";
import { END_SIGNUP } from "../redux/const/constant";
import { ACCESS_TOKEN, USER_LOGIN } from "../util/setting";

export default function SignupPage(props) {
  const { user, signupStatus } = useSelector((state) => state.accountReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch({
        type: END_SIGNUP,
      });
    };
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password2: "",
    },
    validationSchema: YUB.object({
      name: YUB.string().required("Không được để trống ô này"),
      email: YUB.string()
        .required("Không được để trống ô này")
        .matches(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Email không đúng định dạng"
        ),
      password: YUB.string()
        .required("Không được để trống ô này")
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, "Mật khẩu phải có ít nhất 8 kí tự, phải bao gồm ít nhất một kí tự thường, một kí tự in hoa và một con số"),
      password2: YUB.string()
        .required("Không được để trống ô này")
        .oneOf([YUB.ref("password"), null], "Mật khẩu không khớp"),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      const signupInfo = {
        name: values.name,
        email: values.email,
        password: values.password2,
        phone: "",
        birthday: "",
        gender: true,
        address: "",
      };
      console.log("signupInfo", signupInfo);
      dispatch(signupAPI(signupInfo));
    },
  });

  // Mỗi lần render lại đều kiểm tra xem có ai đang đăng nhập không, nếu đăng nhập rồi thì không vào trang này được

  if (localStorage.getItem(USER_LOGIN) && localStorage.getItem(ACCESS_TOKEN) && user.email) {
    return <Redirect to="/account" />;
  }

  return (
    <div className="signup-page">
      <div className="overlay">
        <div className="container">
          <div className="signup-form">
            <h2>Đăng ký tài khoản</h2>
            <div className="name">
              <label>Tên của bạn</label>
              <Input className="input-name" value={formik.values.name} onChange={formik.handleChange} name="name" allowClear />
              {formik.errors.name ? <Alert style={{ marginTop: 4 }} message={formik.errors.name} type="error" showIcon /> : null}
            </div>
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
            <div className="password2">
              <label>Xác nhận mật khẩu</label>
              <Input.Password className="input-password2" value={formik.values.password2} onChange={formik.handleChange} name="password2" />
              {formik.errors.password2 ? <Alert style={{ marginTop: 4 }} message={formik.errors.password2} type="error" showIcon /> : null}
            </div>
            {signupStatus === "start" ? (
              <Button type="primary" className="btn-signup" loading>
                Đang đăng ký tài khoản
              </Button>
            ) : (
              <Button type="primary" className="btn-signup" onClick={formik.handleSubmit}>
                Đăng ký tài khoản
              </Button>
            )}
            <div className="link-to-login" onClick={() => props.history.replace("/login")}>
              Đã có tài khoản? Hãy đăng nhập
            </div>
            {signupStatus === "fail" ? (
              <Alert style={{ marginTop: 10 }} message="Đã xảy ra lỗi" description="Vui lòng kiểm tra lại thông tin hoặc thử lại sau" type="error" showIcon closable />
            ) : null}
            {signupStatus === "success" ? (
              <Alert
                style={{ marginTop: 10 }}
                message="Đăng ký tài khoản thành công"
                description="Bây giờ bạn có thể đăng nhập bằng tài khoản vừa tạo"
                type="success"
                showIcon
                action={
                  <Button size="medium" type="primary" onClick={() => props.history.replace("/login")}>
                    Đăng nhập
                  </Button>
                }
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
