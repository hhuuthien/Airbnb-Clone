import { LazyLoadImage } from "react-lazy-load-image-component";

export default function Room(props) {
  const { room } = props;

  return (
    <div className="room-card">
      <div className="card-image">
        <LazyLoadImage alt={room.name} src={room.image} />
      </div>
      <div className="card-info">
        <div className="card-name">{room.name}</div>
        <div className="card-price">{room.price.toLocaleString()} VNĐ</div>
      </div>
    </div>
  );
}
