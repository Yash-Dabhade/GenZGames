import { baseURL } from "./constants";
import axios from "axios";

const checkoutHandler = async (amount, products) => {
  //get razorpay key
  console.log(products);
  let key, order;
  axios
    .get(baseURL + "/razorpaykey", { withCredentials: true })
    .then((res) => {
      key = res.data.razorpaykey;
      console.log(res.data.razorpaykey);
      axios
        .post(
          baseURL + "/capturerazorpay",
          {
            amount,
          },
          { withCredentials: true }
        )
        .then((res) => {
          order = res.data.order;
          console.log(res.data.order);
          console.log(key);
          console.log(order);
          let user = JSON.parse(sessionStorage.getItem("user"));

          const options = {
            key: key,
            amount: order.amount,
            currency: "INR",
            name: "GenZGames",
            description: "Experience True Gaming Exclusive",
            image:
              "https://res.cloudinary.com/dspk9w7mc/image/upload/v1685777987/logo_uhkqzc.png",
            order_id: order.id,
            // callback_url: "http://localhost:4000/api/v1/paymentverification",
            handler: function (response) {
              const {
                razorpay_payment_id,
                razorpay_order_id,
                razorpay_signature,
              } = response;

              axios
                .post(
                  baseURL + "/paymentverification",
                  {
                    razorpay_payment_id,
                    razorpay_order_id,
                    razorpay_signature,
                    order,
                    products,
                  },
                  { withCredentials: true }
                )
                .then((res) => {})
                .catch((err) => {
                  console.log(err);
                });
            },
            prefill: {
              name: user.name,
              email: user.email,
            },
            notes: {
              address: "Razorpay Corporate Office",
            },
            theme: {
              color: "#121212",
            },
          };
          const razor = new window.Razorpay(options);
          razor.open();
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

export { checkoutHandler };
