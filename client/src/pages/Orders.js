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

function Orders() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    axios
      .get(baseURL + "/myorder", { withCredentials: true })
      .then((res) => {
        setOrder(res.data.order);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div id="orderContainer">
      <NavBar />
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
          {order &&
            order.map((orderEle) =>
              orderEle.orderItems.map((orderItem) => {
                return (
                  <OrderItems
                    key={orderItem._id}
                    coverURL={orderItem.image}
                    title={orderItem.name}
                    productId={orderItem._id}
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
      <Footer />
    </div>
  );
}

export default Orders;
