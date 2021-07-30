"use strict";

const { UserServices, TransactionHistoryServices } = require("../../services/");
const {
  Response,
  Messages,
  Validation,
  DateTime,
  CryptData,
  Common,
} = require("../../helpers");
const { ObjectID } = require('mongodb');
var mongoose = require("mongoose");

const Wallet = {
  /**
 * @api {get} /user_service/customer/wallet/get_transaction_history Customer - Wallet - Get Transaction History
 * @apiGroup App - Customer - Wallet
 *
 * @apiHeaderExample {multipart/form-data} Header-Example
    {
        "Content-Type": "multipart/form-data",
        "Authorization": "Bearer token"
    }
 *
 * @apiParam {String} page_no Page No.
 * @apiParam {String} limit Limit.
 * 
 * @apiSuccessExample {json} Success-Example
    HTTP/1.1 200 OK
    {
    "message": "Success",
      "data": {
        "docs": [
          {
            "_id": "605b082db9a39e36b1a34b47",
            "amount": "50",
            "wallet_amount": "20",
            "user_id": "6052f3833a20d57e9738223b",
            "transition_id": "13379303",
            "reason": "Amount Added",
            "sender_id": "6052f3833a20d57e9738223b",
            "user_type": 1,
            "sender_type": 1,
            "payment_type": "Credit",
            "amount_type": 1,
            "request_type": 1,
            "order_id": "",
            "createdAt": "2021-03-24T09:36:45.744Z",
            "updatedAt": "2021-03-24T09:36:45.744Z",
            "__v": 0
          }
        ],
        "totalDocs": 1,
        "limit": 10,
        "page": 1,
        "totalPages": 1,
        "pagingCounter": 1,
        "hasPrevPage": false,
        "hasNextPage": false,
        "prevPage": null,
        "nextPage": null,
        "user_wallet": 70
      }
  }
 *
 * @apiErrorExample {json} Error-Example
    HTTP/1.1 400 OK
    {
        "status": "error",
        "api_name": "/get_business_category",
        "message": "error.",
        "data": {}
    }
*/

  getTransactionHistory: (req, res) => {
    try {
      var login_user_id = Common.getUserdetailsBytoken(req.headers.authorization) || null;
      var start_date = req.query.start_date || "";
      var end_date = req.query.end_date || "";
      var status = req.query.status;
      var userid = ObjectID(login_user_id);
      var page = parseInt(req.query.page_no) || 1;
      var limit = 10;

      var findPattern = {
        user_id: userid,
      };

      if (status && status != "") {
        findPattern.request_type = parseInt(status);
      }

      if (start_date != "" || end_date != "") {
        findPattern["$and"] = [];
      }

      if (start_date != "") {
        var start_date = new Date(start_date);
        start_date.setDate(start_date.getDate());
        findPattern["$and"].push({
          createdAt: {
            $gte: start_date, //DateTime.getDateFormat(start_date, "isoUtcDateTime"),
          },
        });
      }

      if (end_date != "") {
        var endDate = new Date(end_date);
        endDate.setDate(endDate.getDate());
        findPattern["$and"].push({
          createdAt: { $lt: endDate },
        });
      }

      var sortPattern = { createdAt: -1 };
      TransactionHistoryServices.getAggregatePaginatedData(
        findPattern,
        sortPattern,
        page,
        limit
      )
        .then(async(walletData) => {
          var aggregatefilter = [
            {$match:{_id:ObjectID(login_user_id)}},
          ];
          var userData = await UserServices.oneRecord(aggregatefilter);
          walletData.user_wallet = userData.wallet;
          let resMsg = "Success";
          Response.send(req, res, 200, resMsg, walletData);
        })
        .catch((err) => {
          let resMsg = Validation.getErrorMessage(err);
          Response.send(req, res, 500, resMsg);
        });
    } catch (err) {
      var errorMess = Validation.getErrorMessage(err);
      Response.send(req, res, 500, errorMess);
    }
  },
  /**
 * @api {post} /user_service/customer/wallet/add_to_wallet Customer - Wallet - Add Money To Wallet
 * @apiGroup App - Customer - Wallet
 *
 * @apiHeaderExample {multipart/form-data} Header-Example
    {
        "Content-Type": "multipart/form-data",
        "Authorization": "Bearer token"
    }
 *
 * @apiParam {String} amount Amount
 * @apiParam {String} reason Reason
 *
 * @apiSuccessExample {json} Success-Example
    HTTP/1.1 200 OK
    {
      "message": "Amount added successfully.",
      "data": {
        "wallet": 70
      }
    } 
 *
 * @apiErrorExample {json} Error-Example
    HTTP/1.1 400 OK
    {
        "status": "error",
        "api_name": "/wallet/add_to_wallet",
        "message": "error.",
        "data": {}
    }
*/
  addToWallet: (req, res) => {
    try {
      var login_user_id =Common.getUserdetailsBytoken(req.headers.authorization) || null;
      var amount = parseFloat(req.body.amount) ;
      var reason = req.body.reason;

      var findPattern = {
        _id: ObjectID(login_user_id),
        is_deleted: 0,
      };
      var aggregatefilter = [
        { $match: findPattern }
      ];
      UserServices.oneRecord(aggregatefilter)
        .then((userdata) => {
       
          if (userdata) {
            if(isNaN(userdata.wallet)){
              userdata.wallet = 0;
            }
            var previous_wallet_balance = parseFloat(userdata.wallet);
            var addPattern = {};
            var userid = login_user_id;
            var transition_id = Common.generateRandomNumber(8);
            addPattern.user_id = userid;
            addPattern.transition_id = transition_id;
            addPattern.reason = "Amount Added";
            addPattern.sender_id = userid;
            addPattern.user_type = 1;
            addPattern.sender_type = 1;
            addPattern.amount = amount;
            addPattern.wallet_amount = previous_wallet_balance;
            addPattern.payment_type = 'Credit';
            addPattern.amount_type = 1;
            addPattern.request_type = 1;
            addPattern.order_id = "";

            TransactionHistoryServices.createRecord(addPattern)
              .then((userObjRes) => {
                var updateWalletData = {};
                var totalBalance =
                  parseFloat(amount) + parseFloat(previous_wallet_balance);
                updateWalletData.user_id = userdata._id;
                updateWalletData.wallet = totalBalance.toFixed(2);

                UserServices.updateRecord(findPattern, updateWalletData)
                  .then((updatedata) => {
                    var returnData = {
                      wallet : totalBalance,
                    };
                    let resMsg = Messages.MONEY_ADDED_WALLET_SUCCESS;
                    Response.send(req, res, 200, resMsg, returnData);
                  })
                  .catch((err) => {
                    let resMsg = Validation.getErrorMessage(err);
                    Response.send(req, res, 500, resMsg);
                  });
              })
              .catch((err) => {
                let resMsg = Validation.getErrorMessage(err);
                Response.send(req, res, 500, resMsg);
              });
          } else {
            var errorMess = Messages.NO_USERS_EXIST;
            Response.send(req, res, 400, errorMess);
          }
        })
        .catch((err) => {
          let resMsg = Validation.getErrorMessage(err);
          Response.send(req, res, 500, resMsg);
        });
    } catch (err) {
      Response.send(req, res, 500, err.message);
    }
  },
};

module.exports = Wallet;
