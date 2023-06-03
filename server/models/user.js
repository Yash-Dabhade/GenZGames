const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    maxlength: [40, "Name should be under 40 chars"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    validate: [validator.isEmail, "Please provide email in correct format !"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [6, "Password must be atleast of 6 char"],
    select: false, // does not send password field if false when instance is created
  },
  role: {
    type: String,
    default: "user",
  },
  googleId: {
    type: String,
  },
  photo: {
    id: {
      type: String,
    },
    secure_url: {
      type: String,
    },
  },
  forgotPasswordToken: String,
  forgotPasswordExpiry: Date,
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now, // don't write with paranthesis to make it execute when instance is created
  },
});

//pre hook for schema

//for password encryption on save action
userSchema.pre("save", async function (next) {
  //if only in case of password filed is intialised or modified
  if (!this.isModified("password")) return next();
  else {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

//validate password with user passed password
userSchema.methods.isValidatedPassword = async function (passedPassword) {
  return await bcrypt.compare(passedPassword, this.password);
};

//create and return jwt token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

//generate and return forget password token
userSchema.methods.getForgotPasswordToken = function () {
  //generate a long and random string
  const generatedToken = crypto.randomBytes(20).toString("hex");

  //getting a hash - make sure to get hash on backend
  this.forgotPasswordToken = crypto
    .createHash("sha256")
    .update(generatedToken)
    .digest("hex");

  //expiry time of the token
  this.forgotPasswordExpiry =
    Date.now() + process.env.FORGOT_PASSWORD_EXPIRY * 24 * 60 * 60 * 1000;

  return generatedToken;
};

module.exports = mongoose.model("User", userSchema);
