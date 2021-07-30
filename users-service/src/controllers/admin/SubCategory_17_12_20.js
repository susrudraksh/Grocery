'use strict';


const _ = require('lodash');
const { CategoryServices } = require('../../services');
const { Response, Messages, Validation, Media } = require('../../helpers');
const Category = require('../../models/Category');


const SubCategoryController = {
    /**
     * @api {get} /user_service/admin/product_sub_category/get_subcategories Product Sub Categories - Listing
     * @apiGroup Admin - Product Sub Category
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
    "api_name": "/product_sub_category/get_subcategories",
    "message": "Success",
    "data": {
    "docs": [
    {
        "parent_id": "5f7569396225c836a868f7e7",
        "is_active": 1,
        "is_deleted": 0,
        "_id": "5f7569b05bbadd2914a19c58",
        "name": "Hand Soap",
        "business_category_id": "5f73158c500ead10f8fcdca1",
        "createdAt": "2020-10-01T05:31:28.414Z",
        "updatedAt": "2020-10-01T05:31:28.435Z",
        "__v": 0,
        "image_path": "16015302884199dcc9e6.png",
        "image_path_url": "http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/category/5f7569b05bbadd2914a19c58/16015302884199dcc9e6.png",
        "image_path_thumb_url": "http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/category/5f7569b05bbadd2914a19c58/thumb_16015302884199dcc9e6.png",
        "id": "5f7569b05bbadd2914a19c58"
    }
    ],
    "totalDocs": 1,
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
    "api_name": "/product_sub_category/get_subcategories",
    "message": "Error",
    "data": {}
    }
    */
    get_subcategories: (req, res) => {

        try {

            var keyword = req.query.keyword || "";
            var status = req.query.status;
            var page = parseInt(req.query.page_no) || 1;
            var limit = parseInt(req.query.limit) || 10;

            var findPattern = {
                is_deleted: 0,
                parent_id: { $ne: "" }
            };

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
            Response.send(req, res, 500, err.message);
        }
    },
    /**
     * @api {post} /user_service/admin/product_sub_category/create_subcategory Product Sub Category - Create
     * @apiGroup Admin - Product Sub Category
     *
     * @apiHeaderExample {multipart/form-data} Header-Example
    {
    "Content-Type": "multipart/form-data"
    }
    *
    * @apiParam {String} name Name
    * @apiParam {String} business_category_id Business Category Id
    * @apiParam {String} category_id  Category Id
    * @apiParam {Object} image_path Formdata Image Object
    *
    * @apiSuccessExample {json} Success-Example
    HTTP/1.1 200 OK
    {
    "status": "success",
    "api_name": "/product_sub_category/create_category",
    "message": "Sub Category has created successfully.",
    "data": {
    "is_active": 1,
    "is_deleted": 0,
    "_id": "5f75679d6b4f8d1114e98fb7",
    "name": "Fashion",
    "business_category_id": "5f73158c500ead10f8fcdca1",
    "parent_id": "5f7428a688444b3074ce512a",
    "createdAt": "2020-10-01T05:22:37.873Z",
    "updatedAt": "2020-10-01T05:22:37.892Z",
    "__v": 0,
    "image_path": "16015297578779dcc9e6.png",
    "image_path_url": "http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/category/5f75679d6b4f8d1114e98fb7/16015297578779dcc9e6.png",
    "image_path_thumb_url": "http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/category/5f75679d6b4f8d1114e98fb7/thumb_16015297578779dcc9e6.png",
    "id": "5f75679d6b4f8d1114e98fb7"
    }
    }
    *
    * @apiErrorExample {json} Error-Example
    HTTP/1.1 400 OK
    {
    "status": "error",
    "api_name": "/product_sub_category/create_category",
    "message": "Error",
    "data": {}
    }
    */
    create_subcategory: async (req, res) => {

        try {

            var name = req.body.name || "";
            var business_category_id = req.body.business_category_id || "";
            var parent_id = req.body.category_id || "";
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
                    parent_id: parent_id,
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
                        let resMsg = Messages.SUB_CATEGORY_CREATE_SUCCESS;
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
 * @api {get} /user_service/admin/product_sub_category/get_subcategory/:subcategory_id Product Sub Category - Get Single
 * @apiGroup Admin - Product Sub Category
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
    "api_name": "/product_sub_category/get_subcategory/5f7569b05bbadd2914a19c58",
    "message": "Success",
    "data": {
        "parent_id": "5f7569396225c836a868f7e7",
        "is_active": 1,
        "is_deleted": 0,
        "_id": "5f7569b05bbadd2914a19c58",
        "name": "Hand Soap",
        "business_category_id": "5f73158c500ead10f8fcdca1",
        "createdAt": "2020-10-01T05:31:28.414Z",
        "updatedAt": "2020-10-01T05:31:28.435Z",
        "__v": 0,
        "image_path": "16015302884199dcc9e6.png",
        "image_path_url": "http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/category/5f7569b05bbadd2914a19c58/16015302884199dcc9e6.png",
        "image_path_thumb_url": "http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/category/5f7569b05bbadd2914a19c58/thumb_16015302884199dcc9e6.png",
        "id": "5f7569b05bbadd2914a19c58"
    }
}
*
* @apiErrorExample {json} Error-Example
HTTP/1.1 400 OK
{
    "status": "error",
    "api_name": "/product_sub_category/get_subcategory/5f7569b05bbadd2914a19c58",
    "message": "Sub category doesn't exist.",
    "data": {}
}
*/
    get_subcategory: async (req, res) => {

        try {

            var subcategory_id = req.params.subcategory_id;

            var findPattern = { _id: subcategory_id, is_deleted: 0 }

            CategoryServices.oneRecord(findPattern).then(categorydata => {

                if (categorydata) {

                    let resMsg = "Success";
                    Response.send(req, res, 200, resMsg, categorydata);

                } else {
                    let resMsg = Messages.SUB_CATEGORY_NOT_EXIST;
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
 * @api {put} /user_service/admin/product_sub_category/update_subcategory/:subcategory_id Product Sub Category - Update
 * @apiGroup Admin - Product Sub Category
 *
 * @apiHeaderExample {multipart/form-data} Header-Example
{
    "Content-Type": "multipart/form-data"
}
*
* @apiParam {String} name Name
* @apiParam {String} business_category_id Business Category Id
* @apiParam {String} category_id  Category Id
* @apiParam {Object} image_path Formdata Image Object
*
* @apiSuccessExample {json} Success-Example
HTTP/1.1 200 OK
{
    "status": "success",
    "api_name": "/product_sub_category/update_subcategory/5f7569396225c836a868f7e7",
    "message": "Sub Category details has updated successfully.",
    "data": {
        "parent_id": "5f7569396225c836a868f7e7",
        "is_active": 1,
        "is_deleted": 0,
        "_id": "5f7569396225c836a868f7e7",
        "name": "Hand Soap",
        "business_category_id": "5f73158c500ead10f8fcdca1",
        "createdAt": "2020-10-01T05:29:29.727Z",
        "updatedAt": "2020-10-01T06:07:58.848Z",
        "__v": 0,
        "image_path": "16015301697402aae1d6.jpg",
        "image_path_url": "http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/category/5f7569396225c836a868f7e7/16015301697402aae1d6.jpg",
        "image_path_thumb_url": "http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/category/5f7569396225c836a868f7e7/thumb_16015301697402aae1d6.jpg",
        "id": "5f7569396225c836a868f7e7"
    }
}
*
* @apiErrorExample {json} Error-Example
HTTP/1.1 400 OK
{
    "status": "error",
    "api_name": "/product_sub_category/update_subcategory/5f7569396225c836a868f7e7",
    "message": "Sub category doesn't exist.",
    "data": {}
}
*/
    update_subcategory: async (req, res) => {

        try {

            var subcategory_id = req.params.subcategory_id;

            var name = req.body.name || "";
            var business_category_id = req.body.business_category_id || "";
            var parent_id = req.body.category_id || "";
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

                var findPattern = { _id: subcategory_id, is_deleted: 0 }

                CategoryServices.oneRecord(findPattern).then(async categorydata => {
                   
                    if (categorydata) {

                        var updatePattern = {
                            name: name,
                            business_category_id: business_category_id,
                            parent_id: parent_id,
                        };
                   

                        if (files && files.image_path) {
                            var fileName = await CategoryServices.updateUserImage(categorydata, files.image_path);
                            updatePattern.image_path = fileName;
                        }

                        CategoryServices.updateRecord(findPattern, updatePattern).then(updatedRes => {

                            // success
                            let resMsg = Messages.SUB_CATEGORY_UPDATE_SUCCESS;
                            Response.send(req, res, 200, resMsg, updatedRes);

                        }).catch(err => {
                            let resMsg = Validation.getErrorMessage(err);
                            Response.send(req, res, 500, resMsg);
                        });

                    } else {
                        let resMsg = Messages.SUB_CATEGORY_NOT_EXIST;
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
* @api {put} /user_service/admin/product_sub_category/update_status/:subcategory_id Product Sub Category - Update Status
* @apiGroup Admin - Product Sub Category
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
    "api_name": "/product_sub_category/update_status/5f7569b05bbadd2914a19c58",
    "message": "Sub Category status has updated successfully.",
    "data": {}
}
*
* @apiErrorExample {json} Error-Example
HTTP/1.1 400 OK
{
    "status": "error",
     "api_name": "/product_sub_category/update_status/5f7569b05bbadd2914a19c58",
    "message": "Sub category doesn't exist.",
    "data": {}
}
*/
    update_status: (req, res) => {

        try {

            var subcategory_id = req.params.subcategory_id;
            var status = req.body.status || "";

            var findPattern = { _id: subcategory_id, is_deleted: 0 }

            CategoryServices.oneRecord(findPattern).then(categorydata => {

                if (categorydata != null) {

                    var updatePattern = { is_active: status };

                    CategoryServices.updateRecord({ _id: categorydata._id }, updatePattern).then(userObjRes => {

                        let resMsg = Messages.SUB_CATEGORY_STATUS_UPDATE_SUCCESS;
                        Response.send(req, res, 200, resMsg);

                    }).catch(err => {
                        let resMsg = Validation.getErrorMessage(err);
                        Response.send(req, res, 500, resMsg);
                    });

                } else {
                    let resMsg = Messages.SUB_CATEGORY_NOT_EXIST;
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
 * @api {delete} /user_service/admin/product_sub_category/delete_subcategory/:subcategory_id Product Sub Category - Delete
 * @apiGroup Admin - Product Sub Category
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
    "api_name": "/product_sub_category/delete_subcategory/5f7569b05bbadd2914a19c58",
    "message": "Sub Category has deleted successfully.",
    "data": {}
}
    *
    * @apiErrorExample {json} Error-Example
    HTTP/1.1 400 OK
    {
        "status": "error",
        "api_name": "/product_sub_category/delete_subcategory/5f7569b05bbadd2914a19c58",
        "message": "Sub category doesn't exist.",
        "data": {}
    }
*/
delete_subcategory: (req, res) => {

    try {

        var subcategory_id = req.params.subcategory_id;

        var findPattern = { _id: subcategory_id, is_deleted: 0 }

        CategoryServices.oneRecord(findPattern).then(categorydata => {

            if (categorydata != null) {

                var updatePattern = {
                    is_deleted: 1,
                };

                CategoryServices.updateRecord({ _id: categorydata._id }, updatePattern).then(userObjRes => {

                    let resMsg = Messages.SUB_CATEGORY_DELETE_SUCCESS;
                    Response.send(req, res, 200, resMsg);

                }).catch(err => {
                    let resMsg = Validation.getErrorMessage(err);
                    Response.send(req, res, 500, resMsg);
                });

            } else {
                let resMsg = Messages.SUB_CATEGORY_NOT_EXIST;
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
     * @api {get} /user_service/admin/product_sub_category/get_category_by_business/:business_category_id Product Sub Category - Get Business Single
     * @apiGroup Admin - Product Sub Category
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
    "api_name": "/product_sub_category/get_category_by_business/5f73158c500ead10f8fcdca1",
    "message": "Success",
    "data": [
        {
            "parent_id": "",
            "is_active": 1,
            "is_deleted": 0,
            "_id": "5f757787edb15f37b88fe0c0",
            "name": "Fashion",
            "business_category_id": "5f73158c500ead10f8fcdca1",
            "createdAt": "2020-10-01T06:30:31.031Z",
            "updatedAt": "2020-10-01T06:30:31.040Z",
            "__v": 0,
            "image_path": "16015338310352aae1d6.jpg",
            "image_path_url": "http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/category/5f757787edb15f37b88fe0c0/16015338310352aae1d6.jpg",
            "image_path_thumb_url": "http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/category/5f757787edb15f37b88fe0c0/thumb_16015338310352aae1d6.jpg",
            "id": "5f757787edb15f37b88fe0c0"
        }
    ]
}
    *
    * @apiErrorExample {json} Error-Example
    HTTP/1.1 400 OK
    {
    "status": "error",
    "api_name": "/product_sub_category/get_category_by_business/5f73158c500ead10f8fcdca1",
    "message": "Category doesn't exist.",
    "data": {}
    }
    */
    get_category_by_business: (req, res) => {
        try {
            var business_cat_id = req.params.business_category_id;

            var findPattern = { business_category_id: business_cat_id, is_deleted: 0, parent_id : "" }

            CategoryServices.allRecord(findPattern).then(categorydata => {

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
    }
}
module.exports = SubCategoryController;