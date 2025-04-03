const Product = require('../models/Product');
const Farmer = require('../models/Farmer');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Create a product
// @route   POST /api/products
// @access  Private (Farmer only)
exports.createProduct = asyncHandler(async (req, res, next) => {
  // Get farmer ID from authenticated user
  const farmer = await Farmer.findOne({ user: req.user.id });
  
  if (!farmer) {
    return next(new ErrorResponse('Farmer profile required to add products', 404));
  }
  
  // Add farmer to request body
  req.body.farmer = farmer._id;
  
  const product = await Product.create(req.body);
  
  res.status(201).json({
    success: true,
    data: product
  });
});

// @desc    Get all products
// @route   GET /api/products
// @access  Public
exports.getProducts = asyncHandler(async (req, res, next) => {
  // Copy req.query
  const reqQuery = { ...req.query };
  
  // Fields to exclude
  const removeFields = ['select', 'sort', 'page', 'limit'];
  
  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);
  
  // Create query string
  let queryStr = JSON.stringify(reqQuery);
  
  // Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
  
  // Finding resource
  let query = Product.find(JSON.parse(queryStr)).populate({
    path: 'farmer',
    select: 'farmName location'
  });
  
  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }
  
  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }
  
  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Product.countDocuments(JSON.parse(queryStr));
  
  query = query.skip(startIndex).limit(limit);
  
  // Executing query
  const products = await query;
  
  // Pagination result
  const pagination = {};
  
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }
  
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }
  
  res.status(200).json({
    success: true,
    count: products.length,
    pagination,
    data: products
  });
});

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
exports.getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate({
    path: 'farmer',
    select: 'farmName location description'
  });
  
  if (!product) {
    return next(
      new ErrorResponse(`Product not found with id of ${req.params.id}`, 404)
    );
  }
  
  res.status(200).json({
    success: true,
    data: product
  });
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private (Farmer owner only)
exports.updateProduct = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  
  if (!product) {
    return next(
      new ErrorResponse(`Product not found with id of ${req.params.id}`, 404)
    );
  }
  
  // Get farmer from authenticated user
  const farmer = await Farmer.findOne({ user: req.user.id });
  
  // Make sure user is product owner
  if (product.farmer.toString() !== farmer._id.toString() && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(`User not authorized to update this product`, 403)
    );
  }
  
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  
  res.status(200).json({
    success: true,
    data: product
  });
});

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private (Farmer owner only)
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  
  if (!product) {
    return next(
      new ErrorResponse(`Product not found with id of ${req.params.id}`, 404)
    );
  }
  
  // Get farmer from authenticated user
  const farmer = await Farmer.findOne({ user: req.user.id });
  
  // Make sure user is product owner
  if (product.farmer.toString() !== farmer._id.toString() && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(`User not authorized to delete this product`, 403)
    );
  }
  
  await product.remove();
  
  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get products by farmer
// @route   GET /api/farmers/:farmerId/products
// @access  Public
exports.getFarmerProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find({ farmer: req.params.farmerId });
  
  res.status(200).json({
    success: true,
    count: products.length,
    data: products
  });
});