import { Button, Carousel, Checkbox, Drawer, Input, Pagination } from "antd";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Location from "../components/Location";
import { getLocationAPI } from "../redux/actions/locationAction";
import { UPDATE_ARRAY_BY_FILTERING, UPDATE_ARRAY_BY_SEARCHING } from "../redux/const/constant";
const { Search } = Input;

export default function HomePage(props) {
  const { locationList, locationListCopy } = useSelector((state) => state.locationReducer);
  const dispatch = useDispatch();

  const [current, setCurrent] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [check1, setCheck1] = useState(true);
  const [check2, setCheck2] = useState(true);
  const [check3, setCheck3] = useState(true);
  const [check4, setCheck4] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [visibleDrawer, setVisibleDrawer] = useState(false);

  const DEFAULT_PAGE_SIZE = 20;

  const showDrawer = () => {
    setVisibleDrawer(true);
  };

  const onClose = () => {
    setVisibleDrawer(false);
  };

  const onCheckBoxChange = (e) => {
    switch (e.target.id) {
      case "cb1":
        setCheck1(e.target.checked);
        break;
      case "cb2":
        setCheck2(e.target.checked);
        break;
      case "cb3":
        setCheck3(e.target.checked);
        break;
      case "cb4":
        setCheck4(e.target.checked);
        break;
      default:
        break;
    }
  };

  const locationFilter = (list) => {
    let listFilter1 = [];
    let listFilter2 = [];
    let listFilter3 = [];
    let listFilter4 = [];
    if (check1) {
      listFilter1 = list.filter((location) => location.valueate && location.valueate === 10);
    }
    if (check2) {
      listFilter2 = list.filter((location) => location.valueate && (location.valueate === 9 || location.valueate === 8));
    }
    if (check3) {
      listFilter3 = list.filter((location) => location.valueate && (location.valueate === 7 || location.valueate === 6));
    }
    if (check4) {
      listFilter4 = list.filter((location) => location.valueate && location.valueate <= 5);
    }
    return [...listFilter1, ...listFilter2, ...listFilter3, ...listFilter4];
  };

  const locationSearch = (list, keyword) => {
    let listSearch = [];
    if (keyword === "") {
      listSearch = [...list];
    } else {
      listSearch = list.filter((location) => location.name && location.name.includes(keyword));
    }
    return listSearch;
  };

  const onFilter = () => {
    setVisibleDrawer(false);

    const listFilterResult = locationFilter(locationListCopy);
    // Sau khi c?? ???????c listFilterResult, ph???i t??m ki???m theo t??? kho?? hi???n ??ang c??
    dispatch({
      type: UPDATE_ARRAY_BY_FILTERING,
      data: locationSearch(listFilterResult, keyword),
    });
    setCurrent(1);
    setStartIndex(0);
  };

  const onSearch = (keyword) => {
    setKeyword(keyword);
    let listSearchResult = locationSearch(locationListCopy, keyword);
    // Sau khi c?? ???????c listSearchResult, ph???i l???c theo b??? l???c hi???n ??ang ???????c ??p d???ng
    dispatch({
      type: UPDATE_ARRAY_BY_SEARCHING,
      data: locationFilter(listSearchResult),
    });
    setCurrent(1);
    setStartIndex(0);
  };

  const onPaginationChange = (page) => {
    setCurrent(page);
    setStartIndex((page - 1) * DEFAULT_PAGE_SIZE);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getLocationList = () => {
    dispatch(getLocationAPI());
  };

  const renderLocationList = (list) => {
    if (list.length === 0) {
      return (
        <motion.div className="no-result" initial={{ x: -200 }} animate={{ x: 0 }}>
          <img src="/img/not-found.png" alt="Kh??ng t??m th???y k???t qu??? n??o" />
          <p className="nr1">Kh??ng t??m th???y k???t qu??? n??o</p>
          <div className="nr2">H??y th??? t??m ki???m v???i t??? kho?? kh??c ho???c thay ?????i b??? l???c k???t qu???</div>
        </motion.div>
      );
    }
    return (
      <>
        <div className="location-list">
          {list.slice(startIndex, startIndex + DEFAULT_PAGE_SIZE).map((location, index) => {
            return <Location key={index} location={location} index={index} history={props.history} />;
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

  const categoryList = [
    { name: "B??i bi???n", image: "/img/icon/baibien.jpg" },
    { name: "Bi???t th???", image: "/img/icon/bietthu.jpg" },
    { name: "C???m tr???i", image: "/img/icon/camtrai.jpg" },
    { name: "C??ng vi??n", image: "/img/icon/congvien.jpg" },
    { name: "?????o", image: "/img/icon/dao.jpg" },
    { name: "H??? b??i", image: "/img/icon/hoboi.jpg" },
    { name: "L??u ????i", image: "/img/icon/laudai.jpg" },
    { name: "Nh?? nh???", image: "/img/icon/nhanho.jpg" },
    { name: "Ven h???", image: "/img/icon/venho.jpg" },
  ];

  const renderCategory = (list) => {
    return list.map((item, index) => {
      return (
        <div className="category" key={index}>
          <img src={item.image} alt={item.name} />
          <div>{item.name}</div>
        </div>
      );
    });
  };

  return (
    <div className="home-page">
      <div className="container">
        <div className="airbnb-carousel" style={{ marginTop: 30 }}>
          <Carousel autoplay>
            <div>
              <img src="/img/carousel/1.jpg" className="carousel-img" />
            </div>
            <div>
              <img src="/img/carousel/2.jpg" className="carousel-img" />
            </div>
            <div>
              <img src="/img/carousel/3.jpg" className="carousel-img" />
            </div>
            <div>
              <img src="/img/carousel/4.jpg" className="carousel-img" />
            </div>
            <div>
              <img src="/img/carousel/5.jpg" className="carousel-img" />
            </div>
          </Carousel>
        </div>
        <div className="category-list" style={{ marginTop: 30 }}>
          {renderCategory(categoryList)}
        </div>
        <div className="search">
          <Search placeholder="T??m ki???m v??? tr??..." allowClear enterButton="T??m ki???m" size="middle" onSearch={onSearch} />
          <Button type="primary" onClick={showDrawer} className="btn-filter">
            <i className="fa-solid fa-sliders"></i> B??? l???c
          </Button>
          <Drawer title="B??? l???c k???t qu???" placement="right" onClose={onClose} visible={visibleDrawer}>
            <div className="cb-area">
              <div className="cb">
                <Checkbox id="cb1" onChange={onCheckBoxChange} defaultChecked={true}>
                  <i className="fa-regular fa-star"></i> 10
                </Checkbox>
              </div>
              <div className="cb">
                <Checkbox id="cb2" onChange={onCheckBoxChange} defaultChecked={true}>
                  <i className="fa-regular fa-star"></i> 8 - 9
                </Checkbox>
              </div>
              <div className="cb">
                <Checkbox id="cb3" onChange={onCheckBoxChange} defaultChecked={true}>
                  <i className="fa-regular fa-star"></i> 6 - 7
                </Checkbox>
              </div>
              <div className="cb">
                <Checkbox id="cb4" onChange={onCheckBoxChange} defaultChecked={true}>
                  <i className="fa-regular fa-star"></i> 5 v?? th???p h??n
                </Checkbox>
              </div>
            </div>
            <Button type="primary" className="btn-filter-submit" onClick={onFilter}>
              L???c k???t qu???
            </Button>
          </Drawer>
        </div>
        {renderLocationList(locationList)}
      </div>
    </div>
  );
}
