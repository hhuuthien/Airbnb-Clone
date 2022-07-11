import { Button, Image, message, Modal, Tag, Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getTicketByUser } from "../redux/actions/ticketAction";
import { updateUserImageAPI } from "../redux/actions/userAction";
import { UPDATE_USER_AVATAR_END } from "../redux/const/constant";
import { ACCESS_TOKEN, USER_LOGIN } from "../util/setting";

export default function AccountPage() {
  // Nếu chưa đăng nhập, redirect về trang login để người dùng đăng nhập
  // Nếu đã đăng nhập thì ở lại trang này render thông tin ra
  // Điều kiện đã đăng nhập phải có đủ: USER_LOGIN, ACCESS_TOKEN và user trong redux

  const dispatch = useDispatch();
  const { user, uploadAvatarStatus } = useSelector((state) => state.accountReducer);
  const { userTicket } = useSelector((state) => state.ticketReducer);
  console.log(userTicket);

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    dispatch(getTicketByUser(user._id));
  }, []);

  useEffect(() => {
    if (uploadAvatarStatus === "success") {
      message.success("Cập nhật ảnh đại diện thành công");
      dispatch({
        type: UPDATE_USER_AVATAR_END,
      });
    } else if (uploadAvatarStatus === "fail") {
      message.error("Cập nhật không thành công. Vui lòng thử lại sau");
      dispatch({
        type: UPDATE_USER_AVATAR_END,
      });
    }
  }, [uploadAvatarStatus]);

  if (!localStorage.getItem(USER_LOGIN) || !localStorage.getItem(ACCESS_TOKEN) || !user.email) {
    return <Redirect to="/login" />;
  }

  const color = user.type === "ADMIN" ? "blue" : "green";

  const showModal = () => {
    setModalVisible(true);
  };

  const handleChangeImage = () => {
    setModalVisible(false);
    const img = document.getElementById("account-page-file").files[0];
    dispatch(updateUserImageAPI(img));
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
  ];

  const renderTicketHistory = (list) => {
    return (
      <div className="ticket-list">
        <Table columns={tableColumns} dataSource={list} bordered rowKey={(record) => record._id} />
      </div>
    );
  };

  return (
    <>
      <div className="account-page">
        <div className="container">
          <div className="action">
            <Button type="primary" disabled>
              Cập nhật thông tin
            </Button>
            <Button type="primary" style={{ marginLeft: 5 }} onClick={showModal}>
              Cập nhật ảnh đại diện
            </Button>
            <Button type="primary" disabled style={{ marginLeft: 5 }}>
              Xoá
            </Button>
          </div>
          <div className="info">
            <div className="avatar">
              <Image width={"100%"} height={"100%"} alt={user.name} src={user.avatar || "/img/user-blank-color.png"} fallback={"/img/user-blank.png"} />
            </div>
            <div className="data">
              <div className="name">{user.name || "Người dùng chưa đặt tên"}</div>
              <div className="type">
                <Tag color={color}>{user.type}</Tag>
              </div>
              <div className="email">
                <i className="fa-solid fa-envelope"></i>
                {user.email || "Không có thông tin"}
              </div>
              <div className="phone">
                <i className="fa-solid fa-phone-flip"></i>
                {user.phone || "Không có thông tin"}
              </div>
              <div className="address">
                <i className="fa-solid fa-location-dot"></i>
                {user.address || "Không có thông tin"}
              </div>
            </div>
          </div>
          <div className="ticket">
            <h3 style={{ fontWeight: "bold" }}>Lịch sử đặt phòng</h3>
            {renderTicketHistory(userTicket)}
          </div>
        </div>
      </div>
      <Modal title="Cập nhật ảnh đại diện" centered visible={modalVisible} okText="Cập nhật" onOk={handleChangeImage} onCancel={() => setModalVisible(false)}>
        <input type="file" name="file" id="account-page-file" accept="image/*" />
      </Modal>
    </>
  );
}
