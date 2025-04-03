const Farmer = require('../models/Farmer');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Create farmer profile
// @route   POST /api/farmers
// @access  Private (Farmer only)
exports.createFarmerProfile = asyncHandler(async (req, res, next) => {
  // Check if profile already exists
  const existingFarmer = await Farmer.findOne({ user: req.user.id });
  
  if (existingFarmer) {
    return next(new ErrorResponse('Farmer profile already exists for this user', 400));
  }
  
  // Create farmer profile
  req.body.user = req.user.id;
  
  const farmer = await Farmer.create(req.body);
  
  res.status(201).json({
    success: true,
    data: farmer
  });
});

// @desc    Get current farmer profile
// @route   GET /api/farmers/me
// @access  Private (Farmer only)
exports.getFarmerProfile = asyncHandler(async (req, res, next) => {
  const farmer = await Farmer.findOne({ user: req.user.id }).populate('user', 'name email phone');
  
  if (!farmer) {
    return next(new ErrorResponse('No farmer profile found for this user', 404));
  }
  
  res.status(200).json({
    success: true,
    data: farmer
  });
});

// @desc    Update farmer profile
// @route   PUT /api/farmers/me
// @access  Private (Farmer only)
exports.updateFarmerProfile = asyncHandler(async (req, res, next) => {
  let farmer = await Farmer.findOne({ user: req.user.id });
  
  if (!farmer) {
    return next(new ErrorResponse('No farmer profile found for this user', 404));
  }
  
  farmer = await Farmer.findOneAndUpdate(
    { user: req.user.id },
    req.body,
    {
      new: true,
      runValidators: true
    }
  );
  
  res.status(200).json({
    success: true,
    data: farmer
  });
});

// @desc    Get all farmers
// @route   GET /api/farmers
// @access  Public
exports.getFarmers = asyncHandler(async (req, res, next) => {
  const farmers = await Farmer.find().populate('user', 'name');
  
  res.status(200).json({
    success: true,
    count: farmers.length,
    data: farmers
  });
});

// @desc    Get single farmer by ID
// @route   GET /api/farmers/:id
// @access  Public
exports.getFarmerById = asyncHandler(async (req, res, next) => {
  const farmer = await Farmer.findById(req.params.id).populate('user', 'name email');
  
  if (!farmer) {
    return next(new ErrorResponse(`Farmer not found with id of ${req.params.id}`, 404));
  }
  
  res.status(200).json({
    success: true,
    data: farmer
  });
});

// @desc    Get farmers near location
// @route   GET /api/farmers/radius/:zipcode/:distance
// @access  Public
exports.getFarmersInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Calc radius using radians
  // Divide dist by radius of Earth
  // Earth Radius = 6,378 km / 3,963 mi
  const radius = distance / 6378;

  const farmers = await Farmer.find({
    farmLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
  });

  res.status(200).json({
    success: true,
    count: farmers.length,
    data: farmers
  });
});

// @desc    Get farmer's products
// @route   GET /api/farmers/:id/products
// @access  Public
exports.getFarmerProducts = asyncHandler(async (req, res, next) => {
  const farmer = await Farmer.findById(req.params.id);
  
  if (!farmer) {
    return next(new ErrorResponse(`Farmer not found with id of ${req.params.id}`, 404));
  }
  
  const products = await Product.find({ farmer: req.params.id });
  
  res.status(200).json({
    success: true,
    count: products.length,
    data: products
  });
});

// @desc    Get farmer orders
// @route   GET /api/farmers/orders
// @access  Private (Farmer only)
exports.getFarmerOrders = asyncHandler(async (req, res, next) => {
  const farmer = await Farmer.findOne({ user: req.user.id });
  
  if (!farmer) {
    return next(new ErrorResponse('No farmer profile found for this user', 404));
  }
  
  const orders = await Order.find({ farmer: farmer._id })
    .populate('customer', 'name email')
    .populate('products.product', 'name price');
  
  res.status(200).json({
    success: true,
    count: orders.length,
    data: orders
  });
});

// @desc    Update order status
// @route   PUT /api/farmers/orders/:id
// @access  Private (Farmer only)
exports.updateOrderStatus = asyncHandler(async (req, res, next) => {
  const farmer = await Farmer.findOne({ user: req.user.id });
  
  if (!farmer) {
    return next(new ErrorResponse('No farmer profile found for this user', 404));
  }
  
  let order = await Order.findById(req.params.id);
  
  if (!order) {
    return next(new ErrorResponse(`No order with the id of ${req.params.id}`, 404));
  }
  
  // Make sure farmer owns order
  if (order.farmer.toString() !== farmer._id.toString()) {
    return next(new ErrorResponse(`Not authorized to update this order`, 401));
  }
  
  // Add status to history
  order.statusHistory.push({
    status: req.body.orderStatus,
    note: req.body.note || ''
  });
  
  // Update status
  order.orderStatus = req.body.orderStatus;
  
  await order.save();
  
  res.status(200).json({
    success: true,
    data: order
  });
});

// @desc    Get farmer dashboard stats
// @route   GET /api/farmers/dashboard
// @access  Private (Farmer only)
exports.getDashboardStats = asyncHandler(async (req, res, next) => {
  const farmer = await Farmer.findOne({ user: req.user.id });
  
  if (!farmer) {
    return next(new ErrorResponse('No farmer profile found for this user', 404));
  }

  // Get total products
  const totalProducts = await Product.countDocuments({ farmer: farmer._id });
  
  // Get total orders
  const totalOrders = await Order.countDocuments({ farmer: farmer._id });
  
  // Get revenue
  const orders = await Order.find({ 
    farmer: farmer._id,
    paymentStatus: 'completed'
  });
  
  const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);
  
  // Get recent orders
  const recentOrders = await Order.find({ farmer: farmer._id })
    .sort({ createdAt: -1 })
    .limit(5)
    .populate('customer', 'name')
    .select('orderStatus totalAmount createdAt');
  
  // Get popular products
  const popularProducts = await Product.aggregate([
    { $match: { farmer: farmer._id } },
    { $project: { name: 1, ratings: 1, totalOrders: { $size: '$reviews' } } },
    { $sort: { totalOrders: -1, ratings: -1 } },
    { $limit: 5 }
  ]);
  
  res.status(200).json({
    success: true,
    data: {
      totalProducts,
      totalOrders,
      totalRevenue,
      recentOrders,
      popularProducts
    }
  });
});