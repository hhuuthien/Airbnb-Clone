import { DeleteOutlined, EditOutlined, HomeOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Avatar, Breadcrumb, Button, Comment, DatePicker, Image, Input, message, Modal } from "antd";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Room from "../components/Room";
import { createReview, getReview } from "../redux/actions/reviewAction";
import { getRoomDetail } from "../redux/actions/roomAction";
import { bookRoom, getTicketByUserInRoom } from "../redux/actions/ticketAction";
import { BOOKING_ROOM_END, CLEAR_ROOM_DETAIL, CLEAR_TICKET_BY_USER, CREATE_REVIEW_END } from "../redux/const/constant";
import { ACCESS_TOKEN, USER_LOGIN } from "../util/setting";

const { TextArea } = Input;
const { RangePicker } = DatePicker;

export default function RoomDetailPage(props) {
  const { roomDetail, roomList } = useSelector((root) => root.roomReducer);
  const { reviewList, createReviewStatus } = useSelector((root) => root.reviewReducer);
  const { bookingStatus, userTicketInThisRoom } = useSelector((root) => root.ticketReducer);
  const { user } = useSelector((root) => root.accountReducer);
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [timeRange, setTimeRange] = useState([]);

  const rid = props.match.params.rid;

  useEffect(() => {
    dispatch(getRoomDetail(rid));
    dispatch(getReview(rid));
    // lấy những ticket của user trong 1 phòng
    if (localStorage.getItem(USER_LOGIN) && localStorage.getItem(ACCESS_TOKEN) && user.email) dispatch(getTicketByUserInRoom(user._id, rid));
    return () => {
      dispatch({
        type: CLEAR_ROOM_DETAIL,
      });
      dispatch({
        type: CLEAR_TICKET_BY_USER,
      });
    };
  }, [props.match.params]);

  useEffect(() => {
    if (createReviewStatus === "success") {
      message.success("Gửi đánh giá thành công");
      dispatch({
        type: CREATE_REVIEW_END,
      });
    } else if (createReviewStatus === "fail") {
      message.error("Gửi đánh giá không thành công. Vui lòng thử lại sau");
      dispatch({
        type: CREATE_REVIEW_END,
      });
    }
  }, [createReviewStatus]);

  useEffect(() => {
    if (bookingStatus === "success") {
      message.success("Đặt phòng thành công");
      dispatch({
        type: BOOKING_ROOM_END,
      });
    } else if (bookingStatus === "fail") {
      message.error("Đặt phòng không thành công. Vui lòng thử lại sau");
      dispatch({
        type: BOOKING_ROOM_END,
      });
    }
    if (localStorage.getItem(USER_LOGIN) && localStorage.getItem(ACCESS_TOKEN) && user.email) dispatch(getTicketByUserInRoom(user._id, rid));
  }, [bookingStatus]);

  const checkTicket = () => {
    // Kiểm tra xem user đang đăng nhập có đặt phòng này không, nếu có thì hiện tại có đang trong thời gian đặt phòng không
    if (userTicketInThisRoom.length !== 0) {
      const now = Date.now();

      // const historyTickets = userTicketInThisRoom.filter((ticket) => Date.parse(ticket.checkIn) < now && Date.parse(ticket.checkOut) < now);
      const currentTickets = userTicketInThisRoom.filter((ticket) => Date.parse(ticket.checkIn) < now && Date.parse(ticket.checkOut) > now);
      // const futureTickets = userTicketInThisRoom.filter((ticket) => Date.parse(ticket.checkIn) > now && Date.parse(ticket.checkOut) > now);

      if (currentTickets.length !== 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  let furnitureList = []; // gom hết tiện ích vô mảng này, chuyển thành obj có tên và hình ảnh
  roomDetail.wifi && furnitureList.push({ name: "Wifi", img: "/img/furniture/wifi.png" });
  roomDetail.cableTV && furnitureList.push({ name: "TV", img: "/img/furniture/tv.png" });
  roomDetail.elevator && furnitureList.push({ name: "Elevator", img: "/img/furniture/elevator.png" });
  roomDetail.pool && furnitureList.push({ name: "Pool", img: "/img/furniture/pool.png" });
  roomDetail.gym && furnitureList.push({ name: "Gym", img: "/img/furniture/gym.png" });
  roomDetail.kitchen && furnitureList.push({ name: "Kitchen", img: "/img/furniture/kitchen.png" });
  roomDetail.dryer && furnitureList.push({ name: "Dryer", img: "/img/furniture/dryer.png" });
  roomDetail.heating && furnitureList.push({ name: "Heating", img: "/img/furniture/heat.png" });
  roomDetail.hotTub && furnitureList.push({ name: "Hot tub", img: "/img/furniture/tub.png" });
  roomDetail.indoorFireplace && furnitureList.push({ name: "Indoor fireplace", img: "/img/furniture/fireplace.png" });

  const renderFurniture = (list) => {
    return list.map((item, index) => {
      return (
        <div key={index} className="furniture-item">
          <img className="furniture" src={item.img} alt={item.name} />
          <span>{item.name}</span>
        </div>
      );
    });
  };

  const renderBreadcrumb = () => {
    return (
      <div className="breadcrumb" style={{ marginBottom: 30 }}>
        <Breadcrumb>
          <Breadcrumb.Item href="/">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item>{roomDetail.locationId.name}</Breadcrumb.Item>
          <Breadcrumb.Item>{roomDetail.name}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    );
  };

  const formik2 = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: "",
      content: "",
    },
    onSubmit: (values) => {
      setModalVisible(false);
      formik.handleReset();
      // dispatch(editReview(values.id, values.content));
      //
      // Tính năng này tạm thời không hoạt động
      // Người dùng bình thường không thể chỉnh sửa đánh giá của mình
      // Do API yêu cầu token admin
      window.alert("Tính năng này tạm thời không hoạt động. Xem console log để biết thêm chi tiết.");
      console.log("Người dùng (client) không thể chỉnh sửa đánh giá của mình do API yêu cầu phải có token admin.");
    },
  });

  const onDeleteReview = (id, content) => {
    Modal.confirm({
      title: "Xoá đánh giá",
      icon: <QuestionCircleOutlined />,
      content: `Bạn có muốn xoá đánh giá này không?`,
      okText: "Xoá",
      cancelText: "Cancel",
      onOk: () => {
        // Tính năng này tạm thời không hoạt động
        // Người dùng bình thường không thể xoá đánh giá của mình
        // Do API yêu cầu token admin
        window.alert("Tính năng này tạm thời không hoạt động. Xem console log để biết thêm chi tiết.");
        console.log("Người dùng (client) không thể xoá đánh giá của mình do API yêu cầu phải có token admin.");
      },
    });
  };

  const onEditReview = (id, content) => {
    setModalVisible(true);
    formik2.setFieldValue("content", content);
    formik2.setFieldValue("id", id);
  };

  const renderReview = () => {
    return reviewList.map((item, index) => {
      const dateString = item.updatedAt;
      const timeStamp = Date.parse(dateString);
      const dateObject = new Date(timeStamp);
      const day = dateObject.getDate();
      const month = dateObject.getMonth() + 1;
      const year = dateObject.getFullYear();

      return (
        <div className="review-item" key={index}>
          {item.userId && item.userId._id === user._id ? (
            <Comment
              actions={[<DeleteOutlined onClick={() => onDeleteReview(item._id, item.content)} />, <EditOutlined onClick={() => onEditReview(item._id, item.content)} />]}
              author={item.userId === null ? "Người dùng ẩn danh" : item.userId.name}
              avatar={item.userId === null ? <Avatar src="/img/user-blank.png" /> : <Avatar src={item.userId.avatar} />}
              content={<p>{item.content}</p>}
              datetime={day + "/" + month + "/" + year}
            />
          ) : (
            <Comment
              author={item.userId === null ? "Người dùng ẩn danh" : item.userId.name}
              avatar={item.userId === null ? <Avatar src="/img/user-blank.png" /> : <Avatar src={item.userId.avatar} />}
              content={<p>{item.content}</p>}
              datetime={day + "/" + month + "/" + year}
            />
          )}
        </div>
      );
    });
  };

  const formik = useFormik({
    initialValues: {
      review: "",
    },
    onSubmit: (values) => {
      formik.handleReset();
      dispatch(
        createReview(
          rid,
          {
            content: values.review,
          },
          user
        )
      );
    },
  });

  const renderReviewArea = () => {
    if (!localStorage.getItem(USER_LOGIN) || !localStorage.getItem(ACCESS_TOKEN) || !user.email) {
      return <div style={{ marginBottom: 30 }}>Bạn cần đăng nhập tài khoản để gửi đánh giá</div>;
    }
    return (
      <>
        <TextArea rows={3} placeholder="Chia sẻ đánh giá hoặc ý kiến của bạn..." name="review" value={formik.values.review} onChange={formik.handleChange} />
        <Button type="primary" style={{ marginTop: 10, marginBottom: 30 }} onClick={formik.handleSubmit}>
          Gửi đánh giá
        </Button>
      </>
    );
  };

  const renderBookingButton = () => {
    if (!localStorage.getItem(USER_LOGIN) || !localStorage.getItem(ACCESS_TOKEN) || !user.email) {
      return <></>;
    } else {
      if (checkTicket()) {
        return (
          <Button disabled type="primary" shape="round">
            <i className="fa-solid fa-circle-check" style={{ marginRight: 8 }}></i> Bạn đang đặt phòng này
          </Button>
        );
      } else {
        return (
          <Button type="primary" shape="round" onClick={() => setModalVisible2(true)}>
            <i className="fa-solid fa-circle-plus" style={{ marginRight: 8 }}></i> Đặt phòng
          </Button>
        );
      }
    }
  };

  const bookingRoom = () => {
    const startTime = timeRange[0].seconds(0).milliseconds(0).toISOString();
    const endTime = timeRange[1].seconds(0).milliseconds(0).toISOString();
    dispatch(bookRoom(startTime, endTime, rid));
    setModalVisible2(false);
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  const renderSuggestionRoom = () => {
    if (roomList.length === 0) return <></>;

    return (
      <div className="room-suggestion" style={{ marginTop: 30 }}>
        <h3 style={{ fontWeight: "bold" }}>Các phòng khác</h3>
        <div className="room-list">
          {shuffleArray(roomList)
            .slice(0, 4)
            .map((item, index) => {
              return <Room room={item} key={index} history={props.history} />;
            })}
        </div>
      </div>
    );
  };

  if (!roomDetail.name) return <></>;
  return (
    <>
      <div className="room-detail-page">
        <div className="container">
          <div className="content">
            {renderBreadcrumb()}
            <div className="image">
              <Image width="100%" height={300} src={roomDetail.image} fallback={"/img/fallback.png"} preview={false} />
            </div>
            <div className="info-action">
              <div className="info">
                <div className="name">{roomDetail.name}</div>
                <div className="location">
                  {roomDetail.locationId.name}, {roomDetail.locationId.province}, {roomDetail.locationId.country}
                </div>
              </div>
              <div className="action">{renderBookingButton()}</div>
            </div>
            <h3 style={{ fontWeight: "bold", marginTop: 25 }}>Giá tiền</h3>
            <div className="price">{roomDetail.price.toLocaleString()} VNĐ / ngày đêm</div>
            <h3 style={{ fontWeight: "bold", marginTop: 25 }}>Số người ở và số lượng phòng</h3>
            <div className="data">
              {roomDetail.guests} khách • {roomDetail.bedRoom} phòng ngủ • {roomDetail.bath} phòng tắm
            </div>
            <h3 style={{ fontWeight: "bold", marginTop: 25 }}>Tiện ích</h3>
            <div className="room-furniture">{renderFurniture(furnitureList)}</div>
            <h3 style={{ fontWeight: "bold", marginTop: 25 }}>Đánh giá</h3>
            {renderReviewArea()}
            {renderReview()}
            {renderSuggestionRoom()}
          </div>
        </div>
      </div>
      <Modal title="Chỉnh sửa đánh giá" centered visible={modalVisible} okText="OK" onOk={formik2.handleSubmit} onCancel={() => setModalVisible(false)}>
        <div className="updateReview-content">
          <Input disabled value={formik2.values.content} onChange={formik2.handleChange} name="content" allowClear />
        </div>
      </Modal>
      <Modal title="Thông tin đặt phòng" visible={modalVisible2} okText="OK" onOk={() => bookingRoom()} onCancel={() => setModalVisible2(false)}>
        <div className="booking-time">
          <RangePicker showTime format="DD/MM/YYYY HH:mm" style={{ width: "100%" }} onChange={(v) => setTimeRange(v)} />
        </div>
      </Modal>
    </>
  );
}
