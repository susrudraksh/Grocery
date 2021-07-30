"use strict";

const _ = require('lodash');
const config = require('../../config');
const { ContentServices } = require('../../services');
const { Response, Validation, Messages } = require('../../helpers');

const ContentController = {
  //++++++++++++++++++++++ GLOBAL ERRORS ++++++++++++++++++++++++++++++++++++++++

  /**
   * @api {All} / Global Errors
   * @apiGroup GlobalErrors
   *
   * @apiDescription These errors may occurs globally when either of other apis called. Each error has different status and reason of occurance. These all are for security purpose to protect apis access.
   *
   * @apiHeaderExample {multipart/form-data} Header-Example
      {
          "Content-Type": "multipart/form-data",
          "X-Access-Token": "Access token generated at client for every request.",
          "Authorization": "Auth token received from server after user login.",
          "login_user_id": "5f2bd5bf6d252675e46d0271",
      }
   *
   * @apiSuccess 200 OK
   * @apiError 400 Bad Request.
   * @apiError 401 Login Timeout.
   * @apiError 402 Unauthorized.
   * @apiError 403 Forbidden.
   * @apiError 404 Not Found.
   * @apiError 500 Internal Server Error
   *
   * @apiSuccessExample {json} Success with Data
      HTTP/1.1 200 Response
      {
          "status": "success",
          "api_name": "user_login",
          "message": "Success",
          "data": {}
      }
   *
   * @apiSuccessExample {json} Success with Error
      HTTP/1.1 200 Response
      {
          "status": "error",
          "api_name": "user_login",
          "message": "Invalid Credentials.",
          "data": {}
      }
   *
   * @apiErrorExample {json} 400 Bad Request
      HTTP/1.1 400 Response
      {
          "status": "error",
          "api_name": "user_login",
          "message": "Bad Request.",
          "data": {}
      }
   *
   * @apiErrorExample {json} 401 Login Timeout
      HTTP/1.1 401 Response
      {
          "status": "error",
          "api_name": "user_login",
          "message": "Login Session Expired",
          "data": {}
      }
   *
   * @apiErrorExample {json} 402 Unauthorized
      HTTP/1.1 401 Response
      {
          "status": "error",
          "api_name": "user_login",
          "message": "Unauthorized",
          "data": {}
      }
   *
   * @apiErrorExample {json} 403 Forbidden
      HTTP/1.1 403 Response
      {
          "status": "error",
          "api_name": "user_login",
          "message": "You are not allowed to access webservices.",
          "data": {}
      }
   *
   * @apiErrorExample {json} 404 Not Found
      HTTP/1.1 404 Response
      {
          "status": "error",
          "api_name": "user_login",
          "message": "Not Found",
          "data": {}
      }
   *
   * @apiErrorExample {json} 500 Internal Server Error
      HTTP/1.1 500 Response
      {
        "status": "error",
        "api_name": "user_login",
        "message": "Can't set headers after they are sent.",
        "data": {}
      }
  */

  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  /**
   * @api {get} /content_service/admin/contents/:content_key Contents - Get Data
   * @apiGroup Admin - Content
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
      "message": "Success",
      "data": {
        "content_data": "<p><strong>Athwas</strong>-An eCommerce Unit of IA Multi Ventures Pvt.Ltd.*Srinagar, Kashmir</p><p>*IA Multi Ventures Pvt. Ltd. is a super stockist company in Kashmir that deals with distribution of multiple brands of different Companies like P&amp;G, Samsung, Dabur India Ltd., Reckitt Benckiser, Godrej, Marico Ltd., Jk Oils and Cello.</p><p>We at â€˜Athwasâ€™ give our best to deliver Quality Goods and Best Service to the Customers because our main goal is â€˜Customer Satisfactionâ€™.</p><p>Our team is working hard to make â€˜Athwasâ€™ an easy-go platform for our customers in every possible way. </p><p>From groceries to electronics, fashion to personal care, we provide door-drop service just to make it convenient for customers to receive what they need.</p><p>At Athwas, we provide customers a wide array of National and International Brands.</p><p>Along with door delivery service, we provide customer service, easy return process and money back.</p><p>Customer can place order on their mobile phones through our Mobile Application â€˜Athwasâ€™(Android &amp; iOS) for that â€˜Athwasâ€™ application needs to be downloaded/installed on user devices. Installation of â€˜Athwasâ€™ mobile application is free of cost.</p>"
      }
    }
   *
   * @apiErrorExample {json} Error-Example
      HTTP/1.1 400 OK
      {
          "status": "error",
          "api_name": "/contents/privacy_policy",
          "message": "Invalid content key.",
          "data": {}
      }
  */
  get_content: (req, res) => {

    try {

      var content_key = req.params.content_key;

      var findPattern = { option_key: content_key };

      ContentServices.getRecord(findPattern).then(content_data => {

        if (content_data) {
          let resMsg = "Success"
          Response.send(req, res, 200, resMsg, {
            content_data: content_data.option_value
          });

        } else {
          let resMsg = Messages.INVALID_CONTENT_KEY;
          Response.send(req, res, 400, resMsg);
        }
      });

    } catch (err) {
      Response.send(req, res, 500, err.message, 'get_content');
    }
  },

  /**
   * @api {put} /content_service/admin/contents/:content_key Contents - Update
   * @apiGroup Admin - Content
   *
   * @apiHeaderExample {multipart/form-data} Header-Example
      {
          "Content-Type": "multipart/form-data"
      }
   *
   * @apiParam {String} content_value Content Value
   *
   * @apiSuccessExample {json} Success-Example
      HTTP/1.1 200 OK
      {
          "status": "success",
          "api_name": "/contents/privacy_policy",
          "message": "Content has updated successfully.",
          "data": {}
      }
   *
   * @apiErrorExample {json} Error-Example
      HTTP/1.1 400 OK
      {
          "status": "error",
          "api_name": "/contents/privacy_policy",
          "message": "Invalid content key.",
          "data": {}
      }
  */
  update_content: (req, res) => {

    try {

      var content_key = req.params.content_key;
      var content_value = req.body.content_value;

      var notAllowedKeys = ["faq"];

      if (notAllowedKeys.indexOf(content_key) !== -1) {

        let resMsg = Messages.NOT_ALLOW_CONTENT_KEY;
        Response.send(req, res, "error", 400, resMsg);

      } else {

        var findPattern = { option_key: content_key };

        ContentServices.getRecord(findPattern).then(content_data => {

          if (content_data) {

            var updatePattern = { option_value: content_value };
            ContentServices.updateRecord(findPattern, updatePattern).then(updateRes => {

              let resMsg = Messages.CONTENT_UPDATE_SUCCESS;
              Response.send(req, res, 200, resMsg);

            }).catch(err => {
              let resMsg = Validation.getErrorMessage(err);
              Response.send(req, res, 500, rrorMsg);
            });

          } else {
            let resMsg = Messages.INVALID_CONTENT_KEY;
            Response.send(req, res, 400, resMsg);
          }
        });
      }
    } catch (err) {
      Response.send(req, res, 500, err.message);
    }
  },
  /**
    * @api {get} /content_service/admin/contents/faqs FAQ - Listing
    * @apiGroup Admin - Content
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
       HTTP/1.1 400 OK
       {
           "status": "error",
           "api_name": "/contents/faq",
           "message": "Invalid content key.",
           "data": {}
       }
   */
  get_faqs: (req, res) => {

    try {

      var findPattern = { option_key: "faq" };

      ContentServices.getRecord(findPattern).then(content_data => {

        if (content_data) {
          let resMsg = "Success";
          Response.send(req, res, 200, resMsg, {
            content_data: content_data
          });

        } else {
          let resMsg = Messages.INVALID_CONTENT_KEY;
          Response.send(req, res, 400, resMsg);
        }
      });

    } catch (err) {
      Response.send(req, res, 500, err.message, 'get_content');
    }
  },

  /**
   * @api {post} /content_service/admin/contents/faq FAQ - Create 
   * @apiGroup Admin - Content
   *
   * @apiHeaderExample {multipart/form-data} Header-Example
      {
          "Content-Type": "multipart/form-data"
      }
   *
   * @apiParam {String} question Question
   * @apiParam {String} answer Answer
   *
   * @apiSuccessExample {json} Success-Example
      HTTP/1.1 200 OK
      {
          "status": "success",
          "api_name": "/contents/faq",
          "message": "FAQ has created successfully.",
          "data": {}
      }
   *
   * @apiErrorExample {json} Error-Example
      HTTP/1.1 400 Error
      {
          "status": "error",
          "api_name": "/contents/faq",
          "message": "FAQ data not found in database.",
          "data": {}
      }
  */
  create_faq: (req, res) => {

    try {

      var question = req.body.question || "";
      var answer = req.body.answer || "";

      var errors = [];

      if (!question || question == "") {
        errors.push({ errField: "question", errText: "Question field is empty." });
      }

      if (!answer || answer == "") {
        errors.push({ errField: "answer", errText: "Answer Type field is empty." });
      }

      // return errors
      if (errors.length > 0) {
        let resMsg = errors.pop().errText;
        Response.send(req, res, 400, resMsg, { errors: errors });

      } else {

        var findPattern = { option_key: "faq" };

        ContentServices.getRecord(findPattern).then(content_data => {

          if (content_data) {

            var createPattern = {
              question_id: "faq_" + Date.now(),
              question: question,
              answer: answer,
            };

            var faqDataArr = content_data.option_value;

            faqDataArr.push(createPattern);

            var updatePattern = { option_value: faqDataArr };

            ContentServices.updateRecord(findPattern, updatePattern).then(updateRes => {

              // success
              let resMsg = Messages.FAQ_CREATE_SUCCESS;
              Response.send(req, res, 200, resMsg);

            }).catch(err => {
              let resMsg = Validation.getErrorMessage(err);
              Response.send(req, res, 500, resMsg);
            });

          } else {
            let resMsg = Messages.FAQ_DATA_MISSING;
            Response.send(req, res, 400, resMsg);
          }
        });
      }

    } catch (err) {
      Response.send(req, res, 500, err.message);
    }
  },

  /**
   * @api {get} /content_service/admin/contents/faq/:question_id FAQ - Get 
   * @apiGroup Admin - Content
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
          "api_name": "/contents/faq/faq_1587727510744",
          "message": "Success",
          "data": {
              "question_id": "faq_1587727510744",
              "question": "What is Lorem",
              "answer": "LoremLorem Ipsum is simply dummy "
          }
      }
   *
   * @apiErrorExample {json} Error-Example
      HTTP/1.1 400 Error
      {
          "status": "error",
          "api_name": "/contents/faq/faq_1587727510744",
          "message": "Invalid Question Id",
          "data": {}
      }
  */
  get_faq: (req, res) => {

    try {

      var question_id = req.params.question_id;

      var findPattern = { option_key: "faq" };

      ContentServices.getRecord(findPattern)
        .then(content_data => {

          if (content_data) {

            var faqDataArr = content_data.option_value;

            // get index and check item exist
            var objIndex = faqDataArr.findIndex((obj => obj.question_id == question_id));

            if (objIndex !== -1) {

              // success
              let resMsg = "Success";
              Response.send(req, res, 200, resMsg, faqDataArr[objIndex]);

            } else {
              let resMsg = Messages.INVALID_FAQ_REQUEST;
              Response.send(req, res, 400, resMsg);
            }

          } else {
            let resMsg = Messages.FAQ_DATA_MISSING;
            Response.send(req, res, 400, resMsg);
          }
        });

    } catch (err) {
      Response.send(req, res, 500, err.message);
    }
  },

  /**
   * @api {put} /content_service/admin/contents/faq/:question_id FAQ - Update
   * @apiGroup Admin - Content
   *
   * @apiHeaderExample {multipart/form-data} Header-Example
      {
          "Content-Type": "multipart/form-data"
      }
   *
   * @apiParam {String} question Question
   * @apiParam {String} answer Answer
   *
   * @apiSuccessExample {json} Success-Example
      HTTP/1.1 200 OK
      {
          "status": "success",
          "api_name": "/contents/faq/faq_1587725188437",
          "message": "FAQ details has updated successfully.",
          "data": {}
      }
   *
   * @apiErrorExample {json} Error-Example
      HTTP/1.1 400 Error
      {
          "status": "error",
          "api_name": "/contents/faq/faq_1587725188437",
          "message": "FAQ data not found in database.",
          "data": {}
      }
  */
  update_faq: (req, res) => {

    try {

      var question_id = req.params.question_id;

      var question = req.body.question || "";
      var answer = req.body.answer || "";

      var errors = [];

      if (!question || question == "") {
        errors.push({ errField: "question", errText: "Question field is empty." });
      }

      if (!answer || answer == "") {
        errors.push({ errField: "answer", errText: "Answer Type field is empty." });
      }

      // return errors
      if (errors.length > 0) {
        let resMsg = errors.pop().errText;
        Response.send(req, res, 400, resMsg, { errors: errors });

      } else {

        var findPattern = { option_key: "faq" };

        ContentServices.getRecord(findPattern)
          .then(content_data => {

            if (content_data) {

              var updatedPattern = {
                question_id: question_id,
                question: question,
                answer: answer,
              };

              var faqDataArr = content_data.option_value;

              var objIndex = faqDataArr.findIndex((obj => obj.question_id == question_id));
              faqDataArr[objIndex] = updatedPattern;

              var updatePattern = { option_value: faqDataArr };

              ContentServices.updateRecord(findPattern, updatePattern).then(updateRes => {

                // success
                let resMsg = Messages.FAQ_UPDATE_SUCCESS;
                Response.send(req, res, 200, resMsg);

              }).catch(err => {
                let resMsg = Validation.getErrorMessage(err);
                Response.send(req, res, 400, resMsg);
              });

            } else {
              let resMsg = Messages.FAQ_DATA_MISSING;
              Response.send(req, res, 400, resMsg);
            }
          });
      }

    } catch (err) {
      Response.send(req, res, 500, err.message);
    }
  },

  /**
   * @api {delete} /content_service/admin/contents/faq/:question_id FAQ - Delete 
   * @apiGroup Admin - Content
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
          "api_name": "/contents/faq/gfggfgg",
          "message": "FAQ has deleted successfully.",
          "data": {}
      }
   *
   * @apiErrorExample {json} Error-Example
      HTTP/1.1 400 Error
      {
          "status": "error",
          "api_name": "/contents/faq/gfggfgg",
          "message": "FAQ data not found in database.",
          "data": {}
      }
  */
  delete_faq: (req, res) => {

    try {

      var question_id = req.params.question_id;

      var findPattern = { option_key: "faq" };

      ContentServices.getRecord(findPattern)
        .then(content_data => {

          if (content_data) {

            var faqDataArr = content_data.option_value;

            // remove item from array
            faqDataArr = faqDataArr.filter((item) => item.question_id !== question_id);

            var updatePattern = { option_value: faqDataArr };

            ContentServices.updateRecord(findPattern, updatePattern).then(updateRes => {

              // success
              let resMsg = Messages.FAQ_DELETE_SUCCESS;
              Response.send(req, res, 200, resMsg);

            }).catch(err => {
              let resMsg = Validation.getErrorMessage(err);
              Response.send(req, res, 400, resMsg);
            });

          } else {
            let resMsg = Messages.FAQ_DATA_MISSING;
            Response.send(req, res, 400, resMsg);
          }
        });

    } catch (err) {
      Response.send(req, res, 500, err.message);
    }
  }

}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

module.exports = ContentController;