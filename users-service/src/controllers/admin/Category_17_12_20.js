'use strict';


const _ = require('lodash');
const { CategoryServices } = require('../../services');
const { Response, Messages, Validation, Media } = require('../../helpers');
const Category = require('../../models/Category');


const CategoryController = {

    /**
     * @api {get} /user_service/product_category/get_categories Product Categories - Listing
     * @apiGroup Admin - Product Category
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
    "api_name": "/product_category/get_categories",
    "message": "Success",
    "data": {
    "docs": [
    {
    "parent_id": 0,
    "is_active": 1,
    "is_deleted": 0,
    "_id": "5f744d2ea1bd7f352c619577",
    "name": "Fashion",
    "business_category_id": "5f73158c500ead10f8fcdca1",
    "createdAt": "2020-09-30T09:17:34.761Z",
    "updatedAt": "2020-09-30T09:17:34.778Z",
    "__v": 0,
    "image_path": "16014574547667218af6.jpg",
    "image_path_url": "http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/category/5f744d2ea1bd7f352c619577/16014574547667218af6.jpg",
    "image_path_thumb_url": "http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/category/5f744d2ea1bd7f352c619577/thumb_16014574547667218af6.jpg",
    "id": "5f744d2ea1bd7f352c619577"
    },
    ],
    "totalDocs": 2,
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
    "api_name": "/product_category/get_categories",
    "message": "error.",
    "data": {}
    }
    */
    get_categories: (req, res) => {

        try {

            var keyword = req.query.keyword || "";
            var status = req.query.status;
            var page = parseInt(req.query.page_no) || 1;
            var limit = parseInt(req.query.limit) || 10;

            var findPattern = { 'is_deleted': 0, 'parent_id' : "" };

            if (keyword && keyword != "") {
                findPattern["$or"] = [
                    { 'name': { $regex: keyword, $options: "i" } },
                ];
            }

            if (status && status != "") {
                findPattern.is_active = parseInt(status);
            }
            var sortPattern = { createdAt: -1 };

            CategoryServices.getPaginatedData(findPattern, sortPattern, page, limit).then(categorydata => {

                let resMsg = "Success";
                Response.send(req, res, 200, resMsg, categorydata);

            }).catch(err => {
                let resMsg = Validation.getErrorMessage(err);
                Response.send(req, res, 500, resMsg);
            });

        } catch (err) {
            Response.send(req, res, 500, err.message)
        }
    },
    /**
     * @api {post} /user_service/admin/product_category/create_category Product Category - Create
     * @apiGroup Admin - Product Category
     *
     * @apiHeaderExample {multipart/form-data} Header-Example
    {
    "Content-Type": "multipart/form-data"
    }
    *
    * @apiParam {String} name Name
    * @apiParam {String} business_category_id Business Category Id
    * @apiParam {Object} image_path Formdata Image Object
    *
    * @apiSuccessExample {json} Success-Example
    HTTP/1.1 200 OK
    {
    "status": "success",
    "api_name": "/product_category/create_category",
    "message": "Category has created successfully.",
    "data": {
    "parent_id": 0,
    "is_active": 1,
    "is_deleted": 0,
    "_id": "5f7428a688444b3074ce512a",
    "name": "Bills",
    "business_category_id": "5f73158c500ead10f8fcdca1",
    "createdAt": "2020-09-30T06:41:42.475Z",
    "updatedAt": "2020-09-30T06:41:42.503Z",
    "__v": 0,
    "image_path": "16014481024972aae1d6.jpg",
    "image_path_url": "http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/category/5f7428a688444b3074ce512a/16014481024972aae1d6.jpg",
    "image_path_thumb_url": "http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/category/5f7428a688444b3074ce512a/thumb_16014481024972aae1d6.jpg",
    "id": "5f7428a688444b3074ce512a"
    }
    }
    *
    * @apiErrorExample {json} Error-Example
    HTTP/1.1 400 OK
    {
    "status": "error",
    "api_name": "/product_category/create_category",
    "message": "Error",
    "data": {}
    }
    */
    create_category: async (req, res) => {

        try {

            var name = req.body.name || "";
            var business_category_id = req.body.business_category_id || "";
            var files = req.body.files || null;

            var errors = [];

            if (files && files.image_path && Media.getMediaTypeByMimeType(files.image_path.mimetype) != "image") {
                errors.push({ errField: "image_path", errText: Messages.INVALID_IMAGE_FORMAT });
            }

            // return errors
            if (errors.length > 0) {
                let resMsg = errors.pop().errText;
                Response.send(req, res, 400, resMsg, { errors: errors });

            } else {

                var createPattern = {
                    name: name,
                    business_category_id: business_category_id,
                    is_active: 1,
                    is_deleted: 0,
                };

                CategoryServices.createRecord(createPattern).then(async createRes => {

                    var findPattern = { _id: createRes._id };
                    var updatePattern = {};

                    if (files && files.image_path) {
                        var fileName = await CategoryServices.updateUserImage(createRes, files.image_path);
                        updatePattern.image_path = fileName;
                    }
                    CategoryServices.updateRecord(findPattern, updatePattern).then(updatedRes => {
                        // success
                        let resMsg = Messages.CATEGORY_CREATE_SUCCESS;
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
            Response.send(req, res, 500,  err.message);
        }
    },
    /**
     * @api {get} /user_service/admin/product_category/get_category/:category_id Product Category - Get Single
     * @apiGroup Admin - Product Category
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
    "api_name": "/product_category/get_category/5f744d2ea1bd7f352c619577",
    "message": "Success",
    "data": {
        "parent_id": 0,
        "is_active": 1,
        "is_deleted": 0,
        "_id": "5f744d2ea1bd7f352c619577",
        "name": "Fashion",
        "business_category_id": "5f73158c500ead10f8fcdca1",
        "createdAt": "2020-09-30T09:17:34.761Z",
        "updatedAt": "2020-09-30T09:17:34.778Z",
        "__v": 0,
        "image_path": "16014574547667218af6.jpg",
        "image_path_url": "http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/category/5f744d2ea1bd7f352c619577/16014574547667218af6.jpg",
        "image_path_thumb_url": "http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/category/5f744d2ea1bd7f352c619577/thumb_16014574547667218af6.jpg",
        "id": "5f744d2ea1bd7f352c619577"
    }
}
    *
    * @apiErrorExample {json} Error-Example
    HTTP/1.1 400 OK
    {
    "status": "error",
    "api_name": "/product_category/get_category/5f744d2ea1bd7f352c619577",
    "message": "Category doesn't exist.",
    "data": {}
    }
    */
    get_category: async (req, res) => {

        try {

            var category_id = req.params.category_id;

            var findPattern = { _id: category_id, is_deleted: 0 }

            CategoryServices.oneRecord(findPattern).then(categorydata => {

                if (categorydata) {

                    let resMsg = "Success";
                    Response.send(req, res, 200, resMsg, categorydata);

                } else {
                    let resMsg = Messages.CATEGORY_NOT_EXIST;
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
 * @api {put} /user_service/admin/product_category/update_category/:category_id Product Category - Update
 * @apiGroup Admin - Product Category
 *
 * @apiHeaderExample {multipart/form-data} Header-Example
{
    "Content-Type": "multipart/form-data"
}
*
* @apiParam {String} name Name
* @apiParam {String} business_category_id Business Category Id
* @apiParam {Object} image_path Formdata Image Object
*
* @apiSuccessExample {json} Success-Example
HTTP/1.1 200 OK
{
    "status": "success",
    "api_name": "/product_category/update_category/5f744d2ea1bd7f352c619577",
    "message": "Category details has updated successfully.",
    "data": {
        "parent_id": 0,
        "is_active": 1,
        "is_deleted": 0,
        "_id": "5f744d2ea1bd7f352c619577",
        "name": "Fashionsss",
        "business_category_id": "5f73158c500ead10f8fcdca1",
        "createdAt": "2020-09-30T09:17:34.761Z",
        "updatedAt": "2020-09-30T10:04:53.071Z",
        "__v": 0,
        "image_path": "16014602930669dcc9e6.png",
        "image_path_url": "http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/category/5f744d2ea1bd7f352c619577/16014602930669dcc9e6.png",
        "image_path_thumb_url": "http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/category/5f744d2ea1bd7f352c619577/thumb_16014602930669dcc9e6.png",
        "id": "5f744d2ea1bd7f352c619577"
    }
}
*
* @apiErrorExample {json} Error-Example
HTTP/1.1 400 OK
{
    "status": "error",
    "api_name": "/product_category/update_business_category/5f731c3efae7b5304ce6ae78",
    "message": "Category doesn't exist.",
    "data": {}
}
*/
    update_category: async (req, res) => {

        try {

            var category_id = req.params.category_id;

            var name = req.body.name || "";
            var business_category_id = req.body.business_category_id || "";
            var files = req.body.files || null;

            var errors = [];

            if (files && files.image_path && Media.getMediaTypeByMimeType(files.image_path.mimetype) != "image") {
                errors.push({ errField: "image_path", errText: Messages.INVALID_IMAGE_FORMAT });
            }

            // return errors
            if (errors.length > 0) {

                // error
                let resMsg = errors.pop().errText;
                Response.send(req, res, 400, resMsg, { errors: errors });

            } else {

                var findPattern = { _id: category_id, is_deleted: 0 }

                CategoryServices.oneRecord(findPattern).then(async categorydata => {

                    if (categorydata) {

                        var updatePattern = {
                            name: name,
                            business_category_id: business_category_id,
                        };

                        if (files && files.image_path) {
                            var fileName = await CategoryServices.updateUserImage(categorydata, files.image_path);
                            updatePattern.image_path = fileName;
                        }

                        CategoryServices.updateRecord(findPattern, updatePattern).then(updatedRes => {

                            // success
                            let resMsg = Messages.CATEGORY_UPDATE_SUCCESS;
                            Response.send(req, res, 200, resMsg, updatedRes);

                        }).catch(err => {
                            let resMsg = Validation.getErrorMessage(err);
                            Response.send(req, res, 500, resMsg);
                        });

                    } else {
                        let resMsg = Messages.CATEGORY_NOT_EXIST;
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
* @api {put} /user_service/admin/product_category/status/:category_id Product Category - Update Status
* @apiGroup Admin - Product Category
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
    "api_name": "/product_category/status/5f7428a688444b3074ce512a",
    "message": "Category status has updated successfully.",
    "data": {}
}
*
* @apiErrorExample {json} Error-Example
HTTP/1.1 400 OK
{
    "status": "error",
    "api_name": "/product_category/update_status/5f731c3efae7b5304ce6ae78",
    "message": "Category doesn't exist.",
    "data": {}
}
*/
    update_status: (req, res) => {

        try {

            var category_id = req.params.category_id;
            var status = req.body.status || "";

            var findPattern = { _id: category_id, is_deleted: 0 }

            CategoryServices.oneRecord(findPattern).then(categorydata => {

                if (categorydata != null) {

                    var updatePattern = { is_active: status };

                    CategoryServices.updateRecord({ _id: categorydata._id }, updatePattern).then(userObjRes => {

                        let resMsg = Messages.CATEGORY_STATUS_UPDATE_SUCCESS;
                        Response.send(req, res, 200, resMsg);

                    }).catch(err => {
                        let resMsg = Validation.getErrorMessage(err);
                        Response.send(req, res, 500, resMsg);
                    });

                } else {
                    let resMsg = Messages.CATEGORY_NOT_EXIST;
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
 * @api {delete} /user_service/admin/product_category/delete_category/:category_id Product Category - Delete
 * @apiGroup Admin - Product Category
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
    "api_name": "/product_category/delete_category/5f744d2ea1bd7f352c619577",
    "message": "Category has deleted successfully.",
    "data": {}
}
    *
    * @apiErrorExample {json} Error-Example
    HTTP/1.1 400 OK
    {
        "status": "error",
        "api_name": "/product_category/delete_business_category/5f731c3efae7b5304ce6ae78",
        "message": "Category doesn't exist.",
        "data": {}
    }
*/
    delete_category: (req, res) => {

        try {

            var category_id = req.params.category_id;

            var findPattern = { _id: category_id, is_deleted: 0 }

            CategoryServices.oneRecord(findPattern).then(categorydata => {

                if (categorydata != null) {

                    var updatePattern = {
                        is_deleted: 1,
                    };

                    CategoryServices.updateRecord({ _id: categorydata._id }, updatePattern).then(userObjRes => {

                        CategoryServices.updateRecord({ parent_id: userObjRes._id }, updatePattern).then(userObjRes => {

                            let resMsg = Messages.CATEGORY_DELETE_SUCCESS;
                            Response.send(req, res, 200, resMsg);
    
                        }).catch(err => {
                            let resMsg = Validation.getErrorMessage(err);
                            Response.send(req, res, 500, resMsg);
                        });

                    }).catch(err => {
                        let resMsg = Validation.getErrorMessage(err);
                        Response.send(req, res, 500, resMsg);
                    });

                } else {
                    let resMsg = Messages.CATEGORY_NOT_EXIST;
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
module.exports = CategoryController;