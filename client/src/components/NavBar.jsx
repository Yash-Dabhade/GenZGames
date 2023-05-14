import React from "react";
import "../styles/NavBar.css";

function NavBar() {
  return (
    <div id="NavContainer">
      <div id="logoContainer">
        <div>
          <img src="/res/logo.png" alt="" id="logoImg" />
        </div>
        <div id="Menu">
          <p>Home</p>
          <p>Shop</p>
          <p>Streams</p>
          <p>News</p>
        </div>
      </div>
      <div id="userUtil">
        <img src="/res/cart.png" alt="" id="cart" />
        <img src="/res/heart.png" alt="" id="heart" />
      </div>
    </div>
  );
}

export default NavBar;
