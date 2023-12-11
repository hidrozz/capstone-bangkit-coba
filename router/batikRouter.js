const express = require("express");
const router = express.Router();
const {
  getBatikController,
  getBatikByIdController,
  postBatikController,
  deleteBatikController,
  } = require("../controllers/batikController");


const { upload } = require('../app');

router.get("/batik/", getBatikController);
router.get("/batik/:id", getBatikByIdController);
router.post("/batik/", postBatikController);
router.delete("/batik/", deleteBatikController);

module.exports = router;
