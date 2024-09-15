const Product = require("../models/product");
const BigPromise = require("../middlewares/bigPromise");
const customError = require("../utils/customError");
const WhereClause = require("../utils/whereClause");
const cloudinary = require("cloudinary").v2;

//add product
exports.addProduct = BigPromise(async (req, res, next) => {
  // Array to store image details
  let imageArray = [];

  // Check if images are present
  if (!req.files) {
    return next(new customError("Images are required", 401));
  }

  try {
    // Upload cover image
    const resultCover = await cloudinary.uploader.upload(
      req.files.cover.tempFilePath,
      {
        folder: "covers",
      }
    );
    req.body.cover = {
      id: resultCover.public_id,
      secure_url: resultCover.secure_url,
    };

    // Upload background image
    const resultBackground = await cloudinary.uploader.upload(
      req.files.background.tempFilePath,
      {
        folder: "background",
      }
    );
    req.body.background = {
      id: resultBackground.public_id,
      secure_url: resultBackground.secure_url,
    };

    // Upload photos (use Promise.all to wait for all uploads)
    const photoUploadPromises = req.files.photos.map((photo) => {
      return cloudinary.uploader.upload(photo.tempFilePath, {
        folder: "products",
      });
    });

    const photoResults = await Promise.all(photoUploadPromises);

    // Store all uploaded photos in imageArray
    imageArray = photoResults.map((result) => ({
      id: result.public_id,
      secure_url: result.secure_url,
    }));

    // Add photos and user to the request body
    req.body.photos = imageArray;
    req.body.user = req.user.id;
    req.body.gameKeys = req.body.gameKeys.split(",");

    // Create product instance
    const product = await Product.create(req.body);

    // Send success response
    res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, error: err });
  }
});

//get all products
exports.getAllProduct = BigPromise(async (req, res, next) => {
  TODO: "Take data from the frontend developer for resultPerPage";
  const resultPerPage = 12;
  const totalCountProduct = await Product.countDocuments();

  // console.log(totalCountProduct);

  const productsObj = new WhereClause(Product.find(), req.query)
    .search()
    .filter();

  let products = await productsObj.base;
  const filteredProductNumber = products.length;

  productsObj.pager(resultPerPage);
  products = await productsObj.base.clone();

  // products.forEach((ele) => {
  //   ele.gameKeys = null;
  // });

  // console.log(products);

  res.status(200).json({
    success: true,
    products,
    filteredProductNumber,
    totalCountProduct,
  });
});

//filtered and sorted products
exports.getFilteredProducts = BigPromise(async (req, res, next) => {
  const { categories } = req.body;
  let categorizedProducts = [];

  if (categories.length > 0) {
    for (let index = 0; index < categories.length; index++) {
      const category = categories[index];
      let result = await Product.find({ category });
      categorizedProducts.push(...result);
    }
  } else {
    let result = await Product.find();
    categorizedProducts.push(...result);
  }

  res.status(200).json({
    success: true,
    categorizedProducts,
  });
});

//get one product
exports.getOneProduct = BigPromise(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new customError("NO product found with this id", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

//add review
exports.addReview = BigPromise(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  // console.log(review);

  const product = await Product.findById(productId);

  const AlreadyReview = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (AlreadyReview) {
    product.reviews.forEach((review) => {
      if (review.user.toString() == req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.numberOfReviews = product.reviews.length;
  }

  //adjust ratings
  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  //saving to the database
  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    product,
    review,
  });
});

//delete review
exports.deleteReview = BigPromise(async (req, res, next) => {
  const { productId } = req.query;

  const product = await Product.findById(productId);

  const reviews = product.reviews.filter(
    (rev) => rev.user.toString() !== req.user._id.toString()
  );

  const numberOfReviews = reviews.length;

  //adjust ratings
  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  //update the product
  await Product.findByIdAndUpdate(
    productId,
    {
      reviews,
      numberOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});

//get single product reviews
exports.getOnlyReviewsForOneProduct = BigPromise(async (req, res, next) => {
  const product = await Product.findById(req.body.productId);

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

//admin only controllers

exports.adminGetAllProduct = BigPromise(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
});

exports.adminUpdateOneProduct = BigPromise(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  const { screenshots, gameKeys } = req.body;

  if (!product) {
    return next(new customError("No product found with the givven ID", 404));
  }

  let imagesArray = [];

  let screenShotArray = screenshots.split(",");
  screenShotArray.forEach((url) => {
    imagesArray.push({
      id: Date.now(),
      secure_url: url,
    });
  });

  req.body.photos = imagesArray;

  if (gameKeys) {
    let newGameKeys = gameKeys.split(",");
    product.gameKeys.push(...newGameKeys);
    req.body.gameKeys = product.gameKeys;
    req.body.stock = new Number(product.stock + newGameKeys.length);
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

exports.adminDeleteOneProduct = BigPromise(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new customError("No product found with the given id", 404));
  }

  //destroy the existing image
  for (let index = 0; index < product.photos.length; index++) {
    const res = await cloudinary.v2.uploader.destroy(product.photos[index].id);
  }
  s;
});
