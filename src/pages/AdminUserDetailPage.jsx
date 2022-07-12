import { DeleteOutlined, EditOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, DatePicker, Descriptions, Image, Input, message, Modal, Select, Table } from "antd";
import { useFormik } from "formik";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { createTicketAPI, deleteTicket, getTicketByUser, updateTicket } from "../redux/actions/ticketAction";
import { deleteUserAPI, getUserDetailAPI, updateUserAPI } from "../redux/actions/userAction";
import { CLEAR_USER_DETAIL, CREATE_TICKET_END, DELETE_TICKET_END, DELETE_USER_END, UPDATE_TICKET_END, UPDATE_USER_END } from "../redux/const/constant";
import { ACCESS_TOKEN, USER_LOGIN } from "../util/setting";
const { Option } = Select;
const { RangePicker } = DatePicker;

export default function AdminUserDetailPage(props) {
  const dispatch = useDispatch();
  const { userDetail, updateStatus, deleteStatus } = useSelector((root) => root.userReducer);
  const { userTicket, deleteTicketStatus, updateTicketStatus, createTicketStatus } = useSelector((root) => root.ticketReducer);
  const { user } = useSelector((state) => state.accountReducer);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [timeRange, setTimeRange] = useState([]);
  const [timeRange2, setTimeRange2] = useState([]);

  const [id, setId] = useState(""); // id to update ticket
  const [roomId, setRoomId] = useState(""); // room id to update ticket

  const [gender, setGender] = useState(true);
  const [type, setType] = useState("CLIENT");

  const uid = props.match.params.uid;

  useEffect(() => {
    dispatch(getUserDetailAPI(uid));
    dispatch(getTicketByUser(uid));
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
    if (deleteTicketStatus === "success") {
      message.success("Xoá thành công");
      dispatch({
        type: DELETE_TICKET_END,
      });
    } else if (deleteTicketStatus === "fail") {
      message.error("Xoá không thành công. Vui lòng thử lại sau");
      dispatch({
        type: DELETE_TICKET_END,
      });
    }
  }, [deleteTicketStatus]);

  useEffect(() => {
    if (createTicketStatus === "success") {
      message.success("Tạo thành công");
      dispatch({
        type: CREATE_TICKET_END,
      });
      dispatch(getTicketByUser(uid));
    } else if (createTicketStatus === "fail") {
      message.error("Tạo không thành công. Vui lòng thử lại sau");
      dispatch({
        type: CREATE_TICKET_END,
      });
    }
  }, [createTicketStatus]);

  useEffect(() => {
    if (updateTicketStatus === "success") {
      message.success("Cập nhật thành công");
      dispatch({
        type: UPDATE_TICKET_END,
      });
      dispatch(getTicketByUser(uid));
    } else if (updateTicketStatus === "fail") {
      message.error("Cập nhật không thành công. Vui lòng thử lại sau");
      dispatch({
        type: UPDATE_TICKET_END,
      });
    }
  }, [updateTicketStatus]);

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

  const confirmToDeleteTicket = (id) => {
    Modal.confirm({
      title: "Xoá ticket",
      icon: <QuestionCircleOutlined />,
      content: `Bạn có muốn xoá vé này không?`,
      okText: "Xoá",
      cancelText: "Cancel",
      onOk() {
        dispatch(deleteTicket(id));
      },
    });
  };

  const showModalToEditTicket = (record) => {
    setModalVisible2(true);
    const array = [moment(record.checkIn), moment(record.checkOut)];
    setTimeRange(array);
    setId(record._id);
    setRoomId(record.roomId._id);
  };

  const editTicket = () => {
    setModalVisible2(false);
    const startTime = timeRange[0].seconds(0).milliseconds(0).toISOString();
    const endTime = timeRange[1].seconds(0).milliseconds(0).toISOString();
    dispatch(
      updateTicket(id, {
        checkIn: startTime,
        checkOut: endTime,
        userId: uid,
        roomId,
      })
    );
  };

  const tableColumns = [
    {
      title: "Tên phòng",
      render: (_, record) => {
        return record.roomId?.name || "Unknown";
      },
    },
    {
      title: "Check in",
      render: (_, record) => {
        return record.checkIn || "Unknown";
      },
    },
    {
      title: "Check out",
      render: (_, record) => {
        return record.checkOut || "Unknown";
      },
    },
    {
      title: "",
      key: "action",
      render: (_, record) => {
        return (
          <>
            <EditOutlined style={{ cursor: "pointer", marginRight: 10 }} onClick={() => showModalToEditTicket(record)} />
            <DeleteOutlined style={{ cursor: "pointer" }} onClick={() => confirmToDeleteTicket(record._id)} />
          </>
        );
      },
    },
  ];

  const showModalToCreateTicket = () => {
    setModalVisible3(true);
  };

  const createTicket = () => {
    setModalVisible3(false);
    const startTime = timeRange2[0].seconds(0).milliseconds(0).toISOString();
    const endTime = timeRange2[1].seconds(0).milliseconds(0).toISOString();
    const roomId = document.getElementById("input-room-id").value;
    dispatch(createTicketAPI(startTime, endTime, uid, roomId));
  };

  // Nếu chưa đăng nhập hoặc đã đăng nhập nhưng không phải tài khoản admin --> redirect
  if (!localStorage.getItem(USER_LOGIN) || !localStorage.getItem(ACCESS_TOKEN) || !user.email) {
    return <Redirect to="/admin" />;
  } else {
    if (user.type !== "ADMIN") {
      return <Redirect to="/admin" />;
    } else {
      return (
        <>
          <div className="admin-user-detail-page">
            <div className="container">
              <div className="content">
                <div className="action">
                  <Button type="primary" onClick={showModal}>
                    Cập nhật thông tin
                  </Button>
                  <Button type="primary" disabled style={{ marginLeft: 5 }}>
                    Cập nhật ảnh đại diện
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
                <div className="ticket-list" style={{ marginTop: 30 }}>
                  <h3 style={{ fontWeight: "bold" }}>Lịch sử đặt vé</h3>
                  <button onClick={() => showModalToCreateTicket()}>Tạo vé</button>
                  <Table columns={tableColumns} dataSource={userTicket} bordered rowKey={(record) => record._id} />
                </div>
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
          <Modal title="Cập nhật thông tin vé" visible={modalVisible2} okText="OK" onOk={() => editTicket()} onCancel={() => setModalVisible2(false)}>
            <div className="booking-time">
              <RangePicker value={timeRange} showTime format="DD/MM/YYYY HH:mm" style={{ width: "100%" }} onChange={(v) => setTimeRange(v)} />
            </div>
          </Modal>
          <Modal title="Tạo vé" visible={modalVisible3} okText="OK" onOk={() => createTicket()} onCancel={() => setModalVisible3(false)}>
            <div className="booking-time">
              <RangePicker showTime format="DD/MM/YYYY HH:mm" style={{ width: "100%" }} onChange={(v) => setTimeRange2(v)} />
            </div>
            <div className="booking-roomId">
              <label>ID của phòng</label>
              <Input className="input-id" name="id" allowClear id="input-room-id" />
            </div>
          </Modal>
        </>
      );
    }
  }
}
