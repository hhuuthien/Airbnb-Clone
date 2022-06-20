import React from "react";

export default function Location({ location }) {
  return (
    <div className="location-card">
      <div className="image">
        <img src={location.image} alt={location.name} />
      </div>
      <div className="info">
        <div className="info-line1">
          <div className="name">{location.name}</div>
          <div className="star">
            {location.valueate}
            <i className="fa-regular fa-star"></i>
          </div>
        </div>
        <div className="info-line2">
          {location.province}, {location.country}
        </div>
      </div>
      <i className="fa-regular fa-heart"></i>
    </div>
  );
}
