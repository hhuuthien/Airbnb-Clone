import { DeleteOutlined, EditOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Avatar, Button, Checkbox, Comment, DatePicker, Descriptions, Image, Input, message, Modal, Select, Table } from "antd";
import { useFormik } from "formik";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getLocationAPI } from "../redux/actions/locationAction";
import { deleteReview, editReview, getReview } from "../redux/actions/reviewAction";
import { deleteRoom, getRoomDetail, updateRoom, uploadImageRoom } from "../redux/actions/roomAction";
import { createTicketAPI, deleteTicket, getTicketByRoom, updateTicket } from "../redux/actions/ticketAction";
import {
  CLEAR_REVIEW_LIST,
  CLEAR_ROOM_DETAIL,
  CREATE_TICKET_END,
  DELETE_REVIEW_END,
  DELETE_ROOM_END,
  DELETE_TICKET_END,
  UPDATE_ROOM_END,
  UPDATE_TICKET_END,
} from "../redux/const/constant";
import { ACCESS_TOKEN, USER_LOGIN } from "../util/setting";
const { Option } = Select;
const { RangePicker } = DatePicker;

export default function AdminRoomDetailPage(props) {
  const dispatch = useDispatch();
  const { roomDetail, updateStatus, deleteStatus } = useSelector((root) => root.roomReducer);
  const { locationList } = useSelector((root) => root.locationReducer);
  const { user } = useSelector((state) => state.accountReducer);
  const { reviewList, deleteReviewStatus } = useSelector((state) => state.reviewReducer);
  const { roomTicket, deleteTicketStatus, updateTicketStatus, createTicketStatus } = useSelector((state) => state.ticketReducer);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [modalVisible4, setModalVisible4] = useState(false);
  const [modalVisible5, setModalVisible5] = useState(false);

  const [timeRange, setTimeRange] = useState([]);
  const [timeRange2, setTimeRange2] = useState([]);

  const [location, setLocation] = useState("");

  const [furnitureStatus, setFurnitureStatus] = useState([false, false, false, false, false, false, false, false, false, false]);

  const [id, setId] = useState(""); // id to update ticket
  const [userId, setUserId] = useState(""); // user id to update ticket

  const rid = props.match.params.rid;

  useEffect(() => {
    dispatch(getRoomDetail(rid));
    dispatch(getLocationAPI());
    dispatch(getReview(rid));
    dispatch(getTicketByRoom(rid));

    return () => {
      dispatch({ type: CLEAR_ROOM_DETAIL });
      dispatch({ type: CLEAR_REVIEW_LIST });
    };
  }, []);

  useEffect(() => {
    if (updateStatus === "success") {
      message.success("C???p nh???t th??nh c??ng");
      dispatch({
        type: UPDATE_ROOM_END,
      });
    } else if (updateStatus === "fail") {
      message.error("C???p nh???t kh??ng th??nh c??ng. Vui l??ng th??? l???i sau");
      dispatch({
        type: UPDATE_ROOM_END,
      });
    }
  }, [updateStatus]);

  useEffect(() => {
    if (deleteStatus === "success") {
      message.success("Xo?? th??nh c??ng");
      dispatch({
        type: DELETE_ROOM_END,
      });
      props.history.goBack();
    } else if (deleteStatus === "fail") {
      message.error("Xo?? kh??ng th??nh c??ng. Vui l??ng th??? l???i sau");
      dispatch({
        type: DELETE_ROOM_END,
      });
    }
  }, [deleteStatus]);

  useEffect(() => {
    if (deleteReviewStatus === "success") {
      message.success("Xo?? th??nh c??ng");
      dispatch({
        type: DELETE_REVIEW_END,
      });
    } else if (deleteReviewStatus === "fail") {
      message.error("Xo?? kh??ng th??nh c??ng. Vui l??ng th??? l???i sau");
      dispatch({
        type: DELETE_REVIEW_END,
      });
    }
  }, [deleteReviewStatus]);

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
    if (updateTicketStatus === "success") {
      message.success("C???p nh???t th??nh c??ng");
      dispatch({
        type: UPDATE_TICKET_END,
      });
      dispatch(getTicketByRoom(rid));
    } else if (updateTicketStatus === "fail") {
      message.error("C???p nh???t kh??ng th??nh c??ng. Vui l??ng th??? l???i sau");
      dispatch({
        type: UPDATE_TICKET_END,
      });
    }
  }, [updateTicketStatus]);

  useEffect(() => {
    if (createTicketStatus === "success") {
      message.success("T???o th??nh c??ng");
      dispatch({
        type: CREATE_TICKET_END,
      });
      dispatch(getTicketByRoom(rid));
    } else if (createTicketStatus === "fail") {
      message.error("T???o kh??ng th??nh c??ng. Vui l??ng th??? l???i sau");
      dispatch({
        type: CREATE_TICKET_END,
      });
    }
  }, [createTicketStatus]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: roomDetail.name,
      description: roomDetail.description,
      price: roomDetail.price,
      guests: roomDetail.guests,
      bedRoom: roomDetail.bedRoom,
      bath: roomDetail.bath,
    },
    onSubmit: (values) => {
      setModalVisible(false);
      formik.handleReset();

      // convert t??? t??n v??? tr?? sang id v??? tr?? theo y??u c???u c???a API
      const locationNew = locationList.find((item) => item.name && item.name === location); // l?? location m???i c???a room n???u thay ?????i
      const id = locationNew._id;

      // values l?? nh???ng gi?? tr??? l???y ???????c t??? formik
      // fullValues l?? nh???ng gi?? tr??? b??? sung th??m theo y??u c???u c???a API

      let fullValues = { ...values };
      fullValues = { ...fullValues, locationId: id };
      furnitureStatus[0] ? (fullValues = { ...fullValues, cableTV: true }) : (fullValues = { ...fullValues, cableTV: false });
      furnitureStatus[1] ? (fullValues = { ...fullValues, dryer: true }) : (fullValues = { ...fullValues, dryer: false });
      furnitureStatus[2] ? (fullValues = { ...fullValues, elevator: true }) : (fullValues = { ...fullValues, elevator: false });
      furnitureStatus[3] ? (fullValues = { ...fullValues, gym: true }) : (fullValues = { ...fullValues, gym: false });
      furnitureStatus[4] ? (fullValues = { ...fullValues, heating: true }) : (fullValues = { ...fullValues, heating: false });
      furnitureStatus[5] ? (fullValues = { ...fullValues, hotTub: true }) : (fullValues = { ...fullValues, hotTub: false });
      furnitureStatus[6] ? (fullValues = { ...fullValues, indoorFireplace: true }) : (fullValues = { ...fullValues, indoorFireplace: false });
      furnitureStatus[7] ? (fullValues = { ...fullValues, kitchen: true }) : (fullValues = { ...fullValues, kitchen: false });
      furnitureStatus[8] ? (fullValues = { ...fullValues, pool: true }) : (fullValues = { ...fullValues, pool: false });
      furnitureStatus[9] ? (fullValues = { ...fullValues, wifi: true }) : (fullValues = { ...fullValues, wifi: false });

      dispatch(updateRoom(rid, fullValues, locationNew));
    },
  });

  const showModal = () => {
    setModalVisible(true);
    setLocation(roomDetail.locationId.name);
    setFurnitureStatus([
      roomDetail.cableTV,
      roomDetail.dryer,
      roomDetail.elevator,
      roomDetail.gym,
      roomDetail.heating,
      roomDetail.hotTub,
      roomDetail.indoorFireplace,
      roomDetail.kitchen,
      roomDetail.pool,
      roomDetail.wifi,
    ]);
  };

  const handleChangeSelect = (value) => setLocation(value);

  const handleChangeCheckbox = (e) => {
    setFurnitureStatus([
      document.getElementById("cb0").checked,
      document.getElementById("cb1").checked,
      document.getElementById("cb2").checked,
      document.getElementById("cb3").checked,
      document.getElementById("cb4").checked,
      document.getElementById("cb5").checked,
      document.getElementById("cb6").checked,
      document.getElementById("cb7").checked,
      document.getElementById("cb8").checked,
      document.getElementById("cb9").checked,
    ]);
  };

  const showModal2 = () => {
    setModalVisible2(true);
  };

  const uploadImage = (id) => {
    setModalVisible2(false);
    const file = document.getElementById(`file-${id}`).files[0];
    dispatch(uploadImageRoom(id, file));
  };

  const confirmToDelete = (name, id) => {
    Modal.confirm({
      title: "Xo?? ph??ng",
      icon: <QuestionCircleOutlined />,
      content: `B???n c?? mu???n xo?? ph??ng "${name}" kh??ng?`,
      okText: "Xo??",
      cancelText: "Cancel",
      onOk() {
        dispatch(deleteRoom(id));
      },
    });
  };

  const formik2 = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: "",
      content: "",
    },
    onSubmit: (values) => {
      setModalVisible3(false);
      formik2.handleReset();
      dispatch(editReview(values.id, values.content));
    },
  });

  const onEditReview = (id, content) => {
    setModalVisible3(true);
    formik2.setFieldValue("content", content);
    formik2.setFieldValue("id", id);
  };

  const onDeleteReview = (id) => {
    Modal.confirm({
      title: "Xo?? ????nh gi??",
      icon: <QuestionCircleOutlined />,
      content: `B???n c?? mu???n xo?? ????nh gi?? n??y kh??ng?`,
      okText: "Xo??",
      cancelText: "Cancel",
      onOk: () => {
        dispatch(deleteReview(id));
      },
    });
  };

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
    setModalVisible4(true);
    const array = [moment(record.checkIn), moment(record.checkOut)];
    setTimeRange(array);
    setId(record._id);
    setUserId(record.userId._id);
  };

  const editTicket = () => {
    setModalVisible4(false);
    const startTime = timeRange[0].seconds(0).milliseconds(0).toISOString();
    const endTime = timeRange[1].seconds(0).milliseconds(0).toISOString();
    dispatch(
      updateTicket(id, {
        checkIn: startTime,
        checkOut: endTime,
        userId,
        roomId: rid,
      })
    );
  };

  const showModalToCreateTicket = () => {
    setModalVisible5(true);
  };

  const createTicket = () => {
    setModalVisible5(false);
    const startTime = timeRange2[0].seconds(0).milliseconds(0).toISOString();
    const endTime = timeRange2[1].seconds(0).milliseconds(0).toISOString();
    const userId = document.getElementById("input-user-id").value;
    dispatch(createTicketAPI(startTime, endTime, userId, rid));
  };

  const tableColumns = [
    {
      title: "T??n user",
      render: (_, record) => {
        return record.userId?.name || "Unknown";
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

  // N???u ch??a ????ng nh???p ho???c ???? ????ng nh???p nh??ng kh??ng ph???i t??i kho???n admin --> redirect
  if (!localStorage.getItem(USER_LOGIN) || !localStorage.getItem(ACCESS_TOKEN) || !user.email) {
    return <Redirect to="/admin" />;
  } else {
    if (user.type !== "ADMIN") {
      return <Redirect to="/admin" />;
    } else {
      return (
        <>
          <div className="admin-room-detail-page">
            <div className="container">
              <div className="content">
                <div className="action">
                  <Button type="primary" onClick={showModal}>
                    C???p nh???t th??ng tin
                  </Button>
                  <Button type="primary" onClick={showModal2} style={{ marginLeft: 5 }}>
                    C???p nh???t h??nh ???nh
                  </Button>
                  <Button type="primary" danger onClick={() => confirmToDelete(roomDetail.name, rid)} style={{ marginLeft: 5 }}>
                    Xo??
                  </Button>
                </div>
                <Descriptions bordered column={1}>
                  <Descriptions.Item label="ID">{roomDetail._id}</Descriptions.Item>
                  <Descriptions.Item label="T??n">{roomDetail.name}</Descriptions.Item>
                  <Descriptions.Item label="Thu???c v??? tr??">{roomDetail.locationId?.name}</Descriptions.Item>
                  <Descriptions.Item label="M?? t???">{roomDetail.description}</Descriptions.Item>
                  <Descriptions.Item label="Gi?? ti???n">{roomDetail.price?.toLocaleString()}</Descriptions.Item>
                  <Descriptions.Item label="S??? kh??ch">{roomDetail.guests}</Descriptions.Item>
                  <Descriptions.Item label="S??? ph??ng ng???">{roomDetail.bedRoom}</Descriptions.Item>
                  <Descriptions.Item label="S??? ph??ng t???m">{roomDetail.bath}</Descriptions.Item>
                  <Descriptions.Item label="TV">{roomDetail.cableTV ? "C??" : "Kh??ng"}</Descriptions.Item>
                  <Descriptions.Item label="Dryer">{roomDetail.dryer ? "C??" : "Kh??ng"}</Descriptions.Item>
                  <Descriptions.Item label="Elevator">{roomDetail.elevator ? "C??" : "Kh??ng"}</Descriptions.Item>
                  <Descriptions.Item label="Gym">{roomDetail.gym ? "C??" : "Kh??ng"}</Descriptions.Item>
                  <Descriptions.Item label="Heating">{roomDetail.heating ? "C??" : "Kh??ng"}</Descriptions.Item>
                  <Descriptions.Item label="Hottub">{roomDetail.hotTub ? "C??" : "Kh??ng"}</Descriptions.Item>
                  <Descriptions.Item label="Indoor Fireplace">{roomDetail.indoorFireplace ? "C??" : "Kh??ng"}</Descriptions.Item>
                  <Descriptions.Item label="Kitchen">{roomDetail.kitchen ? "C??" : "Kh??ng"}</Descriptions.Item>
                  <Descriptions.Item label="Pool">{roomDetail.pool ? "C??" : "Kh??ng"}</Descriptions.Item>
                  <Descriptions.Item label="Wifi">{roomDetail.wifi ? "C??" : "Kh??ng"}</Descriptions.Item>
                  <Descriptions.Item label="H??nh ???nh">
                    <Image width={150} src={roomDetail.image} fallback={"/img/airbnb-logo.png"} />
                  </Descriptions.Item>
                  <Descriptions.Item label="????nh gi??">
                    {reviewList.map((item, index) => {
                      const dateString = item.updatedAt;
                      const timeStamp = Date.parse(dateString);
                      const dateObject = new Date(timeStamp);
                      const day = dateObject.getDate();
                      const month = dateObject.getMonth() + 1;
                      const year = dateObject.getFullYear();

                      return (
                        <div key={index}>
                          <Comment
                            actions={[<EditOutlined onClick={() => onEditReview(item._id, item.content)} />, <DeleteOutlined onClick={() => onDeleteReview(item._id)} />]}
                            author={item.userId === null ? "Ng?????i d??ng ???n danh" : item.userId.name}
                            avatar={item.userId === null ? <Avatar src="/img/user-blank.png" /> : <Avatar src={item.userId.avatar} />}
                            content={<p>{item.content}</p>}
                            datetime={day + "/" + month + "/" + year}
                          />
                        </div>
                      );
                    })}
                  </Descriptions.Item>
                </Descriptions>
                <div className="ticket-list" style={{ marginTop: 30 }}>
                  <h3 style={{ fontWeight: "bold" }}>L???ch s??? ?????t v??</h3>
                  <Button type="primary" style={{ marginTop: 0, marginBottom: 30 }} onClick={() => showModalToCreateTicket()}>
                    <i className="fa-solid fa-circle-plus" style={{ marginRight: 4 }}></i>
                    T???o v??
                  </Button>
                  <Table columns={tableColumns} dataSource={roomTicket} bordered rowKey={(record) => record._id} />
                </div>
              </div>
            </div>
          </div>
          <Modal title="C???p nh???t th??ng tin ph??ng cho thu??" centered visible={modalVisible} okText="C???p nh???t" onOk={formik.handleSubmit} onCancel={() => setModalVisible(false)}>
            <div className="updateRoomModal-name">
              <label>T??n</label>
              <Input className="input-name" value={formik.values.name} onChange={formik.handleChange} name="name" allowClear />
            </div>
            <div className="updateRoomModal-location">
              <label>Thu???c v??? tr??</label>
              <Select defaultValue={roomDetail.locationId?.name} style={{ width: "100%" }} onChange={handleChangeSelect}>
                {locationList.map((location, index) => (
                  <Option value={location.name} key={index}>
                    {location.name}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="updateRoomModal-description">
              <label>M?? t???</label>
              <Input className="input-description" value={formik.values.description} onChange={formik.handleChange} name="description" allowClear />
            </div>
            <div className="updateRoomModal-price">
              <label>Gi?? ti???n</label>
              <Input className="input-price" value={formik.values.price} onChange={formik.handleChange} name="price" allowClear />
            </div>
            <div className="updateRoomModal-guests">
              <label>S??? kh??ch</label>
              <Input className="input-guests" value={formik.values.guests} onChange={formik.handleChange} name="guests" allowClear />
            </div>
            <div className="updateRoomModal-bedRoom">
              <label>S??? ph??ng ng???</label>
              <Input className="input-bedRoom" value={formik.values.bedRoom} onChange={formik.handleChange} name="bedRoom" allowClear />
            </div>
            <div className="updateRoomModal-bath">
              <label>S??? ph??ng t???m</label>
              <Input className="input-bath" value={formik.values.bath} onChange={formik.handleChange} name="bath" allowClear />
            </div>
            <div className="updateRoomModal-furniture">
              <label>Ti???n ??ch</label>
              <br />
              <Checkbox id="cb0" onChange={handleChangeCheckbox} defaultChecked={furnitureStatus[0]}>
                TV
              </Checkbox>
              <Checkbox id="cb1" onChange={handleChangeCheckbox} defaultChecked={furnitureStatus[1]}>
                Dryer
              </Checkbox>
              <Checkbox id="cb2" onChange={handleChangeCheckbox} defaultChecked={furnitureStatus[2]}>
                Elevator
              </Checkbox>
              <Checkbox id="cb3" onChange={handleChangeCheckbox} defaultChecked={furnitureStatus[3]}>
                Gym
              </Checkbox>
              <Checkbox id="cb4" onChange={handleChangeCheckbox} defaultChecked={furnitureStatus[4]}>
                Heating
              </Checkbox>
              <Checkbox id="cb5" onChange={handleChangeCheckbox} defaultChecked={furnitureStatus[5]}>
                Hottub
              </Checkbox>
              <Checkbox id="cb6" onChange={handleChangeCheckbox} defaultChecked={furnitureStatus[6]}>
                Indoor Fireplace
              </Checkbox>
              <Checkbox id="cb7" onChange={handleChangeCheckbox} defaultChecked={furnitureStatus[7]}>
                Kitchen
              </Checkbox>
              <Checkbox id="cb8" onChange={handleChangeCheckbox} defaultChecked={furnitureStatus[8]}>
                Pool
              </Checkbox>
              <Checkbox id="cb9" onChange={handleChangeCheckbox} defaultChecked={furnitureStatus[9]}>
                Wifi
              </Checkbox>
            </div>
          </Modal>
          <Modal title="C???p nh???t h??nh ???nh ph??ng cho thu??" centered visible={modalVisible2} okText="C???p nh???t" onOk={() => uploadImage(rid)} onCancel={() => setModalVisible2(false)}>
            <input type="file" name="file" id={`file-${rid}`} accept="image/*" />
          </Modal>
          <Modal title="Ch???nh s???a ????nh gi??" centered visible={modalVisible3} okText="OK" onOk={formik2.handleSubmit} onCancel={() => setModalVisible3(false)}>
            <div className="updateReview-content">
              <Input value={formik2.values.content} onChange={formik2.handleChange} name="content" allowClear />
            </div>
          </Modal>
          <Modal title="C???p nh???t th??ng tin v??" visible={modalVisible4} okText="OK" onOk={() => editTicket()} onCancel={() => setModalVisible4(false)}>
            <div className="booking-time">
              <RangePicker value={timeRange} showTime format="DD/MM/YYYY HH:mm" style={{ width: "100%" }} onChange={(v) => setTimeRange(v)} />
            </div>
          </Modal>
          <Modal title="T???o v??" visible={modalVisible5} okText="OK" onOk={() => createTicket()} onCancel={() => setModalVisible5(false)}>
            <div className="booking-time">
              <RangePicker showTime format="DD/MM/YYYY HH:mm" style={{ width: "100%" }} onChange={(v) => setTimeRange2(v)} />
            </div>
            <div className="booking-userId">
              <label>ID c???a user</label>
              <Input className="input-id" name="id" allowClear id="input-user-id" />
            </div>
          </Modal>
        </>
      );
    }
  }
}
