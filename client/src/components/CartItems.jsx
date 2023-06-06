import React from "react";
import "../styles/CartItems.css";
import { deleteFromCart } from "../utils/cartHandler";

function CartItems({ gameId, coverURL, title, price, initializeCart }) {
  return (
    <div id="cartItemBody">
      <div className="cartItem">
        <img src={coverURL} id="cartImg" />
        <h4>{title}</h4>
      </div>
      <div className="cartItem">
        <h4>Rs. {price}</h4>
        <img
          id="deleteCartItemBtn"
          onClick={() => {
            deleteFromCart(gameId, initializeCart);
          }}
          height="24px"
          src="/res/trash.png"
        />
      </div>
    </div>
  );
}

export default CartItems;
