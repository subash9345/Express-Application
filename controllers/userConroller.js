const User = require('../models/users');

exports.getUserInfo = async (req, res) => {
  const users = await User.find().select('name email password');
  res.json(users);
};