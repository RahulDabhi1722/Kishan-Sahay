const User = require('../models/User');
const Farmer = require('../models/Farmer');
const Product = require('../models/Product');
const Order = require('../models/Order');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get customer profile
// @route   GET /api/customers/me
// @access  Private (Customer only)
exports.getCustomerProfile = asyncHandler(async (req, res, next) => {
  const customer = await User.findById(req.user.id);
  
  res.status(200).json({
    success: true,
    data: customer
  });
});

// @desc    Update customer profile
// @route   PUT /api/customers/me
// @access  Private (Customer only)
exports.updateCustomerProfile = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address
  };

  const customer = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: customer
  });
});

// @desc    Get customer orders
// @route   GET /api/customers/orders
// @access  Private (Customer only)
exports.getCustomerOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({ customer: req.user.id })
    .populate({
      path: 'farmer',
      select: 'farmName',
      populate: {
        path: 'user',
        select: 'name'
      }
    })
    .populate('products.product', 'name price images');
  
  res.status(200).json({
    success: true,
    count: orders.length,
    data: orders
  });
});

// @desc    Get single order
// @route   GET /api/customers/orders/:id
// @access  Private (Customer only)
exports.getOrderById = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id)
    .populate({
      path: 'farmer',
      select: 'farmName farmLocation',
      populate: {
        path: 'user',
        select: 'name phone email'
      }
    })
    .populate('products.product', 'name price images description');
  
  if (!order) {
    return next(new ErrorResponse(`No order with the id of ${req.params.id}`, 404));
  }
  
  // Make sure the order belongs to customer
  if (order.customer.toString() !== req.user.id) {
    return next(new ErrorResponse(`Not authorized to access this order`, 401));
  }
  
  res.status(200).json({
    success: true,
    data: order
  });
});

// @desc    Create new order
// @route   POST /api/customers/orders
// @access  Private (Customer only)
exports.createOrder = asyncHandler(async (req, res, next) => {
  req.body.customer = req.user.id;
  
  // Validate products exist and calculate total
  let totalAmount = 0;
  const productPromises = req.body.products.map(async (item) => {
    const product = await Product.findById(item.product);
    
    if (!product) {
      throw new ErrorResponse(`Product not found with id of ${item.product}`, 404);
    }
    
    // Check if quantity is available
    if (product.quantityAvailable < item.quantity) {
      throw new ErrorResponse(
        `Insufficient quantity for ${product.name}. Available: ${product.quantityAvailable}`,
        400
      );
    }
    
    // Update the price in the order (to ensure correct price)
    item.price = product.price;
    
    // Add to total
    totalAmount += product.price * item.quantity;
    
    return {
      ...item,
      farmerId: product.farmer
    };
  });
  
  // Wait for all product validations
  const productsWithFarmer = await Promise.all(productPromises);
  
  // Check that all products are from same farmer
  const farmerId = productsWithFarmer[0].farmerId;
  const allSameFarmer = productsWithFarmer.every(p => p.farmerId.toString() === farmerId.toString());
  
  if (!allSameFarmer) {
    return next(new ErrorResponse('All products must be from the same farmer', 400));
  }
  
  // Set farmer in the order
  req.body.farmer = farmerId;
  
  // Set the correct total amount
  req.body.totalAmount = totalAmount;
  
  // Add delivery fee if applicable
  if (req.body.deliveryMethod === 'delivery') {
    const farmer = await Farmer.findById(farmerId);
    req.body.deliveryFee = farmer.deliveryOptions.deliveryFee || 0;
    req.body.totalAmount += req.body.deliveryFee;
  }
  
  // Create the order
  const order = await Order.create(req.body);
  
  // Update product quantities
  for (const item of req.body.products) {
    await Product.findByIdAndUpdate(item.product, {
      $inc: { quantityAvailable: -item.quantity }
    });
  }
  
  res.status(201).json({
    success: true,
    data: order
  });
});

