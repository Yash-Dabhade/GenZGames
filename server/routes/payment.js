const express = require("express");
const router = express.Router();
const {
  sendRazorpayKey,
  captureRazorpayPayment,
  paymentVerification,
} = require("../controllers/paymentController");
const { isLoggedIn } = require("../middlewares/user");

router.route("/razorpaykey").get(isLoggedIn, sendRazorpayKey);
router.route("/capturerazorpay").post(isLoggedIn, captureRazorpayPayment);
router.route("/paymentverification").post(isLoggedIn, paymentVerification);

module.exports = router;
