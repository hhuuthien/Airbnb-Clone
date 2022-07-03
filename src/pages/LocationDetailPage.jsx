import { Button, Checkbox, Drawer, Image, Input, Slider } from "antd";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Room from "../components/Room";
import { getLocationDetailAPI } from "../redux/actions/locationAction";
import { getRoomByLocationAPI } from "../redux/actions/roomAction";
import { CLEAR_LOCATION_DETAIL, UPDATE_ROOM_LIST_BY_SEARCHING_AND_FILTERING } from "../redux/const/constant";

const { Search } = Input;

export default function LocationDetailPage(props) {
  const dispatch = useDispatch();
  const { locationDetail } = useSelector((root) => root.locationReducer);
  const { roomList, roomListCopy } = useSelector((root) => root.roomReducer);

  const [visibleDrawer, setVisibleDrawer] = useState(false);

  const [cb1, setCB1] = useState(false);
  const [cb2, setCB2] = useState(false);
  const [cb3, setCB3] = useState(false);
  const [cb4, setCB4] = useState(false);
  const [cb5, setCB5] = useState(false);
  const [cb6, setCB6] = useState(false);
  const [cb7, setCB7] = useState(false);
  const [cb8, setCB8] = useState(false);
  const [cb9, setCB9] = useState(false);

  const [sliderMin, setSliderMin] = useState(0);
  const [sliderMax, setSliderMax] = useState(2000000);

  const [keyword, setKeyword] = useState("");

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

  const roomSearch = (list, keyword) => {
    let result = [];
    if (keyword === "") {
      result = [...list];
    } else {
      result = list.filter((room) => room.name && room.name.includes(keyword));
    }
    return result;
  };

  const onSearch = (keyword) => {
    setKeyword(keyword);
    let result1 = roomSearch(roomListCopy, keyword);
    let result2 = roomFilter(result1);
    dispatch({
      type: UPDATE_ROOM_LIST_BY_SEARCHING_AND_FILTERING,
      data: result2,
    });
  };

  const onCheckBoxChange = (e) => {
    switch (e.target.id) {
      case "cb1":
        setCB1(e.target.checked);
        break;
      case "cb2":
        setCB2(e.target.checked);
        break;
      case "cb3":
        setCB3(e.target.checked);
        break;
      case "cb4":
        setCB4(e.target.checked);
        break;
      case "cb5":
        setCB5(e.target.checked);
        break;
      case "cb6":
        setCB6(e.target.checked);
        break;
      case "cb7":
        setCB7(e.target.checked);
        break;
      case "cb8":
        setCB8(e.target.checked);
        break;
      case "cb9":
        setCB9(e.target.checked);
        break;
      default:
        break;
    }
  };

  const roomFilter = (list) => {
    let result = [...list];
    if (cb1) result = result.filter((item) => item.wifi);
    if (cb2) result = result.filter((item) => item.cableTV);
    if (cb3) result = result.filter((item) => item.cableTV);
    if (cb4) result = result.filter((item) => item.pool);
    if (cb5) result = result.filter((item) => item.gym);
    if (cb6) result = result.filter((item) => item.kitchen);
    if (cb7) result = result.filter((item) => item.dryer);
    if (cb8) result = result.filter((item) => item.hotTub);
    if (cb9) result = result.filter((item) => item.indoorFireplace);

    result = result.filter((item) => item.price >= sliderMin && item.price <= sliderMax);

    return result;
  };

  const onFilter = () => {
    setVisibleDrawer(false);
    const result1 = roomFilter(roomListCopy);
    const result2 = roomSearch(result1, keyword);
    dispatch({
      type: UPDATE_ROOM_LIST_BY_SEARCHING_AND_FILTERING,
      data: result2,
    });
  };

  const showDrawer = () => {
    setVisibleDrawer(true);
  };

  const onClose = () => {
    setVisibleDrawer(false);
  };

  const onAfterChangeSlider = (value) => {
    setSliderMin(value[0]);
    setSliderMax(value[1]);
  };

  const renderRoomList = () => {
    if (roomList.length === 0) {
      // không có room để render (do kết quả tìm kiếm hoặc bộ lọc)
      return (
        <motion.div className="no-result" initial={{ x: -200 }} animate={{ x: 0 }}>
          <img src="/img/not-found.png" alt="Không tìm thấy kết quả nào" />
          <p className="nr1">Không tìm thấy kết quả nào</p>
          <div className="nr2">Hãy thử tìm kiếm với từ khoá khác hoặc thay đổi bộ lọc kết quả</div>
        </motion.div>
      );
    } else {
      return (
        <div className="room-list">
          {roomList.map((room, index) => {
            return <Room room={room} key={index} history={props.history} />;
          })}
        </div>
      );
    }
  };

  const renderRoomArea = () => {
    if (roomListCopy.length === 0) {
      return (
        <div className="room-area">
          <h3 style={{ fontWeight: "bold" }}>Nơi này hiện tại không có phòng cho thuê</h3>
        </div>
      );
    } else {
      // có phòng
      return (
        <div className="room-area">
          <h3 style={{ fontWeight: "bold" }}>Các phòng cho thuê</h3>
          <div className="room-search">
            <Search placeholder="Tìm phòng..." allowClear enterButton="Tìm" size="middle" onSearch={onSearch} style={{ paddingBottom: 15 }} />
            <Button type="primary" className="btn-filter" onClick={showDrawer}>
              <i className="fa-solid fa-sliders"></i> Bộ lọc
            </Button>
            <Drawer title="Bộ lọc kết quả" placement="right" onClose={onClose} visible={visibleDrawer}>
              <div className="cb-area">
                <div style={{ marginBottom: 10, fontWeight: "bold" }}>Tiện ích</div>
                <Checkbox id="cb1" onChange={onCheckBoxChange} defaultChecked={false}>
                  Wifi
                </Checkbox>
                <Checkbox id="cb2" onChange={onCheckBoxChange} defaultChecked={false}>
                  TV
                </Checkbox>
                <Checkbox id="cb3" onChange={onCheckBoxChange} defaultChecked={false}>
                  Thang máy
                </Checkbox>
                <Checkbox id="cb4" onChange={onCheckBoxChange} defaultChecked={false}>
                  Hồ bơi
                </Checkbox>
                <Checkbox id="cb5" onChange={onCheckBoxChange} defaultChecked={false}>
                  Phòng tập gym
                </Checkbox>
                <Checkbox id="cb6" onChange={onCheckBoxChange} defaultChecked={false}>
                  Bếp
                </Checkbox>
                <Checkbox id="cb7" onChange={onCheckBoxChange} defaultChecked={false}>
                  Máy sấy
                </Checkbox>
                <Checkbox id="cb8" onChange={onCheckBoxChange} defaultChecked={false}>
                  Bồn nước nóng
                </Checkbox>
                <Checkbox id="cb9" onChange={onCheckBoxChange} defaultChecked={false}>
                  Lò sưởi
                </Checkbox>
                <div style={{ marginBottom: 10, fontWeight: "bold", marginTop: 20 }}>Giá tiền</div>
                <Slider range defaultValue={[0, 2000000]} min={0} max={2000000} step={100000} onAfterChange={onAfterChangeSlider} />
              </div>
              <Button type="primary" className="btn-filter-submit" onClick={onFilter}>
                Lọc kết quả
              </Button>
            </Drawer>
          </div>
          {renderRoomList()}
        </div>
      );
    }
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
          {renderRoomArea()}
        </div>
      </div>
    </div>
  );
}
