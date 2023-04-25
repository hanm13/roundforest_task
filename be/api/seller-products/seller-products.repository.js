
const jwt = require("jsonwebtoken");
const {getRedisClient, getSteamId32} = require("../../common/functions");
const {basename} = require("path");
const {logger} = require("../../common/functions");
const db = require("../../models");
const Product = db.seller_products;

async function sellerProductsCreateRepository(req, data){

  try{
    logger.info(`${basename(__filename)} [sellerProductsCreateRepository] entered`);


      // Create a Tutorial
      const product = new Product(data);


      try{
        await product.save(product);
        return product;

      }catch(err){
        logger.error(err.message || "Some error occurred while creating the Product.")
        return false;
      }

  }catch (e) {
    logger.error(`${basename(__filename)} [sellerProductsCreateRepository] error: ${JSON.stringify(e.message || e, null, 2)}`);
    throw e;
  }

}

async function sellerProductsReadRepository(req, data){

  try{
    logger.info(`${basename(__filename)} [sellerProductsReadRepository] entered`);

      const condition = {
        ASIN: { $regex: new RegExp(data.ASIN), $options: "i" },
        Locale: { $regex: new RegExp(data.Locale), $options: "i" }
      };

      try{
        const product = await Product.findOne(condition);
        return product;

      }catch(err){
        logger.error(err.message || "Some error occurred while searching the Product.")
        return false;
      }

  }catch (e) {
    logger.error(`${basename(__filename)} [sellerProductsReadRepository] error: ${JSON.stringify(e.message || e, null, 2)}`);
    throw e;
  }

}

module.exports = { sellerProductsCreateRepository, sellerProductsReadRepository };