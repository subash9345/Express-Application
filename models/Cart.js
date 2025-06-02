const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  customerId: { type: String },
  email: { type: String },
  lineItems: { type: Object, required: true },
  addedDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cart', CartSchema);
