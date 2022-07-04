import { Button, Image, Table } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getRoomByLocationAPI } from "../redux/actions/roomAction";
import { CLEAR_ROOM_LIST } from "../redux/const/constant";
import { ACCESS_TOKEN, USER_LOGIN } from "../util/setting";

export default function AdminRoomPage(props) {
  const dispatch = useDispatch();
  const { roomList } = useSelector((root) => root.roomReducer);
  const { user } = useSelector((state) => state.accountReducer);

  // Có những phòng không thuộc bất cứ địa điểm nào (có thể địa điểm chứa nó đã bị xoá)
  // locationId sẽ null, cần loại ra

  const roomListReal = roomList.filter((room) => room.locationId);
  console.log(roomListReal);

  useEffect(() => {
    dispatch(getRoomByLocationAPI(""));
    // không truyền location ID thì sẽ lấy được tất cả phòng cho thuê

    return () => {
      dispatch({ type: CLEAR_ROOM_LIST });
    };
  }, []);

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
            <div className="container">{renderRoomList(roomListReal)}</div>
          </div>
        </>
      );
    }
  }
}
