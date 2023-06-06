const express = require("express");
const router = express.Router();
const passport = require("passport");

//calling controllers
const {
  signup,
  login,
  logout,
  forgotpassword,
  passwordReset,
  getLoggedInUserDetails,
  changePassword,
  updateUserDetails,
  adminShowAllUsers,
  managerShowAllUsers,
  admingetOneUser,
  adminUpdateOneUserDetails,
  adminDeleteOneUser,
  addToCart,
  updateCart,
  deleteFromCart,
  signInWithGoogleSuccess,
  sendProcessingSignal,
  getAllFromCart,
} = require("../controllers/userController");

//importing all the middlewares
const { isLoggedIn, customRole } = require("../middlewares/user");

//setting user routes
router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/forgotpassword").post(forgotpassword);
router.route("/password/reset/:token").post(passwordReset);

// signin with google
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
  (req, res) => {
    res.send("login with google");
  }
);

router
  .route("/auth/google/callback")
  .get(passport.authenticate("google"), signInWithGoogleSuccess);

//injecting first middleware and then user controller function
router.route("/userdashboard").get(isLoggedIn, getLoggedInUserDetails);
router.route("/password/update").post(isLoggedIn, changePassword);
router.route("/userdashboard/update").post(updateUserDetails);
router.route("/cart/add").post(isLoggedIn, addToCart);
router.route("/cart/get").get(isLoggedIn, getAllFromCart);
router.route("/cart/update").put(isLoggedIn, updateCart);
router.route("/cart/remove").post(isLoggedIn, deleteFromCart);

//admin only routes
router
  .route("/admin/users")
  .get(isLoggedIn, customRole("admin"), adminShowAllUsers);
router
  .route("/admin/user/:id")
  .get(isLoggedIn, customRole("admin"), admingetOneUser)
  .put(isLoggedIn, customRole("admin"), adminUpdateOneUserDetails)
  .delete(isLoggedIn, customRole("admin"), adminDeleteOneUser);

//manager only routes
router
  .route("/manager/users")
  .get(isLoggedIn, customRole("manager"), managerShowAllUsers);

module.exports = router;
