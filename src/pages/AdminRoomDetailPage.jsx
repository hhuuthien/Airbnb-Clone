import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Checkbox, Descriptions, Image, Input, message, Modal, Select } from "antd";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getLocationAPI } from "../redux/actions/locationAction";
import { deleteRoom, getRoomDetail, updateRoom, uploadImageRoom } from "../redux/actions/roomAction";
import { CLEAR_ROOM_DETAIL, DELETE_ROOM_END, UPDATE_ROOM_END } from "../redux/const/constant";
import { ACCESS_TOKEN, USER_LOGIN } from "../util/setting";
const { Option } = Select;

export default function AdminRoomDetailPage(props) {
  const dispatch = useDispatch();
  const { roomDetail, updateStatus, deleteStatus } = useSelector((root) => root.roomReducer);
  const { locationList } = useSelector((root) => root.locationReducer);
  const { user } = useSelector((state) => state.accountReducer);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);

  const [location, setLocation] = useState("");

  const [furnitureStatus, setFurnitureStatus] = useState([false, false, false, false, false, false, false, false, false, false]);

  const rid = props.match.params.rid;

  useEffect(() => {
    dispatch(getRoomDetail(rid));
    dispatch(getLocationAPI());

    return () => {
      dispatch({ type: CLEAR_ROOM_DETAIL });
    };
  }, []);

  useEffect(() => {
    if (updateStatus === "success") {
      message.success("Cập nhật thành công");
      dispatch({
        type: UPDATE_ROOM_END,
      });
    } else if (updateStatus === "fail") {
      message.error("Cập nhật không thành công. Vui lòng thử lại sau");
      dispatch({
        type: UPDATE_ROOM_END,
      });
    }
  }, [updateStatus]);

  useEffect(() => {
    if (deleteStatus === "success") {
      message.success("Xoá thành công");
      dispatch({
        type: DELETE_ROOM_END,
      });
      props.history.goBack();
    } else if (deleteStatus === "fail") {
      message.error("Xoá không thành công. Vui lòng thử lại sau");
      dispatch({
        type: DELETE_ROOM_END,
      });
    }
  }, [deleteStatus]);

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

      // convert từ tên vị trí sang id vị trí theo yêu cầu của API
      const locationNew = locationList.find((item) => item.name && item.name === location); // là location mới của room nếu thay đổi
      const id = locationNew._id;

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
      title: "Xoá phòng",
      icon: <QuestionCircleOutlined />,
      content: `Bạn có muốn xoá phòng "${name}" không?`,
      okText: "Xoá",
      cancelText: "Cancel",
      onOk() {
        dispatch(deleteRoom(id));
      },
    });
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
          <div className="admin-room-detail-page">
            <div className="container">
              <div className="content">
                <div className="action">
                  <Button type="primary" onClick={showModal}>
                    Cập nhật thông tin
                  </Button>
                  <Button type="primary" onClick={showModal2} style={{ marginLeft: 5 }}>
                    Cập nhật hình ảnh
                  </Button>
                  <Button type="primary" danger onClick={() => confirmToDelete(roomDetail.name, rid)} style={{ marginLeft: 5 }}>
                    Xoá
                  </Button>
                </div>
                <Descriptions bordered column={1}>
                  <Descriptions.Item label="ID">{roomDetail._id}</Descriptions.Item>
                  <Descriptions.Item label="Tên">{roomDetail.name}</Descriptions.Item>
                  <Descriptions.Item label="Thuộc vị trí">{roomDetail.locationId?.name}</Descriptions.Item>
                  <Descriptions.Item label="Mô tả">{roomDetail.description}</Descriptions.Item>
                  <Descriptions.Item label="Giá tiền">{roomDetail.price?.toLocaleString()}</Descriptions.Item>
                  <Descriptions.Item label="Số khách">{roomDetail.guests}</Descriptions.Item>
                  <Descriptions.Item label="Số phòng ngủ">{roomDetail.bedRoom}</Descriptions.Item>
                  <Descriptions.Item label="Số phòng tắm">{roomDetail.bath}</Descriptions.Item>
                  <Descriptions.Item label="TV">{roomDetail.cableTV ? "Có" : "Không"}</Descriptions.Item>
                  <Descriptions.Item label="Dryer">{roomDetail.dryer ? "Có" : "Không"}</Descriptions.Item>
                  <Descriptions.Item label="Elevator">{roomDetail.elevator ? "Có" : "Không"}</Descriptions.Item>
                  <Descriptions.Item label="Gym">{roomDetail.gym ? "Có" : "Không"}</Descriptions.Item>
                  <Descriptions.Item label="Heating">{roomDetail.heating ? "Có" : "Không"}</Descriptions.Item>
                  <Descriptions.Item label="Hottub">{roomDetail.hotTub ? "Có" : "Không"}</Descriptions.Item>
                  <Descriptions.Item label="Indoor Fireplace">{roomDetail.indoorFireplace ? "Có" : "Không"}</Descriptions.Item>
                  <Descriptions.Item label="Kitchen">{roomDetail.kitchen ? "Có" : "Không"}</Descriptions.Item>
                  <Descriptions.Item label="Pool">{roomDetail.pool ? "Có" : "Không"}</Descriptions.Item>
                  <Descriptions.Item label="Wifi">{roomDetail.wifi ? "Có" : "Không"}</Descriptions.Item>
                  <Descriptions.Item label="Hình ảnh">
                    <Image width={150} src={roomDetail.image} fallback={"/img/airbnb-logo.png"} />
                  </Descriptions.Item>
                </Descriptions>
              </div>
            </div>
          </div>
          <Modal title="Cập nhật thông tin phòng cho thuê" centered visible={modalVisible} okText="Cập nhật" onOk={formik.handleSubmit} onCancel={() => setModalVisible(false)}>
            <div className="updateRoomModal-name">
              <label>Tên</label>
              <Input className="input-name" value={formik.values.name} onChange={formik.handleChange} name="name" allowClear />
            </div>
            <div className="updateRoomModal-location">
              <label>Thuộc vị trí</label>
              <Select defaultValue={roomDetail.locationId?.name} style={{ width: "100%" }} onChange={handleChangeSelect}>
                {locationList.map((location, index) => (
                  <Option value={location.name} key={index}>
                    {location.name}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="updateRoomModal-description">
              <label>Mô tả</label>
              <Input className="input-description" value={formik.values.description} onChange={formik.handleChange} name="description" allowClear />
            </div>
            <div className="updateRoomModal-price">
              <label>Giá tiền</label>
              <Input className="input-price" value={formik.values.price} onChange={formik.handleChange} name="price" allowClear />
            </div>
            <div className="updateRoomModal-guests">
              <label>Số khách</label>
              <Input className="input-guests" value={formik.values.guests} onChange={formik.handleChange} name="guests" allowClear />
            </div>
            <div className="updateRoomModal-bedRoom">
              <label>Số phòng ngủ</label>
              <Input className="input-bedRoom" value={formik.values.bedRoom} onChange={formik.handleChange} name="bedRoom" allowClear />
            </div>
            <div className="updateRoomModal-bath">
              <label>Số phòng tắm</label>
              <Input className="input-bath" value={formik.values.bath} onChange={formik.handleChange} name="bath" allowClear />
            </div>
            <div className="updateRoomModal-furniture">
              <label>Tiện ích</label>
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
          <Modal title="Cập nhật hình ảnh phòng cho thuê" centered visible={modalVisible2} okText="Cập nhật" onOk={() => uploadImage(rid)} onCancel={() => setModalVisible2(false)}>
            <input type="file" name="file" id={`file-${rid}`} accept="image/*" />
          </Modal>
        </>
      );
    }
  }
}
