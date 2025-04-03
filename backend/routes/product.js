const express = require('express');
const router = express.Router({ mergeParams: true });

// Import controllers
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getFarmerProducts
} = require('../controllers/productController');

// Import middleware
const { protect } = require('../middleware/authMiddleware');
const roleCheck = require('../middleware/roleCheck');

// Public routes
router
  .route('/')
  .get(getProducts);
  
router
  .route('/:id')
  .get(getProduct);

// Farmer routes - protected
router
  .route('/')
  .post(protect, roleCheck('farmer'), createProduct);

router
  .route('/:id')
  .put(protect, roleCheck('farmer', 'admin'), updateProduct)
  .delete(protect, roleCheck('farmer', 'admin'), deleteProduct);

// Get products by farmer ID
router
  .route('/farmer/:farmerId')
  .get(getFarmerProducts);

module.exports = router;