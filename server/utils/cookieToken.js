require("dotenv").config();
const cookieToken = (user, res) => {
  // get token from custom built method
  const token = user.getJwtToken();

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
  res.status(200).cookie("token", token, options).json({
    success: true,
    token,
    user,
  });
};

module.exports = cookieToken;
