'use strict';


const _ = require('lodash');
const { AddressServices, UserServices } = require('../../services');
const { Common, Response, Messages, Validation, Geocoder } = require('../../helpers');
const { ObjectID } = require('mongodb');


const AddressController = {

    /**
     * @api {get} /user_service/customer/address/get_addresses Address - Delivery Address Listing
     * @apiGroup App - Address 
     *
     * @apiHeaderExample {multipart/form-data} Header-Example
    {
    "Content-Type": "multipart/form-data"
    }
    *
    * @apiSuccessExample {json} Success-Example
    HTTP/1.1 200 OK
    {
    "message": "Success",
    "data": {
        "_id": null,
        "addresslist": [
        {
            "type": "Point",
            "is_deleted": 0,
            "geoLocation": {
            "type": "Point",
            "coordinates": [
                75.81465365365148,
                26.855192881034085
            ],
            "_id": "605b02eab9a39e36b1a34b1e"
            },
            "_id": "605b02eab9a39e36b1a34b1d",
            "user_id": "6052f3833a20d57e9738223b",
            "location_name": "",
            "mobile": "9782336044",
            "floor": "Basement",
            "way": "",
            "building": "",
            "address_type": "Work",
            "flat": "",
            "zip_code": "302017",
            "landmark": "",
            "full_address": "6-76, Block-B, Someshwarpuri, Malviya Nagar, Jaipur, Rajasthan 302015, India",
            "updatedAt": "2021-03-24T09:14:18.888Z",
            "createdAt": "2021-03-24T09:14:18.888Z"
        }
        ]
    }
    }
    *
    * @apiErrorExample {json} Error-Example
    HTTP/1.1 400 OK
    {
    "status": "error",
    "api_name": "/address/get_addresses",
    "message": "error.",
    "data": {}
    }
    */
    getAddresses: (req, res) => {

        try {

            var login_user_id = Common.getUserdetailsBytoken(req.headers.authorization) || null;

            var findPattern = { '_id': ObjectID(login_user_id) };
            var aggregatefilter = [
                { $match: findPattern },

                { $unwind: "$delivery_address" },
                { $match: { 'delivery_address.is_deleted': 0 } },
                { $sort: { 'delivery_address.createdAt': -1 } },
                {
                    $group: {
                        _id: null,
                        addresslist: { $push: '$delivery_address' }
                    }
                },

            ];

            UserServices.oneRecord(aggregatefilter).then(addressdata => {

                let resMsg = "Success";
                if (!addressdata) {
                    var addressdata = {
                        addresslist: []
                    }
                }
                // var addresslist = {
                //     addresslist:addressdata.delivery_address
                // }
                Response.send(req, res, 200, resMsg, addressdata);

            }).catch(err => {
                let resMsg = Validation.getErrorMessage(err);
                Response.send(req, res, 500, resMsg);
            });

        } catch (err) {
            Response.send(req, res, 500, err.message)
        }
    },
    /**
   * @api {post} /user_service/customer/address/create_address Address - Create
   * @apiGroup App - Address
   *
   * @apiHeaderExample {multipart/form-data} Header-Example
  {
  "Content-Type": "multipart/form-data"
  }
  *
  * @apiParam {String} name Name
  * @apiParam {String} location_name Location Name
  * @apiParam {String} mobile Mobile
  * @apiParam {String} floor Floor
  * @apiParam {String} building Building
  * @apiParam {String} address_type Address Type
  * @apiParam {String} flat Flat
  * @apiParam {String} landmark Landmark
  * @apiParam {String} full_address Full Address
  * @apiParam {String} latitude latitude
  * @apiParam {String} longitude longitude
  * @apiParam {String} way way
  * @apiParam {String} zip_code zip_code
  *
  * @apiSuccessExample {json} Success-Example
  HTTP/1.1 200 OK
    {
    "message": "User details has updated successfully.",
    "data": {}
    }
  *
  * @apiErrorExample {json} Error-Example
  HTTP/1.1 400 OK
  {
  "status": "error",
  "api_name": "/address/create_address",
  "message": "Error",
  "data": {}
  }
  */

    create_address: async (req, res) => {

        try {

            var user_id = Common.getUserdetailsBytoken(req.headers.authorization) || null;
            var location_name = req.body.location_name || "";
            var mobile = req.body.mobile || "";
            var floor = req.body.floor || "";
            var way = req.body.way || "";
            var building = req.body.building || "";
            var address_type = req.body.address_type || "";
            var zip_code = req.body.zip_code || "";
            var flat = req.body.flat || "";
            var landmark = req.body.landmark || "";
            var full_address = req.body.full_address || "";
            var default_address = req.body.default_address || 0;
            var longitude = req.body.longitude || "75.81411609999999";
            var latitude = req.body.latitude || "26.863472200000004";

            var errors = [];

            if (full_address != "") {
                var cordinates = await Geocoder.getLatLongByAddress(full_address);
                if (!cordinates || cordinates.length == 0) {
                    errors.push({ errField: "full_address", errText: Messages.INVALID_ADDRESS });
                }
            }

            // return errors
            if (errors.length > 0) {
                // error
                let resMsg = errors.pop().errText;
                Response.send(req, res, 400, resMsg, { errors: errors });

            } else {

                var findPattern = { _id: ObjectID(user_id), is_deleted: 0 }
                var aggregatefilter = [
                    {
                        $match: findPattern
                    },
                    {
                        $project:{
                            delivery_address:{$size:"$delivery_address"}
                        }
                    }
                    
                ];
                UserServices.oneRecord(aggregatefilter).then(async userdata => {
                    console.log(userdata)
                    if (userdata) {

                        if (full_address != "") {
                            var delivery_address = {
                                type: "Point",
                                user_id: user_id,
                                location_name: location_name,
                                mobile: mobile,
                                floor: floor,
                                way: way,
                                default_address:default_address,
                                building: building,
                                address_type: address_type,
                                flat: flat,
                                zip_code: zip_code,
                                landmark: landmark,
                                full_address: full_address,
                                geoLocation: {
                                    type: "Point",
                                    coordinates: [
                                        parseFloat(longitude),
                                        parseFloat(latitude)
                                    ]
                                }
                            }
                        }
                        var updatePattern = {
                            delivery_address: delivery_address
                        };

                        UserServices.updateRecord(findPattern, { $push: { delivery_address: delivery_address } }).then(updatedRes => {

                            // success
                            let resMsg = Messages.USER_UPDATE_SUCCESS;
                            Response.send(req, res, 200, resMsg, updatedRes.delete_address);

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
    * @api {delete} /user_service/customer/address/delete_address Address - Delete
    * @apiGroup App - Address
    *
    * @apiHeaderExample {multipart/form-data} Header-Example
    {
    "Content-Type": "multipart/form-data"
    }
    * 
    *@apiParam {String} address_id Address Id
    *
    * @apiSuccessExample {json} Success-Example
    HTTP/1.1 200 OK
    {
    "status": "success",
    "api_name": "/address/delete_address",
    "message": "Address has deleted successfully.",
    "data": {}
}
    *
    * @apiErrorExample {json} Error-Example
    HTTP/1.1 400 OK
    {
    "status": "error",
    "api_name": "/address/delete_address",
    "message": "Adderss doesn't exist.",
    "data": {}
    }
    */
    delete_address: (req, res) => {

        try {

            var address_id = req.body.address_id;
            var user_id = Common.getUserdetailsBytoken(req.headers.authorization) || null;

            var findPattern = { _id: ObjectID(user_id) }
            var aggregatefilter = [{
                $match: findPattern
            }
            ];
            UserServices.oneRecord(aggregatefilter).then(async addressdata => {

                if (addressdata != null) {
                    await UserServices.updateManyRecord({ _id: addressdata._id}, { "$set": { 'delivery_address.$.is_deleted': 0} });
                    UserServices.updateRecord({ _id: addressdata._id, "delivery_address._id": ObjectID(address_id) }, { "$set": { 'delivery_address.$.is_deleted': 1, } }).then(userObjRes => {

                        let resMsg = Messages.ADDRESS_DELETE_SUCCESS;
                        Response.send(req, res, 200, resMsg);

                    }).catch(err => {
                        let resMsg = Validation.getErrorMessage(err);
                        Response.send(req, res, 500, resMsg);
                    });

                } else {
                    let resMsg = Messages.ADDRESS_NOT_EXIST;
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

    set_default_address: (req, res) => {

        try {

            var address_id = req.body.address_id;
            var user_id = Common.getUserdetailsBytoken(req.headers.authorization) || null;

            var findPattern = { _id: ObjectID(user_id) }
            var aggregatefilter = [{
                $match: findPattern
            }
            ];
            UserServices.oneRecord(aggregatefilter).then(async addressdata => {

                if (addressdata != null) {
                  await UserServices.updateManyRecord({"_id":ObjectID(addressdata._id),"delivery_address":{$elemMatch:{_id:{"$ne":ObjectID(address_id)}}}},{ "$set": { 'delivery_address.$[].default_address': 0, }},{ multi: true})
                    
                    UserServices.updateRecord({ _id: addressdata._id, "delivery_address._id": ObjectID(address_id) }, { "$set": { 'delivery_address.$.default_address': 1, } }).then(userObjRes => {
                        
                        let resMsg = Messages.DEFAULT_ADDRESS_UPDATE_SUCCESS;
                        Response.send(req, res, 200, resMsg);

                    }).catch(err => {
                        let resMsg = Validation.getErrorMessage(err);
                        Response.send(req, res, 500, resMsg);
                    });

                } else {
                    let resMsg = Messages.ADDRESS_NOT_EXIST;
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
module.exports = AddressController;