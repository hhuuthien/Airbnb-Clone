import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Button, Modal } from "antd";
import { deleteLocationAPI } from "../redux/actions/locationAction";
import { useDispatch } from "react-redux";
import { QuestionCircleOutlined } from "@ant-design/icons";

export default function LocationAdmin({ location }) {
  const dispatch = useDispatch();

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
        <Button type="primary" size="medium">
          Chỉnh sửa
        </Button>
        <Button type="danger" size="medium" onClick={() => confirmToDelete(location.name, location._id)}>
          Xoá
        </Button>
      </div>
    </div>
  );
}
