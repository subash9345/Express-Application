const Cart = require('../models/Cart');

exports.saveCart = async (req, res) => {
    const { customerId, email, lineItems } = req.body;
    try {
      const existingCart = await Cart.findOne({ customerId });
      if (existingCart) {
        existingCart.email = email;
        existingCart.lineItems = lineItems;
        existingCart.addedDate = new Date();
        await existingCart.save();
        return res.status(200).json({ message: 'Cart updated' });
      }
  
      const cart = new Cart({ customerId, email, lineItems, addedDate: new Date() });
      await cart.save();
      res.status(200).json({ message: 'Cart saved' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

exports.getCartByEmail = async (req, res) => {
  try {
    const cart = await Cart.findOne({ email: req.params.email });
    res.status(200).json(cart || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCartByCustomerId = async (req, res) => {
  try {
    const cart = await Cart.findOne({ customerId: req.params.customerId });
    res.status(200).json(cart || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCartByCustomerId = async (req, res) => {
  try {
    const result = await Cart.deleteOne({ customerId: req.params.customerId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json({ message: 'Cart deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
