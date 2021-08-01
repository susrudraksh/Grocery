"use strict";

const config = require('./config');
const path = require('path');
const { validateRequest } = require('./middleware');
const { Response } = require('./helpers');
const { Messages } = require('./constants');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ extended: true, limit: '50mb' }));

const fileUpload = require('express-fileupload');
app.use(fileUpload());

// set default template engine
app.set('view engine', 'ejs');

// set a folder path static for assets
app.use(express.static('public'));

app.all('/*', (req, res, next) => {
  console.log(req.url)
  // CORS header support
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key,Authorization');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

// Routing
app.get('/', (req, res) => {
  var resMsg = config.siteTitle + " Content service is running.";
  Response.send(req, res, 200, "success", resMsg);
});

const { CustomerRoutes, AdminRoutes, VendorRoutes, WebsiteRoutes } = require('./routes');
app.use('/customer/', CustomerRoutes);
app.use('/admin/', AdminRoutes);
app.use('/vendor/', VendorRoutes);
app.use('/website/', WebsiteRoutes);

// If no route is matched by now, it must be a 404
app.use(function (req, res, next) {
  Response.send(req, res, 404, "NOT_FOUND");
});

var server = app.listen(config.expressPort, function () {
  console.log(config.siteTitle + ' Content service listening on port %s', config.expressPort);
});

module.exports = server;