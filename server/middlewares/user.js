const BigPromise = require("./bigPromise");
const jwt = require("jsonwebtoken");
const customError = require("../utils/customError");
const User = require("../models/user");

exports.isLoggedIn = BigPromise(async (req, res, next) => {
  //extract token
  const token = req.cookies.token;

  //validate token
  if (!token) {
    return next(
      new customError("Please Log In first to access this page", 401)
    );
  }

  //decode token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  //create field in req
  req.user = await User.findById(decoded.id);

  //pass control to next function i.e continue flow
  next();
});

exports.customRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new customError(
          "Authorized users only allowed to access the resource!",
          403
        )
      );
    }
    next();
  };
};
