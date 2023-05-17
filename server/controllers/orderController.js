const Order = require("../models/order");
const Product = require("../models/product");
const BigPromise = require("../middlewares/bigPromise");
const customError = require("../utils/customError");

exports.createOrder = BigPromise(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    taxAmount,
    shippingAmount,
    totalAmount,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    taxAmount,
    shippingAmount,
    totalAmount,
    user: req.user._id,
  });

  res.status(200).json({
    success: true,
    order,
  });
});

exports.getOneOrder = BigPromise(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new customError("please check the order id", 401));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

exports.getLoggedInOrders = BigPromise(async (req, res, next) => {
  const order = await Order.find({ user: req.user._id });

  if (!order) {
    return next(new customError("Please check order id", 401));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

exports.admingetAllOrders = BigPromise(async (req, res, next) => {
  const orders = await Order.find();

  res.status(200).json({
    success: true,
    orders,
  });
});

exports.adminUpdateOrder = BigPromise(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (order.orderStatus === "Delivered") {
    return next(new customError("Order is already marked for devlivered"));
  }

  order.orderStatus = req.body.orderStatus;

  order.orderItems.forEach(async (prod) => {
    await updateProductStock(prod.product, prod.quantity);
  });

  await order.save();

  res.status(200).json({
    success: true,
    order,
  });
});

async function updateProductStock(productId, quantity) {
  const product = await Product.findById(productId);

  product.stock = product.stock - quantity;

  await product.save({ validateBeforeSave: false });
}

exports.adminDeleteOrder = BigPromise(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  await order.remove();

  res.status(200).json({
    success: true,
  });
});
