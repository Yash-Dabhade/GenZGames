//importing all the libraries required
const express = require("express");
require("dotenv").config();
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const passport = require("passport");
const passportConfig = require("./passport/passport");
const session = require("express-session");
const cors = require("cors");

//create app from express
const app = express();

//setting up cors
// app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

//deployment
app.use(cors({ credentials: true }));

app.use(session({ resave: false, saveUninitialized: true, secret: "SECRET" }));

//morgan middleware
app.use(morgan("tiny"));

//regular middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//temp view engine
app.set("view engine", "ejs");

// files and cookies middlewares
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(cookieParser());

//import all routes
const home = require("./routes/home");
const user = require("./routes/user");
const product = require("./routes/product");
const payment = require("./routes/payment");
const order = require("./routes/order");

// testing routes
app.get("/api/v1/signuptest", (req, res) => {
  res.render("signuptest");
});

//router middlewares
app.use("/api/v1", home);
app.use("/api/v1", user);
app.use("/api/v1", product);
app.use("/api/v1", payment);
app.use("/api/v1", order);

//passport middlwares
app.use(passport.initialize());
app.use(passport.session());

//exporting app into index.js
module.exports = app;
