'use strict';


const _ = require('lodash');
const { WarehouseServices } = require('../../services');
const { Response, Messages, Validation, Common } = require('../../helpers');


const WarehouseController = {

    /**
     * @api {get} /user_service/admin/warehouse/get_warehouses Warehouse - Listing
     * @apiGroup Admin - Warehouse
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
    "api_name": "/warehouse/get_warehouses",
    "message": "Success",
    "data": {
        "docs": [
            {
                "is_active": 1,
                "is_deleted": 0,
                "_id": "5f7ee30347b0a120d8991e35",
                "name": "Demo 3",
                "address": "Jaipur",
                "id": "5f7ee30347b0a120d8991e35"
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
    "api_name": "/warehouse/get_warehouses",
    "message": "error.",
    "data": {}
    }
    */
    getWarehouses: (req, res) => {

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

            WarehouseServices.getPaginatedData(findPattern, sortPattern, page, limit).then(warehousedata => {

                let resMsg = "Success";
                Response.send(req, res, 200, resMsg, warehousedata);

            }).catch(err => {
                let resMsg = Validation.getErrorMessage(err);
                Response.send(req, res, 500, resMsg);
            });

        } catch (err) {
            Response.send(req, res, 500, err.message)
        }
    },
    /**
     * @api {post} /user_service/admin/warehouse/create_warehouse Warehouse - Create
     * @apiGroup Admin - Warehouse
     *
     * @apiHeaderExample {multipart/form-data} Header-Example
    {
    "Content-Type": "multipart/form-data"
    }
    *
    * @apiParam {String} name Name
    * @apiParam {String} address Address
    *
    * @apiSuccessExample {json} Success-Example
    HTTP/1.1 200 OK
    {
    "status": "success",
    "api_name": "/warehouse/create_warehouse",
    "message": "WAREHOUSE has created successfully.",
    "data": {
    "is_active": 1,
    "is_deleted": 0,
    "_id": "5f7ea8c5bd16c11634edf7a3",
    "name": "Demo",
    "address": "Jaipur",
    "createdAt": "2020-10-08T05:51:01.382Z",
    "updatedAt": "2020-10-08T05:51:01.382Z",
    "__v": 0,
    "id": "5f7ea8c5bd16c11634edf7a3"
    }
    }
    *
    * @apiErrorExample {json} Error-Example
    HTTP/1.1 400 OK
    {
    "status": "error",
    "api_name": "/warehouse/create_warehouse",
    "message": "Error",
    "data": {}
    }
    */
    create_warehouse: async (req, res) => {

        try {
            var name = req.body.name || "";
            var address = req.body.address || null;
            var latitude = req.body.latitude || null;
            var longitude = req.body.longitude || null;

            var errors = [];

            // return errors
            if (errors.length > 0) {
                let resMsg = errors.pop().errText;
                Response.send(req, res, 400, resMsg, { errors: errors });

            } else {

                var createPattern = {
                    name: name,
                    address: address,
                    latitude: latitude,
                    longitude: longitude,
                    warehouse_code:Common.generateRandomNumber(12),
                    is_active: 1,
                    is_deleted: 0,
                };
                createPattern.loc = {
                    type: "Point",
                    coordinates: [
                        parseFloat(longitude),
                        parseFloat(latitude)
                    ]
                }

                WarehouseServices.createRecord(createPattern).then(async createRes => {
                    // success
                    let resMsg = Messages.WAREHOUSE_CREATE_SUCCESS;
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
     * @api {get} /user_service/admin/warehouse/get_warehouse/:warehouse_id Warehouse - Get Single
     * @apiGroup Admin - Warehouse
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
    "api_name": "/warehouse/get_warehouse/5f7ea8c5bd16c11634edf7a3",
    "message": "Success",
    "data": {
        "is_active": 1,
        "is_deleted": 0,
        "_id": "5f7ee30347b0a120d8991e35",
        "name": "Demo 3",
        "address": "Jaipur",
        "id": "5f7ee30347b0a120d8991e35"
    }
    }
    *
    * @apiErrorExample {json} Error-Example
    HTTP/1.1 400 OK
    {
    "status": "error",
    "api_name": "/warehouse/get_warehouse/5f7ea8c5bd16c11634edf7a3",
    "message": "Warehouse doesn't exist.",
    "data": {}
    }
    */
    getWarehouse: async (req, res) => {

        try {

            var warehouse_id = req.params.warehouse_id;

            var findPattern = { _id: warehouse_id, is_deleted: 0 }

            WarehouseServices.oneRecord(findPattern).then(warehousedata => {

                if (warehousedata) {

                    let resMsg = "Success";
                    Response.send(req, res, 200, resMsg, warehousedata);

                } else {
                    let resMsg = Messages.WAREHOUSE_NOT_EXIST;
                    Response.send(req, res, 500, resMsg);
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
     * @api {put} /user_service/admin/warehouse/update_warehouse/:warehouse_id Warehouse - Update
     * @apiGroup Admin - Warehouse
     *
     * @apiHeaderExample {multipart/form-data} Header-Example
    {
    "Content-Type": "multipart/form-data"
    }
    *
    * @apiParam {String} name Name
    * @apiParam {String} address Address
    *
    * @apiSuccessExample {json} Success-Example
    HTTP/1.1 200 OK
    {
    "status": "success",
    "api_name": "/warehouse/update_warehouse/5f7ea8c5bd16c11634edf7a3",
    "message": "WAREHOUSE details has updated successfully.",
    "data": {
        "is_active": 1,
        "is_deleted": 0,
        "_id": "5f7ea8c5bd16c11634edf7a3",
        "name": "Demo 1",
        "address": "Delhi",
        "createdAt": "2020-10-08T05:51:01.382Z",
        "updatedAt": "2020-10-08T06:10:26.622Z",
        "__v": 0,
        "id": "5f7ea8c5bd16c11634edf7a3"
    }
    }
    *
    * @apiErrorExample {json} Error-Example
    HTTP/1.1 400 OK
    {
    "status": "error",
    "api_name": "/warehouse/update_warehouse/5f7ea8c5bd16c11634edf7a3",
    "message": "Warehouse doesn't exist.",
    "data": {}
    }
    */
    updateWarehouse: async (req, res) => {

        try {

            var warehouse_id = req.params.warehouse_id;

            var name = req.body.name || "";
            var address = req.body.address || null;
            var latitude = req.body.latitude || null;
            var longitude = req.body.longitude || null;

            var errors = [];

            // return errors
            if (errors.length > 0) {
                // error
                let resMsg = errors.pop().errText;
                Response.send(req, res, 400, resMsg, { errors: errors });

            } else {

                var findPattern = { _id: warehouse_id, is_deleted: 0 }

                WarehouseServices.oneRecord(findPattern).then(async warehousedata => {

                    if (warehousedata) {

                        var updatePattern = {
                            name: name,
                            address: address,
                            latitude: latitude,
                            longitude: longitude,
                        };
                        updatePattern.loc = {
                            type: "Point",
                            coordinates: [
                                parseFloat(longitude),
                                parseFloat(latitude)
                            ]
                        }
                        

                        WarehouseServices.updateRecord(findPattern, updatePattern).then(updatedRes => {

                            // success
                            let resMsg = Messages.WAREHOUSE_UPDATE_SUCCESS;
                            Response.send(req, res, 200, resMsg, updatedRes);

                        }).catch(err => {
                            let resMsg = Validation.getErrorMessage(err);
                            Response.send(req, res, 500, resMsg);
                        });

                    } else {
                        let resMsg = Messages.WAREHOUSE_NOT_EXIST;
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
    * @api {put} /user_service/admin/warehouse/update_status/:brand_id Warehouse - Update Status
    * @apiGroup Admin - Warehouse
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
    "api_name": "/warehouse/update_status/5f7ea8c5bd16c11634edf7a3",
    "message": "WAREHOUSE status has updated successfully.",
    "data": {}
    }
    *
    * @apiErrorExample {json} Error-Example
    HTTP/1.1 400 OK
    {
    "status": "error",
    "api_name": "/warehouse/update_status/5f7ea8c5bd16c11634edf7a3",
    "message": "Warehouse doesn't exist.",
    "data": {}
    }
    */
    updateStatus: (req, res) => {

        try {

            var warehouse_id = req.params.warehouse_id;
            var status = req.body.status || "";

            var findPattern = { _id: warehouse_id, is_deleted: 0 }

            WarehouseServices.oneRecord(findPattern).then(warehousedata => {

                if (warehousedata != null) {

                    var updatePattern = { is_active: status };

                    WarehouseServices.updateRecord({ _id: warehousedata._id }, updatePattern).then(userObjRes => {

                        let resMsg = Messages.WAREHOUSE_STATUS_UPDATE_SUCCESS;
                        Response.send(req, res, 200, resMsg);

                    }).catch(err => {
                        let resMsg = Validation.getErrorMessage(err);
                        Response.send(req, res, 500, resMsg);
                    });

                } else {
                    let resMsg = Messages.WAREHOUSE_NOT_EXIST;
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
    * @api {delete} /user_service/admin/warehouse/delete_warehouse/:warehouse_id Warehouse - Delete
    * @apiGroup Admin - Warehouse
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
    "api_name": "/warehouse/delete_warehouse/5f7ea8c5bd16c11634edf7a3",
    "message": "WAREHOUSE has deleted successfully.",
    "data": {}
    }
    *
    * @apiErrorExample {json} Error-Example
    HTTP/1.1 400 OK
    {
    "status": "error",
    "api_name": "/warehouse/delete_warehouse/5f7ea8c5bd16c11634edf7a3",
    "message": "Warehouse doesn't exist.",
    "data": {}
    }
    */
    deleteWarehouse: (req, res) => {

        try {

            var warehouse_id = req.params.warehouse_id;

            var findPattern = { _id: warehouse_id, is_deleted: 0 }

            WarehouseServices.oneRecord(findPattern).then(warehousedata => {

                if (warehousedata != null) {

                    var updatePattern = {
                        is_deleted: 1,
                    };

                    WarehouseServices.updateRecord({ _id: warehousedata._id }, updatePattern).then(userObjRes => {

                        let resMsg = Messages.WAREHOUSE_DELETE_SUCCESS;
                        Response.send(req, res, 200, resMsg);

                    }).catch(err => {
                        let resMsg = Validation.getErrorMessage(err);
                        Response.send(req, res, 500, resMsg);
                    });

                } else {
                    let resMsg = Messages.WAREHOUSE_NOT_EXIST;
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
module.exports = WarehouseController;