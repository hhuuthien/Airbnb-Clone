import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLocationAPI } from "../redux/actions/locationAction";

export default function HomePage() {
  const { locationList } = useSelector((state) => state.locationReducer);
  console.log("locationList", locationList);

  const dispatch = useDispatch();

  const getLocationList = () => {
    dispatch(getLocationAPI());
  };

  const renderLocationList = (locationList) => {
    return locationList.map((loc, index) => {
      return <div key={index}>{loc.name}</div>;
    });
  };

  useEffect(() => {
    getLocationList();
  }, []);

  return <div className="app">{renderLocationList(locationList)}</div>;
}
