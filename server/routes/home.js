const express = require("express");
const router = express.Router();

//controllers
const { home } = require("../controllers/homeController");

//routes
router.route("/").get(home);

module.exports = router;
