'use strict';


const _ = require('lodash');
const { CustomizationTypeServices } = require('../../services');
const { Response, Messages, Validation } = require('../../helpers');
const { ObjectID } = require('mongodb');


const CustomizationTypeController = {

    /**
     * @api {get} /user_service/admin/customize/get_customization_types Customize Type - Listing
     * @apiGroup Admin - Customize Type
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
    "api_name": "/customize/get_customization_types",
    "message": "Success",
    "data": {
        "docs": [
            {
                "parent_id": "1dsfsdsdf",
                "is_active": 1,
                "is_deleted": 0,
                "_id": "5f7da509c46aed38b4b43429",
                "name": "Test",
                "createdAt": "2020-10-07T11:22:49.482Z",
                "updatedAt": "2020-10-07T11:22:49.482Z",
                "__v": 0,
                "id": "5f7da509c46aed38b4b43429"
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
    "api_name": "/customize/get_customization_types",
    "message": "error.",
    "data": {}
    }
    */
    getCustomizationTypes: (req, res) => {

        try {

            var keyword = req.query.keyword || "";
            var status = req.query.status;
            var page = parseInt(req.query.page_no) || 1;
            var limit =  parseInt(req.query.limit) || 10;

            var findPattern = { 'is_deleted': 0, 'parent_id': { $exists: false } };

            if (keyword && keyword != "") {
                findPattern["$or"] = [
                    { 'name': { $regex: keyword, $options: "i" } },
                ];
            }

            if (status && status != "") {
                findPattern.is_active = parseInt(status);
            }
            var sortPattern = { createdAt: -1 };
            var aggregateCondition = [
                { $match: findPattern },
                // {$match:
                //     {$exists: ['$parent_id', true]},
                // }
            ];
            CustomizationTypeServices.getPaginatedData(aggregateCondition, sortPattern, page, limit).then(customizedatadata => {

                let resMsg = "Success";
                Response.send(req, res, 200, resMsg, customizedatadata);

            }).catch(err => {
                let resMsg = Validation.getErrorMessage(err);
                Response.send(req, res, 500, resMsg);
            });

        } catch (err) {
            Response.send(req, res, 500, err.message)
        }
    },
    /**
     * @api {post} /user_service/admin/customize/create_customization_type Customize Type - Create Type
     * @apiGroup Admin - Customize Type
     *
     * @apiHeaderExample {multipart/form-data} Header-Example
    {
    "Content-Type": "multipart/form-data"
    }
    *
    * @apiParam {String} name Name
    *
    * @apiSuccessExample {json} Success-Example
    HTTP/1.1 200 OK
    {
    "status": "success",
    "api_name": "/customize/create_customization_type",
    "message": "Customization type has created successfully.",
        "data": {
            "parent_id": "",
            "is_active": 1,
            "is_deleted": 0,
            "_id": "5f87e04ab695872c68a55ba9",
            "name": "Color",
            "createdAt": "2020-10-15T05:38:18.318Z",
            "updatedAt": "2020-10-15T05:38:18.318Z",
            "__v": 0,
            "id": "5f87e04ab695872c68a55ba9"
        }
    }
    *
    * @apiErrorExample {json} Error-Example
    HTTP/1.1 400 OK
    {
    "status": "error",
    "api_name": "/customize/create_customization_type",
    "message": "Error",
    "data": {}
    }
    */
    createCustomizationType: async (req, res) => {

        try {
            var name = req.body.name || "";

            var errors = [];

            // return errors
            if (errors.length > 0) {
                let resMsg = errors.pop().errText;
                Response.send(req, res, 400, resMsg, { errors: errors });

            } else {

                var findPattern = { name: name, is_deleted: 0 };
                var myAggregate = [{ $match: findPattern }]
                CustomizationTypeServices.oneRecord(myAggregate).then(matchData => {
                    if (matchData) {
                        let resMsg = "Type already exist.";
                        Response.send(req, res, 400, resMsg);
                    } else {

                        var createPattern = {
                            name: name,
                            is_active: 1,
                            is_deleted: 0,
                        };

                        CustomizationTypeServices.createRecord(createPattern).then(async createRes => {
                            let resMsg = Messages.TYPE_CREATE_SUCCESS;
                            Response.send(req, res, 200, resMsg, createRes);
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
     * @api {get} /user_service/admin/customize/get_customization_type/:type_id Customize Type - Get Single
     * @apiGroup Admin - Customize Type
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
        "api_name": "/customize/get_customization_type/5f892e2fa5847d23c07afbdc",
        "message": "Success",
        "data": {
            "_id": "5f892e2fa5847d23c07afbdc",
            "is_active": 1,
            "is_deleted": 0,
            "name": "RAM",
            "createdAt": "2020-10-16T05:22:55.590Z"
        }
    }
    *
    * @apiErrorExample {json} Error-Example
    HTTP/1.1 400 OK
    {
    "status": "error",
    "api_name": "/customize/get_customization_type/5f892e2fa5847d23c07afbdc",
    "message": "Type doesn't exist.",
    "data": {}
    }
    */
    getCustomizationType: async (req, res) => {

        try {

            var type_id = req.params.type_id;

            var findPattern = { _id: ObjectID(type_id), is_deleted: 0 }

            var aggregateConditions = [
                { $match: findPattern },
                {
                    $project: {
                        'name': 1,
                        'is_deleted': 1,
                        'is_active': 1,
                        'createdAt': 1,
                    }
                },
            ];

            CustomizationTypeServices.oneRecord(aggregateConditions).then(typedata => {

                if (typedata) {

                    let resMsg = "Success";
                    Response.send(req, res, 200, resMsg, typedata);

                } else {
                    let resMsg = Messages.TYPE_NOT_EXIST;
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
* @api {put} /user_service/admin/customize/update_customize_type/:type_id Customize Type - Update
* @apiGroup Admin - Customize Type
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
    "api_name": "/customize/update_customize_type/5f892e2fa5847d23c07afbdc",
    "message": "Type details has updated successfully.",
    "data": {
        "parent_id": "",
        "is_active": 1,
        "is_deleted": 0,
        "_id": "5f892e2fa5847d23c07afbdc",
        "name": "RAMS",
        "createdAt": "2020-10-16T05:22:55.590Z",
        "updatedAt": "2020-10-16T05:47:21.917Z",
        "__v": 0,
        "id": "5f892e2fa5847d23c07afbdc"
    }
}
*
* @apiErrorExample {json} Error-Example
HTTP/1.1 400 OK
{
   "status": "error",
   "api_name": "/customize/update_customize_type/5f892e2fa5847d23c07afbdc",
   "message": "Type doesn't exist.",
   "data": {}
}
*/
    update_customize_type: async (req, res) => {

        try {

            var type_id = req.params.type_id;

            var name = req.body.name || "";

            var errors = [];

            // return errors
            if (errors.length > 0) {

                // error
                let resMsg = errors.pop().errText;
                Response.send(req, res, 400, resMsg, { errors: errors });

            } else {

                var findPattern = { name: name, is_deleted: 0, _id: { $ne: ObjectID(type_id) } };
                var aggregateCondition = [{
                    $match: findPattern
                }];


                CustomizationTypeServices.oneRecord(aggregateCondition).then(async typedata => {

                    if (!typedata) {

                        var updatePattern = {
                            name: name,
                        };

                        CustomizationTypeServices.updateRecord({ _id: type_id }, updatePattern).then(updatedRes => {

                            if (updatedRes) {
                                let resMsg = Messages.TYPE_UPDATE_SUCCESS;
                                Response.send(req, res, 200, resMsg, updatedRes);
                            } else {
                                let resMsg = Messages.TYPE_NOT_EXIST;
                                Response.send(req, res, 400, resMsg);
                            }

                        }).catch(err => {
                            let resMsg = Validation.getErrorMessage(err);
                            Response.send(req, res, 500, resMsg);
                        });

                    } else {
                        let resMsg = Messages.TYPE_EXIST;
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
* @api {delete} /user_service/admin/customize/delete_type/:type_id Customize Type - Delete
* @apiGroup Admin - Customize Type
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
    "api_name": "/customize/delete_type/5f892e2fa5847d23c07afbdc",
    "message": "Type has deleted successfully.",
    "data": {}
}
  *
  * @apiErrorExample {json} Error-Example
  HTTP/1.1 400 OK
  {
      "status": "error",
      "api_name": "/customize/delete_type/5f892e2fa5847d23c07afbdc",
      "message": "Type doesn't exist.",
      "data": {}
  }
*/
    delete_type: (req, res) => {

        try {

            var type_id = req.params.type_id;

            var findPattern = { _id: ObjectID(type_id), is_deleted: 0 }
            var aggregateCondition = [{
                $match: findPattern
            }];
            CustomizationTypeServices.oneRecord(aggregateCondition).then(categorydata => {

                if (categorydata != null) {

                    var updatePattern = {
                        is_deleted: 1,
                    };

                    CustomizationTypeServices.updateRecord({ _id: categorydata._id }, updatePattern).then(userObjRes => {

                        let resMsg = Messages.TYPE_DELETE_SUCCESS;
                        Response.send(req, res, 200, resMsg);

                    }).catch(err => {
                        let resMsg = Validation.getErrorMessage(err);
                        Response.send(req, res, 500, resMsg);
                    });

                } else {
                    let resMsg = Messages.TYPE_NOT_EXIST;
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
module.exports = CustomizationTypeController;