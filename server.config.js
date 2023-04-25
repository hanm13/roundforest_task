const packageJsonFile = require('./package.json');

module.exports = {
  /// GENERAL
  SERVICE_NAME: 'dogmasters.services.home',
  PORT: process.env.PORT || 3001,
  NODE_ENV: process.env.NODE_ENV || 'dev',
  BASE_API_PATH: '/api/v1/',
  NEXTJS_ASSET_PREFIX: '/public',
  
  /// MONGO
  MONGODB_CONNECTION_STRING: "mongodb://127.0.0.1:27017/amazon_db",
  DB_NAME: 'amazon_db',

  VERSION: packageJsonFile.version + '_' + '__BUILD_VERSION__',
  IS_DEV: true,
  ANALYZE: false,
  openAnalyzer: false,
};