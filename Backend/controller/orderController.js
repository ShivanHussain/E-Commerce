import Order from "../models/order.js";
import User from "../models/user.js";
import Product from "../models/product.js";
import ErrorHandler from "../middleware/error.js";
import { catchAsyncError } from "../middleware/catchAsyncError.js";

// Normalize payment status string
const normalizeStatus = (status) => {
  if (!status) return "Pending";
  return status.toLowerCase().includes("complete") ? "Completed" : "Pending";
};


// Place a new order
export const placeOrder = catchAsyncError(async (req, res, next) => {
  const { id: userId } = req.headers;
  const { paymentDetails, shippingAddress, items: rawItems } = req.body;

  if (!userId || !paymentDetails || !shippingAddress || !Array.isArray(rawItems) || rawItems.length === 0) {
    return next(new ErrorHandler("Invalid request: missing required order details", 400));
  }

  let items = [];

  for (const item of rawItems) {
    if (!item.productId) {
      return next(new ErrorHandler("Each item must include productId", 400));
    }

    const product = await Product.findById(item.productId);
    if (!product) {
      return next(new ErrorHandler(`Product not found: ${item.productId}`, 404));
    }

    items.push({
      productId: product._id,
      image: product.image?.url || "",
      title: product.title,
      price: product.price,
      category: product.category,
      quantity: 1,
    });
  }

  if (!items.length) {
    return next(new ErrorHandler("No valid items found in the order", 400));
  }

  // Create new order
  const newOrder = new Order({
    user: userId,
    items,
    paymentDetails: {
      id: paymentDetails?.id,
      transactionId: paymentDetails?.transactionId || paymentDetails?.id,
      amount: paymentDetails?.amount || paymentDetails?.amountInINR || 0,
      amountInINR: Number(paymentDetails?.amountInINR || 0),
      amountInUSD: Number(paymentDetails?.amountInUSD || 0),
      status: normalizeStatus(paymentDetails?.status),
      create_time: paymentDetails?.create_time,
    },
    shippingAddress: {
      fullName: shippingAddress?.fullName,
      email: shippingAddress?.email,
      phone: shippingAddress?.phone,
      address: shippingAddress?.address,
      country: shippingAddress?.country,
      city: shippingAddress?.city,
      zipcode: shippingAddress?.zipcode,
    },
  });

  await newOrder.save(); // Save the order to the database
  await User.findByIdAndUpdate(userId, {
    $push: { orders: newOrder._id },
    $pull: { cart: { $in: items.map((i) => i.productId) } },
  });

  res.status(201).json({
    status: "success",
    message: "Order placed successfully",
    orderId: newOrder._id,
  });
});





// Get order history of a particular user
export const getOrderHistory = catchAsyncError(async (req, res, next) => {
  const userId = req.headers.id; // Secure source

  if (!userId) {
    return next(new ErrorHandler("Unauthorized. User ID is missing.", 401));
  }

  const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });

  if (!orders || orders.length === 0) {
    return res.status(404).json({
      status: "fail",
      message: "No orders found for this user",
    });
  }

  res.status(200).json({
    status: "success",
    results: orders.length,
    orders,
  });
});



// Get order by order Id
export const getOrderById = catchAsyncError(async (req, res, next) => {
  const orderId = req.params.id; 
  const userId = req.headers.id; 

  if (!userId) {
    return next(new ErrorHandler("Unauthorized. User ID is missing.", 401));
  }
  if (!orderId) {
    return next(new ErrorHandler("Order ID is required.", 400));
  }

  // Find order by ID and ensure it belongs to the user
  const order = await Order.findOne({ _id: orderId, user: userId }).populate("user", "name email");

  if (!order) {
    return next(new ErrorHandler("Order not found or does not belong to this user.", 404));
  }

  res.status(200).json({
    status: "success",
    order,
  });
});



// Get all orders
export const getAllOrders = catchAsyncError(async (req, res, next) => {
  

  const orders = await Order.find()
  if (!orders || orders.length === 0) {
    return next(new ErrorHandler("No orders found", 404));
  }
  res.status(200).json({
    success: true,
    orders,
  });
});



//change order status by user
export const changeOrderStatus = catchAsyncError(async (req, res, next) => {
  const  orderId  = req.params.id; 
  const status  = req.body.status; 

  if (!orderId || !status) {
    return next(new ErrorHandler("Order ID and status are required.", 400));
  }

  // Find order by ID
  const order = await Order.findById(orderId);
  if (!order) {
    return next(new ErrorHandler("Order not found.", 404));
  }

  // Update status and save
  order.status = status;
  await order.save();

  res.status(200).json({
    status: "success",
    message: `Order status updated to '${status}'.`,
    order,
  });
});














//Get all orders (Admin)
export const getAllOrdersByAdmin = catchAsyncError(async (req, res, next) => {

  // Authorization: only admins allowed
  if (!req.user || req.user.role !== "admin") {
    return next(new ErrorHandler("Access denied. Admins only.", 403));
  }

  // Fetch all orders, newest first
  const orders = await Order.find({}).sort({ createdAt: -1 }).populate("user", "name email");

  res.status(200).json({
    status: "success",
    results: orders.length,
    orders,
  });
});















// Update order status by admin
export const updateOrderStatusByAdmin = catchAsyncError(async (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return next(new ErrorHandler("Access denied. Admins only.", 403));
  }

  const { orderId } = req.params;       // Order ID from URL param
  const { status } = req.body;          // New status from request body

  // Validate status (optional, customize allowed statuses)
  const allowedStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"];
  if (!allowedStatuses.includes(status)) {
    return next(new ErrorHandler("Invalid status value.", 400));
  }

  // Find order by ID
  const order = await Order.findById(orderId);
  if (!order) {
    return next(new ErrorHandler("Order not found.", 404));
  }

  // Update status and save
  order.status = status;
  await order.save();

  res.status(200).json({
    status: "success",
    message: `Order status updated to '${status}'.`,
    order,
  });
});

