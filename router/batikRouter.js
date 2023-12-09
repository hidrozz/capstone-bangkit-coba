const express = require("express");
const router = express.Router();
const {
  getBatikController,
  getBatikByIdController,
  postBatikController,
  deleteBatikController,
  } = require("../controllers/batikController");

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
router.get("/batik/", getBatikController);
router.get("/batik/:id", getBatikByIdController);
router.post("/batik/", postBatikController);
// router.post("/batik/", upload.single('file'), postArticleController);
router.delete("/batik/", deleteBatikController);

module.exports = router;
