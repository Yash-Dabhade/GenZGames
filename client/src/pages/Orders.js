import React from "react";
import "../styles/Order.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { NavLink } from "react-router-dom";
import game1Cover from "../gamesMedia/codcover.png";
import game2Cover from "../gamesMedia/dbzcover.png";
import game3Cover from "../gamesMedia/watchdogscover.png";
import OrderItems from "../components/OrderItems";

function Orders() {
  return (
    <div id="orderContainer">
      <NavBar />
      <div id="orderInnerContainer">
        <div id="orderLeftMenuContainer">
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
        <div id="orderRightContentContainer">
          <OrderItems
            coverURL={game1Cover}
            title={"Call of Duty: Cold War"}
            productId={10839182102}
            date={"29/05/23"}
            price={"12500"}
            gameKey={"91F3-2398-FJ30"}
          />
          <OrderItems
            coverURL={game2Cover}
            title={"Call of Duty: Cold War"}
            productId={10839182102}
            date={"29/05/23"}
            price={"2500"}
            gameKey={"91F3-2398-FJ30"}
          />
          <OrderItems
            coverURL={game3Cover}
            title={"Call of Duty: Cold War"}
            productId={10839182102}
            date={"29/05/23"}
            price={"2500"}
            gameKey={"91F3-2398-FJ30"}
          />
          <OrderItems
            coverURL={game1Cover}
            title={"Call of Duty: Cold War"}
            productId={10839182102}
            date={"29/05/23"}
            price={"2500"}
            gameKey={"91F3-2398-FJ30"}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Orders;
