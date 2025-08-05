const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/exprenseController');
const authMiddleware = require('../middileware/auth'); // your user auth middleware

router.use(authMiddleware); // all routes require auth

router.post('/', expenseController.createExpense);
router.get('/', expenseController.getExpenses);
router.put('/:id', expenseController.updateExpense);
router.delete('/:id', expenseController.deleteExpense);

module.exports = router;
