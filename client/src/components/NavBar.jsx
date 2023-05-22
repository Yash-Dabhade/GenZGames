import React from "react";
import "../styles/NavBar.css";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <div id="NavContainer">
      <div id="logoContainer">
        <div>
          <NavLink to="/">
            <img src="/res/logo.png" alt="" id="logoImg" />
          </NavLink>
        </div>
        <div id="searchbox" className="input">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search Games"
          />
        </div>
      </div>
      <div id="userUtil">
        <img src="/res/cart.png" alt="cart" id="cart" />
        <img src="/res/heart.png" alt="favourite" id="heart" />
        <img src="/res/user.jpg" alt="user" id="user" />
      </div>
    </div>
  );
}

export default NavBar;
