// backend/models/Customer.js
const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  preferences: {
    productTypes: [String],
    organicPreferred: {
      type: Boolean,
      default: false
    },
    deliveryPreferred: {
      type: Boolean,
      default: true
    }
  },
  savedFarmers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Farmer'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Customer', CustomerSchema);