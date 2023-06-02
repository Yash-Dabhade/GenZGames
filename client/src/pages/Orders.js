import React from "react";
import "../styles/Order.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { NavLink } from "react-router-dom";
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

          <NavLink to="/login" className="profileMenuItems">
            <img src="./res/logout.png" height={"34px"} />
            <h3>Logout</h3>
          </NavLink>
        </div>
        <div id="orderRightContentContainer">
          <OrderItems
            coverURL={
              "https://res.cloudinary.com/dspk9w7mc/image/upload/v1685630149/covers/g6fmkoja7uurdznyj9nq.png"
            }
            title={"Assassinc Creed Odyssey"}
            productId={10839182102}
            date={"29/05/23"}
            price={"2500"}
            gameKey={"91F3-2398-FJ30"}
          />
          <OrderItems
            coverURL={
              "https://res.cloudinary.com/dspk9w7mc/image/upload/v1685629517/covers/cvf8jfrwnm6sj6gvvzzb.jpg"
            }
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
