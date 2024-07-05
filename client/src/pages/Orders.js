import React, { useEffect, useState } from "react";
import "../styles/Order.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { NavLink } from "react-router-dom";
import OrderItems from "../components/OrderItems";
import axios from "axios";
import { baseURL } from "../utils/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getJWTToken } from "../utils/getToken";

function Orders() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("jwtToken");
    axios
      .get(baseURL + "/myorder", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        let data = res.data.order.reverse();
        setOrder(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

          <NavLink to="/login" className="mobileOnlyDiv2 profileMenuItems">
            <img src="./res/logout.png" height={"34px"} />
            <h3>Logout</h3>
          </NavLink>
        </div>
        <div id="orderRightContentContainer">
          {order &&
            order.map((orderEle) =>
              orderEle.orderItems.map((orderItem) => {
                return (
                  <OrderItems
                    key={orderItem._id}
                    coverURL={orderItem.image}
                    title={orderItem.name}
                    productId={orderItem.product}
                    paymentInfo={orderEle.paymentInfo}
                    date={
                      new Date(orderEle.createdAt).getDate() +
                      1 +
                      "/" +
                      new Date(orderEle.createdAt).getMonth() +
                      "/" +
                      new Date(orderEle.createdAt).getFullYear()
                    }
                    price={orderItem.price}
                    gameKey={orderItem.gameKey}
                  />
                );
              })
            )}
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Footer />
    </div>
  );
}

export default Orders;
