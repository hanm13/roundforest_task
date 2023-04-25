const express = require('express');
const router = express.Router();
const {basename} = require("path");
const {logger} = require("../../common/functions");

const {sellerProductsCreateService, sellerProductsReadService} = require("./seller-products.service");
router.route('/').post(sellerProductsCreateRoute);
router.route('/').get(sellerProductsReadRoute);

//Create Route - POST

async function sellerProductsCreateRoute(req, res) {

  try{

    logger.info(`${basename(__filename)} [sellerProductsCreate] entered`);

    const isValidRequest = isSellerProductsCreateIsValid(req.body);
    if(!isValidRequest){
      res.status(500).send({status:500, data:null});
      return false;
    }

    const serviceRes = await sellerProductsCreateService(req);

    if(serviceRes){
      res.status(200).send({status:200, data:serviceRes});
    }else{
      res.status(500).send({status:500, data:null});
    }
    
  }catch(e){
    logger.error(`${basename(__filename)} [sellerProductsCreate] error: ${JSON.stringify(e.message || e, null, 2)}`);
    res.status(500).send({status:500, data:null});
  }
}

const isSellerProductsCreateIsValid = (data)=>{
  logger.info(`${basename(__filename)} [isSellerProductsCreateIsValid] entered`);

  try{
    if(!data){return false;}

    const requiredFields = ["title", "description", "published", "ASIN","Locale","Availability","Price", "Product_name","Product_link"];
    const missingFields = [];
  
    for (let index = 0; index < requiredFields.length; index++) {
      const requiredFieldKey = requiredFields[index];
      if(!data[requiredFieldKey]){
        missingFields.push(requiredFieldKey);
      }
    }
  
    if(missingFields.length > 0){
      logger.error(`${basename(__filename)} [isSellerProductsCreateIsValid] missing fields: ${missingFields}`);
      return false;
    }
  
    return true;
  }catch(err){
    logger.error(`${basename(__filename)} [isSellerProductsCreateIsValid] err: ${err.message}`);
    return false;
  }
};

async function sellerProductsReadRoute(req, res) {

  try{

    logger.info(`${basename(__filename)} [sellerProductsReadRoute] entered`);

    const isValidRequest = sellerProductsReadIsValid(req.query);
    if(!isValidRequest){
      res.status(500).send({status:500, data:null});
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

module.exports = router;