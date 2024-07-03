import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getJWTToken } from "../utils/getToken";

const { baseURL } = require("./constants");

const addToCart = async (productId, quantity) => {
  if (!sessionStorage.getItem("user")) {
    window.location.href = "/login";
    return;
  }
  const token = sessionStorage.getItem("jwtToken");
  let userId = JSON.parse(sessionStorage.getItem("user"))._id;
  await axios
    .post(
      baseURL + "/cart/add",
      {
        userId,
        productId,
        quantity,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
    .then((res) => {
      toast.success("Game added to Cart !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    })
    .catch((err) => {
      console.log(err);
      toast.error("Unable to add to Cart !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    });
};

const deleteFromCart = (productId, initializeCart) => {
  const token = sessionStorage.getItem("jwtToken");
  axios
    .post(
      baseURL + "/cart/remove",
      {
        productId,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
    .then((res) => {
      toast.success("Game removed from cart !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      initializeCart();
    })
    .catch((err) => {
      console.log(err);
      toast.error("Unable to remove from cart !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    });
};

export { addToCart, deleteFromCart };
