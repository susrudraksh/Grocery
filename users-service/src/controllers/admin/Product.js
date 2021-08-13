'use strict';
const { Response, Media, Messages, Validation } = require('../../helpers');
const { ProductServices, ProductCustomizationServices, ProductInventoryServices, CategoryServices, CustomizationTypeServices, ProductImageServices } = require('../../services');
const { ObjectID } = require("mongodb");
const config = require('../../config');
const UPLOAD_FOLDER_URL = config.apiGatewayUrl + "/service/assets?service=user_service&filepath=uploads/product";
const DEFAULT_FOLDER_URL = config.apiGatewayUrl + "/service/assets?service=user_service&filepath=default";


const Products = {

    /**
     * @api {get}/user_service/admin/product/add_product  Product - Add Product
     * @apigroup Admin - Product
     * 
     * @apiHeaderExample {multipart/form-data} Header-Example
        {
            "Content-Type" : "mutipart/form-data",
            "Autherization" : "Bearer auth token"
        }
    *
    * @apiParam {String} name Name
    * @apiParam {String} business_category_id Business Category Id
    * @apiParam {String} category_id  Category Id
    * @apiParam {String} sub_category_id Sub Category Id
    * @apiParam {String} description Product description 
    * @apiParam {Object} product_images   Formdata Image Object array
    * @apiParam {String} customize Customize array
    * @apiParam {String} price Price of product
    * @apiParam {String} quantity product quantity
    *
    * @apiSuccessExample {json} Success-Example
    HTTP/1.1 200 OK
    {
    "status": "success",
    "api_name": "/product/add_product",
    "message": "Product has created successfully.",
    "data": {
        "is_active": 1,
        "is_deleted": 0,
        "_id": "5f7316ddb038fe182482a154",
        "name": "Grocery",
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
    "api_name": "/product/add_product",
    "message": "You are already registered with this phone number.",
    "data": {}
    }
    */

    add_product: async (req, res) => {
        try {

            var name = req.body.name || "";
            var business_category_id = req.body.business_category_id || "";
            var category_id = req.body.category_id || "";
            var sub_category_id = req.body.sub_category_id || '';
            var brand_id = req.body.brand_id || '';
            var description = req.body.description || "";

            var price = req.body.price || "";
            var inventory_name = req.body.inventory_name || "";
            var quantity = req.body.quantity || "";
            var is_discount = req.body.is_discount || "";
            var discount_type = req.body.discount_type || "";
            var discount_value = req.body.discount_value || "";
            var discounted_product_price = req.body.discounted_product_price || "";

            var sku_code = req.body.sku_code || "";
            var sku_name = req.body.sku_name || "";
            var batch = req.body.batch || "";

            var mrp=req.body.mrp;
            var tax_type=req.body.tax_type;
            var hsn_code=req.body.hsn_code;
            var inventory_product_code=req.body.inventory_product_code;
            var tax_rate=req.body.tax_rate;
            var taxable_amount=req.body.taxable_amount;
            var gst_amount=req.body.gst_amount;
            var cgst_rate=req.body.cgst_rate;
            var cgst_amount=req.body.cgst_amount;
            var sgst_rate=req.body.sgst_rate;
            var sgst_amount=req.body.sgst_amount;
            var igst_rate=req.body.igst_rate;
            var igst_amount=req.body.igst_amount;
            var min_inventory=req.body.min_inventory;

            var customize = req.body.customize || [];
            customize = JSON.parse(customize);
            var warehouse_inventory = req.body.warehouse_inventory || [];
            warehouse_inventory = JSON.parse(warehouse_inventory);
            var files = req.body.files || null;
            var errors = [];
            var image_name = [];

            if (files && files.product_images) {
                if (Array.isArray(files.product_images)) {
                    await files.product_images.forEach(function (arrayItem) {
                        if (Media.getMediaTypeByMimeType(arrayItem.mimetype) != "image") {
                            errors.push({ errField: arrayItem.name, errText: Messages.INVALID_IMAGE_FORMAT });
                        }
                    });
                } else {
                    if (Media.getMediaTypeByMimeType(files.product_images.mimetype) != "image") {
                        errors.push({ errField: files.product_images.name, errText: Messages.INVALID_IMAGE_FORMAT });
                    }
                }
            }

            // return errors
            if (errors.length > 0) {
                let resMsg = Messages.INVALID_IMAGE_FORMAT;
                Response.send(req, res, 400, resMsg, { errors: errors });

            } else {
                var createProduct = {
                    name: name,
                    product_images: files.product_images,
                    business_category_id: business_category_id,
                    brand_id: brand_id,
                    category_id: category_id,
                    sub_category_id: sub_category_id,
                    description: description,
                    is_active: 1,

                };
                ProductServices.createRecord(createProduct).then(async productResult => {

                    var product_id = await ProductServices.genrateproductcode(productResult._id);

                    var createProductInventry = {
                        product_id: productResult._id,
                        price: price,
                        product_quantity: quantity,
                        product_code: product_id,
                        is_active: 1,
                        inventory_name: inventory_name,
                        is_discount: is_discount,
                        discount_type: discount_type,
                        discount_value: discount_value,
                        discounted_product_price: discounted_product_price,
                        sku_code: sku_code,
                        sku_name: sku_name,
                        batch: batch,

                        tax_type:tax_type,
                        hsn_code:hsn_code,
                        inventory_product_code:inventory_product_code,
                        tax_rate:tax_rate,
                        taxable_amount:taxable_amount,
                        gst_amount:gst_amount,
                        cgst_rate:cgst_rate,
                        cgst_amount:cgst_amount,
                        sgst_rate:sgst_rate,
                        sgst_amount:sgst_amount,
                        igst_rate:igst_rate,
                        igst_amount:igst_amount,
                        min_inventory:min_inventory
                    };

                    ProductInventoryServices.createRecord(createProductInventry).then(async resultInventry => {

                        await customize.reduce(async (promise, customize, key) => {

                            await promise;
                            var createProductInventry = {
                                product_inventry_id: resultInventry._id,
                                product_id: productResult._id,
                                customization_type: customize.custom_type,
                                customization_value: customize.custom_type_value
                            }

                            await ProductCustomizationServices.createRecord(createProductInventry).then(async customizersult => {

                            }).catch(err => {
                                let resMsg = Validation.getErrorMessage(err);
                                Response.send(req, res, 500, resMsg);
                            })
                        }, Promise.resolve());

                        await warehouse_inventory.reduce(async (promise, warehouse_inventory, key) => {

                            await promise;
                            if(warehouse_inventory.warehouse_id != ""){
                                var createProductInventry = {
                                    warehouse_id: warehouse_inventory.warehouse_id,
                                    quantity: warehouse_inventory.quantity,
                                }
                                await ProductInventoryServices.updateRecord({ _id: resultInventry._id }, { $push: { warehouseinventry: createProductInventry } }).then(async customizersult => {
    
                                }).catch(err => {
                                    let resMsg = Validation.getErrorMessage(err);
                                    Response.send(req, res, 500, resMsg);
                                })
                            }
                        }, Promise.resolve());

                    }).catch(err => {
                        let resMsg = Validation.getErrorMessage(err);
                        Response.send(req, res, 500, resMsg);
                    })

                    var updateResult = { _id: productResult._id };
                    if (files && files.product_images) {
                        if (Array.isArray(files.product_images)) {

                            await files.product_images.reduce(async (promise, arrayItem) => {
                                await promise;
                                if (Media.getMediaTypeByMimeType(arrayItem.mimetype) != "image") {
                                    errors.push({ errField: arrayItem.name, errText: Messages.INVALID_IMAGE_FORMAT });
                                } else {
                                    var fileName = await ProductServices.updateUserImage(updateResult, arrayItem);
                                    image_name.push(fileName);
                                }
                            }, Promise.resolve())
                        } else {
                            if (Media.getMediaTypeByMimeType(files.product_images.mimetype) != "image") {
                                errors.push({ errField: files.product_images.name, errText: Messages.INVALID_IMAGE_FORMAT });
                            } else {
                                var fileName = await ProductServices.updateUserImage(updateResult, files.product_images);
                                image_name.push(fileName);
                            }
                        }
                    }

                    var updateProduct = {
                        images: image_name,
                        is_active: 1,
                    }
                    ProductServices.updateRecord({ _id: productResult._id }, updateProduct).then(updatedProduct => {
                        var successMsg = Messages.PRODUCT_CREATE_SUCCESS;
                        Response.send(req, res, 200, successMsg);
                    }).catch(err => {
                        let resMsg = Validation.getErrorMessage(err);
                        Response.send(req, res, 500, resMsg);
                    })

                }).catch(err => {
                    let resMsg = Validation.getErrorMessage(err);
                    Response.send(req, res, 500, resMsg);
                })
            }
        } catch (err) {
            let resMsg = Validation.getErrorMessage(err);
            Response.send(req, res, 500, resMsg);
        }
    },

    /**
   * @api {post} /user_service/admin/product/get_category  Product - Category
   * @apigroup Admin - Product
   *
   * @apiHeaderExample {multipart/form-data} Header-Example
      {
          "Content-Type": "multipart/form-data",
      }
   *
   * @apiParam {String} business_category_id Business Category Id
   *
   * @apiSuccessExample {json} Success-Example
      HTTP/1.1 200 OK
      {
      "status": "success",
      "api_name": "/product/get_category",
      "data": {
          "docs": [
              {
                  "is_active": 1,
                  "is_deleted": 0,
                  "_id": "5f757eda6fcbe90a537e2507",
                  "name": "Category 4",
                  "cancelation_time": 40,
                  "return_time": 40,
                  "createdAt": "2020-10-01T07:01:46.672Z",
                  "updatedAt": "2020-10-01T07:01:46.677Z",
                  "__v": 0,
                  "category_image": "1601535706675reliencefresh.jpg",
                  "category_image_url": "http://13.235.188.102:3060/service/assets?service=user_service&filepath=uploads/business_category/5f757eda6fcbe90a537e2507/1601535706675reliencefresh.jpg",
                  "category_image_thumb_url": "http://13.235.188.102:3060/service/assets?service=user_service&filepath=uploads/business_category/5f757eda6fcbe90a537e2507/thumb_1601535706675reliencefresh.jpg",
                  "id": "5f757eda6fcbe90a537e2507"
              },
          ],
          "totalDocs": 3,
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
          "api_name": "/get_category",
          "message": "error.",
          "data": {}
      }
  */

    getCategory: (req, res) => {

        try {
            var business_category_id = req.body.business_category_id || '';
            var findCategory = {
                is_deleted: 0,
                is_active: 1,
                business_category_id: business_category_id,
                parent_id: ""
            };

            var select = "-is_deleted -is_active -__v";
            var sortPattern = { createdAt: -1 };
            CategoryServices.getPaginatedData(findCategory, sortPattern, 1, 100, select).then(CategoryResult => {

                var successMsg = Messages.DATA_FETCH_SUCCESSFULLY;
                Response.send(req, res, 200, successMsg, CategoryResult);
            }).catch(err => {
                var errorMess = Validation.getErrorMessage(err);
                Response.send(req, res, 500, errorMess);
            })


        } catch (err) {
            var errorMess = Validation.getErrorMessage(err);
            Response.send(req, res, 500, errorMess);
        }
    },

    /**
    * @api {post} /user_service/admin/product/get_subcategory   Product - Sub Category
    * @apigroup Admin - Product
    *
    * @apiHeaderExample {multipart/form-data} Header-Example
    {
        "Content-Type": "multipart/form-data",
    }
    *
    * @apiParam {String} business_category_id Business Category Id
    * @apiParam {String} category_id  Category Id
    *
    * @apiSuccessExample {json} Success-Example
    HTTP/1.1 200 OK
    {
    "status": "success",
    "api_name": "/product/get_subcategory",
    "data": {
        "docs": [
            {
                "is_active": 1,
                "is_deleted": 0,
                "_id": "5f757eda6fcbe90a537e2507",
                "name": "Category 4",
                "cancelation_time": 40,
                "return_time": 40,
                "createdAt": "2020-10-01T07:01:46.672Z",
                "updatedAt": "2020-10-01T07:01:46.677Z",
                "__v": 0,
                "category_image": "1601535706675reliencefresh.jpg",
                "category_image_url": "http://13.235.188.102:3060/service/assets?service=user_service&filepath=uploads/business_category/5f757eda6fcbe90a537e2507/1601535706675reliencefresh.jpg",
                "category_image_thumb_url": "http://13.235.188.102:3060/service/assets?service=user_service&filepath=uploads/business_category/5f757eda6fcbe90a537e2507/thumb_1601535706675reliencefresh.jpg",
                "id": "5f757eda6fcbe90a537e2507"
            }
        ],
        "totalDocs": 3,
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
        "api_name": "/get_subcategory",
        "message": "error.",
        "data": {}
    }
    */

    getSubCategory: (req, res) => {

        try {
            var business_category_id = req.body.business_category_id || '';
            var category_id = req.body.category_id || '';
            var findCategory = {
                is_deleted: 0,
                is_active: 1,
                // business_category_id:business_category_id,
                parent_id: category_id
            };

            var select = "-is_deleted -is_active -__v";
            var sortPattern = { createdAt: -1 };
            CategoryServices.getPaginatedData(findCategory, sortPattern, 1, 100, select).then(CategoryResult => {

                var successMsg = Messages.DATA_FETCH_SUCCESSFULLY;
                Response.send(req, res, 200, successMsg, CategoryResult);
            }).catch(err => {
                var errorMess = Validation.getErrorMessage(err);
                Response.send(req, res, 500, errorMess);
            })

        } catch (err) {
            var errorMess = Validation.getErrorMessage(err);
            Response.send(req, res, 500, errorMess);
        }
    },


    /**
     * @api {post} /user_service/admin/product/get_product_lists Product - Listing
     * @apiGroup Admin - Product
     *
     * @apiHeaderExample {multipart/form-data} Header-Example
    {
    "Content-Type": "multipart/form-data"
    }
    *
    * @apiParam {String} page_no Page No.
    * @apiParam {String} keyword keyword for search
    *
    * @apiSuccessExample {json} Success-Example
    HTTP/1.1 200 OK
    {
        "status": "success",
        "api_name": "/product/get_product_lists",
        "message": "Success",
        "data": {
            "docs": [
                {
                    "_id": "5f7dc621b5849b1c50de79ae",
                    "name": "Maggi",
                    "images": [
                        {
                            "_id": "5f7dc621b5849b1c50de79b2",
                            "product_image_url": "http://192.168.1.99:221/static/CricketCategory/1602078241354ArchitectureDiagram.png",
                            "product_image_thumb_url": "http://192.168.1.99:221/static/CricketCategory/1602078241354ArchitectureDiagram.png"
                        },
                        {
                            "_id": "5f7dc621b5849b1c50de79b3",
                            "product_image_url": "http://192.168.1.99:221/static/CricketCategory/1602078241362ENAQDfunctionalarchitecher.png",
                            "product_image_thumb_url": "http://192.168.1.99:221/static/CricketCategory/1602078241362ENAQDfunctionalarchitecher.png"
                        }
                    ],
                    "business_category": {
                        "_id": "5f7449b1769cc375d2f49929",
                        "name": "Clothes"
                    },
                    "category": {
                        "_id": "5f75b6292fa6b92669f3a7fb",
                        "name": "Mobiles"
                    },
                    "subcategory": {
                        "_id": "5f75b6e80b0e2127b1361e3d",
                        "name": "Prod subcat 1"
                    },
                    "price": "200"
                }
            ],
            "totalDocs": 1,
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
    "api_name": "/product/get_product_lists",
    "message": "error.",
    "data": {}
    }
    */

    getProductLists: async (req, res) => {

        try {
            var keyword = req.query.keyword || "";
            var page = req.query.page_no || 1;
            var limit = req.query.limit || 10;
            var status = req.query.status;

            var sortPattern = { createdAt: -1 };

            let conditions = { is_deleted: 0 };

            if (status && status != "") {
                conditions.is_active = parseInt(status);
            }

            let aggregateCondition = [
                { $match: conditions },

                {
                    $lookup: {
                        from: 'business_categories',
                        let: { "id": "$business_category_id" },
                        pipeline: [
                            { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                            { $project: { "name": 1 } }
                        ],
                        as: 'businessCategoryData'
                    }

                },
                { $unwind: "$businessCategoryData" },
                {
                    $lookup: {
                        from: 'product_images',
                        let: { "images": "$images" },
                        pipeline: [
                            { $match: { $expr: { $in: ["$_id", "$$images"] } } },

                            {
                                $project: {
                                    'product_image_url':
                                    {
                                        $cond: [
                                            { $eq: ['$image', ''] },
                                            { $concat: [DEFAULT_FOLDER_URL + "/placeholder-user.jpg"] },
                                            { $concat: [UPLOAD_FOLDER_URL + "/", { $toString: "$product_id" }, '/', "$image"] }, // then
                                        ]
                                    },
                                    "product_image_thumb_url": { $concat: [UPLOAD_FOLDER_URL + "/", { $toString: "$product_id" }, '/thumb_', "$image"] }
                                }
                            }
                        ],
                        as: 'ProductImages'
                    }
                },
                {
                    $lookup: {
                        from: 'categories',
                        let: { "id": "$category_id" },
                        pipeline: [
                            { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                            { $project: { 'name': 1 } }],
                        as: 'CategoryData'
                    }

                },
                { $unwind: "$CategoryData" },
                {
                    $lookup: {
                        from: 'categories',
                        let: { "id": "$sub_category_id" },
                        pipeline: [
                            { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                            { $project: { 'name': 1 } }],
                        as: 'SubCategoryData'
                    }

                },
                { $unwind: "$SubCategoryData" },

                {
                    $match:
                    {
                        $or: [
                            { "businessCategoryData.name": { $regex: '.*' + keyword + '.*', $options: 'i' } },
                            { "CategoryData.name": { $regex: '.*' + keyword + '.*', $options: 'i' } },
                            { "SubCategoryData.name": { $regex: '.*' + keyword + '.*', $options: 'i' } },
                            { "name": { $regex: '.*' + keyword + '.*', $options: 'i' } },
                        ]
                    }
                },

                {
                    $project: {
                        _id: "$_id",
                        name: "$name",
                        images: "$ProductImages",
                        business_category: "$businessCategoryData",
                        category: "$CategoryData",
                        subcategory: "$SubCategoryData",
                        is_active: '$is_active',
                        description: '$description',
                        createdAt: '$createdAt'
                    }
                },
            ];



            ProductServices.getAggregatePaginatedData(aggregateCondition, sortPattern, page, limit).then(userdata => {

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
    * @api {put} /user_service/admin/product/update_status/:product_id Product - Update Status
    * @apiGroup Admin - Product
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
    "api_name": "/product/update_status/5f8546a6eb7b292138cd7226",
    "message": "Product status has updated successfully.",
    "data": {}
    }
    *
    * @apiErrorExample {json} Error-Example
    HTTP/1.1 400 OK
    {
        "status": "error",
        "api_name": "/product/update_status/5f8546a6eb7b292138cd7226",
        "message": "Product doesn't exist.",
        "data": {}
    }
    */
    updateStatus: (req, res) => {
        try {

            var product_id = req.params.product_id;
            var status = req.body.status || "";

            var findPattern = { _id: ObjectID(product_id), is_deleted: 0 }
            var aggregateCondition = [
                { $match: findPattern }
            ];
            ProductServices.oneRecord(aggregateCondition).then(productdata => {
                productdata = productdata[0];
                if (productdata != null) {

                    var updatePattern = { is_active: status };
                    if (status == 0) {
                        updatePattern.auth_token = "";
                    }
                    ProductServices.updateRecord({ _id: productdata._id }, updatePattern).then(userObjRes => {

                        let resMsg = Messages.PRODUCT_STATUS_UPDATE_SUCCESS;
                        Response.send(req, res, 200, resMsg);

                    }).catch(err => {
                        let resMsg = Validation.getErrorMessage(err);
                        Response.send(req, res, 500, resMsg);
                    });

                } else {
                    let resMsg = Messages.PRODUCT_NOT_EXIST;
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
    * @api {delete} /user_service/admin/product/delete_product/:product_id Product - Delete
    * @apiGroup Admin - Product
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
    "api_name": "/product/delete_product/5f8546a6eb7b292138cd7226",
    "message": "Product has deleted successfully.",
    "data": {}
    }
    *
    * @apiErrorExample {json} Error-Example
    HTTP/1.1 400 OK
    {
        "status": "error",
       "api_name": "/product/delete_product/5f744d2ea1bd7f352c619577",
        "message": "Product doesn't exist.",
        "data": {}
    }
    */
    deleteProduct: (req, res) => {

        try {

            var product_id = req.params.product_id;

            var findPattern = { _id: ObjectID(product_id), is_deleted: 0 }
            var aggregateCondition = [
                { $match: findPattern }
            ];
            ProductServices.oneRecord(aggregateCondition).then(productdata => {
                productdata = productdata[0];
                if (productdata != null) {

                    var updatePattern = {
                        is_deleted: 1,
                    };

                    ProductServices.updateRecord({ _id: productdata._id }, updatePattern).then(userObjRes => {

                        let resMsg = Messages.PRODUCT_DELETE_SUCCESS;
                        Response.send(req, res, 200, resMsg);

                    }).catch(err => {
                        let resMsg = Validation.getErrorMessage(err);
                        Response.send(req, res, 500, resMsg);
                    });

                } else {
                    let resMsg = Messages.PRODUCT_NOT_EXIST;
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
      * @api {get} /user_service/admin/product/get_customization_types Product - Type
      * @apiGroup Admin - Product
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
     "api_name": "/product/get_customization_types",
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
     "api_name": "/product/get_customization_types",
     "message": "error.",
     "data": {}
     }
     */
    getCustomizationTypes: (req, res) => {

        try {

            var keyword = req.query.keyword || "";
            var status = req.query.status;
            var page = parseInt(req.query.page_no) || 1;
            var limit = 100;

            var findPattern = { 'is_deleted': 0, 'parent_id': { $exists: false } };
            var sortPattern = { createdAt: -1 };
            var aggregateCondition = [
                { $match: findPattern }
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
         * @api {post} /user_service/admin/product/get_customization_type_values  Product - Subtype 
         * @apigroup Admin - Product
         *
         * @apiHeaderExample {multipart/form-data} Header-Example
             {
                 "Content-Type": "multipart/form-data",
            }
        *
        * @apiParam {String} type_id Typer Id
        *
        * @apiSuccessExample {json} Success-Example
            HTTP/1.1 200 OK
            {
            "status": "success",
            "api_name": "/product/get_customization_type_values/5f87e04ab695872c68a55ba9",
            "message": "Product type list fetch successfully.",
            "data": [
                {
                    "_id": "5f87e098c1594a27f0b41be0",
                    "parent_id": "5f87e04ab695872c68a55ba9",
                    "is_active": 1,
                    "is_deleted": 0,
                    "name": "Color",
                    "createdAt": "2020-10-15T05:39:36.076Z",
                    "updatedAt": "2020-10-15T05:39:36.076Z",
                    "__v": 0
                }
            ]
        }
        *
        * @apiErrorExample {json} Error-Example
            HTTP/1.1 400 OK
            {
                "status": "error",
               "api_name": "/product/get_customization_type_values/5f87e04ab695872c68a55ba9",
                "message": "error.",
                "data": {}
            }
        */

    getCustomizationTypeValues: (req, res) => {

        try {

            var type_id = req.params.type_id || '';

            var findPattern = {
                is_deleted: 0,
                is_active: 1,
                parent_id: ObjectID(type_id)
            };
            CustomizationTypeServices.allRecord([{ $match: findPattern }]).then(typeResult => {

                var successMsg = Messages.PRODUCT_TYPE_VALUE_SUCCESS;
                Response.send(req, res, 200, successMsg, typeResult);

            }).catch(err => {

                var errorMess = Validation.getErrorMessage(err);
                Response.send(req, res, 500, errorMess);
            })

        } catch (err) {
            var errorMess = Validation.getErrorMessage(err);
            Response.send(req, res, 500, errorMess);
        }
    },



    /**
    * @api {get} /user_service/admin/product/get_product/:product_id Product - Details 
    * @apiGroup Admin - Product
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
   "api_name": "/product/get_product/5f883814eb8b082d3404edc8",
   "message": "Success",
   "data": [
       {
           "_id": "5f883814eb8b082d3404edc8",
           "name": "Redmi note 10",
           "images": [
               {
                   "_id": "5f883815eb8b082d3404edca",
                   "product_image_url": "http://192.168.1.69:3050/service/assets?service=user_service&filepath=uploads/product/5f883814eb8b082d3404edc8/1602762772996ArchitectureDiagram.png",
                   "product_image_thumb_url": "http://192.168.1.69:3050/service/assets?service=user_service&filepath=uploads/product/5f883814eb8b082d3404edc8/thumb_1602762772996ArchitectureDiagram.png"
               }
           ],
           "business_category": {
               "_id": "5f74508abd58a077d3db6329",
               "name": "Electronics"
           },
           "product_category": {
               "_id": "5f75b6292fa6b92669f3a7fb",
               "name": "Mobiles"
           },
           "product_subcategory": {
               "_id": "5f75b811a0236828b231fd68",
               "name": "Samsung"
           },
           "inventory": [
               {
                   "_id": "5f883814eb8b082d3404edc9",
                   "is_active": 1,
                   "inventry_name": "Red ,64 GB",
                   "product_id": "5f883814eb8b082d3404edc8",
                   "price": 500.5,
                   "product_quantity": 2,
                   "product_code": "Ele-Mob-Sam-4222-Red",
                   "ProductCustomizationData": [
                       {
                           "_id": "5f883815eb8b082d3404edcb",
                           "title": {
                               "_id": "5f8974d737fa3ff404686305",
                               "name": "RAMS",
                               "value": {
                                   "_id": "5f8974d737fa3ff404686308",
                                   "name": "5"
                               }
                           }
                       },
                       {
                           "_id": "5f883815eb8b082d3404edcd",
                           "title": {
                               "_id": "5f87e04ab695872c68a55ba9",
                               "name": "Color",
                               "value": {
                                   "_id": "5f8974d737fa3ff4046862ff",
                                   "name": "Red"
                               }
                           }
                       }
                   ]
               },
               {
                   "_id": "5f8e73f08a613f62470f6e20",
                   "is_active": 1,
                   "inventry_name": "Black ,64 GB",
                   "product_id": "5f883814eb8b082d3404edc8",
                   "price": 600.5,
                   "product_quantity": 2,
                   "product_code": "Ele-Mob-Sam-4222-Black",
                   "ProductCustomizationData": []
               }
           ]
       }
   ]
}
    *
    * @apiErrorExample {json} Error-Example
       HTTP/1.1 400 OK
       {
           "status": "error",
           "api_name": "/product/get_product/5f883814eb8b082d3404edc8",
           "message": "Error.",
           "data": {}
       }
   */


    getProductDetail: async (req, res) => {

        try {

            var product_id = req.params.product_id;
            var findPattern = { _id: ObjectID(product_id) };
            var aggregatefilter = [
                { $match: findPattern },
                {
                    $lookup: {
                        from: 'product_images',
                        let: { "images": "$images", },
                        pipeline: [
                            { $match: { $expr: { $in: ["$_id", "$$images"] } } },

                            {
                                $project: {
                                    'product_image_url': { $concat: [UPLOAD_FOLDER_URL + "/", { $toString: "$product_id" }, '/', "$image"] },
                                    "product_image_thumb_url": { $concat: [UPLOAD_FOLDER_URL + "/", { $toString: "$product_id" }, '/thumb_', "$image"] }
                                }
                            }
                        ],
                        as: 'ProductImagesData'
                    }
                },

                {
                    $lookup: {
                        from: 'business_categories',
                        let: { "id": "$business_category_id" },
                        pipeline: [
                            { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                            { $project: { "name": 1 } }
                        ],
                        as: 'businessCategoryData'
                    }
                },
                { $unwind: "$businessCategoryData" },

                {
                    $lookup: {
                        from: 'brands',
                        let: { "id": "$brand_id" },
                        pipeline: [
                            { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                            { $project: { "name": 1 } }
                        ],
                        as: 'BrandData'
                    }
                },
                { $unwind: "$BrandData" },

                {
                    $lookup: {
                        from: 'categories',
                        let: { "id": "$category_id" },
                        pipeline: [
                            { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                            { $project: { 'name': 1 } }],
                        as: 'CategoryData'
                    }
                },
                { $unwind: "$CategoryData" },

                {
                    $lookup: {
                        from: 'categories',
                        let: { "id": "$sub_category_id" },
                        pipeline: [
                            { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                            { $project: { 'name': 1 } }],
                        as: 'SubCategoryData'
                    }
                },
                { $unwind: "$SubCategoryData" },

                {
                    $lookup: {
                        from: 'product_inventories',
                        let: { "id": "$_id" },
                        pipeline: [
                            { $match: { $expr: { $eq: ["$product_id", "$$id"] } } },
                            { $match: { $expr: { $eq: ["$is_deleted", 0] } } },
                            {
                                $lookup: {
                                    from: 'product_customizations',
                                    let: { "id": "$_id", },
                                    pipeline: [
                                        { $match: { $expr: { $eq: ["$product_inventry_id", "$$id"] } } },
                                        { $match: { $expr: { $eq: ["$is_deleted", 0] } } },

                                        {
                                            $lookup: {
                                                from: 'customization_types',
                                                let: { "id": "$customization_type", "typevalue": "$customization_value" },
                                                pipeline: [
                                                    { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                                                    { $match: { $expr: { $eq: ["$is_deleted", 0] } } },
                                                    { $project: { name: 1, 'typevalue': "$$typevalue" } },
                                                    {
                                                        $lookup: {
                                                            from: 'customization_types',
                                                            let: { "tid": "$$typevalue" },
                                                            pipeline: [
                                                                { $match: { $expr: { $eq: ["$_id", "$$tid"] } } },
                                                                { $project: { "name": 1 } }
                                                            ],
                                                            as: 'ProductCustomizationValueData'
                                                        },

                                                    },
                                                    { $unwind: '$ProductCustomizationValueData' },
                                                    { $project: { "name": 1, "value": '$ProductCustomizationValueData', 'parent_id': 1 } }
                                                ],
                                                as: 'ProductCustomizationTypeData'
                                            }
                                        },
                                        { $unwind: '$ProductCustomizationTypeData' },
                                        {
                                            $project: {
                                                title: '$ProductCustomizationTypeData',
                                            }
                                        }
                                    ],
                                    as: 'ProductCustomizationData'
                                },
                            },
                            //  { $unwind: '$ProductCustomizationData' },
                            { $unset: ['createdAt', 'updatedAt', '__v', 'is_deleted'] },
                        ],
                        as: 'ProductInventoriesData'
                    }
                },
                // { $unwind: "$ProductInventoriesData" },
                {
                    $project: {
                        name: '$name',
                        images: '$ProductImagesData',
                        business_category: '$businessCategoryData',
                        product_category: '$CategoryData',
                        product_subcategory: '$SubCategoryData',
                        inventory: '$ProductInventoriesData',
                        description: '$description',
                        brand: '$BrandData'
                    }
                }
            ];

            ProductServices.oneRecord(aggregatefilter).then(productData => {

                if (productData) {

                    let resMsg = "Success";

                    Response.send(req, res, 200, resMsg, productData);

                } else {

                    let resMsg = Messages.PRODUCT_NOT_EXIST;

                    Response.send(req, res, 400, resMsg);

                }

            }).catch(err => {

                let resMsg = Validation.getErrorMessage(err);

                Response.send(req, res, 500, resMsg);

            })

        } catch (err) {

            Response.send(req, res, 500, err.message);

        }

    },




    /**
         * @api {delete} /user_service/admin/product/delete_product_image/:product_image_id Product - Delete Images
         * @apiGroup Admin - Product
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
         "api_name": "/product/delete_product_image/5f744d2ea1bd7f352c619577",
         "message": "Product image has deleted successfully.",
         "data": {}
         }
         *
         * @apiErrorExample {json} Error-Example
         HTTP/1.1 400 OK
         {
             "status": "error",
            "api_name": "/product/delete_product_image/5f744d2ea1bd7f352c619577",
             "message": "Product Image doesn't exist.",
             "data": {}
         }
         */

    deleteProductImages: (req, res) => {

        try {

            var product_image_id = ObjectID(req.body.product_image_id);
            var product_id = req.body.product_id;


            var findPattern = { _id: ObjectID(product_id), is_deleted: 0 }
            var aggregateCondition = [{
                $match: findPattern
            }];

            ProductServices.oneRecord(aggregateCondition).then(productdata => {

                let productImages = productdata[0].images;

                if (productImages != null) {

                    var index = "";
                    for (var i = 0; i < productImages.length; i++) {
                        if (productImages[i].equals(ObjectID(product_image_id))) {
                            index = i;
                            continue;
                        }
                    }

                    if (index.toString() != "") {

                        productImages.splice(index, 1);

                        var updateProduct = {
                            images: productImages,
                        }

                        ProductServices.updateRecord(findPattern, updateProduct).then(updatedProduct => {
                            let resMsg = Messages.PRODUCT_IMAGE_DELETE_SUCCESS;
                            Response.send(req, res, 200, resMsg);
                        }).catch(err => {
                            let resMsg = Validation.getErrorMessage(err);
                            Response.send(req, res, 500, resMsg);
                        })
                    }

                } else {
                    let resMsg = Messages.PRODUCT_IMAGE_NOT_EXIST;
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
            * @api {put}/user_service/admin/product/update_product_detail/:product_id  Product - Update Product deta
            * @apigroup Admin - Product
            * 
            * @apiHeaderExample {multipart/form-data} Header-Example
           {
           "Content-Type" : "mutipart/form-data",
           "Autherization" : "Bearer auth token"
           }
           *
           * @apiParam {String} name Name
           * @apiParam {String} business_category_id Business Category Id
           * @apiParam {String} category_id  Category Id
           * @apiParam {String} sub_category_id Sub Category Id
           * @apiParam {String} description Description 
           * @apiParam {Object} product_images   Formdata Image Object array
           *
           * @apiSuccessExample {json} Success-Example
           HTTP/1.1 200 OK
           {
           "status": "success",
           "api_name": "/product/update_product_detail/5f7c38339ed8b93ac4a93bff",
           "message": "Product details has updated successfully.",
           "data": {
               "images": [
                   "5f8fd74f1ea4c120d07b1bb3",
                   "5f8fd74f1ea4c120d07b1bb4"
               ],
               "is_active": 1,
               "is_deleted": 0,
               "_id": "5f7c38339ed8b93ac4a93bff",
               "name": "Maggi",
               "business_category_id": "5f73158c500ead10f8fcdca1",
               "category_id": "5f8040ee08707c11ecb09db8",
               "sub_category_id": "5f80412a08707c11ecb09db9",
               "createdAt": "2020-10-06T09:26:11.670Z",
               "updatedAt": "2020-10-21T06:38:07.937Z",
               "__v": 0,
               "product_image_url": "http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/product/5f7c38339ed8b93ac4a93bff/undefined",
               "product_image_thumb_url": "http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/product/5f7c38339ed8b93ac4a93bff/thumb_undefined",
               "id": "5f7c38339ed8b93ac4a93bff"
           }
        }
           *
           * @apiErrorExample {json} Error-Example
           HTTP/1.1 400 OK
           {
           "status": "error",
           "api_name": "/product/update_product_detail/5f7c38339ed8b93ac4a93bff",
           "message": "Error",
           "data": {}
           }
           */

    updateProductDetail: async (req, res) => {

        try {

            var product_id = req.params.product_id;

            var name = req.body.name || "";
            var business_category_id = req.body.business_category_id || "";
            var brand_id = req.body.brand_id || "";
            var category_id = req.body.category_id || "";
            var sub_category_id = req.body.sub_category_id || '';
            var description = req.body.description || "";
            var files = req.body.files || null;
            var image_name = [];

            var errors = [];

            if (files && files.product_images) {
                if (Array.isArray(files.product_images)) {
                    await files.product_images.forEach(function (arrayItem) {
                        if (Media.getMediaTypeByMimeType(arrayItem.mimetype) != "image") {
                            errors.push({ errField: arrayItem.name, errText: Messages.INVALID_IMAGE_FORMAT });
                        }
                    });
                } else {
                    if (Media.getMediaTypeByMimeType(files.product_images.mimetype) != "image") {
                        errors.push({ errField: files.product_images.name, errText: Messages.INVALID_IMAGE_FORMAT });
                    }
                }
            }

            // return errors
            if (errors.length > 0) {

                // error
                let resMsg = errors.pop().errText;
                Response.send(req, res, 400, resMsg, { errors: errors });

            } else {

                var findPattern = { _id: ObjectID(product_id), is_deleted: 0 }
                var aggregateCondition = [{
                    $match: findPattern
                }];
                ProductServices.oneRecord(aggregateCondition).then(async productdata => {

                    if (productdata) {

                        var updatePattern = {
                            name: name,
                            description: description,
                            business_category_id: business_category_id,
                            category_id: category_id,
                            sub_category_id: sub_category_id,
                            brand_id: brand_id
                        };


                        ProductServices.updateRecord(findPattern, updatePattern).then(async updatedRes => {
                            var existimages = updatedRes.images;
                            var updateResult = { _id: updatedRes._id };
                            if (files && files.product_images) {
                                if (Array.isArray(files.product_images)) {

                                    await files.product_images.reduce(async (promise, arrayItem) => {
                                        await promise;
                                        if (Media.getMediaTypeByMimeType(arrayItem.mimetype) != "image") {
                                            errors.push({ errField: arrayItem.name, errText: Messages.INVALID_IMAGE_FORMAT });
                                        } else {
                                            var fileName = await ProductServices.updateUserImage(updateResult, arrayItem);
                                            image_name.push(fileName);
                                        }
                                    }, Promise.resolve());

                                } else {
                                    if (Media.getMediaTypeByMimeType(files.product_images.mimetype) != "image") {
                                        errors.push({ errField: files.product_images.name, errText: Messages.INVALID_IMAGE_FORMAT });
                                    } else {
                                        var fileName = await ProductServices.updateUserImage(updateResult, files.product_images);
                                        image_name.push(fileName);
                                    }
                                }
                            }

                            var updateProduct = {
                                images: existimages.concat(image_name),
                                //is_active: 1,
                            }
                            ProductServices.updateRecord({ _id: updateResult }, updateProduct).then(updatedProduct => {
                                var successMsg = Messages.PRODUCT_UPDATE_SUCCESS;
                                Response.send(req, res, 200, successMsg, updatedProduct);
                            }).catch(err => {
                                let resMsg = Validation.getErrorMessage(err);
                                Response.send(req, res, 500, resMsg);
                            })

                        }).catch(err => {
                            let resMsg = Validation.getErrorMessage(err);
                            Response.send(req, res, 500, resMsg);
                        });

                    } else {
                        let resMsg = Messages.PRODUCT_NOT_EXIST;
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
        * @api {post}/user_service/admin/product/update_inventory_detail  Product - Update Inventory detail
        * @apigroup Admin - Product
        * 
        * @apiHeaderExample {multipart/form-data} Header-Example
       {
       "Content-Type" : "mutipart/form-data",
       "Autherization" : "Bearer auth token"
       }
       *
        * @apiParam {String} customize Customize array
        * @apiParam {String} price Price
        * @apiParam {String} inventory_name Inventory Name
        * @apiParam {String} product_id Product Id
        * @apiParam {String} inventory_id Inventry Id
        * @apiParam {String} quantity Quantity
       *
       * @apiSuccessExample {json} Success-Example
       HTTP/1.1 200 OK
       {
        "status": "success",
        "api_name": "/product/update_inventory_detail/5f8546a6eb7b292138cd7226",
        "message": "Product details has updated successfully.",
        "data": {
            "is_active": 0,
            "is_deleted": 0,
            "_id": "5f8546a6eb7b292138cd7226",
            "product_id": "5f7c38339ed8b93ac4a93bff",
            "price": 5000,
            "product_quantity": 3,
            "product_code": "dsada",
            "createdAt": "2020-10-13T06:18:14.063Z",
            "updatedAt": "2020-10-21T09:21:40.044Z",
            "__v": 0,
            "inventory_name": "demo namee",
            "id": "5f8546a6eb7b292138cd7226"
        }
    }
       *
       * @apiErrorExample {json} Error-Example
       HTTP/1.1 400 OK
       {
       "status": "error",
       "api_name": "/product/update_inventory_detail/5f8546a6eb7b292138cd7226",
       "message": "Error",
       "data": {}
       }
       */

    updateInventoryDetail: async (req, res) => {

        try {

            var inventory_id = req.body.inventory_id;

            var is_discount = req.body.is_discount || "";
            var discount_type = req.body.discount_type || "";
            var discount_value = req.body.discount_value || "";
            var discounted_product_price = req.body.discounted_product_price || "";

            var sku_code = req.body.sku_code || "";
            var sku_name = req.body.sku_name || "";
            var batch = req.body.batch || "";

            var price = req.body.price || "";
            var inventory_name = req.body.inventory_name || "";
            //var quantity = req.body.quantity || "";
            var product_id = req.body.product_id || "";
            var customize = req.body.customize || [];
            var warehouse_inventory = req.body.warehouse_inventory || [];
            var mrp=req.body.mrp;
            var tax_type=req.body.tax_type;
            var hsn_code=req.body.hsn_code;
            var inventory_product_code=req.body.inventory_product_code;
            var tax_rate=req.body.tax_rate;
            var taxable_amount=req.body.taxable_amount;
            var gst_amount=req.body.gst_amount;
            var cgst_rate=req.body.cgst_rate;
            var cgst_amount=req.body.cgst_amount;
            var sgst_rate=req.body.sgst_rate;
            var sgst_amount=req.body.sgst_amount;
            var igst_rate=req.body.igst_rate;
            var igst_amount=req.body.igst_amount;
            var min_inventory=req.body.min_inventory;

            warehouse_inventory = JSON.parse(warehouse_inventory);
            customize = JSON.parse(customize);

            var errors = [];
            if (inventory_id != "") {
                // return errors
                if (errors.length > 0) {

                    // error
                    let resMsg = errors.pop().errText;
                    Response.send(req, res, 400, resMsg, { errors: errors });

                } else {

                    var findPattern = { _id: ObjectID(inventory_id), is_deleted: 0 }

                    var aggregateCondition = [{
                        $match: findPattern
                    }];

                    ProductInventoryServices.oneRecord(aggregateCondition).then(async inventorydata => {

                        if (inventorydata) {

                            var updatePattern = {
                                is_discount: is_discount,
                                discount_type: discount_type,
                                discount_value: discount_value,
                                discounted_product_price: discounted_product_price,
                                price: price,
                                // product_quantity: quantity,
                                inventory_name: inventory_name,
                                sku_code: sku_code,
                                sku_name: sku_name,
                                batch: batch,
                                tax_type:tax_type,
                                hsn_code:hsn_code,
                                inventory_product_code:inventory_product_code,
                                tax_rate:tax_rate,
                                taxable_amount:taxable_amount,
                                gst_amount:gst_amount,
                                cgst_rate:cgst_rate,
                                cgst_amount:cgst_amount,
                                sgst_rate:sgst_rate,
                                sgst_amount:sgst_amount,
                                igst_rate:igst_rate,
                                igst_amount:igst_amount,
                                min_inventory:min_inventory
                            };
                            await ProductInventoryServices.updateRecord(findPattern, updatePattern).then(async updatedRes => {

                                var newData = updatedRes;

                                await customize.reduce(async (promise, customize, key) => {

                                    await promise;
                                    if (customize.id != "") {
                                        var updateProductInventry = {
                                            product_inventry_id: updatedRes._id,
                                            customization_type: customize.custom_type,
                                            customization_value: customize.custom_type_value
                                        }


                                        await ProductCustomizationServices.updateRecord({ _id: customize.id }, updateProductInventry).then(async updatedRes => {
                                            return;
                                        }).catch(err => {
                                            let resMsg = Validation.getErrorMessage(err);
                                            Response.send(req, res, 500, resMsg);
                                        });

                                    } else {
                                        var createProductInventry = {
                                            product_inventry_id: updatedRes._id,
                                            product_id: updatedRes.product_id,
                                            customization_type: customize.custom_type,
                                            customization_value: customize.custom_type_value
                                        }

                                        await ProductCustomizationServices.createRecord(createProductInventry).then(async customizersult => {
                                            return;
                                        }).catch(err => {
                                            let resMsg = Validation.getErrorMessage(err);
                                            Response.send(req, res, 500, resMsg);
                                        })
                                    }

                                }, Promise.resolve());



                                await warehouse_inventory.reduce(async (promise, newinventory, key) => {

                                    await promise;
                                    if (newinventory.id != "") {
                                        var newfindPattern = { _id: ObjectID(inventory_id), is_deleted: 0, "warehouseinventry._id": ObjectID(newinventory.id) };

                                        var updateProductInventry = {
                                            'warehouseinventry.$.warehouse_id': newinventory.warehouse_id,
                                            'warehouseinventry.$.quantity': newinventory.quantity,
                                        }



                                        await ProductInventoryServices.updateRecord(newfindPattern, { $set: updateProductInventry }).then(async updatedRes => {
                                            // console.log(updatedRes)
                                            newData = updatedRes;
                                        }).catch(err => {
                                            let resMsg = Validation.getErrorMessage(err);
                                            Response.send(req, res, 500, resMsg);
                                        });

                                    } else {

                                        var createProductInventry = {
                                            warehouse_id: newinventory.warehouse_id,
                                            quantity: newinventory.quantity,
                                        }
                                        await ProductInventoryServices.updateRecord(findPattern, { $push: { warehouseinventry: createProductInventry } }).then(async customizersult => {

                                            newData = customizersult;
                                            // updatedRes.warehouseinventry = 
                                        }).catch(err => {
                                            let resMsg = Validation.getErrorMessage(err);
                                            Response.send(req, res, 500, resMsg);
                                        })
                                    }

                                }, Promise.resolve());
                                console.log('ok');

                                var successMsg = Messages.PRODUCT_UPDATE_SUCCESS;
                                Response.send(req, res, 200, successMsg, newData);

                            }).catch(err => {
                                let resMsg = Validation.getErrorMessage(err);
                                Response.send(req, res, 500, resMsg);
                            });

                        } else {
                            let resMsg = Messages.PRODUCT_NOT_EXIST;
                            Response.send(req, res, 400, resMsg);
                        }

                    }).catch(err => {
                        let resMsg = Validation.getErrorMessage(err);
                        Response.send(req, res, 500, resMsg);
                    });
                }

            } else {

                var product_code = await ProductServices.genrateproductcode(product_id);
                var createProductInventry = {
                    product_id: product_id,
                    price: price,
                    is_discount: is_discount,
                    discount_type: discount_type,
                    discount_value: discount_value,
                    discounted_product_price: discounted_product_price,
                    // product_quantity: quantity,
                    inventory_name: inventory_name,
                    product_code: product_code,
                    sku_code: sku_code,
                    sku_name: sku_name,
                    batch: batch,

                    tax_type:tax_type,
                    hsn_code:hsn_code,
                    inventory_product_code:inventory_product_code,
                    tax_rate:tax_rate,
                    taxable_amount:taxable_amount,
                    gst_amount:gst_amount,
                    cgst_rate:cgst_rate,
                    cgst_amount:cgst_amount,
                    sgst_rate:sgst_rate,
                    sgst_amount:sgst_amount,
                    igst_rate:igst_rate,
                    igst_amount:igst_amount,
                    min_inventory:min_inventory,
                    is_active: 1
                };

                var addProductCustomization = await ProductInventoryServices.createRecord(createProductInventry).then(async resultInventry => {
                    // console.log(resultInventry);
                    await customize.reduce(async (promise, customize, key) => {

                        await promise;
                        var createProductInventry = {
                            product_inventry_id: resultInventry._id,
                            product_id: product_id,
                            customization_type: customize.custom_type,
                            customization_value: customize.custom_type_value
                        }

                        await ProductCustomizationServices.createRecord(createProductInventry).then(async customizersult => {
                            return true;
                        }).catch(err => {
                            let resMsg = Validation.getErrorMessage(err);
                            Response.send(req, res, 500, resMsg);
                        })
                    }, Promise.resolve());

                    await warehouse_inventory.reduce(async (promise, newinventory, key) => {

                        await promise;


                        var createProductInventry = {
                            warehouse_id: newinventory.warehouse_id,
                            quantity: newinventory.quantity,
                        }
                        await ProductInventoryServices.updateRecord({ _id: ObjectID(resultInventry._id) }, { $push: { warehouseinventry: createProductInventry } }).then(async customizersult => {
                            return true;
                            // updatedRes.warehouseinventry = 
                        }).catch(err => {
                            let resMsg = Validation.getErrorMessage(err);
                            Response.send(req, res, 500, resMsg);
                        });

                    }, Promise.resolve());

                }).catch(err => {
                    let resMsg = Validation.getErrorMessage(err);
                    Response.send(req, res, 500, resMsg);
                });

                Promise.all([addProductCustomization]).then((values) => {
                    var successMsg = "Success";
                    Response.send(req, res, 200, successMsg);
                });
            }

        } catch (err) {
            Response.send(req, res, 500, err.message);
        }
    },



    /**
     * @api {delete} /user_service/admin/product/delete_customize_data/:customize_id Product - Customize Data Delete
     * @apiGroup Admin - Product
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
    "api_name": "/product/delete_customize_data/5f8ffda451ae342f080fedbc",
    "message": "Product customize has deleted successfully.",
    "data": {}
}
    *
    * @apiErrorExample {json} Error-Example
    HTTP/1.1 400 OK
    {
    "status": "error",
    "api_name": "/product/delete_customize_data/5f8ffda451ae342f080fedbc",
    "message": "Data doesn't exist.",
    "data": {}
    }
    */
    deleteCustomizeData: (req, res) => {

        try {

            var customize_id = req.params.customize_id;

            var findPattern = { _id: ObjectID(customize_id) }
            var aggregateCondition = [{
                $match: findPattern
            }];

            ProductCustomizationServices.oneRecord(aggregateCondition).then(customizedata => {

                if (customizedata != null) {

                    var updatePattern = {
                        is_deleted: 1,
                    };

                    ProductCustomizationServices.updateRecord({ _id: findPattern }, updatePattern).then(userObjRes => {

                        let resMsg = Messages.CUSTOMIZE_DATA_DELETE_SUCCESS;
                        Response.send(req, res, 200, resMsg);

                    }).catch(err => {
                        let resMsg = Validation.getErrorMessage(err);
                        Response.send(req, res, 500, resMsg);
                    });

                } else {
                    let resMsg = Messages.CUSTOMIZE_DATA_NOT_EXIST;
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
         * @api {delete} /user_service/admin/product/delete_inventory_data/:inventory_id Product - Inventory Data Delete
         * @apiGroup Admin - Product
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
        "api_name": "/product/delete_inventory_data/5f8ffda451ae342f080fedbc",
        "message": "Product customize has deleted successfully.",
        "data": {}
    }
        *
        * @apiErrorExample {json} Error-Example
        HTTP/1.1 400 OK
        {
        "status": "error",
        "api_name": "/product/delete_customize_data/5f8ffda451ae342f080fedbc",
        "message": "Data doesn't exist.",
        "data": {}
        }
        */
    deleteInventoryData: (req, res) => {

        try {

            var inventory_id = req.params.inventory_id;

            var findPattern = { _id: ObjectID(inventory_id) }
            var aggregateCondition = [{
                $match: findPattern
            }];

            ProductInventoryServices.oneRecord(aggregateCondition).then(inventorydata => {

                if (inventorydata != null) {

                    var updatePattern = {
                        is_deleted: 1,
                    };

                    ProductInventoryServices.updateRecord({ _id: inventorydata._id }, updatePattern).then(userObjRes => {

                        ProductCustomizationServices.updateRecord({ inventory_id: userObjRes._id }, updatePattern).then(userObjRes => {

                            let resMsg = Messages.CUSTOMIZE_DATA_DELETE_SUCCESS;
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
                    let resMsg = Messages.CUSTOMIZE_DATA_NOT_EXIST;
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

    deleteWarehouseInventoryData: (req, res) => {
        try {
            var inventory_id = req.params.inventory_id;
            var warehouseinventory_id = req.params.warehouseinventory_id;

            ProductInventoryServices.updateRecord({ _id: ObjectID(inventory_id) }, { "$pull": { "warehouseinventry": { "_id": warehouseinventory_id } } }).then(userObjRes => {
                let resMsg = Messages.Warehouse_DATA_DELETE_SUCCESS;
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

module.exports = Products;