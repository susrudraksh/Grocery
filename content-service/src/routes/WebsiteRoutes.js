"use strict";

const express = require("express");
const { Content } = require("../controllers/website");

var router = (module.exports = express.Router());

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// CONTENT
router.get("/contents/faq", Content.get_faqs);
router.get("/contents/:content_key", Content.get_content);