"use strict";

const { Setting } = require("../models");

const SettingServices = {
    createRecord: async (brandData) => {
        return await Setting.create(brandData).then(createRes => {
            return createRes;
        }).catch(err => {
            throw err;
        });
    },

    oneRecord: async (condition = {}) => {
        return await Setting.find(condition).then(createRes => {
            return createRes;
        }).catch(err => {
            throw err;
        });
    },
    getRecordsList: async (condition = {}) => {
        return await Setting.find(condition).then(createRes => {
            return createRes;
        }).catch(err => {
            throw err;
        });
    },

    updateRecord: async function (findPattern, updatePattern) {
        var options = { new: true };
        return Setting.findOneAndUpdate(findPattern, updatePattern, options).then(updatedData => {
            return updatedData;
        }).catch(err => {
            throw err;
        });
    },
}
module.exports = SettingServices