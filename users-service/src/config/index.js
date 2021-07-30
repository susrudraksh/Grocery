"use strict";

var _ = require('lodash');
require('dotenv').config();

// Default timezone of server to UTC
process.env.TZ = 'UTC';

// Node Environment: development / production
process.env.NODE_ENV = process.env.NODE_ENVIRONMENT || "development";

// Config file according to project setup
var config = {};
var CONFIG_FILE_NAME = process.env.CONFIG_FILE_NAME || "localConfig.js";
config = _.assign(config, require('./'+CONFIG_FILE_NAME));


module.exports = config;
