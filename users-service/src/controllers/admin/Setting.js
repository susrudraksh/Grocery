'use strict';


const _ = require('lodash');
const { SettingServices } = require('../../services');
const { Response, Messages, Validation, Media } = require('../../helpers');


const SettingController = {


    /**
     * @api {get} /user_service/admin/setting/get_setting Setting - Get Single
     * @apiGroup Admin - Setting
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
    "api_name": "/setting/get_setting",
    "message": "Success",
    "data": {
        "_id": "5f90327edafaecab7c32cb7b",
        "office_address": "Nokia",
        "contact_us_email": "raj@gmail.com",
        "admin_commission": 5,
        "createdAt": "2020-10-13T12:09:32.037Z",
        "updatedAt": "2020-10-13T12:09:32.162Z",
        "__v": 0,
        "image_path": "1602590972156iStock000004792809Small.jpg",
        "id": "5f90327edafaecab7c32cb7b"
    }
}
    *
    * @apiErrorExample {json} Error-Example
    HTTP/1.1 400 OK
    {
    "status": "error",
    "api_name": "/setting/get_setting",
    "message": "Setting doesn't exist.",
    "data": {}
    }
    */
    getSettings: async (req, res) => {

        try {

            var findPattern = {};

            SettingServices.getRecordsList(findPattern).then(settingdata => {

                if (settingdata) {

                    let resMsg = "Success";
                    Response.send(req, res, 200, resMsg, settingdata[0]);

                } else {
                    let resMsg = Messages.SETTING_UPDATE_SUCCESS;
                    Response.send(req, res, 400, resMsg);
                }

            }).catch(err => {
                let resMsg = Validation.getErrorMessage(err);
                Response.send(req, res, 500, resMsg);
            });

        } catch (err) {
            Response.send(req, res, 500, err.message);
        }
    },
    /**
     * @api {post} /user_service/admin/setting/update_setting Setting - Update
     * @apiGroup Admin - Setting
     *
     * @apiHeaderExample {multipart/form-data} Header-Example
    {
    "Content-Type": "multipart/form-data"
    }
    *
    * @apiParam {String} seeting_id Setting Id
    * @apiParam {String} office_address Office address
    * @apiParam {String} contact_us_email contact us Email
    * @apiParam {Number} admin_commission Admin Commission
    *
    * @apiSuccessExample {json} Success-Example
    HTTP/1.1 200 OK
    {
    "status": "success",
    "api_name": "/setting/update_setting",
    "message": "Setting details has updated successfully.",
    "data": {
        "_id": "5f90327edafaecab7c32cb7b",
        "office_address": "Jaipur",
        "contact_us_email": "raj123@gmail.com",
        "admin_commission": 10,
        "createdAt": "2020-10-13T12:09:32.037Z",
        "updatedAt": "2020-10-21T13:10:07.667Z",
        "__v": 0,
        "image_path": "1602590972156iStock000004792809Small.jpg",
        "id": "5f90327edafaecab7c32cb7b"
    }
}
    *
    * @apiErrorExample {json} Error-Example
    HTTP/1.1 400 OK
    {
    "status": "error",
    "api_name": "/brand/update_brand/5f731c3efae7b5304ce6ae78",
    "message": "Brand doesn't exist.",
    "data": {}
    }
    */
    updateSetting: async (req, res) => {

        try {

            var setting_id = req.body.setting_id || "";
            var office_address = req.body.office_address || "";
            var contact_us_email = req.body.contact_us_email || "";
            var admin_commission = req.body.admin_commission || "";

            var errors = [];

            // return errors
            if (errors.length > 0) {

                // error
                let resMsg = errors.pop().errText;
                Response.send(req, res, 400, resMsg, { errors: errors });

            } else {

                var findPattern = { _id: setting_id }

                SettingServices.oneRecord(findPattern).then(async settingdata => {

                    if (settingdata) {

                        var updatePattern = {
                            office_address: office_address,
                            contact_us_email: contact_us_email,
                            admin_commission: admin_commission,
                        };

                        SettingServices.updateRecord(findPattern, updatePattern).then(updatedRes => {

                            // success
                            let resMsg = Messages.SETTING_UPDATE_SUCCESS;
                            Response.send(req, res, 200, resMsg, updatedRes);

                        }).catch(err => {
                            let resMsg = Validation.getErrorMessage(err);
                            Response.send(req, res, 500, resMsg);
                        });

                    } else {
                        let resMsg = Messages.SETTING_NOT_EXIST;
                        Response.send(req, res, 400, resMsg);
                    }

                }).catch(err => {
                    let resMsg = Validation.getErrorMessage(err);
                    Response.send(req, res, 500, resMsg);
                });
            }

        } catch (err) {
            Response.send(req, res, 500, err.message);
        }
    },


}
module.exports = SettingController;