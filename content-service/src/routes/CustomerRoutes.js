"use strict";

const express = require("express");
const { Content, Setting } = require("../controllers/customer");

var router = (module.exports = express.Router());

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// SETTING MODULE
router.post("/delivery_settings", Setting.getSettings);
router.get("/normal_settings", Setting.getNormalSettings);

//CONTENT
router.get("/contents/:content_key", Content.get_content);


// router.post("/setting/update_setting", Setting.updateSetting);
// router.post("/setting/add_delivery_settings", Setting.addDeliverySettings);
// router.get("/setting/get_delivery_settings", Setting.getDeliverySettings);