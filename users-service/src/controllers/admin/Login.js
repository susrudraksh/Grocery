'use strict';


const _ = require('lodash');
const { AdminServices,UserServices,BrandServices,WarehouseServices,BusinessCategoryServices,CategoryServices, BannerServices, NotificationServices } = require('../../services');
const { Response, Messages, Validation, Encryption, Common, Media ,Redis} = require('../../helpers');
const OtpServices = require('../../services/OtpServices');
const ProductServices = require('../../services/ProductServices');
const config = require('../../config');


const LoginController = {

    //++++++++++++++++++++++ GLOBAL ERRORS ++++++++++++++++++++++++++++++++++++++++

    /**
     * @api {All} / Global Errors
     * @apiGroup GlobalErrors
     *
     * @apiDescription These errors may occurs globally when either of other apis called. Each error has different status and reason of occurance. These all are for security purpose to protect apis access.
     *
     * @apiHeaderExample {multipart/form-data} Header-Example
        {
            "Content-Type": "multipart/form-data",
            "X-Access-Token": "Access token generated at client for every request.",
            "Authorization": "Auth token received from server after user login.",
            "login_user_id": "5f2bd5bf6d252675e46d0271",
        }
     *
     * @apiSuccess 200 OK
     * @apiError 400 Bad Request.
     * @apiError 401 Unauthorized.
     * @apiError 403 Forbidden.
     * @apiError 404 Not Found.
     * @apiError 500 Internal Server Error
     *
     * @apiSuccessExample {json} Success with Data
        HTTP/1.1 200 Response
        {
            "status": "success",
            "api_name": "login",
            "message": "Success",
            "data": {}
        }
     *
     * @apiSuccessExample {json} Success with Error
        HTTP/1.1 200 Response
        {
            "status": "error",
            "api_name": "login",
            "message": "Invalid Credentials.",
            "data": {}
        }
     *
     * @apiErrorExample {json} 400 Bad Request
        HTTP/1.1 400 Response
        {
            "status": "error",
            "api_name": "login",
            "message": "Bad Request.",
            "data": {}
        }
     *
     * @apiErrorExample {json} 401 Unauthorized
        HTTP/1.1 401 Response
        {
            "status": "error",
            "api_name": "login",
            "message": "Login session expired. Please login again to continue.",
            "data": {}
        }
     *
     * @apiErrorExample {json} 403 Forbidden
        HTTP/1.1 403 Response
        {
            "status": "error",
            "api_name": "login",
            "message": "You are not allowed to access webservices.",
            "data": {}
        }
     *
     * @apiErrorExample {json} 404 Not Found
        HTTP/1.1 404 Response
        {
            "status": "error",
            "api_name": "login",
            "message": "Not Found",
            "data": {}
        }
     *
     * @apiErrorExample {json} 500 Internal Server Error
        HTTP/1.1 500 Response
        {
          "status": "error",
          "api_name": "login",
          "message": "Can't set headers after they are sent.",
          "data": {}
        }
    */

    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    /**
     * @api {post} /user_service/admin/login Admin - Login
     * @apiGroup Admin - Login
     *
     * @apiHeaderExample {multipart/form-data} Header-Example
        {
            "Content-Type": "multipart/form-data",
        }
     *
     * @apiParam {String} username Username / Email
     * @apiParam {String} password Password
     *
     * @apiSuccessExample {json} Success-Example
        HTTP/1.1 200 OK
        {
            "status": "success",
            "api_name": "/admin_login",
            "message": "You have logged in successfully.",
            "data": {
                "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjE4Mjk1ZGQzNjRjODYwODYwNGI5OTIiLCJ1c2VyX3JvbGUiOiIxIiwidXNlcl9wZXJtaXNzaW9ucyI6Int9IiwiaWF0IjoxNjAxMDEyMDUyLCJleHAiOjE2MDEwOTg0NTJ9.0Ff-mg5FJgcv_zqtwhD-RbqtZG9wUO-j-t8aGK9HPow",
                "wallet": "0.00",
                "is_active": 1,
                "is_deleted": 0,
                "_id": "5f18295dd364c8608604b992",
                "username": "admin",
                "first_name": "Admin",
                "last_name": "admin",
                "email": "tivoadmin@mailinator.com",
                "country_code": "+91",
                "phone_no": 5656666666,
                "password": "$2a$10$pDvfNbADsrQE4USqsPpZC.Mv8piQo3bdHY7gzplBmkhE7xc96wVl2",
                "user_role": "1",
                "user_image": "1598531599011banner1.png",
                "user_permissions": "{}",
                "createdAt": "2020-02-10T08:47:06.799Z",
                "updatedAt": "2020-09-25T05:34:12.011Z",
                "__v": 0,
                "last_login_time": "2020-09-25T05:34:12.010Z",
                "user_image_url": "public/uploads/users//5f18295dd364c8608604b992/1598531599011banner1.png",
                "id": "5f18295dd364c8608604b992"
            }
        }
     *
     * @apiErrorExample {json} Error-Example
        HTTP/1.1 401 OK
        {
            "status": "error",
            "api_name": "admin_login",
            "message": "Login credentials are invalid.",
            "data": {}
        }
    */
    admin_login: (req, res) => {
        try {
            
            var username = _.trim(req.body.username) || "";
            var password = _.trim(req.body.password) || "";
            var findPattern = {
                "$or": [{ username: username }, { email: username }],
                is_deleted: 0
            };

            AdminServices.oneRecord(findPattern).then(admindata => {

                if (admindata) {
                    var checkRes = Encryption.compareBcryptEncryption(password, admindata.password);
                    if (checkRes) {
                        // if user is verified but not activated
                        if (admindata.is_active == 0) {

                            let resMsg = Messages.ACCOUNT_IS_DEACTIVATE;
                            Response.send(req, res, 400, resMsg);

                        } else {

                            var authToken = Encryption.getJwtEncryption({
                                login_user_id: admindata._id,
                                user_role: admindata.user_role,
                                user_permissions: admindata.user_permissions,
                            });

                            // Update auth token
                            let findPattern = { _id: admindata._id };
                            let updatePattern = {
                                auth_token: authToken,
                                last_login_time: new Date(),
                            };

                            AdminServices.updateRecord(findPattern, updatePattern).then(updateRes => {

                                var key = updateRes.user_role + "_" + updateRes._id;
                                Redis.hmset(["_auth_tokens", key, updateRes.auth_token], function (err, res) {
                                    if (err) console.log(err.toString())
                                });
                                let resMsg = Messages.LOGIN_SUCCESS;
                                Response.send(req, res, 200, resMsg, updateRes);
                            });
                        }

                    } else {
                        let resMsg = Messages.INVALID_LOGIN_CREDENTIALS;
                        Response.send(req, res, 401, resMsg);
                    }

                } else {
                    let resMsg = Messages.INVALID_USERNAME_EMAIL;
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
* @api {get} /user_service/admin/profile/ Admin - Get Profile
* @apiGroup Admin - Login
*
* @apiHeaderExample {multipart/form-data} Header-Example
 {
     "Content-Type": "multipart/form-data",
 }
*
* @apiSuccessExample {json} Success-Example
 HTTP/1.1 200 OK
 {
     "status": "success",
     "api_name": "/profile/5f18295dd364c8608604b992",
     "message": "Success",
     "data": {
         "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjE4Mjk1ZGQzNjRjODYwODYwNGI5OTIiLCJ1c2VyX3JvbGUiOiIxIiwidXNlcl9wZXJtaXNzaW9ucyI6Int9IiwiaWF0IjoxNjAxMDEyMDUyLCJleHAiOjE2MDEwOTg0NTJ9.0Ff-mg5FJgcv_zqtwhD-RbqtZG9wUO-j-t8aGK9HPow",
         "wallet": "0.00",
         "is_active": 1,
         "is_deleted": 0,
         "_id": "5f18295dd364c8608604b992",
         "username": "admin",
         "first_name": "Admin",
         "last_name": "admin",
         "email": "tivoadmin@mailinator.com",
         "country_code": "+91",
         "phone_no": 5656666666,
         "password": "$2a$10$pDvfNbADsrQE4USqsPpZC.Mv8piQo3bdHY7gzplBmkhE7xc96wVl2",
         "user_role": "1",
         "user_image": "1598531599011banner1.png",
         "user_permissions": "{}",
         "createdAt": "2020-02-10T08:47:06.799Z",
         "updatedAt": "2020-09-25T05:34:12.011Z",
         "__v": 0,
         "last_login_time": "2020-09-25T05:34:12.010Z",
         "user_image_url": "public/uploads/users//5f18295dd364c8608604b992/1598531599011banner1.png",
         "id": "5f18295dd364c8608604b992"
     }
 }
*
* @apiErrorExample {json} Error-Example
 HTTP/1.1 400 OK
 {
     "status": "error",
     "api_name": "/profile/5f18295dd364c8608604b992",
     "message": "Admin not exist.",
     "data": {}
 }
*/
    get_profile: (req, res) => {

        try {
            var login_user_id = Common.getUserdetailsBytoken(req.headers.authorization) || null;

            var findPattern = { _id: login_user_id, is_deleted: 0 };

            AdminServices.oneRecord(findPattern).then(admindata => {

                if (admindata) {
                    let resMsg = "Success";
                    Response.send(req, res, 200, resMsg, admindata);

                } else {
                    let resMsg = Messages.ADMIN_NOT_EXIST;
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
 * @api {put} /user_service/admin/update_profile Profile - Update
 * @apiGroup Admin - Login
 * @apiHeaderExample {multipart/form-data} Header-Example
    {
        "Content-Type": "multipart/form-data"
    }
 * @apiParam {String} username Username
 * @apiParam {String} email Email
 * @apiParam {String} phone Phone
*  @apiParam {Object} user_image Formdata Image Object

 

*  @apiSuccessExample {json} Success-Example

    HTTP/1.1 200 OK

    {
        "status": "success",
        "api_name": "/update_profile/5f18295dd364c8608604b992",
        "message": "Profile has updated successfully.",
        "data": {
            "_id": "5f18295dd364c8608604b992",
            "username": "admin",
            "first_name": "Admin",
           "last_name": "admin",
            "email": "tivoadmin@mailinator.com",
            "phone": "5656666666",
            "password": "$2a$10$.bk/R8sWp7oY1XVivtmsmuD0h2AEzWJfOU5So1mErSL/b4Hq64KpW",
            "user_role": "admin",
            "user_image": "1596105854180sampleprofilepic.png",
            "user_permissions": "{}",
            "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjE4Mjk1ZGQzNjRjODYwODYwNGI5OTIiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsInVzZXJfcGVybWlzc2lvbnMiOiJ7fSIsImlhdCI6MTU5NjEwNTAyMywiZXhwIjoxNTk2NzA5ODIzfQ.siG-2KlBTETi4lNytf6WQBD0rA8WDyJXtfYpQVBK0qQ",
            "is_active": 1,
            "is_deleted": 0,
            "createdAt": "2020-02-10T08:47:06.799Z",
            "updatedAt": "2020-07-30T10:44:14.184Z",
            "__v": 0,
            "user_image_url": "http://192.168.1.154:3031/uploads/admins/5f18295dd364c8608604b992/1596105854180sampleprofilepic.png",
            "user_image_thumb_url": "http://192.168.1.154:3031/uploads/admins/5f18295dd364c8608604b992/thumb_1596105854180sampleprofilepic.png",
            "id": "5f18295dd364c8608604b992"
        }
    }
 * @apiErrorExample {json} Error-Example

    HTTP/1.1 400 OK

    {
        "status": "error",
        "api_name": "update_profile",
        "message": "Admin doesn't exist.",
        "data": {}
    }
*/
    update_profile: (req, res) => {

        try {
            var login_user_id = Common.getUserdetailsBytoken(req.headers.authorization) || null;
            var username = req.body.username || "";
			var first_name = req.body.first_name;
			var last_name = req.body.last_name;
			var email = req.body.email;
			var phone = req.body.phone || "";
			var files = req.body.files || null;

            var errors = [];

            if (files && files.user_image && Media.getMediaTypeByMimeType(files.user_image.mimetype) != "image") {
            errors.push({ errField: "user_image", errText: Messages.INVALID_IMAGE_FORMAT });
        }
            // return errors
            if (errors.length > 0) {
                // error
                let resMsg = errors.pop().errText;
                Response.send(req, res, 500, resMsg, { errors: errors });

            } else {
                var findPattern = { _id: login_user_id, is_deleted: 0 }
                AdminServices.getAdminData(findPattern).then(async admindata => {

                    if (admindata) {
                        var updatePattern = {
                            username: username,
                            email: email,
                            phone_no: phone,
                        }
                        if (files && files.user_image) {
                            var fileName = await AdminServices.updateUserImage(admindata, files.user_image);
                            updatePattern.user_image = fileName;
                        }
                        AdminServices.updateRecord(findPattern, updatePattern).then(updatedRes => {
                            // success
                            let resMsg = Messages.ADMIN_UPDATE_SUCCESS;
                            Response.send(req, res, 200, resMsg, updatedRes);

                        }).catch(err => {
                            let resMsg = Validation.getErrorMessage(err);
                            Response.send(req, res, 500, resMsg);
                        });

                    } else {
                        let resMsg = Messages.ADMIN_NOT_EXIST;
                        Response.send(req, res, 400, resMsg);
                    }

                }).catch(err => {
                    let resMsg = Validation.getErrorMessage(err);
                    Response.send(req, res, 500, resMsg);
                });
            }
        } catch (err) {
            // create error logs on server crash

            Response.send(req, res, 500, err.message);
        }
    },


    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    /**
     * @api {put} /user_service/admin/change_password/ Admin - Change Password
     * @apiGroup Admin - Login
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
            "message": "Admin doesn't exist.",
            "data": {}
        }
    */

    change_password: (req, res) => {
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

                var findPattern = { _id: login_user_id, is_deleted: 0 }

                AdminServices.getAdminData(findPattern).then(admindata => {

                    if (admindata != null) {

                        var checkRes = Encryption.compareBcryptEncryption(old_password, admindata.password);

                        if (checkRes) {

                            var updatePattern = {
                                password: Encryption.getBcryptEncryption(new_password)
                            };

                            AdminServices.updateRecord({ _id: admindata._id }, updatePattern).then(userObjRes => {

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
                        let resMsg = Messages.ADMIN_NOT_EXIST;
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
    *    @api {post} /user_service/admin/profile/resend_otp Profile - Resend OTP
    *    @apiGroup Admin - Login
        
    *    @apiHeaderExample {multipart/form-data} Header-Example
            {
                "Content-Type": "multipart/form-data"
            }
        
      *  @apiParam {String} email Email
     *   @apiParam {String} otp_for OTP For What : forgot_password
        
     *   @apiSuccessExample {json} Success-Example
            HTTP/1.1 200 OK
            {
                "status": "success",
                "api_name": "/resend_otp",
                "message": "OTP has sent to your email.",
                "data": {
                    "_id": "5f18295dd364c8608604b992",
                    "email": "tivoadmin@mailinator.com"
                }
            }
        
    *    @apiErrorExample {json} Error-Example
            HTTP/1.1 400 OK
            {
                "status": "error",
                "api_name": "resend_otp",
                "message": "User email is not exist.",
                "data": {}
            }
    */

    resend_otp: (req, res) => {

        try {

            var email = req.body.email;
            var otp_for = req.body.otp_for;

            var findPattern = {
                email: email,
                is_deleted: 0
            };

            AdminServices.getAdminData(findPattern).then(admindata => {

                if (admindata) {

                    var createOtpPattern = {};
                    createOtpPattern.user_id = admindata._id;
                    createOtpPattern.email = admindata.email;
                    createOtpPattern.user_role = admindata.user_role;
                    createOtpPattern.otp_for = otp_for;

                    OtpServices.saveAndSendOtp(createOtpPattern).then(otpRes => {

                        let resMsg = Messages.OTP_SENT_ON_EMAIL;
                        Response.send(req, res, 200, resMsg, {
                            _id: admindata._id,
                            email: admindata.email,
                            otp_number: otpRes.otp_number
                        });

                    }).catch(err => {
                        let resMsg = Validation.getErrorMessage(err);
                        Response.send(req, res, 500, resMsg);
                    });

                } else {
                    let resMsg = Messages.INVALID_EMAIL;
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
    *  @api {post} /user_service/admin/profile/update_forgot_password Profile - Update Forgot Password
    *  @apiGroup Admin - Login
     
    *  @apiHeaderExample {multipart/form-data} Header-Example
        {
            "Content-Type": "multipart/form-data"
        }
     
    *  @apiParam {String} email User Email
    *  @apiParam {String} user_id User Id
    *  @apiParam {String} new_password New Password
    *  @apiParam {String} otp_number OTP Number
    *  @apiParam {String} otp_for OTP For What : forgot_password
     
    *  @apiSuccessExample {json} Success-Example
        HTTP/1.1 200 OK
        {
            "status": "success",
            "api_name": "update_forgot_password",
            "message": "You have changed password successfully.",
            "data": {}
        }
     
    *  @apiErrorExample {json} Error-Example
        HTTP/1.1 400 OK
        {
            "status": "error",
            "api_name": "update_forgot_password",
            "message": "Invalid email. User doesn't exist.",
            "data": {}
        }
    */
    update_forgot_password: (req, res) => {

        try {

            var user_id = req.body.user_id;
            var email = req.body.email;
            var new_password = req.body.new_password;
            var otp_number = req.body.otp_number;
            var otp_for = req.body.otp_for;

            var findPattern = { email: email, is_deleted: 0 }

            AdminServices.getAdminData(findPattern).then(admindata => {

                if (admindata != null) {

                    var userId = admindata._id.toString();

                    if (userId == user_id) {

                        var findOtpPattern = {};
                        findOtpPattern.user_id = admindata._id;
                        findOtpPattern.email = admindata.email;
                        findOtpPattern.user_role = admindata.user_role;
                        findOtpPattern.otp_for = otp_for;

                        OtpServices.oneRecord(findOtpPattern).then(otpCheckRes => {

                            if (otpCheckRes && otpCheckRes.otp_number == otp_number) {

                                OtpServices.deleteRecord(findOtpPattern).then(otpDeleteRes => {

                                    var updatePattern = {
                                        password: Encryption.getBcryptEncryption(new_password)
                                    };

                                    AdminServices.updateRecord({ _id: admindata._id }, updatePattern).then(userObjRes => {

                                        let resMsg = Messages.CHANGE_PASSWORD_SUCCESS;
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
                                let resMsg = Messages.INVALID_OTP;
                                Response.send(req, res, 400, resMsg);
                            }

                        }).catch(err => {
                            let resMsg = Validation.getErrorMessage(err);
                            Response.send(req, res, 500, resMsg);
                        });

                    } else {
                        let resMsg = Messages.INVALID_USER_REQUEST;
                        Response.send(req, res, 400, resMsg);
                    }

                } else {
                    let resMsg = Messages.INVALID_EMAIL;
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
     * @api {put} /user_service/admin/profile/logout Profile - Logout
     * @apiGroup Admin - Login
     *
     * @apiHeaderExample {multipart/form-data} Header-Example
        {
            "Content-Type": "multipart/form-data",
        }
     *
     * @apiSuccessExample {json} Success-Example
        HTTP/1.1 200 OK
        {
            "status": "success",
            "api_name": "/admin_logout/5f1ea69772b93269067003c5",
            "message": "You have logged out successfully.",
            "data": {}
        }
     *
     * @apiErrorExample {json} Error-Example
        HTTP/1.1 400 OK
        {
            "status": "error",
            "api_name": "/admin_logout/5f1ea69772b93269067003c5",
            "message": "Error.",
            "data": {}
        }
    */
    admin_logout: (req, res) => {

        try {

            var login_user_id = Common.getUserdetailsBytoken(req.headers.authorization) || null;

            // Update auth token
            let findPattern = { _id: login_user_id };
            let updatePattern = { auth_token: "" };

            AdminServices.updateRecord(findPattern, updatePattern).then(updatedUserData => {
                // success
                let resMsg = Messages.LOGOUT_SUCCESS;
                Response.send(req, res, 200, resMsg);

            }).catch(err => {
                let resMsg = Validation.getErrorMessage(err);
                Response.send(req, res, 500, resMsg);
            });

        } catch (err) {
            Response.send(req, res, 500, err.message);
        }
    },

     /**
     * @api {put} /user_service/admin/profile/dashboard Profile - Dashboard
     * @apiGroup Admin - Login
     *
     * @apiHeaderExample {multipart/form-data} Header-Example
    {
    "Content-Type": "multipart/form-data",
    }
    * 
    * @apiSuccessExample {json} Success-Example
    HTTP/1.1 200 OK
    {
    "status": "success",
    "api_name": "/profile/get_dashboard_data",
    "message": "Success",
    "data": {
    "customersCount": 2,
    "driversCount": 7,
    "brandsCount": 2,
    "warehouseCount": 2,
    "businessCategoryCount": 3,
    "productCategoryCount": 3
    }
    }
    *
    * @apiErrorExample {json} Error-Example
    HTTP/1.1 400 OK
    {
    "status": "error",
    "api_name": "/profile/get_dashboard_data",
    "message": "Error.",
    "data": {}
    }
    */
   getDashboardData: async (req, res) => {

    try {
        var login_user_id = Common.getUserdetailsBytoken(req.headers.authorization) || null;

        var start_date = req.query.start_date || "";
        var end_date = req.query.end_date || "";

        var datePattern = {};

        if (start_date != "" || end_date != "") {
            datePattern["$and"] = [];
        }

        if (start_date != "") {
            datePattern["$and"].push({ createdAt: { "$gte": new Date(start_date) } });
        }

        if (end_date != "") {

            var endDate = new Date(end_date);
            endDate = endDate.setDate(endDate.getDate() + 1);
            datePattern["$and"].push({ createdAt: { "$lt": new Date(endDate) } });
        }

        var findCustomerPattern = {...datePattern, ...{ is_deleted: 0, user_role: 3 }} ;
        var findDriverPattern = {...datePattern, ...{is_deleted: 0, user_role: 4 }};
        var findBrandPattern = {...datePattern, ...{is_deleted: 0 }};
        var findWarehousePattern = {...datePattern, ...{is_deleted: 0 }};
        var findBusinessCategoryPattern = {...datePattern, ...{is_deleted: 0 }};
        var findProductCategoryPattern = {...datePattern, ...{is_deleted: 0 }};
        var findProduct = {...datePattern, ...{is_deleted: 0 }};
        var findBanner = {...datePattern, ...{is_deleted: 0 }};
        var findSubadmin = {...datePattern, ...{is_deleted: 0, user_role:2 }};

        var customersCount = await UserServices.getDataCount(findCustomerPattern);
        var driversCount = await UserServices.getDataCount(findDriverPattern);
        var brandsCount = await BrandServices.getDataCount(findBrandPattern);
        var warehouseCount = await WarehouseServices.getDataCount(findWarehousePattern);
        var businessCategoryCount = await BusinessCategoryServices.getDataCount(findBusinessCategoryPattern);
        var productCategoryCount = await CategoryServices.getDataCount(findProductCategoryPattern);
        var productCount = await ProductServices.getDataCount(findProduct);
        var bannersCount = await BannerServices.getDataCount(findBanner);
        var subadminCount = await AdminServices.getDataCount(findSubadmin);

        var NotificationCount = await NotificationServices.getDataCount({user_type:1,read_status:0});
        // success
        let resMsg = "Success";
        Response.send(req, res, 200, resMsg, {
            customersCount: customersCount,
            driversCount: driversCount,
            brandsCount: brandsCount,
            warehouseCount: warehouseCount,
            businessCategoryCount: businessCategoryCount,
            productCategoryCount: productCategoryCount,
            productCount:productCount,
            bannersCount:bannersCount,
            subadminCount:subadminCount,
            NotificationCount:NotificationCount
        });

    } catch (err) {
        Response.send(req, res, 500, err.message);
    }
}
}
module.exports = LoginController;