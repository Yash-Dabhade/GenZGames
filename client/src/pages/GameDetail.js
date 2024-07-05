import React, { useState, useEffect } from "react";
import "../styles/GameDetail.css";
import NavBar from "../components/NavBar";
import BasicSlider from "../components/BasicSlider";
import Reviews from "../components/Reviews";
import Footer from "../components/Footer";
import axios from "axios";
import { baseURL } from "../utils/constants";
import { addToCart } from "../utils/cartHandler";
import { checkoutHandler } from "../utils/paymentHandler";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function GameDetail() {
  const [selectedGame, setSelectedGame] = useState(null);

  const fetchSelectedGame = async () => {
    await axios
      .get(baseURL + "/product/" + sessionStorage.getItem("selectedGame"))
      .then((res) => {
        setSelectedGame(res.data.product);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      fetchSelectedGame();
    }, 400);
  }, []);

  return (
    <div id="containerDetail">
      <NavBar />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {selectedGame && selectedGame.background && (
        <div
          id="bannerDetail"
          style={{
            backgroundImage: "url(" + selectedGame.background.secure_url + ")",
          }}
        >
          .
        </div>
      )}
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
                {selectedGame && selectedGame.ratings
                  ? new Number(selectedGame.ratings).toFixed(1) + " / 5"
                  : "Not yet rated"}{" "}
              </h4>
            </div>
            <div className="customInfoDetails">
              <img src="/res/category.png" />
              <h4>{selectedGame && selectedGame.category}</h4>
            </div>
          </div>
          <div id="buyContainerDetails">
            {selectedGame && selectedGame.stock > 0 ? (
              <>
                <div
                  id="buyButtonDetails"
                  onClick={() => {
                    checkoutHandler(
                      selectedGame.price,
                      new Array(selectedGame)
                    );
                  }}
                >
                  Buy Now
                </div>
                <div
                  id="cartButtonDetails"
                  onClick={() => {
                    addToCart(selectedGame._id, 1);
                  }}
                >
                  Add to Cart
                </div>
              </>
            ) : (
              <h4
                style={{
                  textAlign: "center",
                  width: "100%",
                  color: "red",
                  fontSize: "20px",
                }}
              >
                Game Not Available in stock
              </h4>
            )}
          </div>
        </div>
      </div>
      <div id="screenshotsContainer">
        <h2 id="titleScreenshotsDetail">GamePlay Screenshots</h2>
        <BasicSlider photos={selectedGame ? selectedGame.photos : null} />
      </div>
      <div id="reviewsContainer">
        <h2 id="titleReviewsDetail">Game Reviews</h2>
        <Reviews data={selectedGame && selectedGame.reviews} />
      </div>
      <Footer />
    </div>
  );
}

export default GameDetail;
