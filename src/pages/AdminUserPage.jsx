import { Button, DatePicker, Input, message, Modal, Select, Table, Tag } from "antd";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { createUserAPI, getUserAPI } from "../redux/actions/userAction";
import { CREATE_USER_END } from "../redux/const/constant";
import { ACCESS_TOKEN, USER_LOGIN } from "../util/setting";

const { Option } = Select;

export default function AdminUserPage(props) {
  const dispatch = useDispatch();
  const { userList, createStatus } = useSelector((root) => root.userReducer);
  const { user } = useSelector((state) => state.accountReducer);

  const [modalVisible, setModalVisible] = useState(false);

  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState(true);
  const [type, setType] = useState("CLIENT");

  useEffect(() => {
    dispatch(getUserAPI());
  }, []);

  useEffect(() => {
    if (createStatus === "success") {
      message.success("Tạo thành công");
      dispatch({
        type: CREATE_USER_END,
      });
    } else if (createStatus === "fail") {
      message.error("Tạo không thành công. Vui lòng thử lại sau");
      dispatch({
        type: CREATE_USER_END,
      });
    }
  }, [createStatus]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      address: "",
    },
    onSubmit: (values) => {
      setModalVisible(false);
      formik.handleReset();
      const fullValues = { ...values, gender, type, birthday };
      console.log(fullValues);
      dispatch(createUserAPI(fullValues));
    },
  });

  const tableColumns = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Loại",
      dataIndex: "type",
      key: "type",
      render: (_, record) => {
        const color = record.type === "ADMIN" ? "blue" : "green";
        if (record.type) {
          return (
            <Tag color={color} key={record._id}>
              {record.type}
            </Tag>
          );
        } else {
          return <></>;
        }
      },
    },
    {
      title: "",
      key: "action",
      render: (_, record) => {
        return (
          <Button
            type="primary"
            onClick={() => {
              props.history.push("/user/" + record._id);
            }}
          >
            Xem chi tiết
          </Button>
        );
      },
    },
  ];

  const renderUserList = () => {
    return (
      <div className="user-list">
        <Table columns={tableColumns} dataSource={userList} bordered rowKey={(record) => record._id} />
      </div>
    );
  };

  const handleChangeDate = (date, dateString) => {
    setBirthday(dateString + "T00:00:00.000Z");
    // Định dạng của API: 2022-06-15T00:00:00.000Z
  };

  const handleChangeGender = (gender) => {
    if (gender === "male") setGender(true);
    else if (gender === "female") setGender(false);
  };

  const handleChangeType = (type) => setType(type);

  // Nếu chưa đăng nhập hoặc đã đăng nhập nhưng không phải tài khoản admin --> redirect
  if (!localStorage.getItem(USER_LOGIN) || !localStorage.getItem(ACCESS_TOKEN) || !user.email) {
    return <Redirect to="/admin" />;
  } else {
    if (user.type !== "ADMIN") {
      return <Redirect to="/admin" />;
    } else {
      return (
        <>
          <div className="admin-user-page">
            <div className="container">
              <Button type="primary" style={{ marginTop: 30 }} className="create-user" onClick={() => setModalVisible(true)}>
                <i className="fa-solid fa-circle-plus"></i>
                Tạo user mới
              </Button>
              {renderUserList()}
            </div>
          </div>
          <Modal
            title="Tạo user"
            centered
            visible={modalVisible}
            okText="Tạo user"
            onOk={formik.handleSubmit}
            onCancel={() => {
              setModalVisible(false);
              formik.handleReset();
            }}
          >
            <div className="createUser-name">
              <label>Tên</label>
              <Input className="input-name" value={formik.values.name} onChange={formik.handleChange} name="name" allowClear />
            </div>
            <div className="createUser-email">
              <label>Email</label>
              <Input className="input-email" value={formik.values.email} onChange={formik.handleChange} name="email" allowClear />
            </div>
            <div className="createUser-password">
              <label>Mật khẩu</label>
              <Input.Password className="input-password" value={formik.values.password} onChange={formik.handleChange} name="password" allowClear />
            </div>
            <div className="createUser-phone">
              <label>Số điện thoại</label>
              <Input className="input-phone" value={formik.values.phone} onChange={formik.handleChange} name="phone" allowClear />
            </div>
            <div className="createUser-birthday">
              <label>Ngày sinh</label>
              <DatePicker className="input-birthday" onChange={handleChangeDate} style={{ width: "100%" }} />
            </div>
            <div className="createUser-gender">
              <label>Giới tính</label>
              <br />
              <Select
                onChange={handleChangeGender}
                className="input-gender"
                style={{
                  width: "100%",
                }}
              >
                <Option value="male">Nam</Option>
                <Option value="female">Nữ</Option>
              </Select>
            </div>
            <div className="createUser-type">
              <label>Loại tài khoản</label>
              <br />
              <Select
                onChange={handleChangeType}
                className="input-type"
                style={{
                  width: "100%",
                }}
              >
                <Option value="ADMIN">ADMIN</Option>
                <Option value="CLIENT">CLIENT</Option>
              </Select>
            </div>
            <div className="createUser-address">
              <label>Địa chỉ</label>
              <Input className="input-address" value={formik.values.address} onChange={formik.handleChange} name="address" allowClear />
            </div>
          </Modal>
        </>
      );
    }
  }
}
