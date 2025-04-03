const Order = require('../models/Order');
const Product = require('../models/Product');
const Customer = require('../models/Customer');
const Farmer = require('../models/Farmer');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Create order
// @route   POST /api/orders
// @access  Private (Customer only)
exports.createOrder = asyncHandler(async (req, res, next) => {
  const { items, shippingAddress, paymentMethod } = req.body;
  
  if (!items || items.length === 0) {
    return next(new ErrorResponse('Please add at least one item to order', 400));
  }
  
  // Get customer ID from authenticated user
  const customer = await Customer.findOne({ user: req.user.id });
  
  if (!customer) {
    return next(new ErrorResponse('Customer profile not found', 404));
  }
  
  // Calculate order total and verify products exist
  let orderTotal = 0;
  let orderItems = [];
  
  for (const item of items) {
    const product = await Product.findById(item.product);
    
    if (!product) {
      return next(new ErrorResponse(`Product not found with id of ${item.product}`, 404));
    }
    
    // Check if quantity is available
    if (item.quantity > product.availableQuantity) {
      return next(
        new ErrorResponse(
          `Not enough quantity available for ${product.name}. Available: ${product.availableQuantity}`,
          400
        )
      );
    }
    
    // Create order item
    const orderItem = {
      name: product.name,
      quantity: item.quantity,
      image: product.image,
      price: product.price,
      product: item.product,
      farmer: product.farmer
    };
    
    orderItems.push(orderItem);
    orderTotal += item.quantity * product.price;
    
    // Update product quantity
    product.availableQuantity -= item.quantity;
    await product.save();
  }
  
  // Create order
  const order = await Order.create({
    items: orderItems,
    customer: customer._id,
    shippingAddress,
    paymentMethod,
    totalPrice: orderTotal
  });
  
  res.status(201).json({
    success: true,
    data: order
  });
});

// @desc    Get orders for current customer
// @route   GET /api/orders/me
// @access  Private (Customer only)
exports.getCustomerOrders = asyncHandler(async (req, res, next) => {
  const customer = await Customer.findOne({ user: req.user.id });
  
  if (!customer) {
    return next(new ErrorResponse('Customer profile not found', 404));
  }
  
  const orders = await Order.find({ customer: customer._id })
    .sort('-createdAt');
  
  res.status(200).json({
    success: true,
    count: orders.length,
    data: orders
  });
});

// @desc    Get orders for farmer's products
// @route   GET /api/orders/farmer
// @access  Private (Farmer only)
exports.getFarmerOrders = asyncHandler(async (req, res, next) => {
  const farmer = await Farmer.findOne({ user: req.user.id });
  
  if (!farmer) {
    return next(new ErrorResponse('Farmer profile not found', 404));
  }
  
  // Find orders containing products from this farmer
  const orders = await Order.find({ 'items.farmer': farmer._id })
    .sort('-createdAt');
  
  // Filter order items to only include this farmer's items
  const farmersOrders = orders.map(order => {
    const filteredItems = order.items.filter(
      item => item.farmer.toString() === farmer._id.toString()
    );
    
    // Calculate subtotal for this farmer's items only
    const farmerSubtotal = filteredItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    
    return {
      _id: order._id,
      items: filteredItems,
      customer: order.customer,
      status: order.status,
      createdAt: order.createdAt,
      farmerSubtotal
    };
  });
  
  res.status(200).json({
    success: true,
    count: farmersOrders.length,
    data: farmersOrders
  });
});

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private (Owner or Admin)
exports.getOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id)
    .populate('customer', 'name email')
    .populate('items.product', 'name');
  
  if (!order) {
    return next(new ErrorResponse(`Order not found with id of ${req.params.id}`, 404));
  }
  
  // Check ownership
  if (req.user.role === 'customer') {
    const customer = await Customer.findOne({ user: req.user.id });
    
    if (!customer || order.customer.toString() !== customer._id.toString()) {
      return next(new ErrorResponse(`Not authorized to access this order`, 403));
    }
  } else if (req.user.role === 'farmer') {
    const farmer = await Farmer.findOne({ user: req.user.id });
    
    // Check if order contains products from this farmer
    const farmerItems = order.items.filter(
      item => item.farmer.toString() === farmer._id.toString()
    );
    
    if (farmerItems.length === 0) {
      return next(new ErrorResponse(`Not authorized to access this order`, 403));
    }
  }
  
  res.status(200).json({
    success: true,
    data: order
  });
});

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private (Admin or Farmer for their items)
exports.updateOrderStatus = asyncHandler(async (req, res, next) => {
  const { status } = req.body;
  
  if (!status) {
    return next(new ErrorResponse('Please provide a status', 400));
  }
  
  let order = await Order.findById(req.params.id);
  
  if (!order) {
    return next(new ErrorResponse(`Order not found with id of ${req.params.id}`, 404));
  }
  
  // If user is farmer, they can only update status of their own items
  if (req.user.role === 'farmer') {
    const farmer = await Farmer.findOne({ user: req.user.id });
    
    if (!farmer) {
      return next(new ErrorResponse('Farmer profile not found', 404));
    }
    
    // Check if order contains this farmer's items
    const farmerItemsIndex = order.items.findIndex(
      item => item.farmer.toString() === farmer._id.toString()
    );
    
    if (farmerItemsIndex === -1) {
      return next(new ErrorResponse(`Not authorized to update this order`, 403));
    }
    
    // Update status for this farmer's items only
    order.items = order.items.map(item => {
      if (item.farmer.toString() === farmer._id.toString()) {
        item.status = status;
      }
      return item;
    });
    
    await order.save();
    
  } else if (req.user.role === 'admin') {
    // Admin can update entire order status
    order.status = status;
    await order.save();
  } else {
    return next(new ErrorResponse(`Not authorized to update this order`, 403));
  }
  
  res.status(200).json({
    success: true,
    data: order
  });
});