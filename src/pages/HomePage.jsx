import { Pagination } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Location from "../components/Location";
import { getLocationAPI } from "../redux/actions/locationAction";

export default function HomePage() {
  const { locationList } = useSelector((state) => state.locationReducer);
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const DEFAULT_PAGE_SIZE = 20;

  const onPaginationChange = (page) => {
    setCurrent(page);
    setStartIndex((page - 1) * DEFAULT_PAGE_SIZE);
  };

  const getLocationList = () => {
    dispatch(getLocationAPI());
  };

  const renderLocationList = () => {
    const list = locationList.slice(startIndex, startIndex + DEFAULT_PAGE_SIZE);
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
        <div className="location-list">{renderLocationList()}</div>
        <div className="pagination">
          <Pagination current={current} onChange={onPaginationChange} total={locationList.length} showSizeChanger={false} defaultPageSize={DEFAULT_PAGE_SIZE} />
        </div>
      </div>
    </div>
  );
}
