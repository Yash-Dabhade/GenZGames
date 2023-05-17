//importing all the libraries required
const express = require("express");
require("dotenv").config();
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

//create app from express
const app = express();

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

//testing routes
// app.get("/api/v1/signuptest", (req, res) => {
//   res.render("signuptest");
// });

//router middlewares
app.use("/api/v1", home);

//exporting app into index.js
module.exports = app;
