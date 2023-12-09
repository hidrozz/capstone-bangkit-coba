const express = require("express");
const router = express.Router();
const {
  getArticlesController,
  getArticleByIdController,
  postArticleController,
  deleteArticlesController
} = require("../controllers/articleController");

// const multer = require('multer');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

const { upload } = require('../app');

// User API routes
router.get("/articles/", getArticlesController);
router.get("/articles/:id", getArticleByIdController);
router.post("/articles/", postArticleController);
// router.post("/articles/", upload.single('file'), postArticleController);
router.delete("/articles/", deleteArticlesController);

module.exports = router;
