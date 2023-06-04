import React from "react";
import "../styles/OrderItems.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function OrderItems({
  coverURL,
  title,
  productId,
  date,
  price,
  gameKey,
  paymentInfo,
}) {
  const addReview = (productId) => {
    sessionStorage.setItem("reviewProductId", productId);
    window.location.href = "/rategame";
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(gameKey);
    toast.info("Game Key Copied !", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <>
      <div id="orderItemsContainer">
        <img src={coverURL} id="orderCover"></img>
        <div className="box" id="orderDetailsContainer">
          <div id="orderDetailsTopContainer">
            <p>Payment ID : {paymentInfo}</p>
            <p>Date Purchased : {date}</p>
          </div>
          <div id="orderDetailsMiddleContainer">
            <p>{title}</p>
            <p>Purchased At: Rs. {price}</p>
          </div>
          <div id="orderDetailsBottomContainer">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              Key :{" "}
              <input id="gameKeyInput" type="text" value={gameKey} readOnly />
              <img
                style={{ cursor: "pointer" }}
                onClick={handleCopy}
                src={"./res/copy.png"}
                height={"25px"}
                padding={"0px 15px"}
              />
            </div>
            <button
              onClick={() => {
                addReview(productId);
              }}
              id="orderRateButton"
            >
              Rate this Game
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderItems;
