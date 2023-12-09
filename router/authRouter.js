// router/authRouter.js
const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');
const { signup } = require('../controllers/authController');

router.post('/login', login);
router.post('/signup', signup);

module.exports = router;
