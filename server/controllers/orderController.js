const Order = require("../models/order");
const Product = require("../models/product");
const BigPromise = require("../middlewares/bigPromise");
const customError = require("../utils/customError");

exports.createOrder = BigPromise(async (req, res, next) => {
  const { orderItems, paymentInfo, taxAmount, totalAmount } = req.body;

  const order = await Order.create({
    orderItems,
    paymentInfo,
    taxAmount,
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

exports.updateOrder = BigPromise(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (order.orderStatus === "Delivered") {
    return next(new customError("Order is already marked for devlivered"));
  }

  order.orderStatus = "Delivered";

  order.orderItems.map(async (prod) => {
    let product = await Product.findById(prod.product);
    key = product.gameKeys.pop();

    console.log(prod);
    product.stock = product.stock - prod.quantity;
    await product.save({ validateBeforeSave: false });

    prod.gameKey = key;
    await order.save();
  });

  await order.save();

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

  order.orderStatus = "Delivered";

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

  let key = product.gameKeys.pop();

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
