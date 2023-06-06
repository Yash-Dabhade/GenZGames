import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const { baseURL } = require("./constants");

const addToCart = async (productId, quantity) => {
  if (!sessionStorage.getItem("user")) {
    window.location.href = "/login";
    return;
  }
  let userId = JSON.parse(sessionStorage.getItem("user"))._id;
  await axios
    .post(
      baseURL + "/cart/add",
      {
        userId,
        productId,
        quantity,
      },
      { withCredentials: true }
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
      // getAllFromCart();
      sessionStorage.setItem("isCartUpdated", "Yes");
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
  axios
    .post(
      baseURL + "/cart/remove",
      {
        productId,
      },
      {
        withCredentials: true,
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
      // getAllFromCart();
      initializeCart();
      // sessionStorage.setItem("isCartUpdated", "Yes");
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

const getAllFromCart = async () => {
  await axios
    .get(baseURL + "/cart/get", { withCredentials: true })
    .then((res) => {
      console.log(res.data.data.cart);
      sessionStorage.setItem("userCart", JSON.stringify(res.data.data.cart));
      sessionStorage.setItem("isCartUpdated", "Yes");
    })
    .catch((err) => {
      console.log(err);
    });
};

export { addToCart, getAllFromCart, deleteFromCart };
