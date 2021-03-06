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
      message.success("C???p nh???t th??nh c??ng");
      dispatch({
        type: UPDATE_USER_END,
      });
    } else if (updateStatus === "fail") {
      message.error("C???p nh???t kh??ng th??nh c??ng. Vui l??ng th??? l???i sau");
      dispatch({
        type: UPDATE_USER_END,
      });
    }
  }, [updateStatus]);

  useEffect(() => {
    if (deleteTicketStatus === "success") {
      message.success("Xo?? th??nh c??ng");
      dispatch({
        type: DELETE_TICKET_END,
      });
    } else if (deleteTicketStatus === "fail") {
      message.error("Xo?? kh??ng th??nh c??ng. Vui l??ng th??? l???i sau");
      dispatch({
        type: DELETE_TICKET_END,
      });
    }
  }, [deleteTicketStatus]);

  useEffect(() => {
    if (createTicketStatus === "success") {
      message.success("T???o th??nh c??ng");
      dispatch({
        type: CREATE_TICKET_END,
      });
      dispatch(getTicketByUser(uid));
    } else if (createTicketStatus === "fail") {
      message.error("T???o kh??ng th??nh c??ng. Vui l??ng th??? l???i sau");
      dispatch({
        type: CREATE_TICKET_END,
      });
    }
  }, [createTicketStatus]);

  useEffect(() => {
    if (updateTicketStatus === "success") {
      message.success("C???p nh???t th??nh c??ng");
      dispatch({
        type: UPDATE_TICKET_END,
      });
      dispatch(getTicketByUser(uid));
    } else if (updateTicketStatus === "fail") {
      message.error("C???p nh???t kh??ng th??nh c??ng. Vui l??ng th??? l???i sau");
      dispatch({
        type: UPDATE_TICKET_END,
      });
    }
  }, [updateTicketStatus]);

  useEffect(() => {
    if (deleteStatus === "success") {
      message.success("Xo?? th??nh c??ng");
      dispatch({
        type: DELETE_USER_END,
      });
      props.history.goBack();
    } else if (deleteStatus === "fail") {
      message.error("Xo?? kh??ng th??nh c??ng. Vui l??ng th??? l???i sau");
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
      title: "Xo?? user",
      icon: <QuestionCircleOutlined />,
      content: `B???n c?? mu???n xo?? user "${name}" (${email}) kh??ng?`,
      okText: "Xo??",
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
      title: "Xo?? ticket",
      icon: <QuestionCircleOutlined />,
      content: `B???n c?? mu???n xo?? v?? n??y kh??ng?`,
      okText: "Xo??",
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
      title: "T??n ph??ng",
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

  // N???u ch??a ????ng nh???p ho???c ???? ????ng nh???p nh??ng kh??ng ph???i t??i kho???n admin --> redirect
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
                    C???p nh???t th??ng tin
                  </Button>
                  <Button type="primary" disabled style={{ marginLeft: 5 }}>
                    C???p nh???t ???nh ?????i di???n
                  </Button>
                  <Button type="primary" danger onClick={() => confirmToDelete(userDetail.name, userDetail.email, uid)} style={{ marginLeft: 5 }}>
                    Xo??
                  </Button>
                </div>
                <Descriptions bordered column={1}>
                  <Descriptions.Item label="ID">{userDetail._id}</Descriptions.Item>
                  <Descriptions.Item label="T??n">{userDetail.name}</Descriptions.Item>
                  <Descriptions.Item label="Email">{userDetail.email}</Descriptions.Item>
                  <Descriptions.Item label="S??? ??i???n tho???i">{userDetail.phone}</Descriptions.Item>
                  <Descriptions.Item label="Ng??y sinh">{userDetail.birthday}</Descriptions.Item>
                  <Descriptions.Item label="Gi???i t??nh">{userDetail.gender ? "Nam" : "N???"}</Descriptions.Item>
                  <Descriptions.Item label="?????a ch???">{userDetail.address}</Descriptions.Item>
                  <Descriptions.Item label="Lo???i t??i kho???n">{userDetail.type}</Descriptions.Item>
                  <Descriptions.Item label="???nh ?????i di???n">
                    <Image width={150} src={userDetail.avatar} fallback={"/img/user-blank.png"} />
                  </Descriptions.Item>
                </Descriptions>
                <div className="ticket-list" style={{ marginTop: 30 }}>
                  <h3 style={{ fontWeight: "bold" }}>L???ch s??? ?????t v??</h3>
                  <Button type="primary" style={{ marginTop: 0, marginBottom: 30 }} onClick={() => showModalToCreateTicket()}>
                    <i className="fa-solid fa-circle-plus" style={{ marginRight: 4 }}></i>
                    T???o v??
                  </Button>
                  <Table columns={tableColumns} dataSource={userTicket} bordered rowKey={(record) => record._id} />
                </div>
              </div>
            </div>
          </div>
          <Modal title="C???p nh???t th??ng tin user" centered visible={modalVisible} onOk={formik.handleSubmit} okText="C???p nh???t" onCancel={() => setModalVisible(false)}>
            <div className="updateUserModal-name">
              <label>T??n</label>
              <Input className="input-name" value={formik.values.name} onChange={formik.handleChange} name="name" allowClear />
            </div>
            <div className="updateUserModal-email">
              <label>Email</label>
              <Input className="input-email" value={formik.values.email} onChange={formik.handleChange} name="email" allowClear />
            </div>
            <div className="updateUserModal-phone">
              <label>S??? ??i???n tho???i</label>
              <Input className="input-phone" value={formik.values.phone} onChange={formik.handleChange} name="phone" allowClear />
            </div>
            <div className="updateUserModal-birthday">
              <label>Ng??y sinh</label>
              <Input className="input-birthday" value={formik.values.birthday} onChange={formik.handleChange} name="birthday" allowClear />
            </div>
            <div className="updateUserModal-address">
              <label>?????a ch???</label>
              <Input className="input-address" value={formik.values.address} onChange={formik.handleChange} name="address" allowClear />
            </div>
            <div className="updateUserModal-gender">
              <label>Gi???i t??nh</label>
              <br />
              <Select
                onChange={handleChangeGender}
                value={gender ? "Nam" : "N???"}
                className="input-gender"
                style={{
                  width: "100%",
                }}
              >
                <Option value="male">Nam</Option>
                <Option value="female">N???</Option>
              </Select>
            </div>
            <div className="updateUserModal-type">
              <label>Lo???i t??i kho???n</label>
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
          <Modal title="C???p nh???t th??ng tin v??" visible={modalVisible2} okText="OK" onOk={() => editTicket()} onCancel={() => setModalVisible2(false)}>
            <div className="booking-time">
              <RangePicker value={timeRange} showTime format="DD/MM/YYYY HH:mm" style={{ width: "100%" }} onChange={(v) => setTimeRange(v)} />
            </div>
          </Modal>
          <Modal title="T???o v??" visible={modalVisible3} okText="OK" onOk={() => createTicket()} onCancel={() => setModalVisible3(false)}>
            <div className="booking-time">
              <RangePicker showTime format="DD/MM/YYYY HH:mm" style={{ width: "100%" }} onChange={(v) => setTimeRange2(v)} />
            </div>
            <div className="booking-roomId">
              <label>ID c???a ph??ng</label>
              <Input className="input-id" name="id" allowClear id="input-room-id" />
            </div>
          </Modal>
        </>
      );
    }
  }
}
