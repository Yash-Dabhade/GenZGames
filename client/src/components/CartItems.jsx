import React from "react";
import game1Cover from "../gamesMedia/codcover.png";
import "../styles/CartItems.css";

function CartItems({ coverURL, title, price }) {
  return (
    <div id="cartItemBody">
      <div className="cartItem">
        <img src={coverURL} id="cartImg" />
        <h4>{title}</h4>
      </div>
      <div className="cartItem">
        <h4>Rs. {price}</h4>
        <img style={{ cursor: "pointer" }} height="24px" src="/res/trash.png" />
      </div>
    </div>
  );
}

export default CartItems;
