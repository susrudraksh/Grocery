'use strict';


const _ = require('lodash');
const { DeliveryServices,SettingServices } = require('../../services');
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

        var distance = req.body.distance;
        try {
            var findPattern = [
            {
                    $match:
                        {
                            $and:[
                                {min_distance:{$lte:distance}},
                                {max_distance:{$gt:distance}},
                            ]
                        }
                }
            ];
            DeliveryServices.oneRecord(findPattern).then(settingdata => {
              
                if (settingdata) {
                    let resMsg = "Success";
                    Response.send(req, res, 200, resMsg, settingdata);
                } else {
                    var newfindPattern = [
                            {
                                    $sort:{createdAt:-1}
                            }
                        ];
                    DeliveryServices.oneRecord(newfindPattern).then(settingdata => {
                        let resMsg = "Success";
                        Response.send(req, res, 200, resMsg, settingdata);
                    }).catch(err => {
                        let resMsg = "error";
                        Response.send(req, res, 200, resMsg,);
                    });
                    // let resMsg = Messages.SETTING_UPDATE_SUCCESS;
                    // Response.send(req, res, 400, resMsg);
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
     * @api {get} /user_service/customer/normal_settings  Setting - Normal Setting
     * @apiGroup Customer - Setting
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
    getNormalSettings: async(req,res) =>{
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
    }

}
module.exports = SettingController;