// @desc    Add review to farmer
// @route   POST /api/customers/farmers/:id/reviews
// @access  Private (Customer only)
exports.addFarmerReview = asyncHandler(async (req, res, next) => {
  // Check if customer has ordered from this farmer
  const hasOrdered = await Order.findOne({
    customer: req.user.id,
    farmer: req.params.id,
    orderStatus: 'delivered'
  });
  
  if (!hasOrdered) {
    return next(new ErrorResponse('You can only review farmers after receiving an order from them', 400));
  }
  
  // Add review
  const farmer = await Farmer.findById(req.params.id);
  
  if (!farmer) {
    return next(new ErrorResponse(`No farmer with the id of ${req.params.id}`, 404));
  }
  
  // Check if already reviewed
  const alreadyReviewed = farmer.reviews.find(
    review => review.customer.toString() === req.user.id.toString()
  );
  
  if (alreadyReviewed) {
    return next(new ErrorResponse('You have already reviewed this farmer', 400));
  }
  
  const review = {
    customer: req.user.id,
    text: req.body.text,
    rating: req.body.rating
  };
  
  farmer.reviews.push(review);
  
  // Calculate average rating
  farmer.ratings = farmer.reviews.reduce((acc, item) => item.rating + acc, 0) / 
                   farmer.reviews.length;
  
  await farmer.save();
  
  res.status(201).json({
    success: true,
    data: farmer
  });
});

// @desc    Add review to product
// @route   POST /api/customers/products/:id/reviews
// @access  Private (Customer only)
exports.addProductReview = asyncHandler(async (req, res, next) => {
  // Check if customer has purchased this product
  const hasPurchased = await Order.findOne({
    customer: req.user.id,
    'products.product': req.params.id,
    orderStatus: 'delivered'
  });
  
  if (!hasPurchased) {
    return next(new ErrorResponse('You can only review products you have purchased', 400));
  }
  
  // Add review
  const product = await Product.findById(req.params.id);
  
  if (!product) {
    return next(new ErrorResponse(`No product with the id of ${req.params.id}`, 404));
  }
  
  // Check if already reviewed
  const alreadyReviewed = product.reviews.find(
    review => review.customer.toString() === req.user.id.toString()
  );
  
  if (alreadyReviewed) {
    return next(new ErrorResponse('You have already reviewed this product', 400));
  }
  
  const review = {
    customer: req.user.id,
    text: req.body.text,
    rating: req.body.rating
  };
  
  product.reviews.push(review);
  
  // Calculate average rating
  product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / 
                    product.reviews.length;
  
  await product.save();
  
  res.status(201).json({
    success: true,
    data: product
  });
});

// @desc    Get customer dashboard stats
// @route   GET /api/customers/dashboard
// @access  Private (Customer only)
exports.getDashboardStats = asyncHandler(async (req, res, next) => {
  // Get total orders
  const totalOrders = await Order.countDocuments({ customer: req.user.id });
  
  // Get total spent
  const orders = await Order.find({ 
    customer: req.user.id,
    paymentStatus: 'completed'
  });
  
  const totalSpent = orders.reduce((acc, order) => acc + order.totalAmount, 0);
  
  // Get recent orders
  const recentOrders = await Order.find({ customer: req.user.id })
    .sort({ createdAt: -1 })
    .limit(5)
    .populate({
      path: 'farmer',
      select: 'farmName',
      populate: {
        path: 'user',
        select: 'name'
      }
    })
    .select('orderStatus totalAmount createdAt');
  
  // Get favorite farmers
  const favoritesFarmers = await Order.aggregate([
    { $match: { customer: mongoose.Types.ObjectId(req.user.id) } },
    { $group: { _id: '$farmer', orderCount: { $sum: 1 } } },
    { $sort: { orderCount: -1 } },
    { $limit: 3 }
  ]);
  
  // Get farmer details
  const farmerIds = favoritesFarmers.map(f => f._id);
  const farmers = await Farmer.find({ _id: { $in: farmerIds } })
    .populate('user', 'name')
    .select('farmName ratings');
  
  res.status(200).json({
    success: true,
    data: {
      totalOrders,
      totalSpent,
      recentOrders,
      favoritesFarmers: farmers.map(farmer => ({
        ...farmer._doc,
        orderCount: favoritesFarmers.find(f => f._id.toString() === farmer._id.toString()).orderCount
      }))
    }
  });
});