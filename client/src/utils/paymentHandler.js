import { baseURL } from "./constants";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const checkoutHandler = async (amount, orderItems) => {
  if (!sessionStorage.getItem("user")) {
    window.location.href = "/login";
    return;
  }
  const token = sessionStorage.getItem("jwtToken");
  let key, order;
  axios
    .get(baseURL + "/razorpaykey", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      key = res.data.razorpaykey;
      axios
        .post(
          baseURL + "/capturerazorpay",
          {
            amount,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
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
              "https://res.cloudinary.com/dspk9w7mc/image/upload/v1685856749/logoOnly_gujwlk.png",
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
                  {
                    headers: {
                      Authorization: "Bearer " + token,
                    },
                  }
                )
                .then((res) => {
                  toast.success(
                    "Payment successfull ! Getting your game ready ",
                    {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "colored",
                    }
                  );
                  setTimeout(() => {
                    window.location.href = "/orders";
                  }, 3000);
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
              color: "#181a21",
            },
          };
          const razor = new window.Razorpay(options);
          razor.open();
          razor.on("payment.failed", function (response) {
            toast.error("Payment Failed ! Please try again later", {
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
