// backend/models/Product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Farmer',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  category: {
    type: String,
    required: [true, 'Please specify a category'],
    enum: [
      'Vegetables',
      'Fruits',
      'Grains',
      'Dairy',
      'Meat',
      'Poultry',
      'Eggs',
      'Herbs',
      'Other'
    ]
  },
  price: {
    type: Number,
    required: [true, 'Please add a price']
  },
  unit: {
    type: String,
    required: [true, 'Please specify the unit'],
    enum: ['kg', 'g', 'lb', 'oz', 'each', 'bunch', 'dozen', 'liter']
  },
  quantityAvailable: {
    type: Number,
    required: [true, 'Please add available quantity']
  },
  isOrganic: {
    type: Boolean,
    default: false
  },
  images: [String],
  isAvailable: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', ProductSchema);