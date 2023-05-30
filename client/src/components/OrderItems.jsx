import React from "react";
import "../styles/OrderItems.css";
import CartItems from "./CartItems";
function OrderItems({ coverURL, title, productId, date, price, gameKey }) {
  return (
    <div id="orderItemsContainer">
      <img src={coverURL} id="orderCover"></img>
      <div className="box" id="orderDetailsContainer">
        <div id="orderDetailsTopContainer">
          <p>Product ID : {productId}</p>
          <p>Date Purchased : {date}</p>
        </div>
        <div id="orderDetailsMiddleContainer">
          <p>{title}</p>
          <p>Purchased At: Rs. {price}</p>
        </div>
        <div id="orderDetailsBottomContainer">
          <p>Key: {gameKey}</p>
          <button id="orderRateButton">Rate this Game</button>
        </div>
      </div>
    </div>
  );
}

export default OrderItems;
