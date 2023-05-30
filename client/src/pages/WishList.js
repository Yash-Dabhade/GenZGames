import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { NavLink } from "react-router-dom";
import game1Cover from "../gamesMedia/codcover.png";
import game2Cover from "../gamesMedia/dbzcover.png";
import game3Cover from "../gamesMedia/watchdogscover.png";
import OrderItems from "../components/OrderItems";

function WishList() {
  return (
    <div id="profileContainer">
      <NavBar />
      <div id="profileInnerContainer">
        <div id="profileLeftMenuContainer">
          <NavLink className="profileMenuItems" to="/profile">
            <img src="./res/user.png" height={"34px"} />
            <h3>Profile</h3>
          </NavLink>
          <NavLink to="/orders" className="profileMenuItems">
            <img src="./res/orders.png" height={"34px"} />
            <h3>Orders</h3>
          </NavLink>
          <NavLink to="/wishlist" className="profileMenuItems">
            <img
              src="./res/heart.png"
              style={{ filter: "invert(0%)" }}
              height={"34px"}
            />
            <h3>Wishlist</h3>
          </NavLink>
          <NavLink to="/login" className="profileMenuItems">
            <img src="./res/logout.png" height={"34px"} />
            <h3>Logout</h3>
          </NavLink>
        </div>
        <div id="profileRightContentContainer">WishList</div>
      </div>
      <Footer />
    </div>
  );
}

export default WishList;
