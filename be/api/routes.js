const express = require('express');
const router = express.Router();
const {basename} = require("path");
const {logger} = require("../common/functions");
const sellerProductsRoute = require('./seller-products/seller-products.route');

const routes = (server) => {
  router.use('/seller-products', sellerProductsRoute);
  return router;
};

module.exports = routes;