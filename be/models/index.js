const dbConfig = require("../../server.config");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.MONGODB_CONNECTION_STRING;
db.seller_products = require("./seller_products.model.js")(mongoose);

module.exports = db;