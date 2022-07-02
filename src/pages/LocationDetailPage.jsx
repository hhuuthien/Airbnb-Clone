import { Button, Image } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Room from "../components/Room";
import { getLocationDetailAPI } from "../redux/actions/locationAction";
import { getRoomByLocationAPI } from "../redux/actions/roomAction";
import { CLEAR_LOCATION_DETAIL } from "../redux/const/constant";

export default function LocationDetailPage(props) {
  const dispatch = useDispatch();
  const { locationDetail } = useSelector((root) => root.locationReducer);
  const { roomList } = useSelector((root) => root.roomReducer);
  console.log("roomList", roomList);

  const lid = props.match.params.lid;

  useEffect(() => {
    // mỗi lần chạy gọi API lấy chi tiết vị trí
    dispatch(getLocationDetailAPI(lid));
    dispatch(getRoomByLocationAPI(lid));

    // mỗi lần unmount thì xoá chi tiết vị trí đó đi để tránh lộn với vị trí khác
    return () => {
      dispatch({
        type: CLEAR_LOCATION_DETAIL,
      });
    };
  }, []);

  const renderRoomList = (list) => {
    return (
      <div className="room-area">
        <h3 style={{ fontWeight: "bold" }}>Danh sách phòng cho thuê ({list.length})</h3>
        <div className="room-list">
          {list.map((room, index) => {
            return <Room room={room} key={index} />;
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="location-detail-page">
      <div className="container">
        <div className="content">
          <div className="image">
            <Image width="100%" height={300} src={locationDetail.image} fallback={"/img/fallback.png"} preview={false} />
          </div>
          <div className="info-action">
            <div className="info">
              <div className="name">{locationDetail.name}</div>
              <div className="star">
                {locationDetail.valueate}
                <i className="fa-regular fa-star"></i>
              </div>
              <div className="province">
                {locationDetail.province}, {locationDetail.country}
              </div>
            </div>
            <div className="action">
              <Button type="primary" shape="circle">
                <i className="fa-solid fa-share"></i>
              </Button>
              <Button type="primary" shape="circle" style={{ marginLeft: 10 }}>
                <i className="fa-solid fa-heart"></i>
              </Button>
            </div>
          </div>
          {renderRoomList(roomList)}
        </div>
      </div>
    </div>
  );
}
