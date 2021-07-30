"use strict";

const _ = require('lodash');
const config = require('../../config');
const { AdminServices, PermissionServices } = require('../../services');
const { Response, Messages, Media, Validation, Encryption,Redis } = require('../../helpers');


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const Subadmin = {
    /**
     * @api {get} /user_service/admin/subadmins/permissions Subadmins - Permissions
     * @apiGroup Admin - Subadmin
     *
     * @apiHeaderExample {multipart/form-data} Header-Example
        {
            "Content-Type": "multipart/form-data"
        }
     *
     * @apiSuccessExample {json} Success-Example
        HTTP/1.1 200 OK
        {
            "status": "success",isFileTypeImage
            "api_name": "/subadmins/permissions",
            "message": "Success",
            "data": {
                "permissionsData": [
                    {
                        "permissions": [
                            {
                                "title": "Delete",
                                "slug": "delete"
                            }
                        ],
                        "_id": "5f1934023e007bce3ee78c5b",
                        "module_name": "Users",
                        "module_slug": "users"
                    }
                ]
            }
        }
     *
     * @apiErrorExample {json} Error-Example
        HTTP/1.1 400 OK
        {
            "status": "error",
            "api_name": "get_permissions",
            "message": "Error",
            "data": {}
        }
    */
    getPermissions: (req, res) => {

        try {

            var sortPattern = { display_order:1 };
            var findPattern = {};
            PermissionServices.getAllRecords(findPattern,sortPattern).then(permissionsData => {

                // success
                let resMsg = "Success";
                Response.send(req, res, 200, resMsg, {
                    permissionsData: permissionsData
                });

            }).catch(err => {
                let resMsg = Validation.getErrorMessage(err);
                Response.send(req, res, 500, resMsg);
            });

        } catch (err) {
            Response.send(req, res, 500, err.message);
        }
    },

    /**
     * @api {get} /user_service/admin/subadmins/get_subadmins Subadmins - Listing
     * @apiGroup Admin - Subadmin
     *
     * @apiHeaderExample {multipart/form-data} Header-Example
        {
            "Content-Type": "multipart/form-data"
        }
     *
     * @apiParam {String} page_no Page No.
     * @apiParam {String} keyword Search Keyword
     * @apiParam {String} status Status
     *
     * @apiSuccessExample {json} Success-Example
        HTTP/1.1 200 OK
       {
    "status": "success",
    "api_name": "/subadmins/get_subadmins",
    "message": "Success",
    "data": {
        "docs": [
            {
                "_id": "5f86d72d680d7021ac2d0250",
                "is_active": 1,
                "is_deleted": 0,
                "username": "Sub admin 1",
                "email": "subadmin01@gmail.com",
                "phone_no": 9865986531,
                "password": "$2a$10$XYAsMLEG2ElvFRcos09.CO0KzId/n.3zqDg5qIXEf6hL7sgnrYJUG",
                "user_permissions": "{}",
                "createdAt": "2020-10-14T10:47:09.300Z"
            },
        ],
        "totalDocs": 2,
        "limit": 10,
        "page": 1,
        "totalPages": 1,
        "pagingCounter": 1,
        "hasPrevPage": false,
        "hasNextPage": false,
        "prevPage": null,
        "nextPage": null
    }
}
     *
     * @apiErrorExample {json} Error-Example
        HTTP/1.1 400 OK
        {
            "status": "error",
            "api_name": "/subadmins/get_subadmins",
            "message": "Error.",
            "data": {}
        }
    */
    getSubadmins: (req, res) => {

        try {

            var keyword = req.query.keyword || "";
            var status = req.query.status;
            var page = parseInt(req.query.page_no) || 1;
            var limit = parseInt(req.query.limit) || 10;

            var findPattern = { user_role: 2, is_deleted: 0 };

            if (keyword && keyword != "") {
                findPattern["$or"] = [
                    { 'username': { $regex: keyword, $options: "i" } },
                    { 'email': { $regex: keyword, $options: "i" } },
                    { 'phone_no': { $regex: keyword, $options: "i" } }
                ];
            }

            if (status && status != "") {
                findPattern.is_active = parseInt(status);
            }

            var sortPattern = { createdAt: -1 };

            AdminServices.getPaginatedAdminsData(findPattern, sortPattern, page, limit).then(userdata => {

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
     * @api {post} /user_service/admin/subadmins/create_subadmin Subadmins - Create
     * @apiGroup Admin - Subadmin
     *
     * @apiHeaderExample {multipart/form-data} Header-Example
        {
            "Content-Type": "multipart/form-data"
        }
     *
     * @apiParam {String} username Username
     * @apiParam {String} phone Phone
     * @apiParam {String} email Email
     * @apiParam {String} password Password
     * @apiParam {String} address Address
     * @apiParam {Object} user_image Formdata Image Object
     * @apiParam {String} user_permissions String of JSON Object
     *
     * @apiSuccessExample {json} Success-Example
        HTTP/1.1 200 OK
        {
        "status": "success",
        "api_name": "/subadmins/create_subadmin",
        "message": "Sub admin has created successfully.",
            "data": {
                "auth_token": "",
                "wallet": "0.00",
                "is_active": 1,
                "is_deleted": 0,
                "_id": "5f86d2993425140c203e1208",
                "username": "Sub admin",
                "email": "subadmin@gmail.com",
                "phone_no": 9865986532,
                "user_role": 2,
                "user_image": "1602671257638iStock000004792809Small.jpg",
                "user_permissions": "{}",
                "createdAt": "2020-10-14T10:27:37.633Z",
                "updatedAt": "2020-10-14T10:27:37.643Z",
                "__v": 0,
                "user_image_url": "http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/admins/5f86d2993425140c203e1208/1602671257638iStock000004792809Small.jpg",
                "user_image_thumb_url": "http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/admins/5f86d2993425140c203e1208/thumb_1602671257638iStock000004792809Small.jpg",
                "id": "5f86d2993425140c203e1208"
            }
        }
     *
     * @apiErrorExample {json} Error-Example
        HTTP/1.1 400 OK
        {
            "status": "error",
            "api_name": "create_subadmin",
            "message": "Either Email or Username is already exist.",
            "data": {}
        }
    */
    createSubadmin: (req, res) => {

        try {

            var username = req.body.username || "";
            var phone = req.body.phone || "";
            var email = req.body.email || "";
            var password = req.body.password || "";
            var address = req.body.address || "";
            var warehouse_id = req.body.warehouse_id || "";
            var user_permissions = req.body.user_permissions || "{}";
            var files = req.body.files || null;

            var errors = [];

            if (files && files.user_image && Media.getMediaTypeByMimeType(files.user_image.mimetype) != "image") {
                errors.push({ errField: "user_image", errText: Messages.INVALID_IMAGE_FORMAT });
            }

            // return errors
            if (errors.length > 0) {

                let resMsg = errors.pop().errText;
                Response.send(req, res, 400, resMsg, { errors: errors });

            } else {

                var savePattern = {
                    username: username,
                    email: email,
                    phone_no: phone,
                    user_role: 2,
                    password: password ? Encryption.getBcryptEncryption(password) : "",
                    user_image: "",
                    address: address,
                    warehouse_id:warehouse_id,
                    user_permissions: user_permissions,
                    auth_token: "",
                    is_active: 1,
                    is_deleted: 0,
                }

                AdminServices.createRecord(savePattern).then(async createRes => {

                    var findPattern = { _id: createRes._id };
                    var updatePattern = {};

                    if (files && files.user_image) {
                        var fileName = await AdminServices.updateUserImage(createRes, files.user_image);
                        updatePattern.user_image = fileName;
                    }

                    AdminServices.updateRecord(findPattern, updatePattern).then(updatedRes => {

                        // success
                        let resMsg = Messages.SUBADMIN_CREATE_SUCCESS;
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

        } catch (err) {
            Response.send(req, res, 500, err.message);
        }
    },

    /**
     * @api {get} /user_service/admin/subadmins/get_subadmin/:subadmin_id Subadmins - Get Single
     * @apiGroup Admin - Subadmin
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
            "api_name": "/subadmins/5f192da347132e3ed5a4420e",
            "message": "Success",
            "data": {
                "_id": "5f192da347132e3ed5a4420e",
                "username": "rajesh",
                "first_name": "Rajesh",
                "last_name": "Kumar",
                "email": "rajesh11@mailinator.com",
                "phone": "87678687688",
                "user_role": "subadmin",
                "password": "$2a$10$sDbgglPMaqOb33GlFKMd8eHuMOcFmTxFidDgvsAU./TnpCcbNkyUm",
                "user_image": "http://localhost:3031/uploads/admins/5f192da347132e3ed5a4420e/1595485603032sampleprofilepic.png",
                "user_permissions": "{}",
                "address": "",
                "auth_token": "",
                "is_active": 1,
                "is_deleted": 0,
                "createdAt": "2020-07-23T06:26:43.028Z",
                "updatedAt": "2020-07-23T06:26:43.036Z",
                "__v": 0
            }
        }
     *
     * @apiErrorExample {json} Error-Example
        HTTP/1.1 400 OK
        {
            "status": "error",
            "api_name": "get_subadmin",
            "message": "Admin doesn't exist.",
            "data": {}
        }
    */
    getSubadmin: (req, res) => {

        try {

            var subadmin_id = req.params.subadmin_id;

            var findPattern = { _id: subadmin_id, is_deleted: 0 }

            AdminServices.getAdminData(findPattern).then(userdata => {

                if (userdata) {

                    let resMsg = "Success";
                    Response.send(req, res, 200, resMsg, userdata);

                } else {
                    let resMsg = Messages.ADMIN_NOT_EXIST;
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
     * @api {put} /user_service/admin/subadmins/update_subadmin/:subadmin_id Subadmins - Update
     * @apiGroup Admin - Subadmin
     *
     * @apiHeaderExample {multipart/form-data} Header-Example
        {
            "Content-Type": "multipart/form-data"
        }
     *
     * @apiParam {String} username Username
     * @apiParam {String} phone Phone
     * @apiParam {String} email Email
     * @apiParam {String} address Address
     * @apiParam {Object} user_image Formdata Image Object
     * @apiParam {String} user_permissions String of JSON Object
     *
     * @apiSuccessExample {json} Success-Example
        HTTP/1.1 200 OK
        {
            "status": "success",
            "api_name": "/subadmins/update_subadmin/5f192da347132e3ed5a4420e",
            "message": "Sub admin details has updated successfully.",
            "data": {
                "_id": "5f192da347132e3ed5a4420e",
                "username": "rajesh12",
                "first_name": "",
                "last_name": "",
                "email": "rajesh12@mailinator.com",
                "phone": "8767868761",
                "user_role": "subadmin",
                "password": "$2a$10$sDbgglPMaqOb33GlFKMd8eHuMOcFmTxFidDgvsAU./TnpCcbNkyUm",
                "user_image": "http://localhost:3031/uploads/admins/5f192da347132e3ed5a4420e/1595485603032sampleprofilepic.png",
                "address": "",
                "user_permissions": "{}",
                "auth_token": "",
                "is_active": 1,
                "is_deleted": 0,
                "createdAt": "2020-07-23T06:26:43.028Z",
                "updatedAt": "2020-07-23T06:39:41.269Z",
                "__v": 0
            }
        }
     *
     * @apiErrorExample {json} Error-Example
        HTTP/1.1 400 OK
        {
            "status": "error",
            "api_name": "/subadmins/update_subadmin/5f192da347132e3ed5a4420e",
            "message": "Sub admin doesn't exist.",
            "data": {}
        }
    */
    updateSubadmin: (req, res) => {

        try {

            var subadmin_id = req.params.subadmin_id;

            var username = req.body.username || "";
            var phone = req.body.phone || "";
            var email = req.body.email || "";
            var address = req.body.address || "";
            var warehouse_id = req.body.warehouse_id || "";
            var user_permissions = req.body.user_permissions || "{}";
            var files = req.body.files || null;

            var errors = [];

            if (files && files.user_image && Media.getMediaTypeByMimeType(files.user_image.mimetype) != "image") {
                errors.push({ errField: "user_image", errText: Messages.INVALID_IMAGE_FORMAT });
            }

            // return errors
            if (errors.length > 0) {
                let resMsg = errors.pop().errText;
                Response.send(req, res, 400, resMsg, { errors: errors });

            } else {

                var findPattern = { _id: subadmin_id, is_deleted: 0 }

                AdminServices.oneRecord(findPattern).then(async userdata => {

                    if (userdata != null) {

                        var updatePattern = {
                            username: username,
                            email: email,
                            phone_no: phone,
                            address: address,
                            warehouse_id:warehouse_id,
                            user_permissions: user_permissions,
                        }

                        if (files && files.user_image) {
                            var fileName = await AdminServices.updateUserImage(userdata, files.user_image);
                            updatePattern.user_image = fileName;
                        }

                        AdminServices.updateRecord(findPattern, updatePattern).then(updatedRes => {

                            // success
                            var key = updatedRes.user_role + "_" + updatedRes._id;
                            Redis.hdel(["_auth_tokens", key], function (err, res) {
                                if (err) console.log(err.toString())
                            });

                            let resMsg = Messages.SUBADMIN_UPDATE_SUCCESS;
                            Response.send(req, res, 200, resMsg, updatedRes);

                        }).catch(err => {
                            let resMsg = Validation.getErrorMessage(err);
                            Response.send(req, res, 500, resMsg);
                        });

                    } else {
                        let resMsg = Messages.SUBADMIN_NOT_EXIST;
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
     * @api {put} /user_service/admin/subadmins/update_status/:subadmin_id Subadmins - Update Status
     * @apiGroup Admin - Subadmin
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
            "message": "Sub admin status has changed successfully.",
            "data": {}
        }
     *
     * @apiErrorExample {json} Error-Example
        HTTP/1.1 400 OK
        {
            "status": "error",
            "api_name": "update_status",
            "message": "Sub admin doesn't exist.",
            "data": {}
        }
    */
    updateSubadminStatus: (req, res) => {

        try {

            var subadmin_id = req.params.subadmin_id;
            var status = req.body.status || "";

            var checkPattern = { _id: subadmin_id, is_deleted: 0 }

            AdminServices.oneRecord(checkPattern).then(userdata => {

                if (userdata != null) {

                    var updatePattern = { is_active: status };
                    if (status == 0) {
                        updatePattern.auth_token = "";
                    }

                    AdminServices.updateRecord({ _id: userdata._id }, updatePattern).then(adminObjRes => {

                        if (status == 0) {

                            var key = adminObjRes.user_role + "_" + adminObjRes._id;
                            Redis.hdel(["_auth_tokens", key], function (err, res) {
                                if (err) console.log(err.toString())
                            });
                        }
                        // Success
                        let resMsg = Messages.SUBADMIN_STATUS_UPDATE_SUCCESS;
                        Response.send(req, res, 200, resMsg);

                    }).catch(err => {
                        let resMsg = Validation.getErrorMessage(err);
                        Response.send(req, res, 500, resMsg);
                    });

                } else {
                    let resMsg = Messages.SUBADMIN_NOT_EXIST;
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
     * @api {delete} /user_service/admin/subadmins/delete_subadmin/:subadmin_id Subadmins - Delete
     * @apiGroup Admin - Subadmin
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
            "api_name": "delete_subadmin",
            "message": "Sub admin has deleted successfully.",
            "data": {}
        }
     *
     * @apiErrorExample {json} Error-Example
        HTTP/1.1 400 OK
        {
            "status": "error",
            "api_name": "delete_subadmin",
            "message": "Sub admin doesn't exist.",
            "data": {}
        }
    */
    deleteSubadmin: (req, res) => {

        try {

            var subadmin_id = req.params.subadmin_id;

            var checkPattern = { _id: subadmin_id, is_deleted: 0 }

            AdminServices.oneRecord(checkPattern).then(userdata => {

                if (userdata != null) {

                    var updatePattern = {
                        is_deleted: 1,
                        auth_token: ""
                    };

                    AdminServices.updateRecord({ _id: userdata._id }, updatePattern).then(adminObjRes => {

                        var key = adminObjRes.user_role + "_" + adminObjRes._id;
                        Redis.hdel(["_auth_tokens", key], function (err, res) {
                            if (err) console.log(err.toString())
                        });
                        // success
                        let resMsg = Messages.SUBADMIN_DELETE_SUCCESS;
                        Response.send(req, res, 200, resMsg);

                    }).catch(err => {
                        let resMsg = Validation.getErrorMessage(err);
                        Response.send(req, res, 500, resMsg);
                    });

                } else {
                    let resMsg = Messages.SUBADMIN_NOT_EXIST;
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

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

module.exports = Subadmin;