
const config = require("../../../server.config");
const {basename} = require("path");
const {logger} = require("../../common/functions");
const {sellerProductsCreateRepository, sellerProductsReadRepository} = require("./seller-products.repository");

/**
 * 
 * @param {*} req 
 * @returns {Object} Created product or false if error.
 */

async function sellerProductsCreateService(req){
  logger.info(`${basename(__filename)} [sellerProductsCreateService] entered`);
  try{


    const data = {
      title: req.body.title,
      description: req.body.description,
      published: req.body.published,
      ASIN: req.body.ASIN,
      Locale: req.body.Locale,
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

module.exports = { sellerProductsCreateService, sellerProductsReadService };