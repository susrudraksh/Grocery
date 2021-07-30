'use strict';


const _ = require('lodash');
const { BusinessCategoryServices } = require('../../services');
const { Response, Messages, Validation, Media } = require('../../helpers');
const { find } = require('lodash');
const AdminServices = require('../../services/AdminServices');
const { BusinessCategory } = require('../../models');


const BusinessCategoryController = {

    /**
     * @api {get} /user_service/admin/categories Categories - Listing
     * @apiGroup Admin - Business Category
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
    "api_name": "/categories",
    "message": "Success",
    "data": {
        "docs": [
            {
                "is_active": 1,
                "is_deleted": 0,
                "_id": "5f731c3efae7b5304ce6ae78",
                "name": "Home essentials",
                "cancelation_time": 45,
                "return_time": 30,
                "createdAt": "2020-09-29T11:36:30.589Z",
                "updatedAt": "2020-09-29T11:36:30.599Z",
                "__v": 0,
                "category_image": "16013793905944e3f421.jpg",
                "category_image_url": "http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/business_category/5f731c3efae7b5304ce6ae78/16013793905944e3f421.jpg",
                "category_image_thumb_url": "http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/business_category/5f731c3efae7b5304ce6ae78/thumb_16013793905944e3f421.jpg",
                "id": "5f731c3efae7b5304ce6ae78"
            },
        ],
        "totalDocs": 4,
        "limit": 10,
        "totalPages": 1,
        "page": 1,
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
            "api_name": "get_users",
            "message": "Login credentials are invalid.",
            "data": {}
        }
    */
    get_business_categories: (req, res) => {

        try {

            var keyword = req.query.keyword || "";
            var status = req.query.status;
            var page = parseInt(req.query.page_no) || 1;
            var limit = parseInt(req.query.limit) || 10;

            var findPattern = {
                is_deleted: 0,
            };

            if (keyword && keyword != "") {
                findPattern["$or"] = [
                    { 'name': { $regex: keyword, $options: "i" } },
                ];
            }

            if (status && status != "") {
                findPattern.is_active = parseInt(status);
            }

            var sortPattern = { order_number: 1 };

            BusinessCategoryServices.getPaginatedData(findPattern, sortPattern, page, limit).then(categorydata => {

                let resMsg = "Success";
                Response.send(req, res, 200, resMsg, categorydata);

            }).catch(err => {
                let resMsg = Validation.getErrorMessage(err);
                Response.send(req, res, 500, resMsg);
            });

        } catch (err) {
            Response.send(req, res, 500, err.message);
        }
    },

    /**
     * @api {post} /user_service/admin/category/create_business_category Business Category - Create
     * @apiGroup Admin - Business Category
     *
     * @apiHeaderExample {multipart/form-data} Header-Example
    {
        "Content-Type": "multipart/form-data"
    }
    *
    * @apiParam {String} name Name
    * @apiParam {Number} order_number Order Name
    * @apiParam {Number} cancelation_time Cancelation Time
    * @apiParam {Number} return_time Return Time
    * @apiParam {Object} category_image Formdata Image Object
    *
    * @apiSuccessExample {json} Success-Example
    HTTP/1.1 200 OK
    {
    "status": "success",
    "api_name": "/category/create_business_category",
    "message": "Business category has created successfully.",
    "data": {
        "is_active": 1,
        "is_deleted": 0,
        "_id": "5f7316ddb038fe182482a154",
        "name": "Grocery",
        "order_number": 1,
        "cancelation_time": 45,
        "return_time": 30,
        "createdAt": "2020-09-29T11:13:33.649Z",
        "updatedAt": "2020-09-29T11:13:33.649Z",
        "__v": 0,
        "user_image_url": "http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/business_category/5f7316ddb038fe182482a154/undefined",
        "user_image_thumb_url": "http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/business_category/5f7316ddb038fe182482a154/thumb_undefined",
        "id": "5f7316ddb038fe182482a154"
    }
    }
    *
    * @apiErrorExample {json} Error-Example
    HTTP/1.1 400 OK
    {
    "status": "error",
    "api_name": "/users/create_user",
    "message": "You are already registered with this phone number.",
    "data": {}
    }
    */
    create_business_category: async (req, res) => {

        try {

            var name = req.body.name || "";
            var order_number = req.body.order_number || "";
            var cancelation_time = req.body.cancelation_time || "";
            var return_time = req.body.return_time || "";
            var files = req.body.files || null;

            var errors = [];

            if (files && files.category_image && Media.getMediaTypeByMimeType(files.category_image.mimetype) != "image") {
                errors.push({ errField: "category_image", errText: Messages.INVALID_IMAGE_FORMAT });
            }

            // return errors
            if (errors.length > 0) {
                let resMsg = errors.pop().errText;
                Response.send(req, res, 400, resMsg, { errors: errors });

            } else {

                var createPattern = {
                    name: name,
                    order_number: order_number,
                    cancelation_time: cancelation_time,
                    return_time: return_time,
                    is_active: 1,
                    is_deleted: 0,
                };

                BusinessCategoryServices.createRecord(createPattern).then(async createRes => {

                    var findPattern = { _id: createRes._id };
                    var updatePattern = {};

                    if (files && files.category_image) {
                        var fileName = await BusinessCategoryServices.updateUserImage(createRes, files.category_image);
                        updatePattern.category_image = fileName;
                    }

                    BusinessCategoryServices.updateRecord(findPattern, updatePattern).then(updatedRes => {

                        // success
                        let resMsg = Messages.BUSINESS_CATEGORY_CREATE_SUCCESS;
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
     * @api {get} /user_service/admin/category/get_business_category/:business_id Business Category - Get Single
     * @apiGroup Admin - Business Category
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
    "api_name": "/category/get_business_category/5f731c3efae7b5304ce6ae78",
    "message": "Success",
    "data": {
        "is_active": 1,
        "is_deleted": 0,
        "_id": "5f731c3efae7b5304ce6ae78",
        "name": "Home essentials",
        "cancelation_time": 45,
        "return_time": 30,
        "createdAt": "2020-09-29T11:36:30.589Z",
        "updatedAt": "2020-09-29T11:36:30.599Z",
        "__v": 0,
        "category_image": "16013793905944e3f421.jpg",
        "category_image_url": "http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/business_category/5f731c3efae7b5304ce6ae78/16013793905944e3f421.jpg",
        "category_image_thumb_url": "http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/business_category/5f731c3efae7b5304ce6ae78/thumb_16013793905944e3f421.jpg",
        "id": "5f731c3efae7b5304ce6ae78"
    }
    }
    *
    * @apiErrorExample {json} Error-Example
    HTTP/1.1 400 OK
    {
        "status": "error",
        "api_name": "/category/get_business_category/5f731c3efae7b5304ce6ae78",
        "message": "Business category doesn't exist.",
        "data": {}
    }
    */
    get_business_category: async (req, res) => {

        try {

            var business_cat_id = req.params.business_id;

            var findPattern = { _id: business_cat_id, is_deleted: 0 }

            BusinessCategoryServices.oneRecord(findPattern).then(categorydata => {

                if (categorydata) {

                    let resMsg = "Success";
                    Response.send(req, res, 200, resMsg, categorydata);

                } else {
                    let resMsg = Messages.BUSINESS_CATEGORY_NOT_EXIST;
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
     * @api {put} /user_service/admin/category/update_business_category/:business_id Business Category - Update
     * @apiGroup Admin - Business Category
     *
     * @apiHeaderExample {multipart/form-data} Header-Example
    {
        "Content-Type": "multipart/form-data"
    }
    *
    * @apiParam {String} name Name
    * @apiParam {Number} order_number Order Name
    * @apiParam {Number} cancelation_time Cancelation Time
    * @apiParam {Number} return_time Return Time
    * @apiParam {Object} category_image Formdata Image Object
    *
    * @apiSuccessExample {json} Success-Example
    HTTP/1.1 200 OK
    {
    "status": "success",
    "api_name": "/category/update_business_category/5f731c3efae7b5304ce6ae78",
    "message": "Business category details has updated successfully.",
    "data": {
        "is_active": 1,
        "is_deleted": 0,
        "_id": "5f731c3efae7b5304ce6ae78",
        "name": "Home essentialsss",
        "oder_number": 1,
        "cancelation_time": 40,
        "return_time": 35,
        "createdAt": "2020-09-29T11:36:30.589Z",
        "updatedAt": "2020-09-29T12:29:49.100Z",
        "__v": 0,
        "category_image": "16013793905944e3f421.jpg",
        "category_image_url": "http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/business_category/5f731c3efae7b5304ce6ae78/16013793905944e3f421.jpg",
        "category_image_thumb_url": "http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/business_category/5f731c3efae7b5304ce6ae78/thumb_16013793905944e3f421.jpg",
        "id": "5f731c3efae7b5304ce6ae78"
    }
    }
    *
    * @apiErrorExample {json} Error-Example
    HTTP/1.1 400 OK
    {
        "status": "error",
        "api_name": "/category/update_business_category/5f731c3efae7b5304ce6ae78",
        "message": "Buisness category doesn't exist.",
        "data": {}
    }
    */
    update_business_category: async (req, res) => {

        try {
            var business_cat_id = req.params.business_id;

            var name = req.body.name || "";
            var order_number = req.body.order_number || "";
            var cancelation_time = req.body.cancelation_time || "";
            var return_time = req.body.return_time || "";
            var files = req.body.files || null;

            var errors = [];

            if (files && files.category_image && Media.getMediaTypeByMimeType(files.category_image.mimetype) != "image") {
                errors.push({ errField: "category_image", errText: Messages.INVALID_IMAGE_FORMAT });
            }

            // return errors
            if (errors.length > 0) {

                // error
                let resMsg = errors.pop().errText;
                Response.send(req, res, 400, resMsg, { errors: errors });

            } else {

                var findPattern = { _id: business_cat_id, is_deleted: 0 }

                BusinessCategoryServices.oneRecord(findPattern).then(async categorydata => {

                    if (categorydata) {

                        var updatePattern = {
                            name: name,
                            order_number: order_number,
                            cancelation_time: cancelation_time,
                            return_time: return_time,
                        };

                        if (files && files.category_image) {
                            var fileName = await BusinessCategoryServices.updateUserImage(categorydata, files.category_image);
                            updatePattern.category_image = fileName;
                        }

                        BusinessCategoryServices.updateRecord(findPattern, updatePattern).then(updatedRes => {

                            // success
                            let resMsg = Messages.BUSINESS_CATEGORY_UPDATE_SUCCESS;
                            Response.send(req, res, 200, resMsg, updatedRes);

                        }).catch(err => {
                            let resMsg = Validation.getErrorMessage(err);
                            Response.send(req, res, 500, resMsg);
                        });

                    } else {
                        let resMsg = Messages.BUSINESS_CATEGORY_NOT_EXIST;
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
    * @api {put} /user_service/admin/category/update_status/:business_id Business Category - Update Status
    * @apiGroup Admin - Business Category
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
    "api_name": "/category/update_status/5f731c3efae7b5304ce6ae78",
    "message": "Business category status has updated successfully.",
    "data": {}
    }
    *
    * @apiErrorExample {json} Error-Example
    HTTP/1.1 400 OK
    {
        "status": "error",
        "api_name": "/category/update_status/5f731c3efae7b5304ce6ae78",
        "message": "Business category doesn't exist.",
        "data": {}
    }
    */
    update_status: (req, res) => {

        try {

            var business_cat_id = req.params.business_id;
            var status = req.body.status || "";

            var findPattern = { _id: business_cat_id, is_deleted: 0 }

            BusinessCategoryServices.oneRecord(findPattern).then(categorydata => {

                if (categorydata != null) {

                    var updatePattern = { is_active: status };

                    BusinessCategoryServices.updateRecord({ _id: categorydata._id }, updatePattern).then(userObjRes => {

                        let resMsg = Messages.BUSINESS_CATEGORY_STATUS_UPDATE_SUCCESS;
                        Response.send(req, res, 200, resMsg);

                    }).catch(err => {
                        let resMsg = Validation.getErrorMessage(err);
                        Response.send(req, res, 500, resMsg);
                    });

                } else {
                    let resMsg = Messages.BUSINESS_CATEGORY_NOT_EXIST;
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
     * @api {delete} /user_service/admin/category/delete_business_category/:business_id Business Category - Delete
     * @apiGroup Admin - Business Category
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
    "api_name": "/category/delete_business_category/5f731c3efae7b5304ce6ae78",
    "message": "Business category has deleted successfully.",
    "data": {}
    }
        *
        * @apiErrorExample {json} Error-Example
        HTTP/1.1 400 OK
        {
            "status": "error",
            "api_name": "/category/delete_business_category/5f731c3efae7b5304ce6ae78",
            "message": "Business category doesn't exist.",
            "data": {}
        }
    */
    delete_business_category: (req, res) => {

        try {

            var business_cat_id = req.params.business_id;

            var findPattern = { _id: business_cat_id, is_deleted: 0 }

            BusinessCategoryServices.oneRecord(findPattern).then(categorydata => {

                if (categorydata != null) {

                    var updatePattern = {
                        is_deleted: 1,
                    };

                    BusinessCategoryServices.updateRecord({ _id: categorydata._id }, updatePattern).then(userObjRes => {

                        let resMsg = Messages.BUSINESS_CATEGORY_DELETE_SUCCESS;
                        Response.send(req, res, 200, resMsg);

                    }).catch(err => {
                        let resMsg = Validation.getErrorMessage(err);
                        Response.send(req, res, 500, resMsg);
                    });

                } else {
                    let resMsg = Messages.BUSINESS_CATEGORY_NOT_EXIST;
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
module.exports = BusinessCategoryController;