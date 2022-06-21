import { Input, Pagination } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Location from "../components/Location";
import { getLocationAPI } from "../redux/actions/locationAction";
import { UPDATE_ARRAY_BY_SEARCHING } from "../redux/const/constant";
import { motion } from "framer-motion";
const { Search } = Input;

export default function HomePage() {
  const { locationList, locationListCopy } = useSelector((state) => state.locationReducer);
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
    let listSearch = [];
    if (value === "") {
      listSearch = [...locationListCopy];
    } else {
      listSearch = locationListCopy.filter((location) => location.name && location.name.includes(value));
    }
    dispatch({
      type: UPDATE_ARRAY_BY_SEARCHING,
      data: listSearch,
    });
    setCurrent(1);
    setStartIndex(0);
  };

  const getLocationList = () => {
    dispatch(getLocationAPI());
  };

  const renderLocationList = (list) => {
    if (list.length === 0) {
      return (
        <motion.div className="no-result" initial={{ x: -200 }} animate={{ x: 0 }}>
          <img src="/img/not-found.png" alt="Không tìm thấy kết quả nào" />
          <p className="nr1">Không tìm thấy kết quả nào</p>
          <div className="nr2">Hãy thử với từ khoá khác</div>
        </motion.div>
      );
    }
    return (
      <>
        <div className="location-list">
          {list.slice(startIndex, startIndex + DEFAULT_PAGE_SIZE).map((location, index) => {
            return <Location key={index} location={location} index={index} />;
          })}
        </div>
        <div className="pagination">
          <Pagination current={current} onChange={onPaginationChange} total={locationList.length} showSizeChanger={false} defaultPageSize={DEFAULT_PAGE_SIZE} />
        </div>
      </>
    );
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
        {renderLocationList(locationList)}
      </div>
    </div>
  );
}
