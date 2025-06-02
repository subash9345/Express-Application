
/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: Save a new cart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerId:
 *                 type: string
 *               email:
 *                 type: string
 *               lineItems:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *     responses:
 *       200:
 *         description: Cart saved
 *       400:
 *         description: Duplicate cart error
 *       500:
 *         description: Server error
 */

const express = require('express');
const router = express.Router();
const { saveCart, getCartByEmail, getCartByCustomerId, deleteCartByCustomerId, getAllCarts } = require('../controllers/cartController');

router.post('/', saveCart);
router.get('/email/:email', getCartByEmail);
router.get('/:customerId', getCartByCustomerId);
router.delete('/:customerId', deleteCartByCustomerId);
router.get('/', getAllCarts);

module.exports = router;