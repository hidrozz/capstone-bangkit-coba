const express = require("express");
// const router = express.Router();
const ArticlesService = require('../services/firestore/ArticlesService');
const ClientError = require("../exceptions/ClientError");

const articlesService = new ArticlesService('articles');

// Function to display users
const getArticlesController = async (req, res) => {
  // Perform any necessary filtering or sorting logic
  const allArticles = await articlesService.getArticles();

  // Respond with success status and user data
  res.status(200).json({
    status: "success",
    data: allArticles,
  });
};

// Function to display users
const getArticleByIdController = async (req, res) => {
  try{
    const articleId = req.params.id;
  
    // Perform any necessary filtering or sorting logic
    const article = await articlesService.getArticleById(articleId);
    // console.log(articleId);
    // console.log(article);

    // Respond with success status and user data
    res.status(200).json({
      status: "success",
      data: article,
    });
  } catch (error) {
    if(error instanceof ClientError){
      return res.status(error.statusCode).json({
        status: 'error',
        message: error.message,
        // error: error.message,
      });
    }
    // console.error('Error during signup:', error);
    return res.status(400).json({
      message: 'Signup failed',
      error: error.message,
    });
  }
};

const postArticleController = async (req, res) => {
  // const documentId = req.params.id;
  // Perform any necessary filtering or sorting logic
  const title = req.body.title;
  const author = req.body.author;
  const content = req.body.content;
  const url = req.body.url;
  // console.log(req.body);
  const articleId = await articlesService.postArticles(title, author, content, url);

  // Respond with success status and user data
  res.status(201).json({
    status: "success",
    // data: "wew",
    data: articleId,
  });
};

const deleteArticlesController = async (req, res) => {
  // const documentId = req.params.id;
  // Perform any necessary filtering or sorting logic
  const articles = await articlesService.deleteAllArticles();

  // Respond with success status and user data
  res.status(201).json({
    status: "success",
    data: articles,
  });
};

module.exports = {
  getArticlesController,
  getArticleByIdController,
  postArticleController,
  deleteArticlesController
};

// module.exports = router;
