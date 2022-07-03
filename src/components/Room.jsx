import { Tooltip } from "antd";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function Room(props) {
  const { room } = props;

  let furnitureList = []; // gom hết tiện ích vô mảng này, chuyển thành obj có tên và hình ảnh
  room.wifi && furnitureList.push({ name: "Wifi", img: "/img/furniture/wifi.png" });
  room.cableTV && furnitureList.push({ name: "TV", img: "/img/furniture/tv.png" });
  room.elevator && furnitureList.push({ name: "Elevator", img: "/img/furniture/elevator.png" });
  room.pool && furnitureList.push({ name: "Pool", img: "/img/furniture/pool.png" });
  room.gym && furnitureList.push({ name: "Gym", img: "/img/furniture/gym.png" });
  room.kitchen && furnitureList.push({ name: "Kitchen", img: "/img/furniture/kitchen.png" });
  room.dryer && furnitureList.push({ name: "Dryer", img: "/img/furniture/dryer.png" });
  room.heating && furnitureList.push({ name: "Heating", img: "/img/furniture/heat.png" });
  room.hotTub && furnitureList.push({ name: "Hot tub", img: "/img/furniture/tub.png" });
  room.indoorFireplace && furnitureList.push({ name: "Indoor fireplace", img: "/img/furniture/fireplace.png" });

  const renderFurniture = (list) => {
    return list.map((item, index) => {
      return (
        <Tooltip title={item.name} key={index}>
          <img className="furniture" src={item.img} alt={item.name} />
        </Tooltip>
      );
    });
  };

  return (
    <div className="room-card" onClick={() => props.history.push("/r/" + room._id)}>
      <div className="card-image">
        <LazyLoadImage alt={room.name} src={room.image} />
      </div>
      <div className="card-info">
        <div className="card-name">{room.name}</div>
        <div className="card-price">{room.price.toLocaleString()} VNĐ</div>
        <div className="card-furniture">{renderFurniture(furnitureList)}</div>
        <div className="card-room">
          {room.bedRoom} phòng ngủ, {room.bath} phòng tắm
          <br />
          Cho tối đa {room.guests} khách
          <br />
        </div>
      </div>
    </div>
  );
}
