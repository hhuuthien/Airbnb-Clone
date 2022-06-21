import { Input, Pagination } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Location from "../components/Location";
import { getLocationAPI } from "../redux/actions/locationAction";
import { UPDATE_ARRAY_BY_SEARCHING } from "../redux/const/constant";
const { Search } = Input;

export default function HomePage() {
  const { locationList, locationListCopy } = useSelector((state) => state.locationReducer);
  // locationList là mảng dữ liệu để render, mảng này có thể bị ảnh hưởng bởi tìm kiếm hoặc lọc
  // locationListCopy là mảng dữ liệu gốc
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const DEFAULT_PAGE_SIZE = 20;

  const onPaginationChange = (page) => {
    setCurrent(page);
    setStartIndex((page - 1) * DEFAULT_PAGE_SIZE);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onSearch = (value) => {
    const listSearch = locationListCopy.filter((location) => location.name && location.name.includes(value));
    dispatch({
      type: UPDATE_ARRAY_BY_SEARCHING,
      data: listSearch,
    });
  };

  const getLocationList = () => {
    dispatch(getLocationAPI());
  };

  const renderLocationList = (list) => {
    return list.slice(startIndex, startIndex + DEFAULT_PAGE_SIZE).map((location, index) => {
      return <Location key={index} location={location} />;
    });
  };

  useEffect(() => {
    getLocationList();
  }, []);

  return (
    <div className="home-page">
      <div className="container">
        <div className="search">
          <Search placeholder="Tìm kiếm vị trí..." allowClear enterButton="Tìm kiếm" size="middle" onSearch={onSearch} />
        </div>
        <div className="location-list">{renderLocationList(locationList)}</div>
        <div className="pagination">
          <Pagination current={current} onChange={onPaginationChange} total={locationList.length} showSizeChanger={false} defaultPageSize={DEFAULT_PAGE_SIZE} />
        </div>
      </div>
    </div>
  );
}
