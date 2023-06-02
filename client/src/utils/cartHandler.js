import axios from "axios";
const { baseURL } = require("./constants");

const addToCart = async (productId, quantity) => {
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
      // console.log(res);
      getAllFromCart();
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteFromCart = (productId) => {
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
      getAllFromCart();
    })
    .catch((err) => {
      console.log(err);
    });
};

const getAllFromCart = async () => {
  await axios
    .get(baseURL + "/cart/get", { withCredentials: true })
    .then((res) => {
      sessionStorage.setItem("userCart", JSON.stringify(res.data.data.cart));
      sessionStorage.setItem("isCartUpdated", "Yes");
    })
    .catch((err) => {
      console.log(err);
    });
};

export { addToCart, getAllFromCart, deleteFromCart };
