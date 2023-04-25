
const jwt = require("jsonwebtoken");
const {getRedisClient, getSteamId32} = require("../../common/functions");
const {basename} = require("path");
const {logger} = require("../../common/functions");
const db = require("../../models");
const Product = db.seller_products;

async function sellerProductsCreateRepository(req, data){

  try{
    logger.info(`${basename(__filename)} [sellerProductsCreateRepository] entered, data: ${JSON.stringify(data)}`);


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
    logger.info(`${basename(__filename)} [sellerProductsReadRepository] entered, data: ${JSON.stringify(data)}`);

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


async function sellerProductsUpdateRepository(req, data){

  try{
    logger.info(`${basename(__filename)} [sellerProductsUpdateRepository] entered, data: ${JSON.stringify(data)}`);

      const condition = {
        ASIN: { $regex: new RegExp(data.ASIN), $options: "i" },
        Locale: { $regex: new RegExp(data.Locale), $options: "i" }
      };

      try{
        const product = await Product.updateOne(condition, data);
        return product;

      }catch(err){
        logger.error(err.message || "Some error occurred while searching the Product.")
        return false;
      }

  }catch (e) {
    logger.error(`${basename(__filename)} [sellerProductsUpdateRepository] error: ${JSON.stringify(e.message || e, null, 2)}`);
    throw e;
  }

}

async function sellerProductsDeleteManyRepository(req, data){

  try{
    logger.info(`${basename(__filename)} [sellerProductsDeleteManyRepository] entered, data: ${JSON.stringify(data)}`);

      try{
        const product = await Product.deleteMany({$or:[...data]});
        return product;

      }catch(err){
        logger.error(err.message || "Some error occurred while deleting the Product.")
        return false;
      }

  }catch (e) {
    logger.error(`${basename(__filename)} [sellerProductsDeleteManyRepository] error: ${JSON.stringify(e.message || e, null, 2)}`);
    throw e;
  }

}


async function sellerProductsReadAllBySellerNameRepository(req, data){

  try{
    logger.info(`${basename(__filename)} [sellerProductsReadAllBySellerNameRepository] entered, data: ${JSON.stringify(data)}`);

      const condition = {
        Seller_name: data.Seller_name,
      };
      logger.info(`${basename(__filename)} [sellerProductsReadAllBySellerNameRepository] condition: ${JSON.stringify(condition)}`);

      try{
        const products = await Product.find(condition);
        return products;

      }catch(err){
        logger.error(err.message || "Some error occurred while searching the Product.")
        return false;
      }

  }catch (e) {
    logger.error(`${basename(__filename)} [sellerProductsReadAllBySellerNameRepository] error: ${JSON.stringify(e.message || e, null, 2)}`);
    throw e;
  }

}


module.exports = { sellerProductsCreateRepository, sellerProductsReadRepository, sellerProductsUpdateRepository, sellerProductsDeleteManyRepository, sellerProductsReadAllBySellerNameRepository };