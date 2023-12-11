const express = require("express");
const ArticlesService = require('../services/firestore/ArticlesService');
const ClientError = require("../exceptions/ClientError");

const articlesService = new ArticlesService('articles');


const getArticlesController = async (req, res) => {
  const allArticles = await articlesService.getArticles();
  res.status(200).json({
    status: "success",
    data: allArticles,
  });
};
const getArticleByIdController = async (req, res) => {
  try{
    const articleId = req.params.id;
  
    const article = await articlesService.getArticleById(articleId);

    res.status(200).json({
      status: "success",
      data: article,
    });
  } catch (error) {
    if(error instanceof ClientError){
      return res.status(error.statusCode).json({
        status: 'error',
        message: error.message,

      });
    }
    return res.status(400).json({
      message: 'Signup failed',
      error: error.message,
    });
  }
};

const postArticleController = async (req, res) => {

  const title = req.body.title;
  const author = req.body.author;
  const content = req.body.content;
  const url = req.body.url;

  const articleId = await articlesService.postArticles(title, author, content, url);

  res.status(201).json({
    status: "success",
    data: articleId,
  });
};

const deleteArticlesController = async (req, res) => {
  const articles = await articlesService.deleteAllArticles();

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
