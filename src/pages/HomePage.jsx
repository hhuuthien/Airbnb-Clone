import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Location from "../components/Location";
import { getLocationAPI } from "../redux/actions/locationAction";

export default function HomePage() {
  const { locationList } = useSelector((state) => state.locationReducer);
  console.log("locationList", locationList);

  const dispatch = useDispatch();

  const getLocationList = () => {
    dispatch(getLocationAPI());
  };

  const renderLocationList = (locationList) => {
    const list = locationList.slice(0, 20);
    return list.map((location, index) => {
      return <Location key={index} location={location} />;
    });
  };

  useEffect(() => {
    getLocationList();
  }, []);

  return (
    <div className="home-page">
      <div className="container">
        <div className="location-list">{renderLocationList(locationList)}</div>
      </div>
    </div>
  );
}
