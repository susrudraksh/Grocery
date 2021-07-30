"use strict";

const { UserServices, TransactionHistoryServices } = require("../../services");
const {
  Response,
  Validation,
  Common,
} = require("../../helpers");
const { ObjectID } = require('mongodb');

const Transaction = {
 

  getTransactionHistory: (req, res) => {
    try {
      var start_date = req.query.start_date || "";
      var end_date = req.query.end_date || "";
      var status = req.query.status;
      var page = parseInt(req.query.page_no) || 1;
      var limit = parseInt(req.query.limit) || 10;
      var keyword = req.query.keyword || "";

      var findPattern = {};

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

      if (keyword && keyword != "") {
        findPattern["$or"] = [
          { 'transition_id': { $regex: keyword, $options: "i" } }
        ];
      }

      var sortPattern = { createdAt: -1 };

      var aggregateCondition = [
        { $match: findPattern },
        {
          $lookup: {
            from: 'users',
            let: { "id": "$user_id" },
            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
              { $project: { "username": 1 } }
            ],
            as: 'userData'
          }
        },
        { $unwind: "$userData" },
      ];

      TransactionHistoryServices.getAggregatePaginatedDataAdmin(aggregateCondition, sortPattern, page, limit).then(async (transactionData) => {

        let resMsg = "Success";
        Response.send(req, res, 200, resMsg, transactionData);
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
};

module.exports = Transaction;
