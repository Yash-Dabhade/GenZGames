const User = require("../models/user");
const user = require("../models/user");
const BigPromise = require("../middlewares/bigPromise.js");
const customError = require("../utils/customError");
const cookieToken = require("../utils/cookieToken");
const mailHelper = require("../utils/mailHelper");
const cloudinary = require("cloudinary").v2;
const crypto = require("crypto");
const passport = require("passport");
require("dotenv").config();

//sign up controller
exports.signup = BigPromise(async (req, res, next) => {
  //extract data
  const { name, email, password } = req.body;

  // data validation
  if (!name || !email || !password) {
    return next(new customError("Name, Email and Password are mandatory !"));
  }

  //extract photo
  // let photoResult = {
  //   public_id: process.env.DEFAULT_USER_PROFILE_ID,
  //   secure_url: process.env.DEFAULT_USER_PROFILE_SECURE_URL,
  // };
  // if (req.files) {
  //   //TODO: "FRONTEND FIELD SHOULD BE NAMED AS photo";
  //   let photo = req.files.photo;
  //   //upload to cloudinary
  //   photoResult = await cloudinary.uploader.upload(photo.tempFilePath, {
  //     folder: "users",
  //     width: 150,
  //     crop: "scale",
  //   });
  // }

  //saving document to db
  User.create({
    name,
    email,
    password,
    // photo: {
    //   id: photoResult.public_id,
    //   secure_url: photoResult.secure_url,
    // },
  })
    .then((user) => {
      cookieToken(user, res);
    })
    .catch((err) => {
      console.log(err);
    });

  //generate and send cookieToken
});

//login controller
exports.login = BigPromise(async (req, res, next) => {
  const { email, password } = req.body;

  //validation
  if (!email || !password) {
    return next(new customError("All fields are mandatory !", 400));
  }

  //get user  from the db
  const user = await User.findOne({ email }).select("+password");

  //if user not found in database
  if (!user) {
    return next(
      new customError(
        "Email or password is incorrect or user not registered !",
        404
      )
    );
  }
  //check password
  const isPasswordCorrect = await user.isValidatedPassword(password);

  //password is incorrect
  if (!isPasswordCorrect) {
    return next(new customError("Email or password is incorrect !", 404));
  }

  //send cookie token
  cookieToken(user, res);
});

// sigin with gooogle
exports.sendProcessingSignal = BigPromise(async (req, res, next) => {
  //sendng signal
  res.sendStatus(200);
});

