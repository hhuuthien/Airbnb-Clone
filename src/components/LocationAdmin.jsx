import { QuestionCircleOutlined } from "@ant-design/icons";
import { Alert, Button, Input, Modal, Menu, Dropdown } from "antd";
import { useFormik } from "formik";
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch } from "react-redux";
import * as YUB from "yup";
import { deleteLocationAPI, updateLocationAPI } from "../redux/actions/locationAction";

export default function LocationAdmin({ location }) {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setID] = useState("");
  const [name, setName] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [valueate, setValueate] = useState(0);

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

  const showModal = (location) => {
    setModalVisible(true);
    setName(location.name);
    setProvince(location.province);
    setCountry(location.country);
    setValueate(location.valueate);
    setID(location._id);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: name,
      province: province,
      country: country,
      valueate: valueate,
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
      dispatch(updateLocationAPI(id, values));
    },
  });

  const menu = (
    <Menu
      items={[
        {
          label: <div onClick={() => showModal(location)}>Chỉnh sửa</div>,
        },
        {
          label: <div>Đổi ảnh</div>,
        },
        {
          label: <div onClick={() => confirmToDelete(location.name, location._id)}>Xoá</div>,
        },
      ]}
    />
  );

  return (
    <div className="location-admin-card">
      <div className="data">
        <div className="image">
          <LazyLoadImage alt={location.name} src={location.image} />
        </div>
        <div className="info">
          <div className="name">{location.name}</div>
          <div className="star">
            {location.valueate}
            <i className="fa-regular fa-star"></i>
          </div>
          <div className="province-country">
            {location.province}, {location.country}
          </div>
        </div>
      </div>
      <div className="action">
        {window.innerWidth >= 576 ? (
          <>
            <Button type="primary" onClick={() => showModal(location)}>
              Chỉnh sửa
            </Button>
            <Button type="primary">Đổi ảnh</Button>
            <Button type="danger" onClick={() => confirmToDelete(location.name, location._id)}>
              Xoá
            </Button>
          </>
        ) : (
          <Dropdown overlay={menu} placement="bottomRight">
            <Button type="primary">
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </Button>
          </Dropdown>
        )}
      </div>
      <Modal
        id="updateLocationModal"
        title="Chỉnh sửa vị trí"
        centered
        ok
        visible={modalVisible}
        okText="Cập nhật"
        onOk={formik.handleSubmit}
        onCancel={() => setModalVisible(false)}
      >
        <div className="updateLocationModal-name">
          <label>Tên vị trí</label>
          <Input className="input-name" value={formik.values.name} onChange={formik.handleChange} name="name" allowClear />
          {formik.errors.name ? <Alert style={{ marginTop: 4 }} message={formik.errors.name} type="error" showIcon /> : null}
        </div>
        {/*  */}
        <div className="updateLocationModal-province">
          <label>Tỉnh thành</label>
          <Input className="input-province" value={formik.values.province} onChange={formik.handleChange} name="province" allowClear />
          {formik.errors.province ? <Alert style={{ marginTop: 4 }} message={formik.errors.province} type="error" showIcon /> : null}
        </div>
        {/*  */}
        <div className="updateLocationModal-country">
          <label>Quốc gia</label>
          <Input className="input-country" value={formik.values.country} onChange={formik.handleChange} name="country" allowClear />
          {formik.errors.country ? <Alert style={{ marginTop: 4 }} message={formik.errors.country} type="error" showIcon /> : null}
        </div>
        {/*  */}
        <div className="updateLocationModal-valueate">
          <label>Đánh giá</label>
          <Input className="input-valueate" value={formik.values.valueate} onChange={formik.handleChange} name="valueate" allowClear />
          {formik.errors.valueate ? <Alert style={{ marginTop: 4 }} message={formik.errors.valueate} type="error" showIcon /> : null}
        </div>
      </Modal>
    </div>
  );
}
