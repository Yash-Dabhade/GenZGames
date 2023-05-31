import React, { useState, useEffect } from "react";
import codbanner from "../gamesMedia/cod_bg.jpg";
import logo from "../gamesMedia/cod_logo.png";
import "../styles/GameDetail.css";
import NavBar from "../components/NavBar";
import cover from "../gamesMedia/codcover.png";
import BasicSlider from "../components/BasicSlider";
import Reviews from "../components/Reviews";
import Footer from "../components/Footer";
import axios from "axios";
import { baseURL } from "../utils/constants";

function GameDetail() {
  const [selectedGame, setSelectedGame] = useState(null);

  const fetchSelectedGame = async () => {
    await axios
      .get(baseURL + "/product/" + sessionStorage.getItem("selectedGame"))
      .then((res) => {
        setSelectedGame(res.data.product);
        console.log(res.data.product);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      fetchSelectedGame();
    }, 400);
  }, []);

  return (
    <div id="containerDetail">
      <NavBar />
      <div
        id="bannerDetail"
        style={{ backgroundImage: "url(" + codbanner + ")" }}
      ></div>
      <div id="overlayDetailContainer">
        <div id="coverDetail">
          <img
            src={selectedGame && selectedGame.cover.secure_url}
            alt="CoverImage"
          />
          <div id="platformContainerDetails">
            <img src="/res/playstation.png" alt="" className="icon" />
            <img src="/res/monitor.png" alt="" className="icon" />
            <img src="/res/xbox.png" alt="" className="icon" />
          </div>
          <h3 id="priceTitleDetails">
            Rs. {selectedGame && selectedGame.price}
          </h3>
        </div>
        <div id="infoDetail">
          <h3 id="titleDetails">{selectedGame && selectedGame.name}</h3>
          <p id="descDetails">{selectedGame && selectedGame.description}</p>
        </div>
        <div id="actionsDetail">
          <div id="productDetails">
            <div className="customInfoDetails">
              <img src="/res/stock.png" />
              <h4>{Math.max(selectedGame && selectedGame.stock, 0)} Left</h4>
            </div>
            <div className="customInfoDetails">
              <img src="/res/review.png" />
              <h4>
                {selectedGame && selectedGame.rating
                  ? selectedGame.rating / 5
                  : "Not yet rated"}{" "}
              </h4>
            </div>
            <div className="customInfoDetails">
              <img src="/res/category.png" />
              <h4>{selectedGame && selectedGame.category}</h4>
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
        <BasicSlider photos={selectedGame ? selectedGame.photos : null} />
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
