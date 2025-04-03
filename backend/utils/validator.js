/**
 * Input validation functions for request data
 */
const { body, validationResult } = require('express-validator');

// User validation
exports.validateUserRegistration = [
  body('name', 'Name is required').not().isEmpty(),
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Password must be at least 6 characters').isLength({
    min: 6
  }),
  body('role', 'Role must be either customer, farmer, or admin').isIn([
    'customer',
    'farmer',
    'admin'
  ])
];

// Product validation
exports.validateProduct = [
  body('name', 'Product name is required').not().isEmpty(),
  body('description', 'Description is required').not().isEmpty(),
  body('price', 'Price must be a positive number').isFloat({ min: 0 }),
  body('category', 'Category is required').not().isEmpty(),
  body('availableQuantity', 'Available quantity must be a positive number').isInt({
    min: 0
  })
];

// Order validation
exports.validateOrder = [
  body('items', 'Items array is required').isArray(),
  body('items.*.product', 'Product ID is required').not().isEmpty(),
  body('items.*.quantity', 'Quantity must be a positive number').isInt({ min: 1 }),
  body('shippingAddress', 'Shipping address is required').not().isEmpty(),
  body('paymentMethod', 'Payment method is required').not().isEmpty()
];

// Validation results handler
exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }
  next();
};