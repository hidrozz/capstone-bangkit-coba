// app.js
const express = require('express');
const bodyParser = require('body-parser');
const authRouter = require('./router/authRouter');
const articleRouter = require('./router/articleRouter');
const batikRouter = require('./router/batikRouter');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer();
const app = express();
const searchRoutes = require('./router/searchRouter');
app.use(bodyParser.json());
app.use(upload.array());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(searchRoutes);
app.use('/auth', authRouter); // Mount the auth router at /auth
app.use('/', articleRouter); // Mount the auth router at /auth
app.use('/', batikRouter); // Mount the auth router at /auth

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
