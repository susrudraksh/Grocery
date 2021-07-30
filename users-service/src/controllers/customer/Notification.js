'use strict';

const { NotificationServices } = require('../../services');
const { ObjectId } = require('mongodb');
const { Response, Messages, Validation, Encryption, Common } = require('../../helpers');


const NotificationController = {

    /**
 * @api {get} /user_service/customer/notifications Customer - Notification - Listing
 * @apiGroup App - Customer - Notification
 *
 * @apiHeaderExample {multipart/form-data} Header-Example
    {
        "Content-Type": "multipart/form-data",
        "x-access-token": "your token"
    }
 *
 * @apiParam {String} page_no Page No.
 *
 * @apiSuccessExample {json} Success-Example
    HTTP/1.1 200 OK
    {
    "message": "Successfully fetch notifications list.",
    "data": {
        "docs": [
        {
            "_id": "605b0dddb9a39e36b1a34b85",
            "read_status": 0,
            "notification_type": 1,
            "title": "Athwas",
            "message": "Order Placed Successfully",
            "createdAt": "2021-03-24T10:01:01.643Z"
        },
        {
            "_id": "605488293a20d57e973827a6",
            "read_status": 1,
            "notification_type": 1,
            "title": "Test",
            "message": "Hi Saima Ma'am ",
            "createdAt": "2021-03-19T11:16:57.410Z"
        },
        {
            "_id": "605338e23a20d57e97382522",
            "read_status": 1,
            "notification_type": 1,
            "title": "Test",
            "message": "hiiiiii",
            "createdAt": "2021-03-18T11:26:26.353Z"
        }
        ],
        "totalDocs": 3,
        "limit": 10,
        "page": 1,
        "totalPages": 1,
        "pagingCounter": 1,
        "hasPrevPage": false,
        "hasNextPage": false,
        "prevPage": null,
        "nextPage": null
    }
    }
 *
 * @apiErrorExample {json} Error-Example
    HTTP/1.1 400 OK
    {
        "status": "error",
        "api_name": "/notifications",
        "message": "error.",
        "data": {}
    }
*/
    getNotificationList: async (req, res) => {
        try {
            var page = parseInt(req.query.page_no) || 1;
            var limit = parseInt(req.query.limit) || 10;
            var login_user_id = Common.getUserdetailsBytoken(req.headers.authorization) || null;
            login_user_id = ObjectId(login_user_id);
            var findPattern = {
                user_id: login_user_id
            };
            var aggregatefilter = [
                { $match: findPattern },
                { $project: { title: 1, message: 1, read_status: 1, notification_type: 1, createdAt: 1 } }
            ];
            var sortPattern = { createdAt: -1 };
            NotificationServices.getAggregatePaginatedData(aggregatefilter, sortPattern, page, limit).then(async noticationResult => {

                await NotificationServices.updateRecordMany(findPattern,{read_status: 1}).then(result=>{
                    return true;
                }).catch(err => {
                    let resMsg = Validation.getErrorMessage(err);
                    Response.send(req, res, 500, resMsg);
                });
                let resMsg = Messages.NOTIFICATION_LIST_SUCCESS;
                Response.send(req, res, 200, resMsg, noticationResult);

            }).catch(err => {
                let resMsg = Validation.getErrorMessage(err);
                Response.send(req, res, 500, resMsg);
            });
        } catch (err) {
            var errorMess = Validation.getErrorMessage(err);
            Response.send(req, res, 500, errorMess);
        }
    },


/**
* @api {delete} /user_service/customer/notifications/5f9915010495120f8cd71aad Customer - Notification - Delete One 
* @apiGroup App - Customer - Notification
*
* @apiHeaderExample {multipart/form-data} Header-Example
  {
      "Content-Type": "multipart/form-data",
      "x-access-token": "your token"
  }
*
* @apiSuccessExample {json} Success-Example
  HTTP/1.1 200 OK
  {
  "message": "Notification has been deleted successfully.",
  "data": {}
}
*
* @apiErrorExample {json} Error-Example
  HTTP/1.1 400 OK
  {
      "status": "error",
      "api_name": "/notifications",
      "message": "error.",
      "data": {}
  }
*/

    deleteNotification: async (req, res) => {
        try {

            var notifications_id = req.params.notifications_id || null;
            notifications_id = notifications_id;
            var findPattern = {
                _id: notifications_id
            };
            NotificationServices.deleteRecord(findPattern).then(noticationResult => {
                let resMsg = Messages.NOTIFICATION_DELETE_SUCCESS;
                Response.send(req, res, 200, resMsg);

            }).catch(err => {
                let resMsg = Validation.getErrorMessage(err);
                Response.send(req, res, 500, resMsg);
            });
        } catch (err) {
            var errorMess = Validation.getErrorMessage(err);
            Response.send(req, res, 500, errorMess);
        }
    },


/**
* @api {delete} /user_service/customer/notifications Customer - Notification - Delete All 
* @apiGroup App - Customer - Notification
*
* @apiHeaderExample {multipart/form-data} Header-Example
   {
       "Content-Type": "multipart/form-data",
       "x-access-token": "your token"
   }
*
* @apiSuccessExample {json} Success-Example
   HTTP/1.1 200 OK
   {
    "message": "Notification has been deleted successfully.",
    "data": {}
    }
*
* @apiErrorExample {json} Error-Example
   HTTP/1.1 400 OK
   {
       "status": "error",
       "api_name": "/notifications",
       "message": "error.",
       "data": {}
   }
*/

    deleteAllNotification: async (req, res) => {
        try {
            var login_user_id = Common.getUserdetailsBytoken(req.headers.authorization) || null;
            login_user_id = ObjectId(login_user_id);
            var findPattern = {
                user_id: login_user_id
            };
            NotificationServices.deleteAllRecord(findPattern).then(noticationResult => {
                let resMsg = Messages.NOTIFICATION_DELETE_SUCCESS;
                Response.send(req, res, 200, resMsg);

            }).catch(err => {
                let resMsg = Validation.getErrorMessage(err);
                Response.send(req, res, 500, resMsg);
            });
        } catch (err) {
            var errorMess = Validation.getErrorMessage(err);
            Response.send(req, res, 500, errorMess);
        }
    },

}

module.exports = NotificationController;