const express = require('express');
const router = express.Router();
const {basename} = require("path");
const {logger} = require("../../common/functions");

const {sellerProductsCreateService, sellerProductsReadService, sellerProductsUpdateService, sellerProductsDeleteManyService, sellerProductsReadAllBySellerNameService} = require("./seller-products.service");
router.route('/').post(sellerProductsCreateRoute);
router.route('/').get(sellerProductsReadRoute);
router.route('/').put(sellerProductsUpdateRoute);
router.route('/').delete(sellerProductsDeleteManyRoute);
router.route('/get-all-by-seller-name').get(sellerProductsReadAllBySellerNameRoute);

//Create Route - POST

async function sellerProductsCreateRoute(req, res) {

  try{

    logger.info(`${basename(__filename)} [sellerProductsCreate] entered`);

    const isValidRequest = isSellerProductsCreateUpdateIsValid(req.body);
    if(!isValidRequest){
      res.status(400).send({status:400, data:null});
      return false;
    }

    const serviceRes = await sellerProductsCreateService(req);

    if(serviceRes && serviceRes.alreadyCreated){
      res.status(409).send({status:409, data:null});
      return;
    }

    if(serviceRes && !serviceRes.alreadyCreated){
      res.status(200).send({status:200, data:serviceRes});
    }else{
      res.status(500).send({status:500, data:null});
    }
    
  }catch(e){
    logger.error(`${basename(__filename)} [sellerProductsCreate] error: ${JSON.stringify(e.message || e, null, 2)}`);
    res.status(500).send({status:500, data:null});
  }
}

const isSellerProductsCreateUpdateIsValid = (data)=>{
  logger.info(`${basename(__filename)} [isSellerProductsCreateUpdateIsValid] entered`);

  //TODO: Add validation for types

  try{
    if(!data){return false;}

    const requiredFields = ["ASIN","Locale", "Seller_name", "Product_name","Product_link"];
    const missingFields = [];
  
    for (let index = 0; index < requiredFields.length; index++) {
      const requiredFieldKey = requiredFields[index];
      if(!data[requiredFieldKey]) {
        missingFields.push(requiredFieldKey);
      }
    }
  
    if(missingFields.length > 0){
      logger.error(`${basename(__filename)} [isSellerProductsCreateUpdateIsValid] missing fields: ${missingFields}`);
      return false;
    }
  
    return true;
  }catch(err){
    logger.error(`${basename(__filename)} [isSellerProductsCreateUpdateIsValid] err: ${err.message}`);
    return false;
  }
};

async function sellerProductsReadRoute(req, res) {

  try{

    logger.info(`${basename(__filename)} [sellerProductsReadRoute] entered`);

    const isValidRequest = sellerProductsReadIsValid(req.query);
    if(!isValidRequest){
      res.status(400).send({status:400, data:null});
      return false;
    }

    const serviceRes = await sellerProductsReadService(req);

    if(serviceRes){
      res.status(200).send({status:200, data:serviceRes});
    }else{
      res.status(500).send({status:500, data:null});
    }
    
  }catch(e){
    logger.error(`${basename(__filename)} [sellerProductsReadRoute] error: ${JSON.stringify(e.message || e, null, 2)}`);
    res.status(500).send({status:500, data:null});
  }
}

/**
 * 
 * @param {*} data 
 * @returns {Boolean} valid/invalid structure product data
 */

const sellerProductsReadIsValid = (data)=>{
  logger.info(`${basename(__filename)} [sellerProductsReadIsValid] entered`);

  try{
    if(!data){return false;}

    const requiredFields = ["ASIN","Locale"];
    const missingFields = [];
  
    for (let index = 0; index < requiredFields.length; index++) {
      const requiredFieldKey = requiredFields[index];
      if(!data[requiredFieldKey]){
        missingFields.push(requiredFieldKey);
      }
    }
  
    if(missingFields.length > 0){
      logger.error(`${basename(__filename)} [sellerProductsReadIsValid] missing fields: ${missingFields}`);
      return false;
    }
  
    return true;
  }catch(err){
    logger.error(`${basename(__filename)} [sellerProductsReadIsValid] err: ${err.message}`);
    return false;
  }
};

