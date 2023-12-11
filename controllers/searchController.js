// searchController.js
const ArticlesService = require('../services/firestore/ArticlesService');
const BatikService = require('../services/firestore/BatikService');

const articlesService = new ArticlesService('articles');
const batikService = new BatikService('batik');

const searchController = async (req, res) => {
  const { keyword } = req.query;
  console.log(keyword);
  try {
    let content = [];

    const resultArticle = await articlesService.searchArticles(keyword);
    // console.log(resultArticle);
    content.push(resultArticle);
    
    const resultBatik = await batikService.searchBatik(keyword);
    content.push(resultBatik);
    // content.push(resultBatik);
    
    return res.status(200).json({
      status: 'success', 
      // message: 'Invalid search type. Use "articles" or "batik".',
      data: content, 
    });
    // if (type === 'articles') {
    //   result = await articlesService.searchArticles(keyword);
    // } else if (type === 'batik') {
    //   result = await batikService.searchBatik(keyword);
    // } else {
    //   return res.status(400).json({
    //     status: 'error', 
    //     message: 'Invalid search type. Use "articles" or "batik".',
    //   });
    // }

    // res.status(200).json({
    //   status: 'success',
    //   data: result,
    // });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: error.message,
    });
  }
};

module.exports = searchController;
