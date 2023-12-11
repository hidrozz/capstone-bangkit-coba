const express = require("express");
const router = express.Router();
const {
  getArticlesController,
  getArticleByIdController,
  postArticleController,
  deleteArticlesController
} = require("../controllers/articleController");
const { upload } = require('../app');

router.get("/articles/", getArticlesController);
router.get("/articles/:id", getArticleByIdController);
router.post("/articles/", postArticleController);
router.delete("/articles/", deleteArticlesController);

module.exports = router;
