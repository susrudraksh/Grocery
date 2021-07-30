"use strict";

const express = require("express");
const { Content, Setting } = require("../controllers/admin");

var router = (module.exports = express.Router());

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// CONTENT
router.get("/contents/faq", Content.get_faqs);
router.post("/contents/faq", Content.create_faq);
router.get("/contents/faq/:question_id", Content.get_faq);
router.put("/contents/faq/:question_id", Content.update_faq);
router.delete("/contents/faq/:question_id", Content.delete_faq);

router.get("/contents/:content_key", Content.get_content);
router.put("/contents/:content_key", Content.update_content);

// SETTING MODULE
router.get("/setting/get_setting", Setting.getSettings);
router.post("/setting/update_setting", Setting.updateSetting);
router.post("/setting/add_delivery_settings", Setting.addDeliverySettings);
router.get("/setting/get_delivery_settings", Setting.getDeliverySettings);