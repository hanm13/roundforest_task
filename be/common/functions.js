
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


module.exports = {
    logger,
};
