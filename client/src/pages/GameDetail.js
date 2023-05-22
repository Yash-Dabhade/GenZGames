import React from "react";
import codbanner from "../gamesMedia/cod_bg.jpg";
import logo from "../gamesMedia/cod_logo.png";
import "../styles/GameDetail.css";
import NavBar from "../components/NavBar";
import cover from "../gamesMedia/codcover.png";
import BasicSlider from "../components/BasicSlider";
import Reviews from "../components/Reviews";
import Footer from "../components/Footer";

function GameDetail() {
  return (
    <div id="containerDetail">
      <NavBar />
      <div
        id="bannerDetail"
        style={{ backgroundImage: "url(" + codbanner + ")" }}
      ></div>
      <div id="overlayDetailContainer">
        <div id="coverDetail">
          <img src={cover} alt="" />
          <div id="platformContainerDetails">
            <img src="/res/playstation.png" alt="" className="icon" />
            <img src="/res/monitor.png" alt="" className="icon" />
            <img src="/res/xbox.png" alt="" className="icon" />
          </div>
          <h3 id="priceTitleDetails">Rs. 1900</h3>
        </div>
        <div id="infoDetail">
          <h3 id="titleDetails">Call Of Duty : Cold War</h3>
          <p id="descDetails">
            Black Ops Cold War's campaign is set during the early 1980s of the
            Cold War, taking place between Call of Duty: Black Ops (2010) and
            Call of Duty: Black Ops II (2012) chronologically. It is centered
            around a pursuit of the alleged Soviet spy Perseus, whose stated
            goal is to subvert the United States and tilt the balance of power
            toward the Soviet Union. For the campaign, the player takes control
            of \"Bell\", who is recruited by CIA officer Russell Adler into a
            multinational task force created to hunt down Perseus.
          </p>
        </div>
        <div id="actionsDetail">
          <div id="productDetails">
            <div className="customInfoDetails">
              <img src="/res/stock.png" />
              <h4>19 Left</h4>
            </div>
            <div className="customInfoDetails">
              <img src="/res/review.png" />
              <h4>4 / 5</h4>
            </div>
            <div className="customInfoDetails">
              <img src="/res/category.png" />
              <h4>Action</h4>
            </div>
          </div>
          <div id="buyContainerDetails">
            <div id="buyButtonDetails">Buy Now</div>
            <div id="cartButtonDetails">Add to Cart </div>
          </div>
        </div>
      </div>
      <div id="screenshotsContainer">
        <h2 id="titleScreenshotsDetail">GamePlay Screenshots</h2>
        <BasicSlider />
      </div>
      <div id="reviewsContainer">
        <h2 id="titleReviewsDetail">Game Reviews</h2>
        <Reviews />
      </div>
      <Footer />
    </div>
  );
}

export default GameDetail;
