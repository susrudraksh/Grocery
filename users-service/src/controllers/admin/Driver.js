'use strict';


const _ = require('lodash');
const { UserServices } = require('../../services');
const { Response, Messages, Validation, Encryption, Geocoder, DateTime, Media, Redis } = require('../../helpers');
const { json } = require('body-parser');
const { find } = require('lodash');
const { ObjectID } = require('mongodb');
const config = require('../../config');
const UPLOAD_FOLDER_URL = config.apiGatewayUrl + "/service/assets?service=user_service&filepath=uploads/users";
const DEFAULT_FOLDER_URL = config.apiGatewayUrl + "/service/assets?service=user_service&filepath=default";


const DriverController = {

    /**
     * @api {get} /user_service/admin/drivers Driver - Listing
     * @apiGroup Admin - Driver
     *
     * @apiHeaderExample {multipart/form-data} Header-Example
        {
            "Content-Type": "multipart/form-data"
        }
     *
     * @apiParam {String} page_no Page No.
     * @apiParam {String} keyword Search Keyword
     * @apiParam {String} start_date Start Date ( Format: YYYY-MM-DD )
     * @apiParam {String} end_date End Date ( Format: YYYY-MM-DD )
     * @apiParam {String} status Status
     *
     * @apiSuccessExample {json} Success-Example
        HTTP/1.1 200 OK
        {
        "status": "success",
        "api_name": "/drivers",
        "message": "Success",
        "data": {
            "docs": [
                {
                    "_id": "5f6c6fce1705fe1da05de2ea",
                    "wallet": "0.00",
                    "is_email_varify": 0,
                    "show_notification": 0,
                    "is_available": 0,
                    "device_type": 0,
                    "auth_token": "",
                    "firebase_token": "",
                    "is_active": 0,
                    "is_deleted": 0,
                    "first_name": "Nishant",
                    "last_name": "Jain",
                    "user_role": "3",
                    "email": "jain@gmail.com",
                    "country_code": "+91",
                    "phone": 369963258,
                    "password": "$2a$10$nnwoIZo81Mb98VUo3rEIOeX/8FuW6Sa5dDNbav4KdC6BlSYATXEqW",
                    "user_image": "",
                    "createdAt": "2020-09-24T10:07:10.506Z",
                    "updatedAt": "2020-09-24T10:07:10.506Z",
                    "__v": 0
                },
                
            ],
            "totalDocs": 5,
            "limit": 10,
            "page": null,
            "totalPages": 1,
            "pagingCounter": null,
            "hasPrevPage": false,
            "hasNextPage": false,
            "prevPage": null,
            "nextPage": null
        }
    }
     *
     * @apiErrorExample {json} Error-Example
        HTTP/1.1 401 OK
        {
            "status": "error",
            "api_name": "drivers",
            "message": "Login credentials are invalid.",
            "data": {}
        }
    */
    get_drivers: (req, res) => {

        try {

            var keyword = req.query.keyword || "";
            var start_date = req.query.start_date || "";
            var end_date = req.query.end_date || "";
            var status = req.query.status;
            var page = parseInt(req.query.page_no) || 1;
            var limit = parseInt(req.query.limit) || 10;

            var findPattern = {
                is_deleted: 0,
                user_role: 4
            };

            if (keyword && keyword != "") {
                findPattern["$or"] = [
                    { 'username': { $regex: keyword, $options: "i" } },
                    { 'email': { $regex: keyword, $options: "i" } },
                    { 'phone': { $regex: keyword, $options: "i" } }
                ];
            }

            if (status && status != "") {
                findPattern.is_active = parseInt(status);
            }

            if (start_date != "" || end_date != "") {
                findPattern["$and"] = [];
            }
    
            if (start_date != "") {
                findPattern["$and"].push({ createdAt: { "$gte": new Date(start_date) } });
            }
    
            if (end_date != "") {
    
                var endDate = new Date(end_date);
                endDate = endDate.setDate(endDate.getDate() + 1);
                findPattern["$and"].push({ createdAt: { "$lt": new Date(endDate) } });
            }

            var sortPattern = { createdAt: -1 };
            let aggregateConditions = [
                {
                    $match: findPattern
                },
                {
                    $project: {
                        'user_image_url': {
                            $cond: [
                                { $eq: ['$user_image', ''] },
                                { $concat: [DEFAULT_FOLDER_URL + "/placeholder-user.jpg"] },
                                { $concat: [UPLOAD_FOLDER_URL + "/", { $toString: "$_id" }, '/', "$user_image"] },
                            ]
                        },
                        "user_image_thumb_url": {
                            $cond: [
                                { $eq: ['$user_image', ''] },
                                { $concat: [DEFAULT_FOLDER_URL + "/placeholder-user.jpg"] },
                                { $concat: [UPLOAD_FOLDER_URL + "/", { $toString: "$_id" }, '/thumb_', "$user_image"] },
                            ]
                        },
                        address: 1,geoLocation:1, country_code: 1, createdAt: 1, email: 1, is_active: 1, phone: 1, user_role: 1, username: 1, wallet: 1, register_id: 1, online_status: 1
                    }
                },
            ];
            UserServices.getPaginatedData(aggregateConditions, sortPattern, page, limit).then(userdata => {
                let resMsg = "Success";
                Response.send(req, res, 200, resMsg, userdata);

            }).catch(err => {
                let resMsg = Validation.getErrorMessage(err);
                Response.send(req, res, 500, resMsg);
            });

        } catch (err) {
            Response.send(req, res, 500, err.message);
        }
    },

    /**
 * @api {post} /user_service/admin/drivers/create_driver Drivers - Create
 * @apiGroup Admin - Driver
 *
 * @apiHeaderExample {multipart/form-data} Header-Example
    {
        "Content-Type": "multipart/form-data"
    }
 *
 * @apiParam {String} username Username
 * @apiParam {String} country_code Country Code
 * @apiParam {String} phone Phone
 * @apiParam {String} email Email
 * @apiParam {String} password Password
 * @apiParam {String} address Address
 * @apiParam {Object} user_image Formdata Image Object
 *
 * @apiSuccessExample {json} Success-Example
    HTTP/1.1 200 OK
    {
    "status": "success",
    "api_name": "/drivers/create_driver",
    "message": "User has created successfully.",
    "data": {
        "address": "malviya nagar,jaipur",
        "geoLocation": {
            "type": "Point",
            "coordinates": [
                75.8242966,
                26.8548662
            ],
            "_id": "5f75a2bc51a90d3694328d66"
        },
        "wallet": "0.00",
        "is_user_verified": 1,
        "is_email_verified": 1,
        "show_notification": 0,
        "is_available": 0,
        "device_type": 0,
        "auth_token": "",
        "device_token": "",
        "is_active": 1,
        "is_deleted": 0,
        "_id": "5f75a2bc51a90d3694328d65",
        "username": "Vimal sharma",
        "user_role": 4,
        "email": "vimal02@gmail.com",
        "country_code": "91",
        "phone": "111222444",
        "password": "$2a$10$Fwl1FBbtUD9IqKnop6R1Xey7zX.LTzEHbLvBpiWMFPyhmk4R5kkF6",
        "user_image": "16015448924324e3f421.jpg",
        "createdAt": "2020-10-01T09:34:52.427Z",
        "updatedAt": "2020-10-01T09:34:52.437Z",
        "__v": 0,
        "register_id": "178445f75a2bc51a90d3694328d65",
        "user_image_url": "http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/users/5f75a2bc51a90d3694328d65/16015448924324e3f421.jpg",
        "user_image_thumb_url": "http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/users/5f75a2bc51a90d3694328d65/thumb_16015448924324e3f421.jpg",
        "id": "5f75a2bc51a90d3694328d65"
    }
}
 *
 * @apiErrorExample {json} Error-Example
    HTTP/1.1 400 OK
    {
    "status": "error",
    "api_name": "/drivers/create_driver",
    "message": "You are already registered with this phone number.",
    "data": {}
}
*/
    create_driver: async (req, res) => {

        try {

            var username = req.body.username || "";
            var country_code = req.body.country_code || '';
            country_code = country_code.replace(/\+/g, "");
            var phone = req.body.phone || "";
            var email = req.body.email || "";
            var password = req.body.password || "";
            var address = req.body.address || "";
            var files = req.body.files || null;

            var errors = [];

            if (address != "") {
                var cordinates = await Geocoder.getLatLongByAddress(address);
                if (!cordinates || cordinates.length == 0) {
                    errors.push({ errField: "address", errText: Messages.INVALID_ADDRESS });
                }
            }
            if (files && files.user_image && Media.getMediaTypeByMimeType(files.user_image.mimetype) != "image") {
                errors.push({ errField: "user_image", errText: Messages.INVALID_IMAGE_FORMAT });
            }

            // return errors
            if (errors.length > 0) {
                let resMsg = errors.pop().errText;
                Response.send(req, res, 400, resMsg, { errors: errors });

            } else {

                var findPattern = {
                    user_role: 4,
                    is_deleted: 0
                };
                findPattern["$or"] = [{ country_code: country_code, phone: phone }, { email: email }];
                let aggregateConditions = [
                    {
                        $match: findPattern,
                    },
                ];
                UserServices.oneRecord(aggregateConditions).then(userdata => {

                    if (userdata && userdata.phone==phone && userdata.is_phone_verified == 1) {

                        var resMsg = Messages.PHONE_ALREADY_REGISTERED;
                        Response.send(req, res, 400, resMsg);

                    }else if (userdata && userdata.email==email && userdata.is_email_verified == 1) {

                        var resMsg = Messages.EMAIL_ALREADY_REGISTERED;
                        Response.send(req, res, 400, resMsg);

                    } else {



                        var createPattern = {
                            username: username,
                            user_role: 4,
                            is_user_verified: 1,
                            is_email_verified: 1,
                            is_active: 1,
                            email: email,
                            country_code: country_code,
                            phone: phone,
                            password: password ? Encryption.getBcryptEncryption(password) : "",
                            user_image: "",
                        }

                        if (address != "") {
                            createPattern.address = address;
                            createPattern.geoLocation = {
                                type: "Point",
                                coordinates: [
                                    parseFloat(cordinates[0].longitude),
                                    parseFloat(cordinates[0].latitude)
                                ]
                            }
                        }

                        UserServices.createRecord(createPattern).then(async createRes => {

                            var findPattern = { _id: createRes._id };
                            var updatePattern = {};

                            if (files && files.user_image) {
                                var fileName = await UserServices.updateUserImage(createRes, files.user_image);
                                updatePattern.user_image = fileName;
                            }

                            UserServices.updateRecord(findPattern, updatePattern).then(updatedRes => {

                                // success
                                let resMsg = Messages.USER_CREATE_SUCCESS;
                                Response.send(req, res, 200, resMsg, updatedRes);

                            }).catch(err => {
                                let resMsg = Validation.getErrorMessage(err);
                                Response.send(req, res, 500, resMsg);
                            });

                        }).catch(err => {

                            var errorsArr = Validation.getValidationErrors(err);
                            let resMsg = Validation.getErrorMessage(err);
                            Response.send(req, res, 500, resMsg, {
                                errors: errorsArr
                            });
                        });

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
    /**
 * @api {get} /user_service/admin/drivers/get_driver/:user_id Drivers - Get Single
 * @apiGroup Admin - Driver
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
    "api_name": "/drivers/get_driver/5f6dd9b10c6b0f0ce4629108",
    "message": "Success",
    "data": {
        "wallet": "0.00",
        "is_email_varify": 0,
        "show_notification": 0,
        "is_available": 0,
        "device_type": 0,
        "auth_token": "",
        "firebase_token": "",
        "is_active": 0,
        "is_deleted": 0,
        "_id": "5f6dd9b10c6b0f0ce4629108",
        "username": "vishnu kumar",
        "user_role": 4,
        "email": "vishnu04@gmail.com",
        "country_code": "+91",
        "phone": 367795218,
        "password": "$2a$10$rcFku396kWB4acyxsq8fQenaCAjJayez/21DMRZFaFiwTIxLbtq/C",
        "user_image": "",
        "createdAt": "2020-09-25T11:51:13.185Z",
        "updatedAt": "2020-09-25T11:51:13.185Z",
        "__v": 0,
        "register_id": "419195f6dd9b10c6b0f0ce4629108",
        "user_image_url": "http://192.168.1.131:3051/service/assets?service=user_service&filepath=default/placeholder-user.jpg",
        "user_image_thumb_url": "http://192.168.1.131:3051/service/assets?service=user_service&filepath=default/placeholder-user.jpg",
        "id": "5f6dd9b10c6b0f0ce4629108"
    }
}
 *
 * @apiErrorExample {json} Error-Example
    HTTP/1.1 400 OK
    {
        "status": "error",
        "api_name": "/drivers/get_driver/5f195d3ce3c67c75b42fc145",
        "message": "User doesn't exist.",
        "data": {}
    }
*/
    get_driver: async (req, res) => {

        try {

            var user_id = req.params.user_id;

            var findPattern = { _id: ObjectID(user_id), is_deleted: 0 }
            let aggregateConditions = [
                {
                    $match: findPattern,
                },
                {
                    $project: {
                        'user_image_url': { $concat: [UPLOAD_FOLDER_URL + "/", { $toString: "$_id" }, '/', "$user_image"] },
                        "user_image_thumb_url": { $concat: [UPLOAD_FOLDER_URL + "/", { $toString: "$_id" }, '/thumb_', "$user_image"] },
                        address: 1, country_code: 1, createdAt: 1, email: 1, is_active: 1, phone: 1, user_role: 1, username: 1, wallet: 1
                    }
                },
            ];
            UserServices.oneRecord(aggregateConditions).then(userdata => {

                if (userdata) {

                    let resMsg = "Success";
                    Response.send(req, res, 200, resMsg, userdata);

                } else {
                    let resMsg = Messages.USER_NOT_EXIST;
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
 * @api {put} /user_service/admin/drivers/update_driver/:user_id Drivers - Update
 * @apiGroup Admin - Driver
 *
 * @apiHeaderExample {multipart/form-data} Header-Example
    {
        "Content-Type": "multipart/form-data"
    }
 *
 * @apiParam {String} username Username
 * @apiParam {String} country_code Country Code
 * @apiParam {String} phone Phone
 * @apiParam {String} email Email
 * @apiParam {String} address Address
 * @apiParam {Object} user_image Formdata Image Object
 *
 * @apiSuccessExample {json} Success-Example
    HTTP/1.1 200 OK
    {
        "status": "success",
        "api_name": "/drivers/update_driver/5f202034cf946713ced6bd52",
        "message": "User details has updated successfully.",
        "data": {
                "_id": "5f6c6fce1705fe1da05de2ea",
                "wallet": "0.00",
                "is_email_varify": 0,
                "show_notification": 0,
                "is_available": 0,
                "device_type": 0,
                "auth_token": "",
                "firebase_token": "",
                "is_active": 0,
                "is_deleted": 0,
                "first_name": "Nishant",
                "last_name": "Jain",
                "user_role": "4",
                "email": "jain@gmail.com",
                "country_code": "+91",
                "phone": 369963258,
                "password": "$2a$10$nnwoIZo81Mb98VUo3rEIOeX/8FuW6Sa5dDNbav4KdC6BlSYATXEqW",
                "user_image": "",
                "createdAt": "2020-09-24T10:07:10.506Z",
                "updatedAt": "2020-09-24T10:07:10.506Z",
                "__v": 0
            },
    }
 *
 * @apiErrorExample {json} Error-Example
    HTTP/1.1 400 OK
    {
        "status": "error",
        "api_name": "update_driver",
        "message": "User doesn't exist.",
        "data": {}
    }
*/
    update_driver: async (req, res) => {

        try {

            var user_id = req.params.user_id;

            var username = req.body.username || "";
            var country_code = req.body.country_code;
            var phone = req.body.phone;
            var email = req.body.email;
            var address = req.body.address || "";
            var files = req.body.files || null;

            var errors = [];

            if (address != "") {
                var cordinates = await Geocoder.getLatLongByAddress(address);
                if (!cordinates || cordinates.length == 0) {
                    errors.push({ errField: "address", errText: Messages.INVALID_ADDRESS });
                }
            }

            if (files && files.user_image && Media.getMediaTypeByMimeType(files.user_image.mimetype) != "image") {
                errors.push({ errField: "user_image", errText: Messages.INVALID_IMAGE_FORMAT });
            }

            // return errors
            if (errors.length > 0) {

                // error
                let resMsg = errors.pop().errText;
                Response.send(req, res, 400, resMsg, { errors: errors });

            } else {

                var findPattern = { _id: ObjectID(user_id), is_deleted: 0 }
                let aggregateConditions = [
                    {
                        $match: findPattern,
                    },
                ];
                UserServices.oneRecord(aggregateConditions).then(async userdata => {

                    if (userdata) {

                        var updatePattern = {
                            username: username,
                            phone: phone,
                        };
                        if (address != "") {
                            updatePattern.address = address;
                            updatePattern.geoLocation = {
                                type: "Point",
                                coordinates: [
                                    parseFloat(cordinates[0].longitude),
                                    parseFloat(cordinates[0].latitude)
                                ]
                            }
                        }

                        if (files && files.user_image) {
                            var fileName = await UserServices.updateUserImage(userdata, files.user_image);
                            updatePattern.user_image = fileName;
                        }

                        UserServices.updateRecord(findPattern, updatePattern).then(updatedRes => {

                            // success
                            let resMsg = Messages.USER_UPDATE_SUCCESS;
                            Response.send(req, res, 200, resMsg, updatedRes);

                        }).catch(err => {
                            let resMsg = Validation.getErrorMessage(err);
                            Response.send(req, res, 500, resMsg);
                        });

                    } else {
                        let resMsg = Messages.USER_NOT_EXIST;
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
    /**
 * @api {put} /user_service/admin/drivers/status/:user_id Drivers - Update Status
 * @apiGroup Admin - Driver
 *
 * @apiParam {Number} status Status: 1 | 0
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
        "api_name": "update_status",
        "message": "User status has changed successfully.",
        "data": {}
    }
 *
 * @apiErrorExample {json} Error-Example
    HTTP/1.1 400 OK
    {
        "status": "error",
        "api_name": "update_status",
        "message": "User doesn't exist.",
        "data": {}
    }
*/
    update_status: (req, res) => {

        try {

            var user_id = req.params.user_id;
            var status = req.body.status || "";

            var findPattern = { _id: ObjectID(user_id), is_deleted: 0 }
            let aggregateConditions = [
                {
                    $match: findPattern,
                },
            ];
            UserServices.oneRecord(aggregateConditions).then(userdata => {

                if (userdata != null) {

                    var updatePattern = { is_active: status };
                    if (status == 0) {
                        updatePattern.auth_token = "";
                    }

                    UserServices.updateRecord({ _id: userdata._id }, updatePattern).then(userObjRes => {
                        if (status == 0) {
                            var key = userObjRes.user_role + "_" + userObjRes._id;
                            Redis.hdel(["_auth_tokens", key], function (err, res) {
                                if (err) console.log(err.toString())
                            });
                        }
                        let resMsg = Messages.USER_STATUS_UPDATE_SUCCESS;
                        Response.send(req, res, 200, resMsg);

                    }).catch(err => {
                        let resMsg = Validation.getErrorMessage(err);
                        Response.send(req, res, 500, resMsg);
                    });

                } else {
                    let resMsg = Messages.USER_NOT_EXIST;
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
* @api {put} /user_service/admin/drivers/status/:user_id Drivers - Update Online Status
* @apiGroup Admin - Driver
*
* @apiParam {Number} status Status: 1 | 0
*
* @apiHeaderExample {multipart/form-data} Header-Example
   {
       "Content-Type": "multipart/form-data"
   }
*
* @apiSuccessExample {json} Success-Example
   HTTP/1.1 200 OK
   {
    "message": "User status has updated successfully.",
    "data": {}
}
*
* @apiErrorExample {json} Error-Example
   HTTP/1.1 400 OK
   {
       "status": "error",
       "api_name": "update_status",
       "message": "User doesn't exist.",
       "data": {}
   }
*/
    update_online_status: (req, res) => {

        try {

            var user_id = req.params.user_id;
            var status = req.body.status || "";

            var findPattern = { _id: ObjectID(user_id), is_deleted: 0 }
            let aggregateConditions = [
                {
                    $match: findPattern,
                },
            ];
            UserServices.oneRecord(aggregateConditions).then(userdata => {

                if (userdata != null) {

                    var updatePattern = { online_status: status };

                    UserServices.updateRecord({ _id: userdata._id }, updatePattern).then(userObjRes => {

                        let resMsg = Messages.USER_STATUS_UPDATE_SUCCESS;
                        Response.send(req, res, 200, resMsg);

                    }).catch(err => {
                        let resMsg = Validation.getErrorMessage(err);
                        Response.send(req, res, 500, resMsg);
                    });

                } else {
                    let resMsg = Messages.USER_NOT_EXIST;
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
 * @api {delete} /user_service/admin/drivers/:user_id Drivers - Delete
 * @apiGroup Admin - Driver
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
        "api_name": "delete_driver",
        "message": "User has deleted successfully.",
        "data": {}
    }
 *
 * @apiErrorExample {json} Error-Example
    HTTP/1.1 400 OK
    {
        "status": "error",
        "api_name": "delete_driver",
        "message": "User doesn't exist.",
        "data": {}
    }
*/
    delete_driver: (req, res) => {

        try {

            var user_id = req.params.user_id;

            var findPattern = { _id: ObjectID(user_id), is_deleted: 0 }
            let aggregateConditions = [
                {
                    $match: findPattern,
                },
            ];
            UserServices.oneRecord(aggregateConditions).then(userdata => {

                if (userdata != null) {

                    var updatePattern = {
                        is_deleted: 1,
                        auth_token: ""
                    };

                    UserServices.updateRecord({ _id: userdata._id }, updatePattern).then(userObjRes => {

                        var key = userObjRes.user_role + "_" + userObjRes._id;
                        Redis.hdel(["_auth_tokens", key], function (err, res) {
                            if (err) console.log(err.toString())
                        });

                        let resMsg = Messages.USER_DELETE_SUCCESS;
                        Response.send(req, res, 200, resMsg);

                    }).catch(err => {
                        let resMsg = Validation.getErrorMessage(err);
                        Response.send(req, res, 500, resMsg);
                    });

                } else {
                    let resMsg = Messages.USER_NOT_EXIST;
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
module.exports = DriverController;