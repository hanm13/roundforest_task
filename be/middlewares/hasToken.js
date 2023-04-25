
const {basename} = require("path");
const {logger, getTokenDataFromRedisByUUID} = require("../common/functions");
const {get} = require("lodash");
const jwt = require("jsonwebtoken");
const config = require("../../server.config");
const hasToken = async (req,res,next)=>{

    try{
        logger.info(`${basename(__filename)} [hasToken] entered`);
        
        let token = get(req,"query.token", false) ||
        get(req,"headers.token", false) ||
        get(req,"body.token", "") ||
        get(req,"query.Authorization", false) ||
        get(req,"headers.Authorization", false) ||
        get(req,"body.Authorization", "");
        
        logger.info(`${basename(__filename)} [hasToken] token: ${token}`);

        let token_decoded;
        //JWT verification
        try{

            logger.info(`${basename(__filename)} [hasToken] JWT - verification entered`);
            token_decoded = jwt.verify(token, config.TOKEN_SECRET);
            logger.info(`${basename(__filename)} [hasToken] JWT - verification res: ${JSON.stringify(token_decoded)}`);

        }catch(e){
            res.status(500).send({status:500,data:null});
            logger.info(`${basename(__filename)} [hasToken] JWT - verification failed for token: ${token}, invalid token, error: ${JSON.stringify(e.message || e, null, 2)}`);
            return;
        }

        //Redis verification
        try{
            logger.info(`${basename(__filename)} [hasToken] REDIS - verification entered`);
            token_decoded = await getTokenDataFromRedisByUUID(token_decoded.uuid);
            logger.info(`${basename(__filename)} [hasToken] REDIS - verification res: ${JSON.stringify(token_decoded)}`);
        }catch(e){
            res.status(500).send({status:500,data:null});
            logger.info(`${basename(__filename)} [hasToken] REDIS - verification failed for token: ${token}, error: ${JSON.stringify(e.message || e, null, 2)}`);
            return;
        }

        //Redis data verification
        if(!token_decoded){
            res.status(500).send({status:500,data:null});
            logger.info(`${basename(__filename)} [hasToken] REDIS - data verification failed for token: ${token}`);
            return;
        }

        let sanitizedIP = req.ip.replace("::ffff:", "");

        //IP Verification - MUST verify data AFTER REDIS
        if(sanitizedIP != token_decoded.ip){
            res.status(500).send({status:500,data:null});
            logger.info(`${basename(__filename)} [hasToken] IP - verification failed for token: ${token}`);
            return;
        }

        req.decoded = token_decoded;
        req.uuid = token_decoded.uuid;
        logger.info(`${basename(__filename)} [hasToken] SUCCESS - req.uuid: ${req.uuid}\n IP: ${sanitizedIP}`);

        next();

    }catch(e){
        logger.error(`${basename(__filename)} [hasToken] error: ${JSON.stringify(e.message || e, null, 2)}`);
    }

}

module.exports = hasToken;