exports.signInWithGoogleSuccess = BigPromise(async (req, res, next) => {
  //sending user object to frontend
  // get token from custom built method
  let myUser = req.user;
  const token = myUser.getJwtToken();

  //set options for the cookie
  const options = {
    expires: new Date(
      Date.now() + new Number(process.env.COOKIE_TIME) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  //set password undefined for security
  user.password = undefined;

  //send response
  res
    .status(200)
    .cookie("token", token, options)
    .redirect(process.env.REDIRECT_URL);
  // cookieToken(req.user, res);
});

//add to cart
exports.addToCart = BigPromise(async (req, res, next) => {
  //extract data
  const { userId, productId, quantity } = req.body;

  // data validation
  if (!userId || !productId || !quantity) {
    return next(new customError("All values are are mandatory !"));
  }

  const user = await User.findById(userId);

  if (!user) {
    return res.json({ code: 400, message: "Invalid User" });
  }

  if (!user.cart) {
    user.cart = new Array(productId);
    await user.save();
  } else if (user.cart.findIndex((ele) => ele == productId) == -1) {
    user.cart.push(productId);
    await user.save();
  }

  //generate and send cookieToken of cart
  cookieToken(user, res);
  // res.status(200).json({ success: "true", user });
});

//updateCart
exports.updateCart = BigPromise(async (req, res, next) => {
  //extract data
  const { userId, productId, quantity } = req.body;

  // data validation
  if (!userId || !productId || !quantity) {
    return next(new customError("All values are are mandatory !"));
  }

  const user = await User.findById(userId);

  if (!user) {
    return res.json({ code: 400, message: "Invalid User" });
  }

  let found = false;
  user.cart.forEach((ele) => {
    if (ele == productId) {
      found = true;
    }
  });

  await user.save();

  //generate and send cookieToken of cart
  cookieToken(user, res);
});

//get items from the cart
exports.getAllFromCart = BigPromise(async (req, res, next) => {
  const user = req.user;

  if (!user) {
    return res.json({ code: 400, message: "Invalid User" });
  }

  const data = await User.findById(user.id).populate("cart");

  res.status(200).json({ success: true, data });
});

//deleteFromCart
exports.deleteFromCart = BigPromise(async (req, res, next) => {
  //extract data
  const { productId } = req.body;

  // data validation
  if (!productId) {
    return next(new customError("All values are are mandatory !"));
  }

  const user = req.user;

  if (!user) {
    return res.json({ code: 400, message: "Invalid User" });
  }

  user.cart = user.cart.filter((ele) => {
    return ele != productId;
  });

  // user.cart = newCart;

  await user.save();

  res.status(200).json({ success: true, data: user.cart });
});

//logout controller
exports.logout = BigPromise(async (req, res, next) => {
  //clear logout token from cookie
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  //success response
  res.status(200).json({
    success: "true",
    message: "Logged out successfull !",
  });
});

//forget password
exports.forgotpassword = BigPromise(async (req, res, next) => {
  //collect email
  const { email } = req.body;

  if (!email) {
    return next(new customError("Invalid email format !"));
  }

  //find user in db
  const user = await User.findOne({ email });

  //if user not found in database
  if (!user) {
    return next(new customError("Email not found as registerd !"));
  }

  //get token from user model methods
  const forgotToken = user.getForgotPasswordToken();

  //save user fileds in databse
  await user.save({ validateBeforeSave: false });

  //create a URL
  const myUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${forgotToken}`;

  //craft a message
  const message = `Copy paste this link in URL and hit enter \n\n ${myUrl}`;

  //attempt to send email
  try {
    await mailHelper({
      email: user.email,
      subject: "LCO Store - Password Reset",
      message,
    });

    //send json response for success
    res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    //reset user fields if not success
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;
    await user.save({ validateBeforeSave: false });

    //send error response
    return next(new customError(error.message, 500));
  }
});

//password reset
exports.passwordReset = BigPromise(async (req, res, next) => {
  //get token from params
  const token = req.params.token;

  // hash the token as db also stores the hashed version
  const encryToken = crypto.createHash("sha256").update(token).digest("hex");

  // find user based on hased on token and time in future
  const user = await User.findOne({
    encryToken,
    forgotPasswordExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return next(new CustomError("Token is invalid or expired", 400));
  }

  // check if password and conf password matched
  if (req.body.password !== req.body.confirmPassword) {
    return next(
      new CustomError("password and confirm password do not match", 400)
    );
  }

  // update password field in DB
  user.password = req.body.password;

  // reset token fields
  user.forgotPasswordToken = undefined;
  user.forgotPasswordExpiry = undefined;

  // save the user
  await user.save();

  // send a JSON response OR send token

  cookieToken(user, res);
});

//send details to userdashboard
exports.getLoggedInUserDetails = BigPromise(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

//change password
exports.changePassword = BigPromise(async (req, res, next) => {
  //grab user from db
  const user = await User.findById(req.user.id).select("+password");
  if (!user) {
    return next(new customError("Log In first to access !", 400));
  }
  //compare password
  const isCorrectOldPassword = await user.isValidatedPassword(
    req.body.oldPassword
  );

  if (!isCorrectOldPassword) {
    return next(new customError("Old password is incorrect", 400));
  }

  //update to new password
  user.password = req.body.newPassword;

  //save to database
  await user.save();

  //send updated cookie token
  cookieToken(user, res);
});

exports.updateUserDetails = BigPromise(async (req, res, next) => {
  //checking the data
  if (!(req.body.name && req.body.email && req.body.password)) {
    return next(
      new customError("Please provide all the data while updating !", 400)
    );
  }

  //collect data from the body
  const newData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  //if photo is also update
  if (req.files && req.files.photo) {
    const user = await User.findById(req.user.id);

    const imageId = user.photo.id;

    //delet photo on cloudinary
    await cloudinary.uploader.destroy(imageId);

    //upload the new photo
    const result = await cloudinary.uploader.upload(
      req.files.photo.tempFilePath,
      {
        folder: "users",
        width: 150,
        crop: "scale",
      }
    );

    //add photo data in new data object
    newData.photo = {
      id: result.public_id,
      secure_url: result.secure_url,
    };
  }

  //update the data in user
  const user = await User.findByIdAndUpdate(req.user.id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
    newData,
  });
});

//get all users info : ADMIN ONLY ROUTE
exports.adminShowAllUsers = BigPromise(async (req, res, next) => {
  //get all users from database
  const users = await User.find();

  //return all users
  res.status(200).json({
    success: true,
    users,
  });
});

//get all users info : MANAGER ONLY ROUTE
exports.managerShowAllUsers = BigPromise(async (req, res, next) => {
  //get all users from database
  const users = await User.find({ role: "user" });

  //return all users
  res.status(200).json({
    success: true,
    users,
  });
});

//get single user info admin
exports.admingetOneUser = BigPromise(async (req, res, next) => {
  // get id from url and get user from database
  const user = await User.findById(req.params.id);

  if (!user) {
    next(new CustomError("No user found", 400));
  }

  // send user
  res.status(200).json({
    success: true,
    user,
  });
});

exports.adminUpdateOneUserDetails = BigPromise(async (req, res, next) => {
  // add a check for email and name in body

  // get data from request body
  const newData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  // update the user in database
  const user = await User.findByIdAndUpdate(req.params.id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

exports.adminDeleteOneUser = BigPromise(async (req, res, next) => {
  // get user from url
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new CustomError("No Such user found", 401));
  }

  // get image id from user in database
  const imageId = user.photo.id;

  // delete image from cloudinary
  await cloudinary.v2.uploader.destroy(imageId);

  // remove user from databse
  await user.remove();

  res.status(200).json({
    success: true,
  });
});
