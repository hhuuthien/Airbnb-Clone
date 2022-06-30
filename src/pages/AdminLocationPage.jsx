import { Alert, Button, Image, Input, message, Modal, Table } from "antd";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as YUB from "yup";
import { createLocationAPI, getLocationAPI } from "../redux/actions/locationAction";
import { CREATE_LOCATION_END } from "../redux/const/constant";

export default function AdminLocationPage(props) {
  const dispatch = useDispatch();
  const { locationList, createStatus } = useSelector((state) => state.locationReducer);

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    dispatch(getLocationAPI());
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      province: "",
      country: "",
      valueate: "",
    },
    validationSchema: YUB.object({
      name: YUB.string().required("Không được để trống ô này"),
      province: YUB.string().required("Không được để trống ô này"),
      country: YUB.string().required("Không được để trống ô này"),
      valueate: YUB.number()
        .required("Không được để trống ô này")
        .positive("Phải nhập số nguyên từ 0 đến 10")
        .integer("Phải nhập số nguyên từ 0 đến 10")
        .lessThan(11, "Phải nhập số nguyên từ 0 đến 10")
        .moreThan(-1, "Phải nhập số nguyên từ 0 đến 10"),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      setModalVisible(false);
      formik.handleReset();
      const fileImage = document.getElementById("createLocationModal-image").files[0];
      dispatch(createLocationAPI(values, fileImage));
    },
  });

  useEffect(() => {
    if (createStatus === "success") {
      message.success("Tạo vị trí thành công");
      dispatch({
        type: CREATE_LOCATION_END,
      });
    } else if (createStatus === "fail") {
      message.error("Tạo vị trí không thành công. Vui lòng thử lại sau");
      dispatch({
        type: CREATE_LOCATION_END,
      });
    }
  }, [createStatus]);

  // props.history.action === "PUSH": user đến đây từ trang admin home bằng phương thức push -> hợp lệ
  // props.history.action === "POP": user tự nhập URL (không thể xác định có đăng nhập hay chưa) -> không hợp lệ
  if (props.history.action !== "PUSH") {
    return <Redirect to="/admin" />;
  }

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
      title: "Tỉnh thành",
      dataIndex: "province",
      key: "province",
    },
    {
      title: "Quốc gia",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Đánh giá",
      dataIndex: "valueate",
      key: "valueate",
      render: (_, record) => {
        return (
          <>
            <i className="fa-regular fa-star" style={{ marginRight: 5 }}></i>
            <span>{record.valueate}</span>
          </>
        );
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
              props.history.push("/location/" + record._id);
            }}
          >
            Xem chi tiết
          </Button>
        );
      },
    },
  ];

  const renderLocationList = () => {
    return (
      <div className="location-list">
        <Table columns={tableColumns} dataSource={locationList} bordered rowKey={(record) => record._id} />
      </div>
    );
  };

  return (
    <>
      <div className="admin-location-page">
        <div className="container">
          <Button type="primary" style={{ marginTop: 30 }} className="create-location" onClick={() => setModalVisible(true)}>
            <i className="fa-solid fa-circle-plus"></i>
            Tạo vị trí mới
          </Button>
          {renderLocationList()}
        </div>
      </div>
      <Modal
        title="Tạo vị trí"
        centered
        visible={modalVisible}
        okText="Tạo vị trí"
        onOk={formik.handleSubmit}
        onCancel={() => {
          setModalVisible(false);
          formik.handleReset();
        }}
      >
        <div className="createLocationModal-name">
          <label>Tên vị trí</label>
          <Input className="input-name" value={formik.values.name} onChange={formik.handleChange} name="name" allowClear />
          {formik.errors.name ? <Alert style={{ marginTop: 4 }} message={formik.errors.name} type="error" showIcon /> : null}
        </div>
        <div className="createLocationModal-province">
          <label>Tỉnh thành</label>
          <Input className="input-province" value={formik.values.province} onChange={formik.handleChange} name="province" allowClear />
          {formik.errors.province ? <Alert style={{ marginTop: 4 }} message={formik.errors.province} type="error" showIcon /> : null}
        </div>
        <div className="createLocationModal-country">
          <label>Quốc gia</label>
          <Input className="input-country" value={formik.values.country} onChange={formik.handleChange} name="country" allowClear />
          {formik.errors.country ? <Alert style={{ marginTop: 4 }} message={formik.errors.country} type="error" showIcon /> : null}
        </div>
        <div className="createLocationModal-valueate">
          <label>Đánh giá</label>
          <Input className="input-valueate" value={formik.values.valueate} onChange={formik.handleChange} name="valueate" allowClear />
          {formik.errors.valueate ? <Alert style={{ marginTop: 4 }} message={formik.errors.valueate} type="error" showIcon /> : null}
        </div>
        <div className="createLocationModal-image">
          <label>Hình ảnh</label>
          <br />
          <input type="file" name="file" id="createLocationModal-image" accept="image/*" />
        </div>
      </Modal>
    </>
  );
}
