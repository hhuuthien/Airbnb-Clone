import { Button, Input } from "antd";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginAPI } from "../redux/actions/loginAction";
import * as YUB from "yup";

export default function LoginPage(props) {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: YUB.object({
      email: YUB.string().required("Không được để trống"),
      password: YUB.string().required("Không được để trống"),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  // const onSubmit = () => {
  //   dispatch(loginAPI(formik.values));
  // };

  return (
    <div className="login-page">
      <div className="overlay">
        <div className="container">
          <div className="login-form">
            <h2>Đăng nhập</h2>
            <div className="email">
              <label>Email</label>
              <Input className="input-email" value={formik.values.email} onChange={formik.handleChange} name="email" allowClear />
              {formik.errors.email ? <p className="error">{formik.errors.email}</p> : <></>}
            </div>
            <div className="password">
              <label>Mật khẩu</label>
              <Input.Password className="input-password" value={formik.values.password} onChange={formik.handleChange} name="password" />
              {formik.errors.password ? <p className="error">{formik.errors.password}</p> : <></>}
            </div>
            <Button type="primary" className="btn-login" onClick={formik.handleSubmit}>
              Đăng nhập
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
