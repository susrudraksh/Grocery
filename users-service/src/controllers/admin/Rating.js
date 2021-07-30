'use strict';

const _ = require('lodash');
const { ProductInventoryServices } = require('../../services');
const { Common, Response, Messages, Validation, Geocoder } = require('../../helpers');
const { ObjectID } = require('mongodb');

const RatingController = {

    /**
     * @api {get} /user_service/admin/rating/get_ratings/:product_id Rating - Customer Rating Listing
     * @apiGroup App - Rating 
     *
     * @apiHeaderExample {multipart/form-data} Header-Example
    {
    "Content-Type": "multipart/form-data"
    }
    *
    *
    * @apiSuccessExample {json} Success-Example
    HTTP/1.1 200 OK
    {
    "message": "Success",
    "data": {
        "docs": [
            {
                "_id": "5f8546a6eb7b292138cd7226",
                "is_active": 0,
                "is_deleted": 0,
                "product_id": "5f7c38339ed8b93ac4a93bff",
                "price": 5000,
                "product_quantity": 3,
                "product_code": "dsada",
                "createdAt": "2020-10-13T06:18:14.063Z",
                "updatedAt": "2020-11-25T08:10:16.054Z",
                "__v": 0,
                "inventory_name": "demo namee",
                "ratings": {
                    "_id": "5fbdfb385602e5207c11509a",
                    "product_id": "5f7c38339ed8b93ac4a93bff",
                    "user_id": "5f6dc48c84a2a93308b879f1",
                    "rating": 2,
                    "review": "Very good"
                }
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
    "message": "error.",
    "data": {}
    }
    */
    getRatings: (req, res) => {

        try {

            var product_id = req.params.product_id;
            var keyword = req.query.keyword || "";
            var status = req.query.status;
            var page = parseInt(req.query.page_no) || 1;
            var limit = parseInt(req.query.limit) || 10;


            var findPattern = { 'product_id': ObjectID(product_id) };

            var sortPattern = { createdAt: -1 };

            var aggregatefilter = [
                { $match: findPattern },
                { $unwind: "$ratings" },
                {
                    $lookup: {
                        from: 'users',
                        let: { "id": "$ratings.user_id" },
                        pipeline: [
                            { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                            { $project: { 'username': 1 } }],
                        as: 'UserData'
                    }
                },
                { $unwind: "$UserData" },
                {
                    $match:
                    {
                        $or: [
                            { "UserData.username": { $regex: '.*' + keyword + '.*', $options: 'i' } },
                            { "inventory_name": { $regex: '.*' + keyword + '.*', $options: 'i' } },
                        ]
                    }
                },
            ];

            ProductInventoryServices.getAggregatePaginatedData(aggregatefilter, sortPattern, page, limit).then(branddata => {

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
   

    addRating: async (req, res) => {

        try {
            var product_id = req.body.product_id || null;
            var product_inventory_id = req.body.product_inventory_id || null;
            var user_id = req.body.user_id || "";
            var rating = req.body.rating || "";
            var review = req.body.review || "";

            var errors = [];
            // return errors
            if (errors.length > 0) {
                // error
                let resMsg = errors.pop().errText;
                Response.send(req, res, 400, resMsg, { errors: errors });

            } else {

                var findPattern = { _id: ObjectID(product_inventory_id), is_deleted: 0 }
                var aggregatefilter = [{
                    $match: findPattern
                }
                ];
                ProductInventoryServices.oneRecord(aggregatefilter).then(async inventorydata => {

                    if (inventorydata) {

                        var ratings = {
                            product_id: product_id,
                            user_id: user_id,
                            rating: rating,
                            review: review,
                        }

                        ProductInventoryServices.updateRecord(findPattern, { $push: { ratings: ratings } }).then(updatedRes => {

                            // success
                            let resMsg = Messages.RATING_UPDATE_SUCCESS;
                            Response.send(req, res, 200, resMsg);

                        }).catch(err => {
                            let resMsg = Validation.getErrorMessage(err);
                            Response.send(req, res, 500, resMsg);
                        });

                    } else {
                        let resMsg = Messages.INVENTORY_NOT_EXIST;
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
   
    updateStatus: (req, res) => {

        try {

            var product_inventory_id = req.params.product_inventory_id;
            var rating_id = req.params.rating_id;
            var status = req.body.status || "";

            var newfindPattern = { _id: ObjectID(product_inventory_id), is_deleted: 0, "ratings._id": ObjectID(rating_id) };

            var updateRatingStatus = {
                'ratings.$.status': status,
            }

            ProductInventoryServices.updateRecord(newfindPattern, { $set: updateRatingStatus }).then(async updatedRes => {

                let resMsg = Messages.RATING_STATUS_UPDATE_SUCCESS;
                Response.send(req, res, 200, resMsg);

            }).catch(err => {

                let resMsg = Validation.getErrorMessage(err);
                Response.send(req, res, 500, resMsg);
            });

        } catch (err) {
            Response.send(req, res, 500, err.message);
        }
    }
}
module.exports = RatingController;