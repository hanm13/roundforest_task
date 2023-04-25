'use strict';

const autocannon = require('autocannon');
const serverConfig = require('./server.config');

const url = `http://localhost:8080/?token=`;

const instance = autocannon(
  {
    url: url,
    connections: 10, //default
    pipelining: 1, // default
    duration: 10 // default
  },
  () => {}
);

// this is used to kill the instance on CTRL-C
process.once('SIGINT', () => {
  instance.stop();
});

// just render results
autocannon.track(instance, { renderProgressBar: true });