const Cart = require('../models/Cart');
const path = require("path");

// Save or update cart
exports.saveCart = async (req, res) => {
    const { customerId, email, lineItems } = req.body;
    try {
      const existingCart = await Cart.findOne({ email });
      // If cart exists
      if (existingCart) {
        if (!lineItems.length) {
          // If cart is now empty, delete it
          const result = await Cart.deleteOne({ email });
          const status = result.deletedCount ? 200 : 400; 
          return res.status(status).json({
            message: result.deletedCount ? 'Cart deleted' : 'Cart not found',
            cart: getEmptyCart(email)
          });
        }
        // Update existing cart
        existingCart.email = email;
        existingCart.lineItems = lineItems;
        existingCart.addedDate = new Date();
        await existingCart.save();
        return res.status(200).json({ message: 'Cart updated', cart: existingCart });
      }
      // If no cart exists and lineItems is empty, do not create a new cart
      if (!lineItems.length) {
        return res.status(400).json({ message: 'Cart is empty, nothing to save' });
      }
      // Create new cart
      const cart = new Cart({ customerId, email, lineItems, addedDate: new Date() });
      await cart.save();
      return res.status(200).json({ message: 'Cart saved', cart });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };

// Get cart by email
exports.getCartByEmail = async (req, res) => {
  try {
    const cart = await Cart.findOne({ email: req.params.email });
    res.status(200).json({message:'cart fetched',cart: cart || { email: req.params.email,lineItems: [] }});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get cart by customer ID
exports.getCartByCustomerId = async (req, res) => {
  try {
    const cart = await Cart.findOne({ customerId: req.params.customerId });
    res.status(200).json({message:'cart fetched',cart: cart || { lineItems: [] }});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete cart by customer ID
exports.deleteCartByCustomerId = async (req, res) => {
    try {
      const { deletedCount } = await Cart.deleteOne({ customerId: req.params.customerId });
      return res.status(deletedCount ? 200 : 404).json({
        message: deletedCount ? 'Cart deleted' : 'Cart not found',
        ...(deletedCount ? {} : { cart: getEmptyCart() })
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

// Get all carts (for admin/debug use)
exports.getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Serve the HTML page (view)
exports.getPage = async (req,res) =>{
    try{
        res.sendFile(path.join(__dirname, "../view/index.html"));
    }catch{
        res.status(500).json({ error: err.message });
    }
}

// Utility: Standard empty cart response
const getEmptyCart = (email = '') => ({
    addedDate: new Date(),
    email,
    lineItems: []
  });