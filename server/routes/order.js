const express = require("express");
const {
  createOrder,
  getOneOrder,
  getLoggedInOrders,
  admingetAllOrders,
  adminUpdateOrder,
  adminDeleteOrder,
  updateOrder,
} = require("../controllers/orderController");
const router = express.Router();
const { isLoggedIn, customRole } = require("../middlewares/user");

router.route("/order/create").post(isLoggedIn, createOrder);
router.route("/myorder").get(isLoggedIn, getLoggedInOrders);
router.route("/order/updatestatus/:id").put(isLoggedIn, updateOrder);
router.route("/order/:id").get(isLoggedIn, getOneOrder); //remember to keep such routes at last

//admin routes
router
  .route("/admin/orders")
  .get(isLoggedIn, customRole("admin"), admingetAllOrders);
router
  .route("/admin/order/:id")
  .put(isLoggedIn, customRole("admin"), adminUpdateOrder)
  .delete(isLoggedIn, customRole("admin"), adminDeleteOrder);

module.exports = router;
