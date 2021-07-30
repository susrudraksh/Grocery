"use strict";

var express = require("express");
const { Settings } = require("../controllers/vendor");

var router = (module.exports = express.Router());

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// SETTINGS
router.get("/settings", Settings.get_settings);