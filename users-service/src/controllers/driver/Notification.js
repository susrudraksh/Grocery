'use strict';

const { NotificationServices } = require('../../services');
var ObjectID = require('mongoose').Types.ObjectId;
const { Response, Messages, Validation, Encryption, Common } = require('../../helpers');


const NotificationController = {

    /**
 * @api {get} /user_service/driver/notifications Driver - Notification - Listing
 * @apiGroup App - Driver - Notification
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
    "status": "success",
    "api_name": "/notifications",
    "message": "Successfully fetch notifications list.",
    "data": {
        "docs": [
            {
                "_id": "5f992b510976901f50599f18",
                "read_status": 0,
                "notification_type": 1,
                "title": "Hello2",
                "message": "Test message2",
                "createdAt": "2020-10-28T08:26:57.756Z"
            },
            {
                "_id": "5f992ad56d9c7d3150924422",
                "read_status": 0,
                "notification_type": 1,
                "title": "Hello2",
                "message": "Test message2",
                "createdAt": "2020-10-28T08:24:53.393Z"
            }
        ],
        "totalDocs": 2,
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
            login_user_id = ObjectID(login_user_id);
            var findPattern = {
                user_id: login_user_id,
                is
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
* @api {delete} /user_service/driver/notifications/5f9915010495120f8cd71aad Driver - Notification - Delete One 
* @apiGroup App - Driver - Notification
*
* @apiHeaderExample {multipart/form-data} Header-Example
  {
      "Content-Type": "multipart/form-data",
      "x-access-token": "your token"
  }
*
*
* @apiSuccessExample {json} Success-Example
  HTTP/1.1 200 OK
  {
  "status": "success",
  "api_name": "/notifications",
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
* @api {delete} /user_service/driver/notifications Driver - Notification - Delete All 
* @apiGroup App - Driver - Notification
*
* @apiHeaderExample {multipart/form-data} Header-Example
   {
       "Content-Type": "multipart/form-data",
       "x-access-token": "your token"
   }
*
*
* @apiSuccessExample {json} Success-Example
   HTTP/1.1 200 OK
   {
   "status": "success",
   "api_name": "/notifications",
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
            login_user_id = ObjectID(login_user_id);
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

    /**
    * @api {get} /user_service/driver/notifications/get_notification_count Driver - Notification - Notification Count 
    * @apiGroup App - Driver - Notification
    *
    * @apiHeaderExample {multipart/form-data} Header-Example
   {
   "Content-Type": "multipart/form-data",
   }
   * 
   * @apiSuccessExample {json} Success-Example
   HTTP/1.1 200 OK
   {
    "message": "Success",
    "data": {
        "notification_count": 4
        }
    }
   *
   * @apiErrorExample {json} Error-Example
   HTTP/1.1 400 OK
   {
   "message": "Error.",
   "data": {}
   }
   */

    getNotificationCount: async (req, res) => {

        try {

            var login_user_id = Common.getUserdetailsBytoken(req.headers.authorization) || null;
            
            var newfindPattern = { user_id: ObjectID(login_user_id) ,read_status:0};
            
            var notificationCount = await NotificationServices.getDataCount(newfindPattern);
            let resMsg = "Success";
            Response.send(req, res, 200, resMsg, {
                notification_count:notificationCount
            });

        } catch (err) {
            Response.send(req, res, 500, err.message);
        }
    }


}

module.exports = NotificationController;