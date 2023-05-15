import React from "react";
import "../styles/Banner.css";
// import styled from "styled-components";

function Banner({ logo, model }) {
  return (
    <div id="BannerContainer">
      <img id="logo" src={logo} alt="logo" />
      <img id="model" src={model} alt="Nonoe" />
    </div>
  );
}

export default Banner;
