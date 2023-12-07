// router/authRouter.js
const express = require('express');
const router = express.Router();
const { login } = require('../controller/authController');
const { signup } = require('../controller/authController');

router.post('/login', login);
router.post('/signup', signup);

module.exports = router;
