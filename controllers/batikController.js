const express = require("express");
// const router = express.Router();
const BatikService = require('../services/firestore/BatikService');
const ClientError = require("../exceptions/ClientError");

const batikService = new BatikService('batik');

// Function to display users
const getBatikController = async (req, res) => {
  // Perform any necessary filtering or sorting logic
  const allBatik = await batikService.getBatik();

  // Respond with success status and user data
  res.status(200).json({
    status: "success",
    data: allBatik,
  });
};

// Function to display users
const getBatikByIdController = async (req, res) => {
  try{
    const batikId = req.params.id;
  
    // Perform any necessary filtering or sorting logic
    const batik = await batikService.getBatikById(batikId);
    // console.log(documentId);
    // console.log(batik);

    // Respond with success status and user data
    res.status(200).json({
      status: "success",
      data: batik,
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

const postBatikController = async (req, res) => {
  // const documentId = req.params.id;
  // Perform any necessary filtering or sorting logic
  const title = req.body.title;
  const origin = req.body.origin;
  const description = req.body.description;
  const url = req.body.url;
  // console.log(req.body);
  const batikId = await batikService.postBatik(title, origin, description, url);

  // Respond with success status and user data
  res.status(201).json({
    status: "success",
    // data: "wew",
    data: batikId,
  });
};

const deleteBatikController = async (req, res) => {
  // const documentId = req.params.id;
  // Perform any necessary filtering or sorting logic
  const batik = await batikService.deleteAllBatik();

  // Respond with success status and user data
  res.status(201).json({
    status: "success",
    data: batik,
  });
};

module.exports = {
  getBatikController,
  getBatikByIdController,
  postBatikController,
  deleteBatikController
};

// module.exports = router;
