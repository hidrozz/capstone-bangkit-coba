// router/mainRouter.js
const express = require('express');
const router = express.Router();
const { getHelloMessage } = require('../controller/mainController');
const loggingMiddleware = require('../middleware/loggingMiddleware');

router.use(loggingMiddleware);

router.get('/', async (req, res) => {
  const helloMessage = await getHelloMessage();
  res.send(`Hello, ${helloMessage}!`);
});

module.exports = router;
