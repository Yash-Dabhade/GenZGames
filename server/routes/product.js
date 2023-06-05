const express = require("express");
const router = express.Router();
const {
  addProduct,
  getAllProduct,
  adminGetAllProduct,
  getOneProduct,
  adminUpdateOneProduct,
  adminDeleteOneProduct,
  addReview,
  deleteReview,
  getOnlyReviewsForOneProduct,
  getFilteredProducts,
} = require("../controllers/productController");

//importing all the middlewares
const { isLoggedIn, customRole } = require("../middlewares/user");

// user routes
router.route("/products").get(getAllProduct);
router.route("/filteredproducts").post(getFilteredProducts);
router.route("/product/:id").get(getOneProduct);
router.route("/review").post(isLoggedIn, addReview);
router.route("/reviews").post(isLoggedIn, getOnlyReviewsForOneProduct);
router.route("/review").delete(isLoggedIn, deleteReview);

//admin routes
router
  .route("/admin/product/add")
  .post(isLoggedIn, customRole("admin"), addProduct);
router
  .route("/admin/products")
  .get(isLoggedIn, customRole("admin"), adminGetAllProduct);

router
  .route("/admin/product/:id")
  .put(isLoggedIn, customRole("admin"), adminUpdateOneProduct)
  .delete(isLoggedIn, customRole("admin"), adminDeleteOneProduct);
module.exports = router;
