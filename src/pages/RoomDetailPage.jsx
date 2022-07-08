import { HomeOutlined } from "@ant-design/icons";
import { Avatar, Breadcrumb, Button, Comment, Image, Input, message } from "antd";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReview } from "../redux/actions/reviewAction";
import { getRoomDetail, getRoomReview } from "../redux/actions/roomAction";
import { CLEAR_ROOM_DETAIL, CREATE_REVIEW_END } from "../redux/const/constant";
import { ACCESS_TOKEN, USER_LOGIN } from "../util/setting";

const { TextArea } = Input;

export default function RoomDetailPage(props) {
  const { roomDetail } = useSelector((root) => root.roomReducer);
  const { reviewList, createReviewStatus } = useSelector((root) => root.reviewReducer);
  const { user } = useSelector((root) => root.accountReducer);
  const dispatch = useDispatch();

  const rid = props.match.params.rid;

  useEffect(() => {
    dispatch(getRoomDetail(rid));
    dispatch(getRoomReview(rid));
    return () => {
      dispatch({
        type: CLEAR_ROOM_DETAIL,
      });
    };
  }, []);

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
          <Comment
            author={item.userId === null ? "Người dùng ẩn danh" : item.userId.name}
            avatar={item.userId === null ? <Avatar src="/img/user-blank.png" /> : <Avatar src={item.userId.avatar} />}
            content={<p>{item.content}</p>}
            datetime={day + "/" + month + "/" + year}
          />
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

  if (!roomDetail.name) return <></>;
  return (
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
            <div className="action">
              <Button type="primary" shape="round">
                <i className="fa-solid fa-circle-plus" style={{ marginRight: 8 }}></i> Đặt phòng
              </Button>
            </div>
          </div>
          <h3 style={{ fontWeight: "bold", marginTop: 25 }}>Giá tiền</h3>
          <div className="price">{roomDetail.price.toLocaleString()} VNĐ / ngày đêm</div>
          <h3 style={{ fontWeight: "bold", marginTop: 25 }}>Số người ở và số lượng phòng</h3>
          <div className="data">
            {roomDetail.guests} khách • {roomDetail.bedRoom} phòng ngủ • {roomDetail.bath} phòng tắm
          </div>
          <h3 style={{ fontWeight: "bold", marginTop: 25 }}>Tiện ích</h3>
          <div className="furniture">{renderFurniture(furnitureList)}</div>
          <h3 style={{ fontWeight: "bold", marginTop: 25 }}>Đánh giá</h3>
          {renderReviewArea()}
          {renderReview()}
        </div>
      </div>
    </div>
  );
}
