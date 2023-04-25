
const config = require("../../../server.config");
const {basename} = require("path");
const {logger} = require("../../common/functions");
const {sellerProductsCreateRepository, sellerProductsReadRepository, sellerProductsUpdateRepository, sellerProductsDeleteManyRepository, sellerProductsReadAllBySellerNameRepository} = require("./seller-products.repository");

/**
 * 
 * @param {*} req 
 * @returns {Object} Created product or false if error.
 */

async function sellerProductsCreateService(req){
  logger.info(`${basename(__filename)} [sellerProductsCreateService] entered`);
  try{


    const data = {
      ASIN: req.body.ASIN,
      Locale: req.body.Locale,
      Seller_name: req.body.Seller_name,
      Availability: req.body.Availability,
      Price: req.body.Price,
      Product_name: req.body.Product_name,
      Product_link: req.body.Product_link,
    };


    //Validate if item already exists

    const checkItemIsExists = await sellerProductsReadRepository(req, data);
    if(checkItemIsExists){
      logger.warn(`${basename(__filename)} [sellerProductsCreateService] product(${data.ASIN}) already exists, skipping this one.`);
      return false;
    }

    //
    const repositoryRes = await sellerProductsCreateRepository(req, data);
    logger.info(`${basename(__filename)} [sellerProductsCreateService] repositoryRes: ${JSON.stringify(repositoryRes)}`);
    return repositoryRes;
  } catch (e) {
    logger.error(`${basename(__filename)} [sellerProductsCreateService] error: ${JSON.stringify(e.message || e, null, 2)}`);
    throw e;
  }
}

/**
 * 
 * @param {*} req 
 * @returns {Object} matched product from database.
 */

async function sellerProductsReadService(req){
  logger.info(`${basename(__filename)} [sellerProductsReadService] entered`);
  try{

    const data = {
      ASIN: req.query.ASIN,
      Locale: req.query.Locale,
    };


    //
    const repositoryRes = await sellerProductsReadRepository(req, data);
    logger.info(`${basename(__filename)} [sellerProductsReadService] repositoryRes: ${JSON.stringify(repositoryRes)}`);
    return repositoryRes;
  } catch (e) {
    logger.error(`${basename(__filename)} [sellerProductsReadService] error: ${JSON.stringify(e.message || e, null, 2)}`);
    throw e;
  }
}

/**
 * 
 * @param {*} req 
 * @returns {Object} Updated product or false if error.
 */

async function sellerProductsUpdateService(req){
  logger.info(`${basename(__filename)} [sellerProductsUpdateService] entered`);
  try{


    const data = {
      ASIN: req.body.ASIN,
      Locale: req.body.Locale,
      Seller_name: req.body.Seller_name,
      Availability: req.body.Availability,
      Price: req.body.Price,
      Product_name: req.body.Product_name,
      Product_link: req.body.Product_link,
    };

    //
    const repositoryRes = await sellerProductsUpdateRepository(req, data);
    logger.info(`${basename(__filename)} [sellerProductsUpdateService] repositoryRes: ${JSON.stringify(repositoryRes)}`);

    if(repositoryRes.matchedCount == 0){
      logger.error(`${basename(__filename)} [sellerProductsUpdateService] MONGODB result: matchedCount is 0, product not found.`);
      return false;
    }

    return repositoryRes;
  } catch (e) {
    logger.error(`${basename(__filename)} [sellerProductsUpdateService] error: ${JSON.stringify(e.message || e, null, 2)}`);
    throw e;
  }
}

/**
 * 
 * @param {*} req 
 * @returns {Object} Updated product or false if error.
 */

async function sellerProductsDeleteManyService(req){
  logger.info(`${basename(__filename)} [sellerProductsDeleteManyService] entered`);
  try{

    //
    const repositoryRes = await sellerProductsDeleteManyRepository(req, req.body);
    logger.info(`${basename(__filename)} [sellerProductsDeleteManyService] repositoryRes: ${JSON.stringify(repositoryRes)}`);

    if(repositoryRes.deletedCount == 0){
      logger.error(`${basename(__filename)} [sellerProductsDeleteManyService] MONGODB result: deletedCount is 0, products not found.`);
      return false;
    }

    return repositoryRes;
  } catch (e) {
    logger.error(`${basename(__filename)} [sellerProductsDeleteManyService] error: ${JSON.stringify(e.message || e, null, 2)}`);
    throw e;
  }
}

/**
 * 
 * @param {*} req 
 * @returns {Object} matched product from database.
 */

async function sellerProductsReadAllBySellerNameService(req){
  logger.info(`${basename(__filename)} [sellerProductsReadAllBySellerNameService] entered`);
  try{

    const data = {
      Seller_name: req.query.Seller_name,
    };

    //
    const repositoryRes = await sellerProductsReadAllBySellerNameRepository(req, data);
    logger.info(`${basename(__filename)} [sellerProductsReadAllBySellerNameService] repositoryRes: ${JSON.stringify(repositoryRes)}`);
    return repositoryRes;
  } catch (e) {
    logger.error(`${basename(__filename)} [sellerProductsReadAllBySellerNameService] error: ${JSON.stringify(e.message || e, null, 2)}`);
    throw e;
  }
}

module.exports = { sellerProductsCreateService, sellerProductsReadService, sellerProductsUpdateService, sellerProductsDeleteManyService, sellerProductsReadAllBySellerNameService };