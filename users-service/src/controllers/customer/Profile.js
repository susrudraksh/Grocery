"use strict";

const { UserServices, OtpServices } = require("../../services/");
const {
  Response,
  Messages,
  Validation,
  SendMail,
  Encryption,
  CryptData,Media
} = require("../../helpers");
const Common = require("../../helpers/Common");
const config = require("../../config");
const ejs = require("ejs");
const { ObjectID } = require("mongodb");
const { filter } = require("lodash");
const UPLOAD_FOLDER_URL = config.apiGatewayUrl + "/service/assets?service=user_service&filepath=uploads/users";


const Customer = {
  /**
 * @api {post} /user_service/customer/verify_email Customer  - Verify Email
* @apiGroup App - Customer - Verify Email
 *
 * @apiHeaderExample {multipart/form-data} Header-Example
    {
        "Content-Type": "multipart/form-data",
    }
 *
 * @apiParam {String} token Token
 *
 * @apiSuccessExample {json} Success-Example
    HTTP/1.1 200 OK
    { 
     Render ejs template
    }
 *
 * @apiErrorExample {json} Error-Example
    HTTP/1.1 400 OK
    {
        "status": "error",
        "api_name": "/verify_email",
        "message": "Invalid Email.",
        "data": {}
    }
*/

  verifyEmail: (req, res) => {
    try {
      var token = req.params.token;
      var user_id = req.params.user_id;
      var tokenData = token.split("-");
      var tokenObj = {
            iv: tokenData[0],
            encryptedData: tokenData[1],
      };
      var userData = user_id.split("-");
      var userObj = {
            iv: userData[0],
            encryptedData: userData[1],
      };
      let decryptToken = CryptData.decrypt(tokenObj);
      let decryptId = CryptData.decrypt(userObj);
      var findPattern = {
          email_token: decryptToken.toString(),
          _id: ObjectID(decryptId),
          is_deleted: 0,
      };
      var aggregateFilter = [
       { $match:findPattern}
      ];

      UserServices.oneRecord(aggregateFilter).then((userResult) => {
          if (userResult) {
              var updatePattern = {};
              updatePattern._id = userResult._id;
              updatePattern.is_email_verified = 1;
              if(userResult.is_user_verified==0){
                updatePattern.is_user_verified = 1;
                updatePattern.is_active=1;
              }

              var customData = {};
              customData.name = userResult.username;
              customData.siteTitle = config.siteTitle;

              UserServices.updateRecord(findPattern, updatePattern).then((updateResult) => {
                  if (updateResult) {
                    customData.verified = 1;
                    var filePath =  config.rootPath + "/src/views/email_templates/email_verify_success.ejs";
                      
                    ejs.renderFile(filePath, customData, (err, data) => {
                        if (!err) {
                          res.end(data);
                        }
                        else {
                          res.end("An error occurred");
                          console.log(err);
                        }
                    });

                  } else {

                    customData.verified = 0;
                    var filePath = config.rootPath + "/src/views/email_templates/email_verify_success.ejs";
                      ejs.renderFile(filePath, customData, (err, data) => {
                        if (!err) {
                          res.end(data);
                        }
                        else {
                          res.end("An error occurred");
                          console.log(err);
                        }
                      });

                  }
                })
                .catch((err) => {
                  let resMsg = Validation.getErrorMessage(err);
                  Response.send(req, res, 200, resMsg);
                });
          } else {
            let resMsg = Messages.INVALID_EMAIL;
            var data = { token: token};
            Response.send(req, res, 400, resMsg);
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
 * @api {post} /user_service/customer/resend_verification_email Customer - Resend Verification Email
 * @apiGroup App - Customer - Resend Verification Email
 *
 * @apiHeaderExample {multipart/form-data} Header-Example
    {
        "Content-Type": "multipart/form-data",
        "x-access-token": value
    }
 *
 * @apiParam {String} email Email
 *
 * @apiSuccessExample {json} Success-Example
    HTTP/1.1 200 OK
        {
        "status": "success",
        "api_name": "/resend_verification_email",
        "message": "Please verify Email which is sent to your email id.",
        "data": {}
    }
 *
 * @apiErrorExample {json} Error-Example
    HTTP/1.1 400 OK
    {
        "status": "error",
        "api_name": "/resend_verification_email",
        "message": "Invalid email.",
        "data": {}
    }
*/

  resendVerificationEmail: (req, res) => {
    try {
      var email = req.body.email || "";
      var findPattern = {
        is_deleted: 0,
        email: email,
      };
      var aggregateFilter = [
        {$match:findPattern}
      ];
      UserServices.oneRecord(aggregateFilter)
        .then((userResult) => {
          if (userResult) {
            var user_id = userResult._id;
            var updateData = {};
            var token = Common.generateRandomNumber(12);
            let encryptDataID = CryptData.encrypt(user_id);
            let encryptDataToken = CryptData.encrypt(token);
            updateData.is_email_verified = 0;
            updateData.email_token = token;
            var customData = {};
            customData.name = userResult.username;
            customData.link = config.LiveapiGatewayUrl + "/customer/verify_email/" + encryptDataID.iv +"-" +encryptDataID.encryptedData + "/" +  encryptDataToken.iv +"-" +  encryptDataToken.encryptedData;
            customData.siteTitle = config.siteTitle;
            var filePath = config.rootPath + "/src/views/email_templates/send_verification_email.ejs";
            ejs.renderFile(filePath, customData, (err, data) => {
              if (err) {
                throw err;
              } else {
                var subject = "Verify Email";
                SendMail.sendEmail(email, subject, data);
              }
            });

            UserServices.updateRecord({ _id: userResult._id }, updateData)
              .then((updateRecod) => {
                var sussMessage = Messages.VERIFY_EMAIL;
                Response.send(req, res, 200, sussMessage);
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
    } catch (err) {
      Response.send(req, res, 500, err.message);
    }
  },


/**
 * @api {get} /user_service/customer/profile/get_profile Profile - Get Profile Customer
 * @apiGroup App - Customer - Profile
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
        "_id": "5f75cdcebd87422d76c5be1d",
        "wallet": 1700,
        "is_email_verified": 0,
        "username": "Yogesh",
        "email": "yog@mailinator.com",
        "country_code": "91",
        "phone": "9782498071",
        "user_image_url": "http://13.235.188.102:3060/service/assets?service=user_service&filepath=uploads/users/5f75cdcebd87422d76c5be1d/1601555918576zuckerberg.jpg",
        "user_image_thumb_url": "http://13.235.188.102:3060/service/assets?service=user_service&filepath=uploads/users/5f75cdcebd87422d76c5be1d/thumb_1601555918576zuckerberg.jpg"
    }
    }
 *
 * @apiErrorExample {json} Error-Example
    HTTP/1.1 400 OK
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
      var aggregateFilter  = [
        {$match:{_id:ObjectID(login_user_id),'user_role':3 }},
       { $project: {  
          'user_image_url': { $concat: [UPLOAD_FOLDER_URL + "/",{$toString: "$_id"},'/', "$user_image"] },
          "user_image_thumb_url":{ $concat: [UPLOAD_FOLDER_URL + "/",{$toString: "$_id"},'/thumb_', "$user_image"] },
         country_code:1,email:1,phone:1,username:1,wallet:1,is_email_verified:1
        }
      }
      ];

      UserServices.oneRecord(aggregateFilter)
        .then((userResult) => {
          if(userResult) {
            var successMsg =  Messages.DATA_FETCH_SUCCESSFULLY;
            Response.send(req,res,200,successMsg,userResult);
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
 * @api {post} /user_service/customer/profile/update_profile Profile - Update Profile Customer
 * @apiGroup App - Customer - Profile
 *
 * @apiHeaderExample {multipart/form-data} Header-Example
    {
        "Content-Type": "multipart/form-data",
        "Authorization": "Bearer token"
    }
 *
 * @apiParam {String} field_key (new_email,new_phone,username,user_image)
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
        "api_name": "/update_profile",
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
      user_role:3,
      is_deleted: 0,
      is_user_verified: 1,
      _id: ObjectID(login_user_id),
    };
    var aggregateFilter = [
      {$match:findPattern}
    ];
    var allowfields = ["new_email","new_phone","username","user_image"];

      if(allowfields.indexOf(field_key) != -1){
          if(field_key=='new_email' || field_key=='new_phone'){
              if(field_key=='new_email'){
                  var aggregatesearchFilter = [
                      {$match:{ is_deleted: 0,is_user_verified: 1,email:field_value,is_email_verified:1,_id: {
                          $nin: [ login_user_id ],
                      }}}
                  ];
              }else{
                  var aggregatesearchFilter = [
                      {$match:{ is_deleted: 0,is_user_verified: 1,country_code:'91',phone:field_value,_id: {
                          $nin: [ login_user_id ],
                      }}}
                  ];
              }
              UserServices.oneRecord(aggregatesearchFilter)
              .then((updateRecod) => {
                  if(updateRecod){
                      if(field_key=='new_email'){
                          var errorMess = Messages.EMAIL_ALREADY_REGISTERED;
                          Response.send(req, res, 400, errorMess);
                      }if(field_key=='new_phone'){
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
                      if(field_key == "new_email") {
                          var createOtpPattern = {};
                          createOtpPattern.user_id = userResult._id;
                          createOtpPattern.email = req.body.field_value;
                          createOtpPattern.otp_for = 'email_verify';
                          createOtpPattern.user_role = 3;
  
                     await OtpServices.saveAndSendOtp(createOtpPattern).then(resultOtp=>{
  
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
                          }).catch(err=>{
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
                        createOtpPattern.user_role = 3; 
                        await OtpServices.saveAndSendOtp(createOtpPattern).then(resultOtp=>{
                              let resMsg = Messages.OTP_SENT_ON_PHONE;
                              Response.send(req, res, 200, resMsg, {
                                  country_code: '91',
                                  phone: req.body.field_value,
                                  otp_number: resultOtp.otp_number,
                                  otp_for: 'phone_verify',
                              });

                          }).catch(err=>{
                              let errorMsg = Validation.getErrorMessage(err);
                              Response.send(req, res, 500, errorMsg);
                          })
                      }if(field_key == "user_image"){
                        var files = req.body.files || null;
                      
                        var errors = [];

                          if (files && files.field_value && Media.getMediaTypeByMimeType(files.field_value.mimetype) != "image") {
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
                  UserServices.updateRecord({ _id: userResult._id }, updateData,select)
                  .then((updateRecod) => {
                      if (field_key == "email") {
                        var sussMessage = Messages.VERIFY_EMAIL;
                      } else {
                        var sussMessage = Messages.CHANGE_PROFILE_SUCCESS;
                      }
                      Response.send(req, res, 200, sussMessage,updateRecod);
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
      }else{
          var errorMess = Messages.FIELD_VALUE_INVALID;
          Response.send(req, res, 400, errorMess);
      }
  } catch (err) {
    Response.send(req, res, 500, err.message);
  }
},



  
 //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    /**
     * @api {post} /user_service/customer/profile/change_password Profile - Change Password
     * @apiGroup App - Customer - Profile
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
                {$match:findPattern}
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

};

module.exports = Customer;
