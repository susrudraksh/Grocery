"use strict";
const { UserServices, OtpServices } = require("../../services/");
const {
    Response,
    Messages,
    Validation,
    SendMail,
    CryptData,
    Encryption, Media
} = require("../../helpers");
const Common = require("../../helpers/Common");
const config = require("../../config");
const { ObjectID } = require("mongodb");
const ejs = require("ejs");
const UPLOAD_FOLDER_URL = config.apiGatewayUrl + "/service/assets?service=user_service&filepath=uploads/users";


const DriverProfile = {
    /**
     * @api {get} /user_service/driver/profile/get_profile Profile - Get Profile  Driver
     * @apiGroup App - Driver - Profile
     *
     * @apiHeaderExample {multipart/form-data} Header-Example
        {
            "Content-Type": "multipart/form-data",
            "Authorization": "Bearer token"
        }
     *
     * @apiSuccessExample {json} Success-Example
        HTTP/1.1 200 OK
        {
        "status": "success",
        "api_name": "/profile/get_profile",
        "message": "Data fetch successfully",
        "data": {
            "_id": "5f804f253bb6af24919995a0",
            "username": "Test Driver",
            "email": "testdriver@gmail.com",
            "country_code": "91",
            "phone": "7867868767",
            "online_status": 0,
            "vehicle_no": "fg15r255",
            "user_image_url": "http://13.235.188.102:3060/service/assets?service=user_service&filepath=uploads/users/5f804f253bb6af24919995a0/1602739039485zuckerberg.jpg",
            "user_image_thumb_url": "http://13.235.188.102:3060/service/assets?service=user_service&filepath=uploads/users/5f804f253bb6af24919995a0/thumb_1602739039485zuckerberg.jpg"
        }
    }
     *
     * @apiErrorExample {json} Error-Example
        HTTP/1.1 200 OK
        {
            "status": "error",
            "api_name": "profile/get_profile",
            "message": "Invalid data.",
            "data": {}
        }
    */


    getProfile: (req, res) => {
        try {
            var login_user_id = Common.getUserdetailsBytoken(req.headers.authorization) || null;
            var aggregateFilter = [
                { $match: { _id: ObjectID(login_user_id), 'user_role': 4 } },
                {
                    $project: {
                        'user_image_url': { $concat: [UPLOAD_FOLDER_URL + "/", { $toString: "$_id" }, '/', "$user_image"] },
                        "user_image_thumb_url": { $concat: [UPLOAD_FOLDER_URL + "/", { $toString: "$_id" }, '/thumb_', "$user_image"] },
                        country_code: 1, email: 1, phone: 1, username: 1, online_status: 1, vehicle_no: 1
                    }
                }
            ];

            UserServices.oneRecord(aggregateFilter)
                .then((userResult) => {
                    if (userResult) {
                        var successMsg = Messages.DATA_FETCH_SUCCESSFULLY;
                        Response.send(req, res, 200, successMsg, userResult);
                    } else {
                        var errorMess = Messages.INVALID_USERNAME_EMAIL;
                        Response.send(req, res, 400, errorMess);
                    }
                })
                .catch((err) => {
                    var errorMess = Validation.getErrorMessage(err);
                    Response.send(req, res, 500, errorMess);
                });
        } catch (err) {
            Response.send(req, res, 500, err.message);
        }

    },












    /**
   * @api {post} /user_service/driver/profile/update_profile Profile - Update Profile  Driver
   * @apiGroup App - Driver - Profile
   *
   * @apiHeaderExample {multipart/form-data} Header-Example
      {
          "Content-Type": "multipart/form-data",
          "Authorization": "Bearer token"
      }
   *
   * @apiParam {String} field_key (new_email,new_phone,username,vehicle_no,user_image)
   * @apiParam {String} field_value (Phone/Email)
   *
   * @apiSuccessExample {json} Success-Example
      HTTP/1.1 200 OK
      {
          "status": "success",
          "api_name": "/profile/update_profile",
          "message": "Please verify Email which is sent to your email id.",
          "data": {}
      }
   *
   * @apiErrorExample {json} Error-Example
      HTTP/1.1 400 OK
      {
          "status": "error",
          "api_name": "driver/profile/update_profile",
          "message": "Invalid data.",
          "data": {}
      }
  */


    updateProfile: (req, res) => {
        try {
            var field_key = req.body.field_key || "";
            var field_value = req.body.field_value || "";
            var login_user_id = Common.getUserdetailsBytoken(req.headers.authorization) || null;
            var findPattern = {
                user_role: 4,
                is_deleted: 0,
                is_user_verified: 1,
                _id: ObjectID(login_user_id),
            };
            var aggregateFilter = [
                { $match: findPattern }
            ];
            var allowfields = ["new_email", "new_phone", "username", "online_status", "vehicle_no", "user_image"];

            if (allowfields.indexOf(field_key) != -1) {
                if (field_key == 'new_email' || field_key == 'new_phone') {
                    if (field_key == 'new_email') {
                        var aggregatesearchFilter = [
                            {
                                $match: {
                                    is_deleted: 0, is_user_verified: 1, email: field_value, is_email_verified: 1, _id: {
                                        $nin: [login_user_id],
                                    }
                                }
                            }
                        ];
                    } else {
                        var aggregatesearchFilter = [
                            {
                                $match: {
                                    is_deleted: 0, is_user_verified: 1, country_code: '91', phone: field_value, _id: {
                                        $nin: [login_user_id],
                                    }
                                }
                            }
                        ];
                    }
                    UserServices.oneRecord(aggregatesearchFilter)
                        .then((updateRecod) => {
                            if (updateRecod) {
                                if (field_key == 'new_email') {
                                    var errorMess = Messages.EMAIL_ALREADY_REGISTERED;
                                    Response.send(req, res, 400, errorMess);
                                } if (field_key == 'new_phone') {
                                    var errorMess = Messages.PHONE_ALREADY_REGISTERED;
                                    Response.send(req, res, 400, errorMess);
                                }
                            }
                        });
                }



                UserServices.oneRecord(aggregateFilter)
                    .then(async (userResult) => {
                        if (userResult) {
                            if (field_key == "" && field_value == "") {
                                var errorMess = Messages.FIELD_VALUE_INVALID;
                                Response.send(req, res, 200, errorMess);
                            }
                            var updateData = {};
                            updateData[req.body.field_key] = field_value;
                            if (field_key == "new_email") {
                                var createOtpPattern = {};
                                createOtpPattern.user_id = userResult._id;
                                createOtpPattern.email = req.body.field_value;
                                createOtpPattern.otp_for = 'email_verify';
                                createOtpPattern.user_role = 4;

                                await OtpServices.saveAndSendOtp(createOtpPattern).then(resultOtp => {

                                    var token = Common.generateRandomNumber(12);
                                    var user_id = login_user_id;
                                    let encryptDataID = CryptData.encrypt(user_id);
                                    let encryptDataToken = CryptData.encrypt(token);
                                    var returnData = {
                                        encryptDataID,
                                        encryptDataToken,
                                    };
                                    var customData = {};
                                    customData.name = userResult.username;
                                    customData.otp_number = resultOtp.otp_number;
                                    customData.siteTitle = config.siteTitle;
                                    var filePath = config.rootPath + "/src/views/email_templates/send_otp.ejs";

                                    ejs.renderFile(filePath, customData, (err, data) => {
                                        if (err) {
                                            throw err;
                                        } else {
                                            var subject = "Verify Email";
                                            SendMail.sendEmail(field_value, subject, data);
                                        }
                                    });
                                    let resMsg = Messages.VERIFY_EMAIL;
                                    Response.send(req, res, 200, resMsg, {
                                        otp_for: 'email_verify',
                                        country_code: '91',
                                        phone: req.body.field_value,
                                        otp_number: resultOtp.otp_number
                                    });
                                    return;
                                }).catch(err => {
                                    let errorMsg = Validation.getErrorMessage(err);
                                    Response.send(req, res, 200, errorMsg);
                                })
                            }
                            if (field_key == "new_phone") {
                                var createOtpPattern = {};
                                createOtpPattern.user_id = userResult._id;
                                createOtpPattern.country_code = '91';
                                createOtpPattern.phone = req.body.field_value;
                                createOtpPattern.otp_for = 'phone_verify';
                                createOtpPattern.user_role = 4;
                                await OtpServices.saveAndSendOtp(createOtpPattern).then(resultOtp => {
                                    let resMsg = Messages.OTP_SENT_ON_PHONE;
                                    Response.send(req, res, 200, resMsg, {
                                        country_code: '91',
                                        phone: req.body.field_value,
                                        otp_number: resultOtp.otp_number,
                                        otp_for: 'phone_verify',
                                    });

                                }).catch(err => {
                                    let errorMsg = Validation.getErrorMessage(err);
                                    Response.send(req, res, 200, errorMsg);
                                })
                            }
                            if (field_key == "user_image") {
                                var files = req.body.files || null;
                                var errors = [];
                                console.log(files);
                                if (files && files.user_image && Media.getMediaTypeByMimeType(files.user_image.mimetype) != "image") {
                                    errors.push({ errField: "user_image", errText: Messages.INVALID_IMAGE_FORMAT });
                                }
                                // return errors
                                if (errors.length > 0) {
                                    let resMsg = errors.pop().errText;
                                    Response.send(req, res, 400, resMsg, { errors: errors });
                                }
                                if (files && files.field_value) {
                                    var fileName = await UserServices.updateUserImage(userResult, files.field_value);
                                    updateData.user_image = fileName;
                                }
                            }
                            var select = 'user_image_url user_image email _id phone email country_code username  is_user_verified is_email_verified '
                            UserServices.updateRecord({ _id: userResult._id }, updateData, select)
                                .then((updateRecod) => {

                                    if (field_key == "email") {
                                        var sussMessage = Messages.VERIFY_EMAIL;
                                    } else {
                                        var sussMessage = Messages.CHANGE_PROFILE_SUCCESS;
                                    }
                                    Response.send(req, res, 200, sussMessage, updateRecod);
                                })
                                .catch((err) => {
                                    var errorMess = Validation.getErrorMessage(err);
                                    Response.send(req, res, 500, errorMess);
                                });
                        } else {
                            var errorMess = Messages.INVALID_USERNAME_EMAIL;
                            Response.send(req, res, 400, errorMess);
                        }
                    })
                    .catch((err) => {
                        var errorMess = Validation.getErrorMessage(err);
                        Response.send(req, res, 500, errorMess);
                    });
            } else {
                var errorMess = Messages.FIELD_VALUE_INVALID;
                Response.send(req, res, 400, errorMess);
            }
        } catch (err) {
            Response.send(req, res, 500, err.message);
        }
    },


    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    /**
     * @api {post} /user_service/driver/profile/change_password Profile - Change Password
     * @apiGroup App - Driver - Profile
     *
     * @apiHeaderExample {multipart/form-data} Header-Example
        {
            "Content-Type": "multipart/form-data"
        }
     *
     * @apiParam {String} old_password Old Password
     * @apiParam {String} new_password New Password
     *
     * @apiSuccessExample {json} Success-Example
        HTTP/1.1 200 OK
        {
            "status": "success",
            "api_name": "change_password",
            "message": "You have changed password successfully.",
            "data": {}
        }
     *
     * @apiErrorExample {json} Error-Example
        HTTP/1.1 400 OK
        {
            "status": "error",
            "api_name": "change_password",
            "message": "User doesn't exist.",
            "data": {}
        }
    */
    changePassword: (req, res) => {
        try {

            var login_user_id = Common.getUserdetailsBytoken(req.headers.authorization) || null;
            var old_password = req.body.old_password || "";
            var new_password = req.body.new_password || "";
            var errors = [];
            if (!old_password || old_password == "") {
                errors.push({ errField: "old_password", errText: "Old Password field is empty." });
            }
            if (!new_password || new_password == "") {
                errors.push({ errField: "new_password", errText: "New Password is empty." });
            }
            // return errors
            if (errors.length > 0) {
                // error
                let resMsg = errors.pop().errText;
                Response.send(req, res, 400, resMsg, { errors: errors });

            } else {
                var findPattern = { _id: ObjectID(login_user_id), is_deleted: 0 }
                var aggregateFilter = [
                    { $match: findPattern }
                ]
                UserServices.oneRecord(aggregateFilter).then(userData => {
                    if (userData != null) {
                        var checkRes = Encryption.compareBcryptEncryption(old_password, userData.password);
                        if (checkRes) {
                            var updatePattern = {
                                password: Encryption.getBcryptEncryption(new_password)
                            };
                            UserServices.updateRecord({ _id: userData._id }, updatePattern).then(userObjRes => {

                                let resMsg = Messages.CHANGE_PASSWORD_SUCCESS;
                                Response.send(req, res, 200, resMsg);

                            }).catch(err => {
                                let resMsg = Validation.getErrorMessage(err);
                                Response.send(req, res, 500, resMsg);
                            });

                        } else {
                            let resMsg = Messages.INVALID_OLD_PASSWORD;
                            Response.send(req, res, 400, resMsg);
                        }

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




    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    /**
     * @api {put} /user_service/driver/profile/change_online_status Profile - Change Online Status
     * @apiGroup App - Driver - Profile
     *
     * @apiHeaderExample {multipart/form-data} Header-Example
        {
            "Content-Type": "multipart/form-data"
        }
     *
     * @apiParam {String} status Status
     *
     * @apiSuccessExample {json} Success-Example
        HTTP/1.1 200 OK
        {
            "status": "success",
            "api_name": "change_online_status",
            "message": "You have changed password successfully.",
            "data": {}
        }
     *
     * @apiErrorExample {json} Error-Example
        HTTP/1.1 400 OK
        {
            "status": "error",
            "api_name": "change_online_status",
            "message": "User doesn't exist.",
            "data": {}
        }
    */
    changeOnlineStatus: (req, res) => {
        try {

            var login_user_id = Common.getUserdetailsBytoken(req.headers.authorization) || null;
            var status = req.body.status || 0;
            var errors = [];
            // return errors

            var findPattern = { _id: ObjectID(login_user_id) }
            var aggregateFilter = [
                { $match: findPattern }
            ]
            UserServices.oneRecord(aggregateFilter).then(userData => {
                if (userData) {

                    var updatePattern = {
                        online_status: status
                    };
                    UserServices.updateRecord({ _id: userData._id }, updatePattern).then(userObjRes => {

                        let resMsg = Messages.USER_STATUS_UPDATE_SUCCESS;
                        Response.send(req, res, 200, resMsg, userObjRes);

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

        } catch (err) {
            Response.send(req, res, 500, err.message);
        }
    },


    
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    /**
     * @api {put} /user_service/driver/profile/update_location Profile - Location update
     * @apiGroup App - Driver - Profile
     *
     * @apiHeaderExample {multipart/form-data} Header-Example
        {
            "Content-Type": "multipart/form-data"
        }
     *
     * @apiParam {String} latitude latitude
     * @apiParam {String} longitude longitude
     *
     * @apiSuccessExample {json} Success-Example
        HTTP/1.1 200 OK
        {
            "status": "success",
            "api_name": "update_location",
            "message": "User location  has updated successfully",
            "data": {}
        }
     *
     * @apiErrorExample {json} Error-Example
        HTTP/1.1 400 OK
        {
            "status": "error",
            "api_name": "update_location",
            "message": "User doesn't exist.",
            "data": {}
        }
    */

    updateLocation : (req,res)=>{
        var latitude  =  req.body.latitude;
        var longitude  =  req.body.longitude;
        var login_user_id = Common.getUserdetailsBytoken(req.headers.authorization) || null;
        try {
            var errors = [];
            if (!latitude || latitude == "") {
                errors.push({ errField: "latitude", errText: "latitude field is empty." });
            }
            if (!longitude || longitude == "") {
                errors.push({ errField: "longitude", errText: "longitude is empty." });
            }
            // return errors
            if (errors.length > 0) {
                // error
                let resMsg = errors.pop().errText;
                Response.send(req, res, 400, resMsg, { errors: errors });

            } else {
                var updatePattern = {};
                updatePattern.geoLocation = {
                    type: "Point",
                    coordinates: [
                        parseFloat(longitude),
                        parseFloat(latitude)
                    ]
                }
                UserServices.updateRecord({ _id: ObjectID(login_user_id)}, updatePattern).then(updatedRes => {
                    // success
                    let resMsg = Messages.USERLOCATION_UPDATE_SUCCESS;
                    Response.send(req, res, 200, resMsg, updatedRes);

                }).catch(err => {
                    let resMsg = Validation.getErrorMessage(err);
                    Response.send(req, res, 500, resMsg);
                });
            }
        }catch(err){
            let resMsg = Validation.getErrorMessage(err);
            Response.send(req, res, 500, resMsg);
        }
            
    }

};

module.exports = DriverProfile;
