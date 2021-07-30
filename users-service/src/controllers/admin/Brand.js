'use strict';


const _ = require('lodash');
const { BrandServices } = require('../../services');
const { Response, Messages, Validation, Media } = require('../../helpers');
const Brand = require('../../models/Brand');


const BrandController = {

    /**
     * @api {get} /user_service/brand/get_brands Brand - Listing
     * @apiGroup Admin - Brand
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
    "api_name": "/brand/get_brands",
    "message": "Success",
    "data": {
        "docs": [
            {
                "is_active": 1,
                "is_deleted": 0,
                "_id": "5f7aff895bc4f9245c8209be",
                "name": "One plus",
                "createdAt": "2020-10-05T11:12:09.529Z",
                "updatedAt": "2020-10-05T11:12:09.529Z",
                "__v": 0,
                "image_path_url": "http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/brands/5f7aff895bc4f9245c8209be/undefined",
                "image_path_thumb_url": "http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/brands/5f7aff895bc4f9245c8209be/thumb_undefined",
                "id": "5f7aff895bc4f9245c8209be"
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
     "api_name": "/brand/get_brands",
    "message": "error.",
    "data": {}
    }
    */
    get_brands: (req, res) => {

        try {

            var keyword = req.query.keyword || "";
            var status = req.query.status;
            var page = parseInt(req.query.page_no) || 1;
            var limit = parseInt(req.query.limit) || 10;

            var findPattern = { 'is_deleted': 0 };

            if (keyword && keyword != "") {
                findPattern["$or"] = [
                    { 'name': { $regex: keyword, $options: "i" } },
                ];
            }

            if (status && status != "") {
                findPattern.is_active = parseInt(status);
            }
            var sortPattern = { createdAt: -1 };

            BrandServices.getPaginatedData(findPattern, sortPattern, page, limit).then(branddata => {

                let resMsg = "Success";
                Response.send(req, res, 200, resMsg, branddata);

            }).catch(err => {
                let resMsg = Validation.getErrorMessage(err);
                Response.send(req, res, 500, resMsg);
            });

        } catch (err) {
            Response.send(req, res, 500, err.message)
        }
    },
    /**
     * @api {post} /user_service/admin/brand/create_brand Brand - Create
     * @apiGroup Admin - Brand
     *
     * @apiHeaderExample {multipart/form-data} Header-Example
    {
    "Content-Type": "multipart/form-data"
    }
    *
    * @apiParam {String} name Name
    * @apiParam {Object} image_path Formdata Image Object
    *
    * @apiSuccessExample {json} Success-Example
    HTTP/1.1 200 OK
    {
    "status": "success",
    "api_name": "/brand/create_brand",
    "message": "Brand has created successfully.",
    "data": {
        "is_active": 1,
        "is_deleted": 0,
        "_id": "5f7b003e1a8e363b30e6e3e4",
        "name": "One plus",
        "createdAt": "2020-10-05T11:15:10.462Z",
        "updatedAt": "2020-10-05T11:15:10.472Z",
        "__v": 0,
        "image_path": "16018965104672aae1d6.jpg",
        "image_path_url": "http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/brands/5f7b003e1a8e363b30e6e3e4/16018965104672aae1d6.jpg",
        "image_path_thumb_url": "http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/brands/5f7b003e1a8e363b30e6e3e4/thumb_16018965104672aae1d6.jpg",
        "id": "5f7b003e1a8e363b30e6e3e4"
    }
}
    *
    * @apiErrorExample {json} Error-Example
    HTTP/1.1 400 OK
    {
    "status": "error",
    "api_name": "/brand/create_brand",
    "message": "Error",
    "data": {}
    }
    */
    create_brand: async (req, res) => {

        try {
            var name = req.body.name || "";
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
                    is_active: 1,
                    is_deleted: 0,
                };

                BrandServices.createRecord(createPattern).then(async createRes => {

                    var findPattern = { _id: createRes._id };
                    var updatePattern = {};

                    if (files && files.image_path) {
                        var fileName = await BrandServices.updateUserImage(createRes, files.image_path);
                        updatePattern.image_path = fileName;
                    }

                    BrandServices.updateRecord(findPattern, updatePattern).then(updatedRes => {
                        // success
                        let resMsg = Messages.BRAND_CREATE_SUCCESS;
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
     * @api {get} /user_service/admin/brand/get_brand/:brand_id Brand - Get Single
     * @apiGroup Admin - Brand
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
    "api_name": "/brand/get_brand/5f744d2ea1bd7f352c619577",
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
    "api_name": "/brand/get_brand/5f744d2ea1bd7f352c619577",
    "message": "Brand doesn't exist.",
    "data": {}
    }
    */
    get_brand: async (req, res) => {

        try {

            var brand_id = req.params.brand_id;

            var findPattern = { _id: brand_id, is_deleted: 0 }

            BrandServices.oneRecord(findPattern).then(branddata => {

                if (branddata) {

                    let resMsg = "Success";
                    Response.send(req, res, 200, resMsg, branddata);

                } else {
                    let resMsg = Messages.BRAND_NOT_EXIST;
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
     * @api {put} /user_service/admin/brand/update_brand/:brand_id Brand - Update
     * @apiGroup Admin - Brand
     *
     * @apiHeaderExample {multipart/form-data} Header-Example
    {
    "Content-Type": "multipart/form-data"
    }
    *
    * @apiParam {String} name Name
    * @apiParam {Object} image_path Formdata Image Object
    *
    * @apiSuccessExample {json} Success-Example
    HTTP/1.1 200 OK
    {
    "status": "success",
    "api_name": "/brand/update_brand/5f744d2ea1bd7f352c619577",
    "message": "Brand details has updated successfully.",
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
    "api_name": "/brand/update_brand/5f731c3efae7b5304ce6ae78",
    "message": "Brand doesn't exist.",
    "data": {}
    }
    */
    update_brand: async (req, res) => {

        try {

            var brand_id = req.params.brand_id;

            var name = req.body.name || "";
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

                var findPattern = { _id: brand_id, is_deleted: 0 }

                BrandServices.oneRecord(findPattern).then(async branddata => {

                    if (branddata) {

                        var updatePattern = {
                            name: name,
                        };

                        if (files && files.image_path) {
                            var fileName = await BrandServices.updateUserImage(branddata, files.image_path);
                            updatePattern.image_path = fileName;
                        }

                        BrandServices.updateRecord(findPattern, updatePattern).then(updatedRes => {

                            // success
                            let resMsg = Messages.BRAND_UPDATE_SUCCESS;
                            Response.send(req, res, 200, resMsg, updatedRes);

                        }).catch(err => {
                            let resMsg = Validation.getErrorMessage(err);
                            Response.send(req, res, 500, resMsg);
                        });

                    } else {
                        let resMsg = Messages.BRAND_NOT_EXIST;
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
* @api {put} /user_service/admin/brand/update_status/:brand_id Brand - Update Status
* @apiGroup Admin - Brand
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
    "api_name": "/Brand/update_status/5f7428a688444b3074ce512a",
    "message": "Brand status has updated successfully.",
    "data": {}
}
*
* @apiErrorExample {json} Error-Example
HTTP/1.1 400 OK
{
    "status": "error",
    "api_name": "/brand/update_status/5f731c3efae7b5304ce6ae78",
    "message": "Brand doesn't exist.",
    "data": {}
}
*/
    update_status: (req, res) => {

        try {

            var brand_id = req.params.brand_id;
            var status = req.body.status || "";

            var findPattern = { _id: brand_id, is_deleted: 0 }

            BrandServices.oneRecord(findPattern).then(branddata => {

                if (branddata != null) {

                    var updatePattern = { is_active: status };

                    BrandServices.updateRecord({ _id: branddata._id }, updatePattern).then(userObjRes => {

                        let resMsg = Messages.BRAND_STATUS_UPDATE_SUCCESS;
                        Response.send(req, res, 200, resMsg);

                    }).catch(err => {
                        let resMsg = Validation.getErrorMessage(err);
                        Response.send(req, res, 500, resMsg);
                    });

                } else {
                    let resMsg = Messages.BRAND_NOT_EXIST;
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
    * @api {delete} /user_service/admin/brand/delete_brand/:brand_id Brand - Delete
    * @apiGroup Admin - Brand
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
    "api_name": "/brand/delete_brand/5f744d2ea1bd7f352c619577",
    "message": "Brand has deleted successfully.",
    "data": {}
    }
    *
    * @apiErrorExample {json} Error-Example
    HTTP/1.1 400 OK
    {
        "status": "error",
        "api_name": "/brand/delete_brand/5f731c3efae7b5304ce6ae78",
        "message": "Category doesn't exist.",
        "data": {}
    }
    */
    delete_brand: (req, res) => {

        try {

            var brand_id = req.params.brand_id;

            var findPattern = { _id: brand_id, is_deleted: 0 }

            BrandServices.oneRecord(findPattern).then(branddata => {

                if (branddata != null) {

                    var updatePattern = {
                        is_deleted: 1,
                    };

                    BrandServices.updateRecord({ _id: branddata._id }, updatePattern).then(userObjRes => {

                        let resMsg = Messages.BRAND_DELETE_SUCCESS;
                        Response.send(req, res, 200, resMsg);

                    }).catch(err => {
                        let resMsg = Validation.getErrorMessage(err);
                        Response.send(req, res, 500, resMsg);
                    });

                } else {
                    let resMsg = Messages.BRAND_NOT_EXIST;
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
module.exports = BrandController;