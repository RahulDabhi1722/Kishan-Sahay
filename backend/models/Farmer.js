// backend/models/Farmer.js
const mongoose = require('mongoose');

const FarmerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  farmName: {
    type: String,
    required: [true, 'Please add farm name']
  },
  farmAddress: {
    type: String,
    required: [true, 'Please add farm address']
  },
  farmDescription: {
    type: String,
    required: [true, 'Please provide a description of your farm']
  },
  farmingType: {
    type: String,
    enum: ['Organic', 'Conventional', 'Mixed'],
    default: 'Conventional'
  },
  deliveryOptions: {
    delivery: {
      type: Boolean,
      default: false
    },
    pickup: {
      type: Boolean,
      default: true
    }
  },
  productCategories: {
    type: [String],
    required: [true, 'Please specify what products you sell']
  },
  ratings: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Farmer', FarmerSchema);