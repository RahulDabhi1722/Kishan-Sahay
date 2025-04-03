const express = require('express');
const router = express.Router();

// Import controllers
const {
  createOrder,
  getOrder,
  getCustomerOrders,
  getFarmerOrders,
  updateOrderStatus
} = require('../controllers/orderController');

// Import middleware
const { protect } = require('../middleware/authMiddleware');
const roleCheck = require('../middleware/roleCheck');

// All routes require authentication
router.use(protect);

// Customer routes
router
  .route('/')
  .post(roleCheck('customer'), createOrder);

router
  .route('/me')
  .get(roleCheck('customer'), getCustomerOrders);

// Farmer routes
router
  .route('/farmer')
  .get(roleCheck('farmer'), getFarmerOrders);

// Shared routes
router
  .route('/:id')
  .get(roleCheck('customer', 'farmer', 'admin'), getOrder);

router
  .route('/:id/status')
  .put(roleCheck('farmer', 'admin'), updateOrderStatus);

module.exports = router;