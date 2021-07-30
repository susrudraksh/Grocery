"use strict";

const { SettingsModel } = require("../models");

var exportFuns = {};

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

exportFuns.create = async function (createPattern) {

    return SettingsModel.create(createPattern).then(createRes => {
        return createRes;
    }).catch(err => {
        throw err;
    });
}

exportFuns.updateOne = async function (findPattern, updatePattern) {

    return SettingsModel.updateOne(findPattern, updatePattern).then(updateRes => {
        return updateRes;
    }).catch(err => {
        throw err;
    });
}

exportFuns.findOne = async function (findPattern) {

    return SettingsModel.findOne(findPattern).then(resultData => {
        return resultData.option_value;
    }).catch(err => {
        throw err;
    });
}

exportFuns.find = async function (findPattern) {

    return SettingsModel.find(findPattern).then(resultData => {
        return resultData;
    }).catch(err => {
        throw err;
    });
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

module.exports = exportFuns;