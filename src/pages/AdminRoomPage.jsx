import { Button, Checkbox, Image, Input, Modal, Select, Table, message } from "antd";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getLocationAPI } from "../redux/actions/locationAction";
import { createRoom, getRoomByLocationAPI } from "../redux/actions/roomAction";
import { CLEAR_ROOM_LIST, CREATE_ROOM_END } from "../redux/const/constant";
import { ACCESS_TOKEN, USER_LOGIN } from "../util/setting";
const { Option } = Select;

export default function AdminRoomPage(props) {
  const dispatch = useDispatch();
  const { roomList, createStatus } = useSelector((root) => root.roomReducer);
  const { locationList } = useSelector((root) => root.locationReducer);
  const { user } = useSelector((state) => state.accountReducer);

  const [modalVisible, setModalVisible] = useState(false);
  const [location, setLocation] = useState("");
  const [furnitureStatus, setFurnitureStatus] = useState([false, false, false, false, false, false, false, false, false, false]);

  // Có những phòng không thuộc bất cứ địa điểm nào (có thể địa điểm chứa nó đã bị xoá)
  // locationId sẽ null, cần loại ra

  const roomListReal = roomList.filter((room) => room.locationId);

  useEffect(() => {
    dispatch(getRoomByLocationAPI(""));
    // không truyền location ID thì sẽ lấy được tất cả phòng cho thuê
    dispatch(getLocationAPI());

    return () => {
      dispatch({ type: CLEAR_ROOM_LIST });
    };
  }, []);

  useEffect(() => {
    if (createStatus === "success") {
      message.success("Tạo phòng thành công");
      dispatch({
        type: CREATE_ROOM_END,
      });
    } else if (createStatus === "fail") {
      message.error("Tạo phòng không thành công. Vui lòng thử lại sau");
      dispatch({
        type: CREATE_ROOM_END,
      });
    }
  }, [createStatus]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      description: "",
      price: "",
      guests: "",
      bedRoom: "",
      bath: "",
    },
    onSubmit: (values) => {
      setModalVisible(false);
      formik.handleReset();
      // convert từ tên vị trí sang id vị trí theo yêu cầu của API
      const locationOfThisRoom = locationList.find((item) => item.name && item.name === location);
      const id = locationOfThisRoom._id;
      // values là những giá trị lấy được từ formik
      // fullValues là những giá trị bổ sung thêm theo yêu cầu của API
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
      dispatch(createRoom(fullValues, locationOfThisRoom));
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
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (_, record) => {
        return <Image width={100} src={record.image} fallback={"/img/airbnb-logo.png"} />;
      },
    },
    {
      title: "Vị trí",
      render: (_, record) => {
        return record.locationId.name;
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
              props.history.push("/room/" + record._id);
            }}
          >
            Xem chi tiết
          </Button>
        );
      },
    },
  ];

  const renderRoomList = (list) => {
    return (
      <div className="room-list">
        <Table columns={tableColumns} dataSource={list} bordered rowKey={(record) => record._id} />
      </div>
    );
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

  // Nếu chưa đăng nhập hoặc đã đăng nhập nhưng không phải tài khoản admin --> redirect
  if (!localStorage.getItem(USER_LOGIN) || !localStorage.getItem(ACCESS_TOKEN) || !user.email) {
    return <Redirect to="/admin" />;
  } else {
    if (user.type !== "ADMIN") {
      return <Redirect to="/admin" />;
    } else {
      return (
        <>
          <div className="admin-room-page">
            <div className="container">
              <Button type="primary" style={{ marginTop: 30 }} className="create-room" onClick={() => setModalVisible(true)}>
                <i className="fa-solid fa-circle-plus"></i>
                Tạo phòng mới
              </Button>
              {renderRoomList(roomListReal)}
            </div>
          </div>
          <Modal title="Tạo phòng cho thuê" centered visible={modalVisible} okText="Tạo phòng" onOk={formik.handleSubmit} onCancel={() => setModalVisible(false)}>
            <div className="createRoomModal-name">
              <label>Tên</label>
              <Input className="input-name" value={formik.values.name} onChange={formik.handleChange} name="name" allowClear />
            </div>
            <div className="createRoomModal-location">
              <label>Thuộc vị trí</label>
              <Select style={{ width: "100%" }} onChange={handleChangeSelect}>
                {locationList.map((location, index) => (
                  <Option value={location.name} key={index}>
                    {location.name}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="createRoomModal-description">
              <label>Mô tả</label>
              <Input className="input-description" value={formik.values.description} onChange={formik.handleChange} name="description" allowClear />
            </div>
            <div className="createRoomModal-price">
              <label>Giá tiền</label>
              <Input className="input-price" value={formik.values.price} onChange={formik.handleChange} name="price" allowClear />
            </div>
            <div className="createRoomModal-guests">
              <label>Số khách</label>
              <Input className="input-guests" value={formik.values.guests} onChange={formik.handleChange} name="guests" allowClear />
            </div>
            <div className="createRoomModal-bedRoom">
              <label>Số phòng ngủ</label>
              <Input className="input-bedRoom" value={formik.values.bedRoom} onChange={formik.handleChange} name="bedRoom" allowClear />
            </div>
            <div className="createRoomModal-bath">
              <label>Số phòng tắm</label>
              <Input className="input-bath" value={formik.values.bath} onChange={formik.handleChange} name="bath" allowClear />
            </div>
            <div className="createRoomModal-furniture">
              <label>Tiện ích</label>
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
        </>
      );
    }
  }
}
