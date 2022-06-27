import { message } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import LocationAdmin from "../components/LocationAdmin";
import { getLocationAPI } from "../redux/actions/locationAction";
import { DELETE_LOCATION_END, UPDATE_LOCATION_END } from "../redux/const/constant";

export default function AdminLocation(props) {
  const dispatch = useDispatch();
  const { locationList, updateStatus, deleteStatus } = useSelector((state) => state.locationReducer);

  useEffect(() => {
    dispatch(getLocationAPI());
    return () => {
      dispatch({
        type: UPDATE_LOCATION_END,
      });
      dispatch({
        type: DELETE_LOCATION_END,
      });
    };
  }, []);

  if (updateStatus === "success") {
    message.success("Cập nhật thành công");
  } else if (updateStatus === "fail") {
    message.error("Cập nhật không thành công. Vui lòng thử lại sau");
  }

  if (deleteStatus === "success") {
    message.success("Xoá thành công");
  } else if (deleteStatus === "fail") {
    message.error("Xoá không thành công. Vui lòng thử lại sau");
  }

  // props.history.action === "PUSH": user đến đây từ trang admin home bằng phương thức push -> hợp lệ
  // props.history.action === "POP": user tự nhập URL (không thể xác định có đăng nhập hay chưa) -> không hợp lệ
  if (props.history.action !== "PUSH") {
    return <Redirect to="/admin" />;
  }

  const renderLocationList = () => {
    return (
      <div className="location-list">
        {locationList.map((location, index) => {
          return <LocationAdmin location={location} key={index} />;
        })}
      </div>
    );
  };

  return (
    <div className="admin-location-page">
      <div className="container">{renderLocationList()}</div>
    </div>
  );
}
