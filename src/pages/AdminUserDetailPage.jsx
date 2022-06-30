import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Descriptions, Image, Input, message, Modal, Select } from "antd";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserAPI, getUserDetailAPI, updateUserAPI } from "../redux/actions/userAction";
import { CLEAR_USER_DETAIL, DELETE_USER_END, UPDATE_USER_END } from "../redux/const/constant";
const { Option } = Select;

export default function AdminUserDetailPage(props) {
  const dispatch = useDispatch();
  const { userDetail, updateStatus, deleteStatus } = useSelector((root) => root.userReducer);

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

  useEffect(() => {
    if (updateStatus === "success") {
      message.success("Cập nhật thành công");
      dispatch({
        type: UPDATE_USER_END,
      });
    } else if (updateStatus === "fail") {
      message.error("Cập nhật không thành công. Vui lòng thử lại sau");
      dispatch({
        type: UPDATE_USER_END,
      });
    }
  }, [updateStatus]);

  useEffect(() => {
    if (deleteStatus === "success") {
      message.success("Xoá thành công");
      dispatch({
        type: DELETE_USER_END,
      });
      props.history.goBack();
    } else if (deleteStatus === "fail") {
      message.error("Xoá không thành công. Vui lòng thử lại sau");
      dispatch({
        type: DELETE_USER_END,
      });
    }
  }, [deleteStatus]);

  const showModal = () => {
    setModalVisible(true);
    setType(userDetail.type);
    setGender(userDetail.gender);
  };

  const confirmToDelete = (name, email, id) => {
    Modal.confirm({
      title: "Xoá user",
      icon: <QuestionCircleOutlined />,
      content: `Bạn có muốn xoá user "${name}" (${email}) không?`,
      okText: "Xoá",
      cancelText: "Cancel",
      onOk() {
        dispatch(deleteUserAPI(id));
      },
    });
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
      dispatch(updateUserAPI(uid, fullValues));
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
              <Button type="primary" danger onClick={() => confirmToDelete(userDetail.name, userDetail.email, uid)} style={{ marginLeft: 5 }}>
                Xoá
              </Button>
            </div>
            <Descriptions bordered column={1}>
              <Descriptions.Item label="ID">{userDetail._id}</Descriptions.Item>
              <Descriptions.Item label="Tên">{userDetail.name}</Descriptions.Item>
              <Descriptions.Item label="Email">{userDetail.email}</Descriptions.Item>
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
            value={gender ? "Nam" : "Nữ"}
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
            value={type}
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
