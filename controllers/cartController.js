const Cart = require('../models/Cart');
const path = require("path");
exports.saveCart = async (req, res) => {
    const { customerId, email, lineItems } = req.body;
    try {
      const existingCart = await Cart.findOne({ customerId });
      // If cart exists
      if (existingCart) {
        if (!lineItems.length) {
          const result = await Cart.deleteOne({ customerId });
          if (result.deletedCount === 0) {
            return res.status(404).json({
              message: 'Cart not found',
              cart: { addedDate: new Date(), email: '', lineItems: [] }
            });
          }
          return res.status(200).json({
            message: 'Cart deleted',
            cart: { addedDate: new Date(), email, lineItems: [] }
          });
        }
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

exports.getCartByEmail = async (req, res) => {
  try {
    const cart = await Cart.findOne({ email: req.params.email });
    res.status(200).json({message:'cart fetched',cart: cart || {}});
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


exports.getPage = async (req,res) =>{
    try{
        res.sendFile(path.join(__dirname, "../view/index.html"));
    }catch{
        res.status(500).json({ error: err.message });
    }
}

