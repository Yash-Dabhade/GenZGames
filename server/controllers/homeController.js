const BigPromise = require("../middlewares/bigPromise");

exports.home = BigPromise(async (req, res) => {
  res.status(200).json({
    success: true,
    greeting: "HELLO FROM HOME API !",
  });
});
