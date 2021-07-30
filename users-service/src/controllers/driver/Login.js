'use strict';

const {UserServices,OtpServices} =  require('../../services/')
const {Response,Messages,Validation,Encryption,Common,SendMail,Redis} = require('../../helpers');
const { ObjectID } = require("mongodb");
const config = require("../../config");
const ejs = require("ejs");
const Customer = {

    
    /**
 * @api {post} /user_service/driver/user_login  Driver - Login
 * @apiGroup App - Driver - Login
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
 *
 * @apiErrorExample {json} Error-Example
    HTTP/1.1 400 OK
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
            

            var findPattern = {
                user_role:4,
                is_deleted: 0
            };
            findPattern["$or"]= [{email:phone},{country_code:country_code,
                phone:phone}];

            var aggregatecondition = [
                {$match:findPattern},
                { $unset:   ['last_login_time','createdAt','updatedAt', '__v'] },
            ];
            UserServices.oneRecord(aggregatecondition).then(userResult=>{
                if(userResult){
                    // if(userResult.email==phone){
                    //     if(userResult.is_email_verified==0){
                    //         var errorMess = Messages.VERIFY_EMAIL;
                    //         Response.send(req,res,400,errorMess);
                    //     }
                    // }
                    var CheckPassword = Encryption.compareBcryptEncryption(password,userResult.password);
                    if(CheckPassword){

                        if(userResult.is_active==0 && userResult.is_user_verified==1){
                            var errorMess = Messages.ACCOUNT_IS_DEACTIVATE;
                            Response.send(req,res,400,errorMess);
                        }else{

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

                            UserServices.updateRecord({_id:userResult._id},updateResult).then(updatedUserData=>{
                                 // save device token
                                // UsersDeviceTokensService.saveRecord(userdata._id, device_token, device_type);

                                // // Set login user auth token in Redis
                                // var key = updatedUserData.user_role + "_" + updatedUserData._id;
                                // Redis.hmset(["tivo_users_auth_tokens", key, updatedUserData.auth_token], function (err, res) {
                                //     if (err) console.log(err.toString())
                                // });
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
                    var errorMess = Messages.INVALID_PHONE;
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

   


    /**
 * @api {post} /user_service/driver/verify_otp Login - Verify OTP
 * @apiGroup App - Driver - Login
 *
 * @apiHeaderExample {multipart/form-data} Header-Example
    {
        "Content-Type": "multipart/form-data",
    }
 * @apiParam {String} username User Name
 * @apiParam {String} country_code Country Code
 * @apiParam {String} phone Phone/Email
 * @apiParam {String} password Password
 * @apiParam {String} device_id Device Id
 * @apiParam {String} device_token Device Token
 * @apiParam {Number} device_type Device Type : 1 for android / 2 for ios
 *
 * @apiSuccessExample {json} Success-Example
    HTTP/1.1 200 OK
    {
        "status": "success",
        "api_name": "/verify_otp",
        "message": "OTP has verified successfully.",
        "data": {
            "security_pin": "",
            "referral_code": "GG55",
            "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjJkM2Q3NWQ3ZjMyNDFiYjQwNDVmZDMiLCJpYXQiOjE1OTY4MDAzODEsImV4cCI6MTU5NzQwNTE4MX0.Xhw0tDmpsHpR2GNei1j528R6pyyoqy6IzBGMPX5aXVk",
            "is_user_verified": 1,
            "is_phone_verified": 1,
            "is_email_verified": 0,
            "allow_notifications": 1,
            "enable_security_pin": 0,
            "qr_code_image": "1596800381_qr.png",
            "address": "",
            "is_acNotifications failed. NotRegistered (node:27800) Warning: a promise was rejected with a non-error: [object String]tive": 1,
            "is_deleted": 0,
            "user_image": "",
            "available_wallet_balance": 0,
            "total_orders_count": 0,
            "default_payment_option": "",
            "default_country": "",
            "default_language": "",
            "kyc_reference_id": "",
            "kyc_validation_url": "",
            "is_kyc_done": 0,
            "_id": "5f2d3d75d7f3241bb4045fd3",
            "first_name": "Chandan",
            "last_name": "Chhajer",
            "user_role": "customer",
            "country_code": "+91",
            "phone": "9987667777",
            "email": "chandan@mailinator.com",
            "password": "$2a$10$Yk7qOI7sBp9rl5h0pv5rTOHY/RwBkbBQt7LEAER9/nblPGGcwXq7S",
            "last_login_time": "2020-08-07T11:39:41.258Z",
            "geoLocation": {
                "type": "Point",
                "coordinates": [],
                "_id": "5f2d3d75d7f3241bb4045fd4"
            },
            "createdAt": "2020-08-07T11:39:33.646Z",
            "updatedAt": "2020-08-07T11:39:41.259Z",
            "__v": 0,
            "user_image_url": "http://192.168.1.154:3031/default/placeholder-user.jpg",
            "user_image_thumb_url": "http://192.168.1.154:3031/default/placeholder-user.jpg",
            "qr_code_image_url": "http://192.168.1.154:3031/uploads/users/5f2d3d75d7f3241bb4045fd3/1596800381_qr.png",
            "id": "5f2d3d75d7f3241bb4045fd3"
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
                user_role: 4,
                is_deleted: 0
            };
            if(login_user_id){
                findPattern["$and"] = [{
                    _id: ObjectID(login_user_id)
                }];
            }else{
                findPattern["$or"]=[{email:phone},{country_code:country_code,phone:phone}];
            }

            var aggregatecondition = [
                {$match:findPattern},
                { $unset:   ['last_login_time','createdAt','updatedAt', '__v'] },
            ];
            UserServices.oneRecord(aggregatecondition).then(userResult=>{

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
                    findOtpPattern.user_role = 4;

                    OtpServices.oneRecord(findOtpPattern).then(otpResult => {      
                        if(otpResult && otpResult.otp_number==otp_number){
                            if(otp_for == 'forgot_password') {
                                // success
                                OtpServices.deleteRecord(findOtpPattern).then(async otpDeleteRes => {
                                   
                                }).catch(err=>{
                                    let resMsg = Validation.getErrorMessage(err);
                                    Response.send(req, res, 500, resMsg);
                                });

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
                            } else {
                                let resMsg = Messages.INVALID_OTP_REQUEST;
                                Response.send(req,res,400,resMsg);
                            }    

                        }else{
                            let resMsg = Messages.INVALID_OTP;
                            Response.send(req, res, 400, resMsg);
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
 * @api {post} /user_service/driver/resend_otp Login - Resend OTP
 * @apiGroup App - Driver - Login
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

            var findPattern = {
                user_role: 4,
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
            UserServices.oneRecord(aggregatecondition).then(userResult=>{

                if(userResult){

                    if (otp_for == "forgot_password" && userResult.is_user_verified == 0) {

                        let resMsg = Messages.NOT_ALLOW_TO_CHANGE_PASSWORD;
                        Response.send(req, res, 500, resMsg);
    
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
                        createOtpPattern.user_role = 4;

                        OtpServices.saveAndSendOtp(createOtpPattern).then(resultOtp=>{

                            if(otp_for=="email_verify"){
                                var token = Common.generateRandomNumber(12);
                                var user_id = login_user_id;
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
                                    SendMail.sendEmail(phone, subject, data);
                                    }
                                });
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
                            }
                            Response.send(req, res, 200, resMsg,result);

                        }).catch(err=>{
                            let errorMsg = Validation.getErrorMessage(err);
                            Response.send(req, res, 500, errorMsg);
                        })

                      

                    }

                }else{
                    let resMsg = Messages.INVALID_PHONE;
                    Response.send(req, res, 400, resMsg);
                }
            }).catch(err=>{
                let errorMsg = Validation.getErrorMessage(err);
                Response.send(req, res, 500, errorMsg);
            })

        }catch(err){
            Response.send(req,res,500,err.message);
        }

    },


    
    /**
 * @api {post} /user_service/driver/update_forgot_password Login - Update Forget Password
 * @apiGroup App - Driver - Login
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
            user_role:4,
            is_user_verified:1
        }
        findPattern["$or"] = [{email:phone},{country_code:country_code,phone:phone}];
        
       // console.log(findPattern);
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
                    user_id : userResult._id,
                    country_code:country_code,
                    phone:userResult.phone,
                    otp_for : "forgot_password",
                    user_role:4
                }
                OtpServices.oneRecord(findOtpPattern).then(otpResult=>{
                    if(otpResult){
                    if(otpResult.otp_number==otp_number){
                        OtpServices.deleteRecord({_id:otpResult._id});
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