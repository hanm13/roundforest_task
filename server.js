const compression = require('compression');
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressValidator = require('express-validator');
const path = require('path');
//server config
const conf = require('./server.config');
const dev = conf.NODE_ENV !== 'production';
//oauth 2 infrastructure
const errorLog = require('./be/api/error-log/error-log');
const taskManager = require('./cron/taskManager');
const {logger} = require("./be/common/functions");
const {basename} = require("path");

const app = require('next')({ dev, dir: './fe' });
const handle = app.getRequestHandler();
const cors = require('cors');
const views = require("./views/views");
const db = require("./be/models");

app
 .prepare()
 .then(async () => {

  const server = express();

  server.set("view engine", "ejs");
  server.set("views", path.join(__dirname, "./be/views"));
    
  // parse application/x-www-form-urlencoded
  server.use(bodyParser.urlencoded({ extended: false }));
  // parse application/json
  server.use(bodyParser.json());
  //validation request
  server.use(expressValidator());
  //register authentication provider

  server.use(helmet());
  //register gzip compression
  server.use(compression());

  server.set('trust proxy', true);

  // CHANGE DETECTOR JOBS
  taskManager.runJobs();

  if(conf.IS_DEV){
    server.use(cors());
  }

  server.use(
   methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
     // look in urlencoded POST bodies and delete it
     const method = req.body._method;
     delete req.body._method;
     return method;
    }
   })
  );
  //register health check middleware
  server.use(onHealthCheck);

  //REGISTER ROUTES
  const routes = await require('./be/api/routes');
  const router = routes(server);
  server.use(conf.BASE_API_PATH, router);

  //register client-side errors handler
  server.use(errorLog);
  
  server.use('/', views(app));
  
  server.get('*', (req, res) => {
    if (req.url.includes('/sw.js')) {
    const filePath = path.join(__dirname, 'fe', 'public', 'pwa','socket.io');
    app.serveStatic(req, res, filePath);
    } else if (req.url.startsWith('public/pwa/workbox/')) {
    app.serveStatic(req, res, path.join(__dirname, req.url));
    } else {
    return handle(req, res, req.url);
    }
  });


  //Express middleware in case of SYNC error in a web request
  server.use(function (err, req, res, next) {
      logger.error(`${basename(__filename)} global middleware error, error: ${err}`);
   return next();
  });


  //MongoDB connection

  try{

    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log("Connected to the database!");

  }catch(err){
    logger.error(err.stack);
  }



  //start server
  let listener = server.listen(conf.PORT, err => {
   if (err) throw err;
   console.log(`${conf.SERVICE_NAME} ready on http://localhost:${conf.PORT}`, {});
  });

 });

/*
this function is for microservice health check used by docker
*/
function onHealthCheck(req, res, next) {
 // checks if the system is healthy, like the db connection is live
 // resolves, if health, rejects if not
 if (req.originalUrl === '/health') {
  res.json({ serviceName: conf.SERVICE_NAME, version: conf.VERSION, status: 'UP' });
 } else {
  next();
 }
}

/*
uncaught error from somewhere
*/
process.on('uncaughtException', function (error) {
  logger.error(`uncaughtException, error: ${error}`);
});
/*
unhandled promise rejection
*/
process.on('unhandledRejection', function (reason, p) {
  logger.error(`uncaughtException, reason: ${reason}`);
});

process.on('SIGINT', () => {
 process.exit();
});