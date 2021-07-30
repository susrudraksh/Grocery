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
   * @api {get} /user_service/customer/contents/:content_key Contents - Get Data
   * @apiGroup App - Contents
   *
   * @apiHeaderExample {multipart/form-data} Header-Example
  {
  "Content-Type": "multipart/form-data"
  }
  *
  * @apiParam {String} content_key Content Key: privacy_policy | about_us 
  *
  * @apiSuccessExample {json} Success-Example
  HTTP/1.1 200 OK
  {
  "message": "Success",
  "data": {
  "content_data": "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>"
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
  get_content: async (req, res) => {

    try {

      var content_key = req.params.content_key;

      let contentdata = await ContentServices.getRequest("customer/contents/" + content_key);
      if (contentdata) {
        let resMsg = "Success"
        Response.send(req, res, 200, resMsg, contentdata
        );

      } else {
        let resMsg = Messages.INVALID_CONTENT_KEY;
        Response.send(req, res, 400, resMsg);
      }
    } catch (err) {
      Response.send(req, res, 500, err.message, 'get_content');
    }
  },

}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

module.exports = ContentController;