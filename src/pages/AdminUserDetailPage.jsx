import { Button, Descriptions, Image, Input, Modal, Select } from "antd";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetailAPI, updateUserDetailAPI } from "../redux/actions/userAction";
import { CLEAR_USER_DETAIL } from "../redux/const/constant";
const { Option } = Select;

export default function AdminUserDetailPage(props) {
  const dispatch = useDispatch();
  const { userDetail } = useSelector((root) => root.userReducer);
  const [modalVisible, setModalVisible] = useState(false);
  const [gender, setGender] = useState(true);
  const [type, setType] = useState("CLIENT");

  const uid = props.match.params.uid;

  useEffect(() => {
    dispatch(getUserDetailAPI(uid));
    return () => {
      dispatch({
        type: CLEAR_USER_DETAIL,
      });
    };
  }, []);

  const showModal = () => {
    setModalVisible(true);
  };

  const handleChangeGender = (gender) => {
    if (gender === "male") setGender(true);
    else if (gender === "female") setGender(false);
  };

  const handleChangeType = (type) => {
    setType(type);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: userDetail.name,
      email: userDetail.email,
      phone: userDetail.phone,
      birthday: userDetail.birthday,
      address: userDetail.address,
    },
    onSubmit: (values) => {
      setModalVisible(false);
      formik.handleReset();
      const fullValues = { ...values, gender, type };
      dispatch(updateUserDetailAPI(uid, fullValues));
    },
  });

  return (
    <>
      <div className="admin-user-detail-page">
        <div className="container">
          <div className="content">
            <div className="action">
              <Button type="primary" onClick={showModal}>
                Cập nhật thông tin
              </Button>
            </div>
            <Descriptions bordered column={1}>
              <Descriptions.Item label="ID">{userDetail._id}</Descriptions.Item>
              <Descriptions.Item label="Tên">{userDetail.name}</Descriptions.Item>
              <Descriptions.Item label="Email">{userDetail.email}</Descriptions.Item>
              <Descriptions.Item label="Mật khẩu">******</Descriptions.Item>
              <Descriptions.Item label="Số điện thoại">{userDetail.phone}</Descriptions.Item>
              <Descriptions.Item label="Ngày sinh">{userDetail.birthday}</Descriptions.Item>
              <Descriptions.Item label="Giới tính">{userDetail.gender ? "Nam" : "Nữ"}</Descriptions.Item>
              <Descriptions.Item label="Địa chỉ">{userDetail.address}</Descriptions.Item>
              <Descriptions.Item label="Loại tài khoản">{userDetail.type}</Descriptions.Item>
              <Descriptions.Item label="Ảnh đại diện">
                <Image width={150} src={userDetail.avatar} fallback={"/img/user-blank.png"} />
              </Descriptions.Item>
            </Descriptions>
          </div>
        </div>
      </div>
      <Modal title="Cập nhật thông tin user" centered visible={modalVisible} onOk={formik.handleSubmit} okText="Cập nhật" onCancel={() => setModalVisible(false)}>
        <div className="updateUserModal-name">
          <label>Tên</label>
          <Input className="input-name" value={formik.values.name} onChange={formik.handleChange} name="name" allowClear />
        </div>
        <div className="updateUserModal-email">
          <label>Email</label>
          <Input className="input-email" value={formik.values.email} onChange={formik.handleChange} name="email" allowClear />
        </div>
        <div className="updateUserModal-phone">
          <label>Số điện thoại</label>
          <Input className="input-phone" value={formik.values.phone} onChange={formik.handleChange} name="phone" allowClear />
        </div>
        <div className="updateUserModal-birthday">
          <label>Ngày sinh</label>
          <Input className="input-birthday" value={formik.values.birthday} onChange={formik.handleChange} name="birthday" allowClear />
        </div>
        <div className="updateUserModal-address">
          <label>Địa chỉ</label>
          <Input className="input-address" value={formik.values.address} onChange={formik.handleChange} name="address" allowClear />
        </div>
        <div className="updateUserModal-gender">
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
        <div className="updateUserModal-type">
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
      </Modal>
    </>
  );
}
