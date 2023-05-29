import React from "react";
import game1Cover from "../gamesMedia/codcover.png";
import "../styles/CartItems.css";

function CartItems() {
  return (
    <div id="cartItemBody">
      <div className="cartItem">
        <img src={game1Cover} id="cartImg" />
        <h4>Call of Duty: Cold War</h4>
      </div>
      <div className="cartItem">
        <h4>Rs. 1700 </h4>
        <img height="24px" src="/res/trash.png" />
      </div>
    </div>
  );
}

export default CartItems;
