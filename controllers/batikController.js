const express = require("express");
const BatikService = require('../services/firestore/BatikService');
const ClientError = require("../exceptions/ClientError");

const batikService = new BatikService('batik');

const getBatikController = async (req, res) => {
  const allBatik = await batikService.getBatik();
  res.status(200).json({
    status: "success",
    data: allBatik,
  });
};

const getBatikByIdController = async (req, res) => {
  try{
    const batikId = req.params.id;
  
    const batik = await batikService.getBatikById(batikId);

    res.status(200).json({
      status: "success",
      data: batik,
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

const postBatikController = async (req, res) => {
  const title = req.body.title;
  const origin = req.body.origin;
  const description = req.body.description;
  const url = req.body.url;
  const batikId = await batikService.postBatik(title, origin, description, url);
  res.status(201).json({
    status: "success",
    data: batikId,
  });
};

const deleteBatikController = async (req, res) => {
  const batik = await batikService.deleteAllBatik();

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
