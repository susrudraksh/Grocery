"use strict";

const { TransactionHistory } = require("../models");

const TransactionHistoryServices = {
  createRecord: async (userData) => {
    return await TransactionHistory.create(userData)
      .then((createRes) => {
        return createRes;
      })
      .catch((err) => {
        throw err;
      });
  },

  allRecord: async (condition = {}) => {
    return await TransactionHistory.findAll(condition)
      .then((createRes) => {
        return createRes;
      })
      .catch((err) => {
        throw err;
      });
  },

  oneRecord: async (condition = {}) => {
    return await TransactionHistory.findOne(condition)
      .then((createRes) => {
        return createRes;
      })
      .catch((err) => {
        throw err;
      });
  },

  updateRecord: async function (findPattern, updatePattern) {
    var options = { new: true };
    return TransactionHistory.findOneAndUpdate(
      findPattern,
      updatePattern,
      options
    )
      .then((updatedData) => {
        return updatedData;
      })
      .catch((err) => {
        throw err;
      });
  },

  getPaginatedData: async function (findPattern, sortPattern, page_no, limit) {
    var query = findPattern;

    var options = {
      sort: sortPattern,
      page: page_no,
      limit: limit,
      populate: {
        path: "user",
        select: "username phone email user_image wallet",
      },
    };
    return await TransactionHistory.paginate(query, options)
      .then(async (paginatedData) => {
        return paginatedData;
      })
      .catch((err) => {
        throw err;
      });
  },

  getAggregatePaginatedDataAdmin: async function (findPattern, sortPattern, page_no, limit) {

    var query = findPattern;
    var options = {
      sort: sortPattern,
      page: page_no,
      limit: limit
    };

    var myAggregate = TransactionHistory.aggregate(findPattern);

    return await TransactionHistory.aggregatePaginate(myAggregate, options).then(async (paginatedData) => {
      return paginatedData;
    }).catch(err => {
      throw err;
    })
  },
  getAggregatePaginatedData: async function (findPattern, sortPattern, page_no, limit) {

    var query = findPattern;
    var options = {
      sort: sortPattern,
      page: page_no,
      limit: limit
    };
    var myAggregate = TransactionHistory.aggregate();
    myAggregate.match(findPattern);
    return await TransactionHistory.aggregatePaginate(myAggregate, options).then(async (paginatedData) => {
      return paginatedData;
    }).catch(err => {
      throw err;
    })
  },
};
module.exports = TransactionHistoryServices;
