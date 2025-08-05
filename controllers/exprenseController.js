const Expense = require('../models/expense')

// Create expense
exports.createExpense = async (req, res) => {
    try {
        console.log(req.user)

      const expense = new Expense({ ...req.body, user: req.userId });
      const saved = await expense.save();
      res.status(201).json(saved);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  // Get expenses
  exports.getExpenses = async (req, res) => {
    try {
        console.log(req.user)
      const expenses = await Expense.find({ user: req.userId });
      res.json(expenses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Update expense
  exports.updateExpense = async (req, res) => {
    try {
        console.log(req.user)

      const updated = await Expense.findOneAndUpdate(
        { _id: req.params.id, user: req.userId },
        req.body,
        { new: true }
      );
      if (!updated) return res.status(404).json({ error: 'Expense not found' });
      res.json(updated);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  // Delete expense
  exports.deleteExpense = async (req, res) => {
    try {
        console.log(req.user)

      const deleted = await Expense.findOneAndDelete({ _id: req.params.id, user: req.userId });
      if (!deleted) return res.status(404).json({ error: 'Expense not found' });
      res.json({ message: 'Expense deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  