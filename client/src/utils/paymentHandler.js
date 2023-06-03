import { baseURL } from "./constants";
import axios from "axios";

const checkoutHandler = async (amount, orderItems) => {
  //get razorpay key
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
                  baseURL + "/order/create",
                  {
                    orderItems,
                    paymentInfo: razorpay_payment_id,
                    taxAmount: 0,
                    totalAmount: order.amount,
                  },
                  { withCredentials: true }
                )
                .then((res) => {
                  window.location.href = "/orders";
                })
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
