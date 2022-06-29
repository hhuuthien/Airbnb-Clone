import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Descriptions, Image, Input, message, Modal } from "antd";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteLocationAPI, getLocationDetailAPI, updateLocationAPI, uploadImageLocationAPI } from "../redux/actions/locationAction";
import { CLEAR_LOCATION_DETAIL, DELETE_LOCATION_END, UPDATE_LOCATION_END } from "../redux/const/constant";

export default function AdminLocationDetailPage(props) {
  const dispatch = useDispatch();
  const { locationDetail, updateStatus, deleteStatus } = useSelector((root) => root.locationReducer);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);

  const lid = props.match.params.lid;

  useEffect(() => {
    dispatch(getLocationDetailAPI(lid));
    return () => {
      dispatch({
        type: CLEAR_LOCATION_DETAIL,
      });
    };
  }, []);

  if (updateStatus === "success") {
    message.success("Cập nhật thành công");
    dispatch({
      type: UPDATE_LOCATION_END,
    });
  } else if (updateStatus === "fail") {
    message.error("Cập nhật không thành công. Vui lòng thử lại sau");
    dispatch({
      type: UPDATE_LOCATION_END,
    });
  }

  if (deleteStatus === "success") {
    message.success("Xoá thành công");
    dispatch({
      type: DELETE_LOCATION_END,
    });
    props.history.goBack();
  } else if (deleteStatus === "fail") {
    message.error("Xoá không thành công. Vui lòng thử lại sau");
    dispatch({
      type: DELETE_LOCATION_END,
    });
  }

  const confirmToDelete = (name, id) => {
    Modal.confirm({
      title: "Xoá vị trí",
      icon: <QuestionCircleOutlined />,
      content: `Bạn có muốn xoá vị trí "${name}" không?`,
      okText: "Xoá",
      cancelText: "Cancel",
      onOk() {
        dispatch(deleteLocationAPI(id));
      },
    });
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const showModal2 = () => {
    setModalVisible2(true);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: locationDetail.name,
      province: locationDetail.province,
      country: locationDetail.country,
      valueate: locationDetail.valueate,
    },
    onSubmit: (values) => {
      setModalVisible(false);
      formik.handleReset();
      dispatch(updateLocationAPI(lid, values));
    },
  });

  const uploadImage = (id) => {
    setModalVisible2(false);
    const file = document.getElementById(`file-${id}`).files[0];
    dispatch(uploadImageLocationAPI(id, file));
  };

  return (
    <>
      <div className="admin-location-detail-page">
        <div className="container">
          <div className="content">
            <div className="action">
              <Button type="primary" onClick={showModal}>
                Cập nhật thông tin
              </Button>
              <Button type="primary" onClick={showModal2} style={{ marginLeft: 5 }}>
                Cập nhật hình ảnh
              </Button>
              <Button type="primary" danger onClick={() => confirmToDelete(locationDetail.name, lid)} style={{ marginLeft: 5 }}>
                Xoá
              </Button>
            </div>
            <Descriptions bordered column={1}>
              <Descriptions.Item label="ID">{locationDetail._id}</Descriptions.Item>
              <Descriptions.Item label="Tên">{locationDetail.name}</Descriptions.Item>
              <Descriptions.Item label="Hình ảnh">
                <Image width={150} src={locationDetail.image} fallback={"/img/airbnb-logo.png"} />
              </Descriptions.Item>
              <Descriptions.Item label="Tỉnh thành">{locationDetail.province}</Descriptions.Item>
              <Descriptions.Item label="Quốc gia">{locationDetail.country}</Descriptions.Item>
              <Descriptions.Item label="Đánh giá">
                <>
                  <i className="fa-regular fa-star" style={{ marginRight: 5 }}></i>
                  <span>{locationDetail.valueate}</span>
                </>
              </Descriptions.Item>
            </Descriptions>
          </div>
        </div>
      </div>
      <Modal title="Cập nhật thông tin vị trí" centered visible={modalVisible} okText="Cập nhật" onOk={formik.handleSubmit} onCancel={() => setModalVisible(false)}>
        <div className="updateLocationModal-name">
          <label>Tên vị trí</label>
          <Input className="input-name" value={formik.values.name} onChange={formik.handleChange} name="name" allowClear />
        </div>
        <div className="updateLocationModal-province">
          <label>Tỉnh thành</label>
          <Input className="input-province" value={formik.values.province} onChange={formik.handleChange} name="province" allowClear />
        </div>
        <div className="updateLocationModal-country">
          <label>Quốc gia</label>
          <Input className="input-country" value={formik.values.country} onChange={formik.handleChange} name="country" allowClear />
        </div>
        <div className="updateLocationModal-valueate">
          <label>Đánh giá</label>
          <Input className="input-valueate" value={formik.values.valueate} onChange={formik.handleChange} name="valueate" allowClear />
        </div>
      </Modal>
      <Modal title="Cập nhật hình ảnh vị trí" centered visible={modalVisible2} okText="Cập nhật" onOk={() => uploadImage(lid)} onCancel={() => setModalVisible2(false)}>
        <input type="file" name="file" id={`file-${lid}`} accept="image/*" />
      </Modal>
    </>
  );
}
