"use strict";

const config = require('../config');

const redis = require("redis");
const client = redis.createClient(config.redisConfigOpts);

const asyncRedis = require("async-redis");
const asyncRedisClient = asyncRedis.decorate(client);

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

module.exports = asyncRedisClient;
