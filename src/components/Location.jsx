import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function Location({ location }) {
  return (
    <div className="location-card">
      <div className="image">
        <LazyLoadImage alt={location.name} src={location.image} />
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
