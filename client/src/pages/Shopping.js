import React from "react";
import NavBar from "../components/NavBar";
import "../styles/Shopping.css";

function Shopping() {
  return (
    <div id="Container">
      <NavBar />
      <div class="blob1"></div>
      <div class="blob2"></div>
      <div id="innerContainer">
        <div id="leftContainer">Filter</div>
        <div id="rightContainer">
          <div id="bannerContainer">Banner</div>
          <div id="gamesContainer">
            <div className="game">Game 1</div>
            <div className="game">Game 2</div>
            <div className="game">Game 3</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shopping;
