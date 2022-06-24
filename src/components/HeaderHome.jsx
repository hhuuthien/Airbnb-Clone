import React from "react";

export default function HeaderHome(props) {
  const goToAccountPage = () => {
    props.history.push("/account");
  };

  return (
    <div className="header-home">
      <div className="container">
        <div className="logo">
          <a href="#">
            <img src="/img/logo-text.png" alt="Airbnb logo" />
          </a>
        </div>
        <div className="search"></div>
        <div className="account" onClick={goToAccountPage}>
          <img src="/img/user-blank.png" alt="User image" />
        </div>
      </div>
    </div>
  );
}
