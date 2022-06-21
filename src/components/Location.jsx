import React from "react";
import { motion } from "framer-motion";

export default function Location({ location, index }) {
  return (
    <motion.div className="location-card" initial={{ y: -100 }} animate={{ y: 0 }} transition={{ ease: "easeOut", duration: 0.25 * (index + 1) }}>
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
    </motion.div>
  );
}
