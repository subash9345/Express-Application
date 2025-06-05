

const express = require('express');
const router = express.Router();
const { saveCart, getCartByEmail, getPage, getCartByCustomerId, deleteCartByCustomerId, getAllCarts } = require('../controllers/cartController');

router.post('/', saveCart);
router.get('/email/:email', getCartByEmail);
router.get('/page', getPage);
router.get('/:customerId', getCartByCustomerId);
router.delete('/:customerId', deleteCartByCustomerId);
router.get('/', getAllCarts);
module.exports = router;
