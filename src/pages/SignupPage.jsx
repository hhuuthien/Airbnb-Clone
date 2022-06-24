import { Alert, Button, Input } from "antd";
import { useFormik } from "formik";
import * as YUB from "yup";

export default function SignupPage() {
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      password2: "",
    },
    validationSchema: YUB.object({
      username: YUB.string().required("Không được để trống ô này"),
      email: YUB.string().required("Không được để trống ô này"),
      password: YUB.string().required("Không được để trống ô này"),
      password2: YUB.string().required("Không được để trống ô này"),
    }),
    validateOnBlur: false,
    validateOnChange: true,
    onSubmit: (values) => {
      // dispatch(loginAPI(values));
      console.log(values);
    },
  });

  return (
    <div className="signup-page">
      <div className="overlay">
        <div className="container">
          <div className="signup-form">
            <h2>Đăng ký tài khoản</h2>
            <div className="username">
              <label>Tên của bạn</label>
              <Input className="input-username" value={formik.values.username} onChange={formik.handleChange} name="username" allowClear />
              {formik.errors.username ? <Alert style={{ marginTop: 4 }} message={formik.errors.username} type="error" showIcon /> : null}
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
            <Button type="primary" className="btn-signup" onClick={formik.handleSubmit}>
              Đăng ký tài khoản
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
