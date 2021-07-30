'use strict';

const {UserServices,OtpServices} =  require('../../services/')
const {Response,Messages,Validation,Encryption,Common,SendMail,Redis,CryptData,SendSMS} = require('../../helpers');
const { ObjectID } = require("mongodb");
const config = require("../../config");
const ejs = require("ejs");
const Customer = {

/**
 * @api {post} /user_service/customer/user_login Customer - Login
 * @apiGroup App - Customer - Login
 *
 * @apiHeaderExample {multipart/form-data} Header-Example
    {
        "Content-Type": "multipart/form-data",
    }
 *
 * @apiParam {String} country_code Country Code
 * @apiParam {String} phone Phone/email
 * @apiParam {String} password Password
 * @apiParam {String} device_id Device id
 * @apiParam {String} device_token Device Token
 * @apiParam {Number} device_type Device Type : 1 for android / 1 for ios
 *
 * @apiSuccessExample {json} Success-Example
    HTTP/1.1 200 OK
    {
    "status": "success",
    "api_name": "/user_login",
    "message": "You have logged in successfully.",
    "data": {
        "is_user_verified": 1,
        "is_email_verified": 0,
        "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbl91c2VyX2lkIjoiNWY3MzBlMDRiOGNhNjYzYWU4NGEzNmNlIiwiaWF0IjoxNjAyMTYxMjUwLCJleHAiOjE2MDIyNDc2NTB9.7b6dpRhavZ_EWxhzmgd2HQgkOA0NxOGcqfjMJMhSI84",
        "_id": "5f730e04b8ca663ae84a36ce",
        "username": "rohit ajmera12",
        "country_code": "91",
        "phone": "123456789",
        "email": "rr@c.com",
        "register_id": "200285f730e04b8ca663ae84a36ce",
        "user_image_url": "http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/users/5f730e04b8ca663ae84a36ce/undefined",
        "user_image_thumb_url": "http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/users/5f730e04b8ca663ae84a36ce/thumb_undefined",
        "id": "5f730e04b8ca663ae84a36ce"
    }
    }
 *
 * @apiErrorExample {json} Error-Example
    HTTP/1.1 401 OK
    {
        "status": "error",
        "api_name": "/user_login",
        "message": "Login credentials are invalid.",
        "data": {}
    }
*/

    login: (req,res) =>{
        
        try{
            var country_code = req.body.country_code || '';
            country_code = country_code.replace(/\+/g,"");
            var phone = req.body.phone  || '';
            var password = req.body.password  || '';
            var device_id = req.body.device_id  || '';
            var device_token = req.body.device_token  || '';
            var device_type = req.body.device_type  || '';
            var latitude  =  req.body.latitude || '';
            var longitude  =  req.body.longitude || '';
            var message_id  =  req.body.message_id || '';

            var findPattern = {
                user_role:3,
                is_deleted: 0
            };
            findPattern["$or"]= [{email:phone},{country_code:country_code,
                phone:phone}];
             
            var aggregatecondition = [
                {$match:findPattern},
                { $unset:   ['last_login_time','createdAt','updatedAt', '__v'] },
            ];
            UserServices.oneRecord(aggregatecondition).then(async userResult=>{
               
                if(userResult){
                    if(userResult.email==phone){
                       
						if (userResult.is_active == 0 && userResult.is_email_verified == 1) {
                            var errorMess = Messages.ACCOUNT_IS_DEACTIVATE;
                            Response.send(req, res, 400, errorMess);
                        } else if(userResult.is_email_verified==0){
                          
                            var token = Common.generateRandomNumber(12);
                            var user_id = userResult._id;
                            let encryptDataID = CryptData.encrypt(user_id);
                            let encryptDataToken = CryptData.encrypt(token);
                            var returnData = {
                                encryptDataID,
                                encryptDataToken,
                            };
                            var updateEmail = {};
                            updateEmail.is_email_verified = 0;
                            updateEmail.email_token = token;
                           await UserServices.updateRecord(findPattern,updateEmail).then(userResult=>{

                                var customData = {};
                                customData.name = userResult.username;
                                customData.link = config.siteUrl +  "/customer/verify_email/" +  encryptDataID.iv + "-" +  encryptDataID.encryptedData + "/" +  encryptDataToken.iv + "-" + encryptDataToken.encryptedData;
                                customData.siteTitle = config.siteTitle;
                                var filePath =  config.rootPath + "/src/views/email_templates/send_verification_email.ejs";
    
                                ejs.renderFile(filePath, customData, (err, data) => {
                                    if (err) {
                                    throw err;
                                    } else {
                                    var subject = "Verify Email";
                                    SendMail.sendEmail(phone, subject, data);
                                   
                                    }
                                });

                            }).catch(err=>{
                                let errorMsg = Validation.getErrorMessage(err);
                                Response.send(req, res, 500, errorMsg);
                            })

                            var errorMess = Messages.VERIFY_EMAIL;
                            Response.send(req,res,400,errorMess);
                        }
                    }
                    
                    var CheckPassword = Encryption.compareBcryptEncryption(password,userResult.password);
                    if(CheckPassword){

                        if(userResult.is_active==0 && userResult.is_user_verified==1){
                            var errorMess = Messages.ACCOUNT_IS_DEACTIVATE;
                            Response.send(req,res,400,errorMess);
                        }else if( userResult.is_user_verified==0){

                            var createOtpPattern = {
                                 user_id:userResult._id,
                                 country_code:country_code,
                                 phone:userResult.phone,
                                 otp_for:"register",
                                 user_role:3
                            };

                            OtpServices.saveAndSendOtp(createOtpPattern).then(otpResult=>{

                                var successMsg =  Messages.VERIFY_OTP;
                                userResult.otp_number = otpResult.otp_number;
								var resMsg = "<#> Your OTP is";
                                SendSMS.sendTwilioSMS('+'+country_code+phone+'', resMsg + ": " +otpResult.otp_number+" "+message_id);
                                Response.send(req,res,200,successMsg,userResult);
                            })
                        }
                        else{ 

                            var authToken = Encryption.getJwtEncryption({
                                login_user_id:userResult._id,
                                user_role:userResult.user_role
                            });


                            var updateResult ={
                                auth_token:authToken,
                                last_login_time: new Date(),
                                device_id:device_id,
                                device_token:device_token,
                                device_type:device_type
                            }
                            if(longitude!="" && latitude!=""){
                                updateResult.geoLocation = {
                                    type: "Point",
                                    coordinates: [
                                        parseFloat(longitude),
                                        parseFloat(latitude)
                                    ]
                                }
                            }
                            console.log("updateResult",updateResult);
                            
                            UserServices.updateRecord({_id:userResult._id},updateResult).then(updatedUserData=>{
                                console.log(updatedUserData)
                                 // save device token
                                // UsersDeviceTokensService.saveRecord(userdata._id, device_token, device_type);

                                // // Set login user auth token in Redis
                                var key = updatedUserData.user_role + "_" + updatedUserData._id;
                                Redis.hmset(["_auth_tokens", key, updatedUserData.auth_token], function (err, res) {
                                    if (err) console.log(err.toString())
                                });

                                // success
                                let resMsg = Messages.LOGIN_SUCCESS;
                                Response.send(req, res, 200, resMsg, updatedUserData);
                            })
                        }

                    }else{
                        var errorMess = Messages.INVALID_LOGIN_CREDENTIALS;
                        Response.send(req,res,400,errorMess);
                    }

                }else{
                    var errorMess = Messages.DELETED_LOGIN_CREDENTIALS;
                    Response.send(req,res,400,errorMess);
                }

            }).catch(err=>{
                
                var errorMess = Validation.getErrorMessage(err);
                Response.send(req,res,500,errorMess);
            })

        }catch(err){
            var errorMess = Validation.getErrorMessage(err);
            Response.send(req,res,500,errorMess);
        }

    },


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

/**
 * @api {post} /user_service/customer/registration Customer - Register
 * @apiGroup App - Customer - Login
 *
 * @apiHeaderExample {multipart/form-data} Header-Example
    {
        "Content-Type": "multipart/form-data",
    }
 *
 * @apiParam {String} username User Name
 * @apiParam {String} country_code Country Code
 * @apiParam {Number} phone Phone
 * @apiParam {String} email Email
 * @apiParam {String} password Password
 * @apiParam {String} device_id Device Id
 * @apiParam {String} device_token Device Token
 * @apiParam {Number} device_type Device Type : 1 for android / 2 for ios
 *
 * @apiSuccessExample {json} Success-Example
    HTTP/1.1 200 OK
    {
    "status": "success",
    "api_name": "/registration",
    "message": "Please verify OTP which is sent to your phone.",
    "data": {
        "otp_number": 4505
        }
    }
 *
 * @apiErrorExample {json} Error-Example
    HTTP/1.1 400 OK
    {
        "status": "error",
        "api_name": "/customer_register",
        "message": "Provided email is already exist. Provided phone is already exist. ",
        "data": {}
    }
*/

    customer_register: async (req,res) =>{
        
        try {

            var username = req.body.username;
            var country_code = req.body.country_code;
            country_code = country_code.replace(/\+/g,"");
            var phone = req.body.phone;
            var email = req.body.email;
            var password = req.body.password;
            var device_id = req.body.device_id;
            var device_token = req.body.device_token;
            var device_type = req.body.device_type;
            var message_id = req.body.message_id || "";
            
            var findPattern = {
                user_role: 3,
                is_deleted: 0
            };
            findPattern["$or"]= [{country_code: country_code,phone: phone},{email:email}];
          
            var aggregatecondition = [
                {$match:findPattern},
                { $unset:   ['last_login_time','createdAt','updatedAt', '__v'] },
            ];
            
            await UserServices.oneRecord(aggregatecondition).then(async userdata => {
                  //console.log(userdata);

                  var checkforphonefindPattern = {
                    user_role: 3,
                    is_deleted: 0
                };
                checkforphonefindPattern["$and"]= [{country_code: country_code,phone: phone}];
                
                var checkforphoneaggregatecondition = [
                    {$match:checkforphonefindPattern},
                    { $unset:   ['last_login_time','createdAt','updatedAt', '__v'] },
                ];
                var checkphone = await UserServices.oneRecord(checkforphoneaggregatecondition);
				
                if (checkphone &&  checkphone.is_phone_verified == 1) {
                    var resMsg = Messages.PHONE_ALREADY_REGISTERED;
                    Response.send(req, res, 400, resMsg);
                }
                 
                var checkforemailfindPattern = {
                    user_role: 3,
                    is_deleted: 0
                };
                checkforemailfindPattern["$or"]= [{email:email}];
                var checkforemailaggregatecondition = [
                    {$match:findPattern},
                    { $unset:   ['last_login_time','createdAt','updatedAt', '__v'] },
                ];
                var checkemail = UserServices.oneRecord(checkforemailaggregatecondition);
                if (checkemail &&  checkemail.is_email_verified == 1) {
                    var resMsg = Messages.EMAIL_ALREADY_REGISTERED;
                    Response.send(req, res, 400, resMsg);
                }

               


                 else if (userdata && userdata.is_user_verified == 0) {
                    console.log(userdata);
    
                    var findPattern = { _id: userdata._id };
    
                    var updatePattern = {};
                    updatePattern.username = username;
                    updatePattern.phone = phone;
                    updatePattern.email = email;
                    updatePattern.device_id = device_id;
                    updatePattern.device_type = device_type;
                    updatePattern.device_token = device_token;
    
                    UserServices.updateRecord(findPattern,updatePattern).then(userObjRes => {
                        
                        var createOtpPattern = {};
                        createOtpPattern.user_id = userdata._id;
                        createOtpPattern.country_code = userdata.country_code;
                        createOtpPattern.phone = userdata.phone;
                        createOtpPattern.otp_for = "register";
                        createOtpPattern.user_role = 3;
    
                        OtpServices.saveAndSendOtp(createOtpPattern).then(otpRes => {
    
                           let resMsg = Messages.VERIFY_OTP;
                           var OtpresMsg = "<#> Your OTP is";
                           SendSMS.sendTwilioSMS('+'+country_code+phone+'', OtpresMsg + ": " +otpRes.otp_number+" "+message_id);
                            Response.send(req, res, 200, resMsg, {
                                otp_number: otpRes.otp_number
                            });
    
                        }).catch(err => {
                            let resMsg = Validation.getErrorMessage(err);
                            Response.send(req, res, 500, resMsg);
                        });
    
                    }).catch(err => {
                        let resMsg = Validation.getErrorMessage(err);
                        Response.send(req, res, 500, resMsg);
                    });
    
                } else {
    
                    var createPattern = {};
                    createPattern.username = username;
                    createPattern.user_role = 3;
                    createPattern.country_code = country_code;
                    createPattern.phone = phone;
                    createPattern.email = email;
                    createPattern.device_id = device_id;
                    createPattern.device_type = device_type;
                    createPattern.device_token = device_token;
                    createPattern.password = Encryption.getBcryptEncryption(password);
                    createPattern.user_image = "";
                    createPattern.last_login_time = null;
    
                    UserServices.createRecord(createPattern).then(userObjRes => {
    
                        var createOtpPattern = {};
                        createOtpPattern.user_id = userObjRes._id;
                        createOtpPattern.country_code = userObjRes.country_code;
                        createOtpPattern.phone = userObjRes.phone;
                        createOtpPattern.otp_for = "register";
                        createOtpPattern.user_role = 3;
    
                        OtpServices.saveAndSendOtp(createOtpPattern).then(otpRes => {
                            // success
                            let resMsg = Messages.VERIFY_OTP;
                            var OtpresMsg = "<#> Your OTP is";
                            SendSMS.sendTwilioSMS('+'+country_code+phone+'', OtpresMsg + ": " +otpRes.otp_number+" "+message_id);
                            //SendSMS.sendTwilioSMS('+'+country_code+phone+'', resMsg + " " +otpRes.otp_number);
                            Response.send(req, res, 200, resMsg, {
                                otp_number: otpRes.otp_number
                            });
    
                        }).catch(err => {
                            let resMsg = Validation.getErrorMessage(err);
                            Response.send(req, res, 500, resMsg);
                        });
    
                    }).catch(err => {
                        let resMsg = Validation.getErrorMessage(err);
                        Response.send(req, res, 500, resMsg);
                    });
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
* @api {post} /user_service/customer/verify_otp Login - Verify OTP
* @apiGroup App - Customer - Login
 *
 * @apiHeaderExample {multipart/form-data} Header-Example
    {
        "Content-Type": "multipart/form-data",
    }
 *
 * @apiParam {String} country_code Country Code
 * @apiParam {String} phone Phone
 * @apiParam {String} otp_number OTP Number
 * @apiParam {String} otp_for OTP For What: register | forgot_password
 * @apiParam {String} device_token Device Token
 * @apiParam {String} device_type Device Type : 1 for android / 2 for ios
 *
 * @apiSuccessExample {json} Success-Example
    HTTP/1.1 200 OK
    {
    "status": "success",
    "api_name": "/verify_otp",
    "message": "OTP has verified successfully.",
    "data": {
        "wallet": "0.00",
        "is_user_verified": 1,
        "is_email_verified": 0,
        "show_notification": 0,
        "is_available": 0,
        "device_type": 1,
        "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbl91c2VyX2lkIjoiNWY3MGVlMWU2ZjlkYzAyZDZjZjYxOTM3IiwibG9naW5fdXNlcl9yb2xlIjozLCJpYXQiOjE2MDEyMzc2NTcsImV4cCI6MTYwMTMyNDA1N30.4sIPECFVe-rWfp0TXIO-i6lI4KTwg_5a-Z6lODjtjaw",
        "device_token": "sds",
        "is_active": 1,
        "is_deleted": 0,
        "_id": "5f70ee1e6f9dc02d6cf61937",
        "username": "hello",
        "user_role": 3,
        "country_code": "91",
        "phone": 123456789,
        "email": "s@gmail.com",
        "device_id": "hdjhj",
        "user_image": "",
        "last_login_time": null,
        "createdAt": "2020-09-27T19:55:10.044Z",
        "updatedAt": "2020-09-27T20:14:17.105Z",
        "__v": 0,
        "id": "5f70ee1e6f9dc02d6cf61937"
    }
}
 *
 * @apiErrorExample {json} Error-Example
    HTTP/1.1 400 OK
    {
        "status": "error",
        "api_name": "/verify_otp",
        "message": "Invalid OTP.",
        "data": {}
    }
*/


    verify_otp : (req,res) =>{

        try{
            var login_user_id = Common.getUserdetailsBytoken(req.headers.authorization) || null;
            var country_code = req.body.country_code;
            country_code = country_code.replace(/\+/g,"");
            var phone = req.body.phone;
            var otp_number = req.body.otp_number || "";
            var otp_for = req.body.otp_for;
            var device_token = req.body.device_token || "";
            var device_id = req.body.device_id || "";
            var device_type = req.body.device_type || "";

            var findPattern = {
                user_role: 3,
                is_deleted: 0
            };
            if(login_user_id){
                findPattern["$and"] = [{
                    _id: ObjectID(login_user_id),
                }];
            }else{
                findPattern["$or"]=[{email:phone},{country_code:country_code,phone:phone}];
            }
           
            console.log(findPattern);
            var aggregatecondition = [
                {$match:findPattern},
                { $unset:   ['last_login_time','createdAt','updatedAt', '__v'] },
            ];
            UserServices.oneRecord(aggregatecondition).then(userResult=>{
                console.log(userResult);
                if(userResult){ 
                    var findOtpPattern = {};
                    findOtpPattern.user_id = userResult._id;
                    if(otp_for=='email_verify'){
                        findOtpPattern.email = phone;
                    }else{
                        findOtpPattern.country_code = country_code;
                        findOtpPattern.phone = phone;
                    }
                    findOtpPattern.otp_for = otp_for;
                    findOtpPattern.user_role = 3;
                    OtpServices.oneRecord(findOtpPattern).then(otpResult => {
                        if(otpResult && otpResult.otp_number==otp_number){
                            if(otp_for=="register"){

                                OtpServices.deleteRecord(findOtpPattern).then(async otpDeleteRes => {
                                    var authToken = Encryption.getJwtEncryption({
                                        login_user_id: userResult._id,
                                        login_user_role: userResult.user_role
                                    });

                                 // var qr_image_name = await UsersService.generateQRCodeImage(userdata);

                                    var updateUserdata = {};
                                    updateUserdata.device_token = device_token;
                                    updateUserdata.device_type = device_type;
                                    updateUserdata.device_id = device_id;
                                    updateUserdata.auth_token = authToken;
                                   // updateUserdata.qr_image_name = qr_image_name;
                                    updateUserdata.is_active =1;
                                    updateUserdata.is_user_verified = 1;
                                    updateUserdata.is_phone_verified = 1;

                                    UserServices.updateRecord({_id:userResult._id},updateUserdata).then(updateResult=>{
                                       
                                        //UsersDeviceTokensService.saveRecord(userdata._id, device_token, device_type);

                                        // Send Push Notification
                                       // UserNotificationsService.onSignUp(userdata._id, "users");
    
                                        // Set login user auth token in Redis
                                        var key = updateResult.user_role + "_" + updateResult._id;
                                        Redis.hmset(["_auth_tokens", key, updateResult.auth_token], function (err, res) {
                                            if (err) console.log(err.toString())
                                        });
                                        var key = updateResult.user_role + "_" + updateResult._id;
                                        Redis.hmset(["_auth_tokens", key, updateResult.auth_token], function (err, res) {
                                            if (err) console.log(err.toString())
                                        });
                                       
                                        let resMsg = Messages.OTP_VERIFY_SUCCESS;
                                        Response.send(req, res, 200, resMsg, updateResult);
                                    }).catch(err=>{
                                        let resMsg = Validation.getErrorMessage(err);
                                        Response.send(req, res, 500, resMsg);
                                    })
                                }).catch(err=>{
                                    let resMsg = Validation.getErrorMessage(err);
                                    Response.send(req, res, 500, resMsg);
                                });

                            }else if (otp_for == 'forgot_password') {

                                OtpServices.deleteRecord(findOtpPattern).then(async otpDeleteRes => {
                                   
                                }).catch(err=>{
                                    let resMsg = Validation.getErrorMessage(err);
                                    Response.send(req, res, 500, resMsg);
                                });
                                
                                // success
                                let resMsg = Messages.OTP_VERIFY_SUCCESS;
                                Response.send(req, res, 200, resMsg, {
                                    country_code: userResult.country_code,
                                    phone: userResult.phone,
                                });
                            }else if (otp_for == 'email_verify') {
                                OtpServices.deleteRecord(findOtpPattern).then(async otpDeleteRes => {
    
                                    var updateUserdata = {};
                                    updateUserdata.is_email_verified = 1;
                                    updateUserdata.email = userResult.new_email;
                                    UserServices.updateRecord({_id:userResult._id},updateUserdata).then(updateResult=>{
                                        let resMsg = Messages.CHANGE_EMAIL_SUCCESS;
                                        Response.send(req, res, 200, resMsg, updateResult);
                                    }).catch(err=>{
                                        let resMsg = Validation.getErrorMessage(err);
                                        Response.send(req, res, 500, resMsg);
                                    })
                                }).catch(err=>{
                                    let resMsg = Validation.getErrorMessage(err);
                                    Response.send(req, res, 500, resMsg);
                                });
    
                            }else if (otp_for == 'phone_verify') {
                                
                                OtpServices.deleteRecord(findOtpPattern).then(async otpDeleteRes => {
                                    var updateUserdata = {};
                                    updateUserdata.is_phone_verified = 1;
                                    updateUserdata.phone = userResult.new_phone;
                                    UserServices.updateRecord({_id:userResult._id},updateUserdata).then(updateResult=>{
                                        let resMsg = Messages.PHONE_UPDATE_SUCCESSFULLY;
                                        Response.send(req, res, 200, resMsg, updateResult);
                                    }).catch(err=>{
                                        let resMsg = Validation.getErrorMessage(err);
                                        Response.send(req, res, 500, resMsg);
                                    })
                                }).catch(err=>{
                                    let resMsg = Validation.getErrorMessage(err);
                                    Response.send(req, res, 500, resMsg);
                                });
                            }else{
                                let resMsg = Messages.INVALID_OTP;
                                Response.send(req, res, 400, resMsg);
                            }    

                    } else {
                        let resMsg = Messages.INVALID_OTP_REQUEST;
                        Response.send(req,res,400,resMsg);
                    }  

                        
                    }).catch(err=>{
                        let resMsg = Validation.getErrorMessage(err);
                        Response.send(req, res, 500, resMsg);
                    })

                }else{
                    let resMsg = Messages.INVALID_PHONE;
                    Response.send(req, res, 400, resMsg);
                }
            }).catch(err=>{
                var errorMess = Validation.getErrorMessage(err);
                Response.send(req,res,500,errorMess);
            })

        }catch(err){
            Response.send(req,res,500,err.message);
        }
    },



/**
 * @api {post} /user_service/customer/resend_otp Login - Resend OTP
 * @apiGroup App - Customer - Login
 *
 * @apiHeaderExample {multipart/form-data} Header-Example
    {
        "Content-Type": "multipart/form-data",
    }
 *
 * @apiParam {String} country_code Country Code
 * @apiParam {String} phone Phone
 * @apiParam {String} otp_for OTP For What: register | forgot_password
 *
 * @apiSuccessExample {json} Success-Example
    HTTP/1.1 200 OK
    {
        "status": "success",
        "api_name": "/resend_otp",
        "message": "OTP has sent to your phone.",
        "data": {
            "country_code": "+91",
            "phone": "9987667777"
            "otp_number": "2121"
        }
    }
 *
 * @apiErrorExample {json} Error-Example
    HTTP/1.1 400 OK
    {
        "status": "error",
        "api_name": "/resend_otp",
        "message": "Invalid Phone Number. No account exist with this phone number.",
        "data": {}
    }
*/

    resend_otp : (req,res) => {

        try{
            var login_user_id = Common.getUserdetailsBytoken(req.headers.authorization) || null;
            var country_code = req.body.country_code;
            country_code = country_code.replace(/\+/g,"");
            var phone = req.body.phone;
            var otp_for = req.body.otp_for;
            var message_id = req.body.message_id || "";

            var findPattern = {
                user_role: 3,
                is_deleted: 0
            };

            if(login_user_id){
                findPattern["$and"] = [{
                    _id: ObjectID(login_user_id),
                }];
            }else{
                findPattern["$or"]=[{email:phone},{country_code:country_code,phone:phone}];
            }
           

           
            var aggregatecondition = [
                {$match:findPattern},
                { $unset:   ['last_login_time','createdAt','updatedAt', '__v'] },
            ];
            UserServices.oneRecord(aggregatecondition).then(async userResult=>{

                if(userResult){

                    if(userResult.email==phone && userResult.is_email_verified==0){

                        var token = Common.generateRandomNumber(12);
                        let encryptDataID = CryptData.encrypt(userResult._id);
                        let encryptDataToken = CryptData.encrypt(token);
                        var returnData = {
                            encryptDataID,
                            encryptDataToken,
                        };
                        userResult.is_email_verified = 0;
                        userResult.email_token = token;

                        await UserServices.updateRecord(findPattern,userResult).then(userResult=>{

                            var customData = {};
                            customData.name = userResult.username;
                            customData.link = config.siteUrl +  "/customer/verify_email/" +  encryptDataID.iv + "-" +  encryptDataID.encryptedData + "/" +  encryptDataToken.iv + "-" + encryptDataToken.encryptedData;
                            customData.siteTitle = config.siteTitle;
                            var filePath =  config.rootPath + "/src/views/email_templates/send_verification_email.ejs";

                            ejs.renderFile(filePath, customData, (err, data) => {
                                if (err) {
                                throw err;
                                } else {
                                var subject = "Verify Email";
                                SendMail.sendEmail(phone, subject, data);
                            
                                }
                            });
                        }).catch(err=>{
                            let errorMsg = Validation.getErrorMessage(err);
                            Response.send(req, res, 500, errorMsg);
                        })
                        var errorMess = Messages.VERIFY_EMAIL;
                        Response.send(req,res,400,errorMess);
                    }


                    if (otp_for == "forgot_password" && userResult.is_user_verified == 0) {

                        let resMsg = Messages.NOT_ALLOW_TO_CHANGE_PASSWORD;
                        Response.send(req, res, 400, resMsg);
    
                    } else {
                        var createOtpPattern = {};
                        createOtpPattern.user_id = userResult._id;
                        if(otp_for == "email_verify"){
                            createOtpPattern.email = phone;
                        }else{
                            createOtpPattern.country_code = country_code;
                            createOtpPattern.phone = phone;
                        }
                        createOtpPattern.otp_for = otp_for;
                        createOtpPattern.user_role = 3;
                        OtpServices.saveAndSendOtp(createOtpPattern).then(async resultOtp=>{
                            console.log(resultOtp)
                            if(otp_for=="email_verify"){

                                
                                var token = Common.generateRandomNumber(12);
                                let encryptDataID = CryptData.encrypt(userResult._id);
                                let encryptDataToken = CryptData.encrypt(token);
                                var returnData = {
                                    encryptDataID,
                                    encryptDataToken,
                                };
                                userResult.is_email_verified = 0;
                                userResult.email_token = token;
    
                               await UserServices.updateRecord(findPattern,userResult).then(userResult=>{

                                    var customData = {};
                                    customData.name = userResult.username;
                                    customData.link = config.siteUrl +  "/customer/verify_email/" +  encryptDataID.iv + "-" +  encryptDataID.encryptedData + "/" +  encryptDataToken.iv + "-" + encryptDataToken.encryptedData;
                                    customData.siteTitle = config.siteTitle;
                                    var filePath =  config.rootPath + "/src/views/email_templates/send_verification_email.ejs";
        
                                    ejs.renderFile(filePath, customData, (err, data) => {
                                        if (err) {
                                        throw err;
                                        } else {
                                        var subject = "Verify Email";
                                        SendMail.sendEmail(phone, subject, data);
                                    
                                        }
                                    });
                                }).catch(err=>{
                                    let errorMsg = Validation.getErrorMessage(err);
                                    Response.send(req, res, 500, errorMsg);
                                })


                              
                                var resMsg = Messages.VERIFY_EMAIL;
                                var result =  {
                                    otp_for: otp_for,
                                    country_code: '91',
                                    email: req.body.phone,
                                    otp_number: resultOtp.otp_number
                                }
                            }else{

                                var resMsg = Messages.OTP_SENT_ON_PHONE;
                                var result =  {
                                    otp_for: otp_for,
                                    country_code: country_code,
                                    phone: phone,
                                    otp_number: resultOtp.otp_number
                                }
                                var OtpresMsg = "<#> Your OTP is";
                                SendSMS.sendTwilioSMS('+'+country_code+phone+'', OtpresMsg + ": " +resultOtp.otp_number+" "+message_id);
                                //SendSMS.sendTwilioSMS('+'+country_code+phone+'', resMsg + " " +resultOtp.otp_number);
                            }
                            Response.send(req, res, 200, resMsg,result);

                        }).catch(err=>{
                            let errorMsg = Validation.getErrorMessage(err);
                            Response.send(req, res, 500, errorMsg);
                        })

                    }

                }else{
                    let resMsg = "Invalid Email or Phone number .No account exist with this.";
                    Response.send(req, res, 400, resMsg);
                }
            }).catch(err=>{

            })

        }catch(err){
            Response.send(req,res,500,err.message);
        }

    },

    

/**
 * @api {post} /user_service/customer/update_forgot_password Login - Update Forget Password
 * @apiGroup App - Customer - Login
 *
 * @apiHeaderExample {multipart/form-data} Header-Example
    {
        "Content-Type": "multipart/form-data",
    }
 *
 * @apiParam {String} country_code Country Code
 * @apiParam {String} phone Phone/Email
 * @apiParam {String} otp_number OTP Number
 * @apiParam {String} new_password New Password
 *
 * @apiSuccessExample {json} Success-Example
    HTTP/1.1 200 OK
    {
        "status": "success",
        "api_name": "/update_forgot_password",
        "message": "You have changed password successfully.",
        "data": {}
    }
 *
 * @apiErrorExample {json} Error-Example
    HTTP/1.1 400 OK
    {
        "status": "error",
        "api_name": "/update_forgot_password",
        "message": "Invalid OTP.",
        "data": {}
    }
*/

    update_forgot_password : (req,res) =>{
        try{
            var country_code = req.body.country_code || "";
            country_code = country_code.replace(/\+/g,"");
            var phone =  req.body.phone || "";
            var new_password = req.body.new_password || "";
            var otp_number = req.body.otp_number || "";

            var findPattern = {
                is_deleted:0,
                is_user_verified:1
            }
            findPattern["$or"] = [{email:phone},{country_code:country_code,phone:phone}];

            var aggregatecondition = [
                {$match:findPattern},
                { $unset:   ['last_login_time','createdAt','updatedAt', '__v'] },
            ];
            
            UserServices.oneRecord(aggregatecondition).then(userResult=>{
                
                if(userResult){
                    if(userResult.email==phone && userResult.is_email_verified==0){
                            var errorMess = Messages.VERIFY_EMAIL;
                            Response.send(req,res,400,errorMess);
                    }

                    var findOtpPattern = {
                        country_code:country_code,
                        
                        otp_for : "forgot_password",
                        user_role:3
                    }
                    if(userResult.phone==phone){
                        findOtpPattern.phone=userResult.phone;
                    }
                    if(userResult.email==phone){
                        findOtpPattern.phone=userResult.email;
                    }

                   
                    OtpServices.oneRecord(findOtpPattern).then(otpResult=>{
                        
                        if(otpResult){
                            if(otpResult.otp_number==otp_number){
                                OtpServices.deleteRecord(findOtpPattern);
                                var updateRecord = {
                                    password : Encryption.getBcryptEncryption(new_password)
                                };
                                UserServices.updateRecord({_id:userResult._id},updateRecord).then(updateRecod=>{
                                    var sussMessage = Messages.CHANGE_PASSWORD_SUCCESS;
                                    Response.send(req,res,200,sussMessage);
                                }).catch(err=>{
                                    var errorMess = Validation.getErrorMessage(err);
                                    Response.send(req,res,500,errorMess);
                                })

                            }else{
                                var errorMess = Messages.INVALID_OTP;
                                Response.send(req,res,400,errorMess);
                            }
                        }else{
                            var errorMess = Messages.INVALID_OTP;
                            Response.send(req,res,400,errorMess);
                        }

                    }).catch(err=>{
                        var errorMess = Validation.getErrorMessage(err);
                        Response.send(req,res,500,errorMess);
                    })
                }else{
                    var errorMess = Messages.INVALID_USERNAME_EMAIL;
                    Response.send(req,res,400,errorMess);
                }
            }).catch(err=>{
                var errorMess = Validation.getErrorMessage(err);
                Response.send(req,res,500,errorMess);
            })

        }catch(err){

        }
    }
}

module.exports = Customer;