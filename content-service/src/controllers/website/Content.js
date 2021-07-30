"use strict";

const _ = require('lodash');
const { ContentsService } = require('../../services');
const { Response } = require('../../helpers');
const { Messages } = require('../../constants');

var exportFuns = {};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

/**
 * @apiIgnore Not finished Method
 * @api {get} /content_service/website/contents/:content_key Contents - Get Data
 * @apiGroup Website - Content
 *
 * @apiHeaderExample {multipart/form-data} Header-Example
    {
        "Content-Type": "multipart/form-data"
    }
 *
 * @apiParam {String} content_key Content Key: privacy_policy | about_us | terms_of_use | careers | faq
 *
 * @apiSuccessExample {json} Success-Example
    HTTP/1.1 200 OK
    {
        "status": "success",
        "api_name": "/contents/privacy_policy",
        "message": "Success",
        "data": {
            "content_data": "<h5 style=\"text-align:left;\">'by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.</span></p>\n"
        }
    }
 *
 * @apiErrorExample {json} Error-Example
    HTTP/1.1 200 OK
    {
        "status": "error",
        "api_name": "/contents/privacy_policy",
        "message": "Invalid content key.",
        "data": {}
    }
*/
exportFuns.get_content = (req, res) => {

  try {

    var content_key = req.params.content_key;

    var findPattern = { option_key: content_key };

    ContentsService.getRecord(findPattern).then(content_data => {

      if (content_data) {
        let resMsg = "Success"
        Response.send(req, res, 200, "success", resMsg, {
          content_data: content_data
        });

      } else {
        let resMsg = Messages.INVALID_CONTENT_KEY;
        Response.send(req, res, 200, "error", resMsg);
      }
    });

  } catch (err) {
    Response.send(req, res, 500, "error", err.message, 'get_content');
  }
};

/**
 * @apiIgnore Not finished Method
 * @api {get} /content_service/website/contents/faqs FAQ - Listing
 * @apiGroup Website - Content
 *
 * @apiHeaderExample {multipart/form-data} Header-Example
    {
        "Content-Type": "multipart/form-data"
    }
 *
 * @apiSuccessExample {json} Success-Example
    HTTP/1.1 200 OK
    {
        "status": "success",
        "api_name": "/contents/faq",
        "message": "Success",
        "data": {
            "content_data": [
                {
                    "question_id": "faq_1587727510744",
                    "question": "What is Lorem",
                    "answer": "LoremLorem Ipsum is simply dummy "
                },
                {
                    "question_id": "faq_1587727535192",
                    "question": "Why do we use it?",
                    "answer": "It is a long established fact that."
                }
            ]
        }
    }
 *
 * @apiErrorExample {json} Error-Example
    HTTP/1.1 200 OK
    {
        "status": "error",
        "api_name": "/contents/faq",
        "message": "Invalid content key.",
        "data": {}
    }
*/
exportFuns.get_faqs = (req, res) => {

  try {

    var findPattern = { option_key: "faq" };

    ContentsService.getRecord(findPattern).then(content_data => {

      if (content_data) {
        let resMsg = "Success"
        Response.send(req, res, 200, "success", resMsg, {
          content_data: content_data
        });

      } else {
        let resMsg = Messages.INVALID_CONTENT_KEY;
        Response.send(req, res, 200, "error", resMsg);
      }
    });

  } catch (err) {
    Response.send(req, res, 500, "error", err.message, 'get_content');
  }
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

module.exports = exportFuns;