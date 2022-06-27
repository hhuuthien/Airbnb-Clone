import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import LocationAdmin from "../components/LocationAdmin";
import { getLocationAPI } from "../redux/actions/locationAction";

export default function AdminLocation(props) {
  const dispatch = useDispatch();
  const { locationList } = useSelector((state) => state.locationReducer);
  console.log(locationList);

  useEffect(() => {
    dispatch(getLocationAPI());
  }, []);

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