async function sellerProductsUpdateRoute(req, res) {

  try{

    logger.info(`${basename(__filename)} [sellerProductsUpdateRoute] entered`);

    const isValidRequest = isSellerProductsCreateUpdateIsValid(req.body);
    if(!isValidRequest){
      res.status(400).send({status:400, data:null});
      return false;
    }

    const serviceRes = await sellerProductsUpdateService(req);

    if(serviceRes){
      res.status(200).send({status:200, data:serviceRes});
    }else{
      res.status(500).send({status:500, data:null});
    }
    
  }catch(e){
    logger.error(`${basename(__filename)} [sellerProductsUpdateRoute] error: ${JSON.stringify(e.message || e, null, 2)}`);
    res.status(500).send({status:500, data:null});
  }
}

/**
 * 
 * @param {*} req 
 * @param {*} res - success delete
 * @returns 
 */

async function sellerProductsDeleteManyRoute(req, res) {

  try{

    logger.info(`${basename(__filename)} [sellerProductsDeleteManyRoute] entered`);

    const isValidRequest = isSellerProductsDeleteManyIsValid(req.body);
    if(!isValidRequest){
      res.status(400).send({status:400, data:null});
      return false;
    }

    const serviceRes = await sellerProductsDeleteManyService(req);

    if(serviceRes){
      res.status(200).send({status:200, data:serviceRes});
    }else{
      res.status(500).send({status:500, data:null});
    }
    
  }catch(e){
    logger.error(`${basename(__filename)} [sellerProductsDeleteManyRoute] error: ${JSON.stringify(e.message || e, null, 2)}`);
    res.status(500).send({status:500, data:null});
  }
}


const isSellerProductsDeleteManyIsValid = (data)=>{
  logger.info(`${basename(__filename)} [isSellerProductsDeleteManyIsValid] entered`);

  //TODO: Add validation for types

  try{
    if(!data){return false;}
    if(!data.length){return false;}


    const requiredFields = [ "ASIN","Locale"];
    const invalidObjectsForDelete = [];

    for (let index = 0; index < data.length; index++) {
      const itemForDelete = data[index];
      const itemIsInvalid = false;
      for (let index = 0; index < requiredFields.length; index++) {
        const requiredFieldKey = requiredFields[index];
        if(!itemForDelete[requiredFieldKey]){
          itemIsInvalid = true;
        }
      }
      if(itemIsInvalid){
        invalidObjectsForDelete.push(itemForDelete);
      }
    }
    
    if(invalidObjectsForDelete.length > 0){
      logger.error(`${basename(__filename)} [isSellerProductsDeleteManyIsValid] invalid objects for deletion: ${JSON.stringify(invalidObjectsForDelete)}`);
      return false;
    }
  
    return true;
  }catch(err){
    logger.error(`${basename(__filename)} [isSellerProductsCreateUpdateIsValid] err: ${err.message}`);
    return false;
  }
};

async function sellerProductsReadAllBySellerNameRoute(req, res) {

  try{

    logger.info(`${basename(__filename)} [sellerProductsReadAllBySellerNameRoute] entered`);

    if(!req.query.Seller_name){
      res.status(400).send({status:400, data:null});
      return false;
    }

    const serviceRes = await sellerProductsReadAllBySellerNameService(req);

    if(serviceRes){
      res.status(200).send({status:200, data:serviceRes});
    }else{
      res.status(500).send({status:500, data:null});
    }
    
  }catch(e){
    logger.error(`${basename(__filename)} [sellerProductsReadAllBySellerNameRoute] error: ${JSON.stringify(e.message || e, null, 2)}`);
    res.status(500).send({status:500, data:null});
  }
}

module.exports = router;