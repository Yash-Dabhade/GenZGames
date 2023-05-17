const app = require("./app");
const connectWithDB = require("./config/db");
require("dotenv").config();
const cloudinary = require("cloudinary");

//connect to Database
connectWithDB();

//config cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//staring server
app.listen(process.env.PORT, () => {
  console.log("Server running at PORT : ", process.env.PORT);
});
