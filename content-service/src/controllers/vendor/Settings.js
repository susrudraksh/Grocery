"use strict";

const _ = require('lodash');
const { SettingsService } = require('../../services');
const { Response } = require('../../helpers');
const { Messages } = require('../../constants');

var exportFuns = {};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

/**
 * @apiIgnore Not finished Method
 * @api {get} /content_service/merchant/settings Settings - Get
 * @apiGroup Merchant - Settings
 *
 * @apiHeaderExample {multipart/form-data} Header-Example
    {
        "Content-Type": "multipart/form-data"
    }
 *
 * @apiSuccessExample {json} Success-Example
    HTTP/1.1 200 OK
    {
        "status": "success",
        "api_name": "/settings",
        "message": "Success",
        "data": {
            "settingsData": {
                "referral_amount": 30,
                "money_transfer_limit": {
                    "customer": {
                        "add_money_limit": 10000,
                        "send_money_limit": 10000,
                        "withdraw_money_limit": 10000,
                        "transaction_fees": 20
                    },
                    "merchant": {
                        "add_money_limit": 10000,
                        "send_money_limit": 10000,
                        "withdraw_money_limit": 10000,
                        "transaction_fees": 20
                    }
                },
                "money_surcharges": {
                    "customer": {
                        "add_money_limit": 10000,
                        "send_money_limit": 10000,
                        "withdraw_money_limit": 10000,
                        "transaction_fees": 20
                    },
                    "merchant": {
                        "add_money_limit": 10000,
                        "send_money_limit": 10000,
                        "withdraw_money_limit": 10000,
                        "transaction_fees": 20
                    }
                },
                "loyalty_points_per_order": 10
            }
        }
    }
 *
 * @apiErrorExample {json} Error-Example
    HTTP/1.1 200 OK
    {
        "status": "error",
        "api_name": "/settings",
        "message": "Error.",
        "data": {}
    }
*/
exportFuns.get_settings = (req, res) => {

    try {

        var findPattern = {};

        SettingsService.getRecordsList(findPattern).then(content_data => {

            if (content_data.length > 0) {

                // Modify data array
                const settingsData = {};
                content_data.forEach(obj => {
                    settingsData[obj.option_key] = obj.option_value;
                });

                let resMsg = "Success"
                Response.send(req, res, 200, "success", resMsg, {
                    settingsData: settingsData
                });

            } else {
                let resMsg = Messages.SETTINGS_NOT_EXIST;
                Response.send(req, res, 200, "error", resMsg);
            }
        });

    } catch (err) {
        Response.send(req, res, 500, "error", err.message, 'get_content');
    }
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

module.exports = exportFuns;