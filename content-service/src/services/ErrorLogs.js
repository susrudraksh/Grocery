"use strict";

const { ErrorLogsModel } = require("../models");

var exportFuns = {};

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

exportFuns.saveRecord = async function (createPattern) {

    return ErrorLogs.create(createPattern).then(createRes => {
        return createRes;
    }).catch(err => {
        throw err;
    });
}

exportFuns.updateRecord = async function (findPattern, updatePattern) {

    return ErrorLogs.updateOne(findPattern, updatePattern).then(updateRes => {
        return updateRes;
    }).catch(err => {
        throw err;
    });
}

exportFuns.getRecord = async function (findPattern) {

    return ErrorLogs.findOne(findPattern).then(resultData => {
        return resultData;
    }).catch(err => {
        throw err;
    });
}

exportFuns.deleteRecord = async function (deletePattern) {

    return ErrorLogs.deleteOne(deletePattern).then(deleteRes => {
        return deleteRes;
    }).catch(err => {
        throw err;
    });
}

exportFuns.getPaginatedLogsData = async function (findPattern, sortPattern, page_no, limit) {

    var query = findPattern;
    var options = {
        sort: sortPattern,
        page: page_no,
        limit: limit
    };

    return ErrorLogs.paginate(query, options).then(async (logsData) => {
        return logsData;
    }).catch(err => {
        throw err;
    });
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

module.exports = exportFuns;
