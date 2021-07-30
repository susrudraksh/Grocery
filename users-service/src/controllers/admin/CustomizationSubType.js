'use strict';


const _ = require('lodash');
const { CustomizationTypeServices } = require('../../services');
const { Response, Messages, Validation, Media } = require('../../helpers');
const { ObjectID } = require('mongodb');
const { CustomizationSubType } = require('.');
const CustomizationType = require('../../models/CustomizationType');

const CustomizationSubTypeController = {
    /**
     * @api {get} /user_service/admin/customize/get_subtypes Customize Sub Type - Listing
     * @apiGroup Admin - Customize Sub Type
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
    "api_name": "/customize/get_subtypes",
    "message": "Success",
    "data": {
        "docs": [
            {
                "_id": "5f8997a469640625383ebe48",
                "parent_id": "5f892e28a5847d23c07afbdb",
                "is_active": 1,
                "is_deleted": 0,
                "name": "demo test",
                "createdAt": "2020-10-16T12:52:52.133Z",
                "updatedAt": "2020-10-16T12:52:52.133Z",
                "__v": 0
            },
         
        ],
        "totalDocs": 8,
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
    "api_name": "/product_sub_category/get_subcategories",
    "message": "Error",
    "data": {}
    }
    */
    get_subtypes: (req, res) => {

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
            var aggregateCondition = [{
                $match: findPattern
            },
            {
                $lookup: {
                    from: 'customization_types',
                    localField: "parent_id",
                    foreignField: "_id",
                    as: 'customization_value'
                },
            },
            { $unwind: '$customization_value' },

            {
                $project: { name: 1, parent_id: 1, customization_value: '$customization_value' }
            }
            ];
            CustomizationTypeServices.getPaginatedData(aggregateCondition, sortPattern, page, limit).then(categorydata => {

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
     * @api {post} /user_service/admin/customize/create_subtype Customize Sub Type - Create Subtype
     * @apiGroup Admin - Customize Sub Type
     *
     * @apiHeaderExample {multipart/form-data} Header-Example
    {
    "Content-Type": "multipart/form-data"
    }
    *
    * @apiParam {String} name Name
    * @apiParam {String} type_id Type Id
    *
    * @apiSuccessExample {json} Success-Example
    HTTP/1.1 200 OK
    {
        "status": "success",
        "api_name": "/customize/create_subtype",
        "data": {
            "parent_id": "5f892e28a5847d23c07afbdb",
            "is_active": 1,
            "is_deleted": 0,
            "_id": "5f89966b7a9f761cb0b79c73",
            "name": "test",
            "createdAt": "2020-10-16T12:47:39.672Z",
            "updatedAt": "2020-10-16T12:47:39.672Z",
            "__v": 0,
            "id": "5f89966b7a9f761cb0b79c73"
        }
    }
    *
    * @apiErrorExample {json} Error-Example
    HTTP/1.1 400 OK
    {
    "status": "error",
    "api_name": "/customize/create_subtype",
    "message": "Error",
    "data": {}
    }
    */
    create_subtype: async (req, res) => {

        try {

            var name = req.body.name || "";
            var parent_id = req.body.type_id || "";

            var errors = [];

            // return errors
            if (errors.length > 0) {
                let resMsg = errors.pop().errText;
                Response.send(req, res, 400, resMsg, { errors: errors });

            } else {

                var createPattern = {
                    name: name,
                    parent_id: parent_id,
                    is_active: 1,
                    is_deleted: 0,
                };

                CustomizationTypeServices.createRecord(createPattern).then(async createRes => {

                    // success
                    let resMsg = Messages.SUB_TYPE_CREATE_SUCCESS;
                    Response.send(req, res, 200, resMsg, createRes);

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
 * @api {get} /user_service/admin/customize/get_subtype/:subtype_id Customize Sub Type - Get Single
 * @apiGroup Admin - Customize Sub Type
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
    "api_name": "/customize/get_subtype/5f8997a469640625383ebe48",
    "message": "Success",
    "data": {
        "_id": "5f8997a469640625383ebe48",
        "parent_id": "5f892e28a5847d23c07afbdb",
        "is_active": 1,
        "is_deleted": 0,
        "name": "demo test",
        "createdAt": "2020-10-16T12:52:52.133Z",
        "updatedAt": "2020-10-16T12:52:52.133Z",
        "__v": 0
    }
}
*
* @apiErrorExample {json} Error-Example
HTTP/1.1 400 OK
{
    "status": "error",
    "api_name": "/customize/get_subtype/5f8997a469640625383ebe48",
    "message": "Sub type doesn't exist.",
    "data": {}
}
*/
    get_subtype: async (req, res) => {

        try {

            var subtype_id = req.params.subtype_id;

            var findPattern = { _id: ObjectID(subtype_id), is_deleted: 0 }
            var aggregateCondition = [{
                $match: findPattern
            }];
            CustomizationTypeServices.oneRecord(aggregateCondition).then(categorydata => {

                if (categorydata) {

                    let resMsg = "Success";
                    Response.send(req, res, 200, resMsg, categorydata);

                } else {
                    let resMsg = Messages.SUB_TYPE_NOT_EXIST;
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
 * @api {put} /user_service/admin/customize/update_subtype/:subtype_id Customize Sub Type - Update
 * @apiGroup Admin - Customize Sub Type
 *
 * @apiHeaderExample {multipart/form-data} Header-Example
{
    "Content-Type": "multipart/form-data"
}
*
* @apiParam {String} name Name
* @apiParam {String} type_id Type Id
*
* @apiSuccessExample {json} Success-Example
HTTP/1.1 200 OK
{
    "status": "success",
    "api_name": "/customize/update_subtype/5f8997a469640625383ebe48",
    "message": "Type details has updated successfully.",
    "data": {
        "parent_id": "5f892e28a5847d23c07afbdb",
        "is_active": 1,
        "is_deleted": 0,
        "_id": "5f8997a469640625383ebe48",
        "name": "demo",
        "createdAt": "2020-10-16T12:52:52.133Z",
        "updatedAt": "2020-10-16T13:13:00.947Z",
        "__v": 0,
        "id": "5f8997a469640625383ebe48"
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
    update_subtype: async (req, res) => {

        try {

            var subtype_id = req.params.subtype_id;

            var name = req.body.name || "";
            var parent_id = req.body.type_id || "";

            var errors = [];

            // return errors
            if (errors.length > 0) {

                // error
                let resMsg = errors.pop().errText;
                Response.send(req, res, 400, resMsg, { errors: errors });

            } else {

                var findPattern = { _id: { $ne: ObjectID(subtype_id) }, name: name, is_deleted: 0 }
                var aggregateCondition = [{
                    $match: findPattern
                }];
                CustomizationTypeServices.oneRecord(aggregateCondition).then(async categorydata => {

                    if (!categorydata) {

                        var updatePattern = {
                            name: name,
                            parent_id: parent_id,
                        };

                        CustomizationTypeServices.updateRecord({ _id: ObjectID(subtype_id), is_deleted: 0 }, updatePattern).then(updatedRes => {
                            if (updatedRes) {
                                let resMsg = Messages.SUB_TYPE_UPDATE_SUCCESS;
                                Response.send(req, res, 200, resMsg, updatedRes);

                            } else {
                                let resMsg = Messages.SUBADMIN_NOT_EXIST;
                                Response.send(req, res, 200, resMsg, updatedRes);
                            }
                            // success

                        }).catch(err => {
                            let resMsg = Validation.getErrorMessage(err);
                            Response.send(req, res, 500, resMsg);
                        });

                    } else {
                        let resMsg = Messages.SUB_TYPE_EXIST;
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
 * @api {delete} /user_service/admin/customize/delete_subtype/:subtype_id Customize Sub Type - Delete
 * @apiGroup Admin - Customize Sub Type
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
    "api_name": "/customize/delete_subtype/5f7569b05bbadd2914a19c58",
    "message": "Sub type has deleted successfully.",
    "data": {}
}
    *
    * @apiErrorExample {json} Error-Example
    HTTP/1.1 400 OK
    {
        "status": "error",
        "api_name": "/customize/delete_subtype/5f7569b05bbadd2914a19c58",
        "message": "Sub type doesn't exist.",
        "data": {}
    }
*/
    delete_subtype: (req, res) => {

        try {

            var subtype_id = req.params.subtype_id;

            var findPattern = { _id: ObjectID(subtype_id), is_deleted: 0 }
            var aggregateCondtion = [{
                $match: findPattern
            }];
            CustomizationTypeServices.oneRecord(aggregateCondtion).then(categorydata => {

                if (categorydata != null) {

                    var updatePattern = {
                        is_deleted: 1,
                    };

                    CustomizationTypeServices.updateRecord({ _id: categorydata._id }, updatePattern).then(userObjRes => {

                        let resMsg = Messages.SUB_TYPE_DELETE_SUCCESS;
                        Response.send(req, res, 200, resMsg);

                    }).catch(err => {
                        let resMsg = Validation.getErrorMessage(err);
                        Response.send(req, res, 500, resMsg);
                    });

                } else {
                    let resMsg = Messages.SUB_TYPE_NOT_EXIST;
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


}
module.exports = CustomizationSubTypeController;