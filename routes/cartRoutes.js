

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

/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: Save a new cart
 *     tags:
 *       - Cart
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
 *             required:
 *               - customerId
 *               - email
 *               - lineItems
 *     responses:
 *       200:
 *         description: Cart saved successfully
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/cart/email/{email}:
 *   get:
 *     summary: Get cart by email
 *     tags:
 *       - Cart
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: Customer email
 *     responses:
 *       200:
 *         description: Cart found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/cart/{customerId}:
 *   get:
 *     summary: Get cart by customer ID
 *     tags:
 *       - Cart
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: string
 *         description: Customer ID
 *     responses:
 *       200:
 *         description: Cart found
 *       500:
 *         description: Server error
 *   delete:
 *     summary: Delete cart by customer ID
 *     tags:
 *       - Cart
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: string
 *         description: Customer ID
 *     responses:
 *       200:
 *         description: Cart deleted successfully
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get all carts
 *     tags:
 *       - Cart
 *     responses:
 *       200:
 *         description: List of all carts
 *       500:
 *         description: Server error
 */
