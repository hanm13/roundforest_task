
const redis     = require('redis');
const config = require("../../server.config");
const { createLogger, format, transports } = require("winston");
const {get} = require("lodash");
const jwt = require("jsonwebtoken");
const {basename} = require("path");
const fs = require("fs");
const logger = createLogger({
    format: format.combine(
        format.timestamp(),
        format.simple()
    ),
    transports: [
        new transports.Console({
        format: format.combine(
            format.timestamp(),
            format.colorize({all:true}),
            format.splat(),
            format.simple(),
            format.printf(info => {
            return `${info.timestamp} - ${info.level}: ${info.message}`;
            })
        )
        }),

        //TODO: Move this to a DB
        new transports.File({ filename: 'console_logs_combined.log' })
    ]
});

const getTokenDataFromRedisByUUID = async (uuid)=>{

    try{

        logger.info(`${basename(__filename)} [getTokenDataFromRedisByUUID] entered`);
        let token_decoded;

        const redisConnection = await getRedisClient();

        token_decoded = await new Promise((resolve,reject)=>{

            redisConnection.get(uuid, function(err, reply){
                resolve(JSON.parse(reply));
            });

        });

        return token_decoded;

    }catch(e){
        logger.error(`${basename(__filename)} [getTokenDataFromRedisByUUID] error: ${JSON.stringify(e.message || e, null, 2)}`);
        throw e;
    }

};

const redisConnectSingleton = {};
const getRedisClient = async ()=>{
    logger.info(`${basename(__filename)} [getRedisClient] entered`);

    try{
        if(redisConnectSingleton.redisConnection && redisConnectSingleton.redisConnection.connected){
            logger.info(`${basename(__filename)} [getRedisClient] - connected: returning old connection`);
            return redisConnectSingleton.redisConnection;
        };

        /* Values are hard-coded for this example, it's usually best to bring these in via file or environment variable for production */
        let client = await redis.createClient({
            port      : config.REDIS_PORT,               // replace with your port
            host      : config.REDIS_HOST,        // replace with your hostanme or IP address
            password  : config.REDIS_PASSWORD,    // replace with your password
        });
        logger.info(`${basename(__filename)} [getRedisClient] REDIS connection initialized!`);

        redisConnectSingleton.redisConnection = client;
        return client;
    }catch(e){
        logger.error(`${basename(__filename)} [getRedisClient] error: ${JSON.stringify(e.message || e, null, 2)}`);
        return null;
    }
};

module.exports = {
    logger,
    getRedisClient,
    getTokenDataFromRedisByUUID
};
