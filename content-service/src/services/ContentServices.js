"use strict";

const { Contents } = require("../models");


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const ContentServices = {

    saveRecord: async function (createPattern) {

        return Contents.create(createPattern).then(createRes => {
            return createRes;
        }).catch(err => {
            throw err;
        });
    },

    updateRecord: async function (findPattern, updatePattern) {

        return Contents.updateOne(findPattern, updatePattern).then(updateRes => {
            return updateRes;
        }).catch(err => {
            throw err;
        });
    },

    getRecord: async function (findPattern) {

        return Contents.findOne(findPattern).then(resultData => {
            return resultData;
        }).catch(err => {
            throw err;
        });
    },

    getRecordsList: async function (findPattern) {

        return Contents.find(findPattern).then(resultData => {
            return resultData;
        }).catch(err => {
            throw err;
        });
    }

    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
}
module.exports = ContentServices;