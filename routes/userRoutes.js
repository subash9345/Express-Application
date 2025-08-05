const express = require('express');
const router = express.Router();
// const auth = require('../middileware/auth');
const userController = require('../controllers/userConroller');

router.get('/users', userController.getUserInfo);

module.exports = router;