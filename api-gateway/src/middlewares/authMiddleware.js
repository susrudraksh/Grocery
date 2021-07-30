'use strict';

const {Encryption,Messages,Response} =  require('../helpers');
const config = require('../config');
const jwt = require('jsonwebtoken');
const serviceAdapter = require('../routes/serviceAdapter'); 
const moment = require('moment');

const authCheck ={
   
     validaterequest : async(req,res,next) => {
        try{
           
            if (config.validateApiAccess) {
                
                if(req.method!='OPTION'){
                   
                    var api_name = req.url.substr(req.url.lastIndexOf('/') + 1);
                    
                    var accessToken = req.headers['x-access-token'];
                   
                    if(typeof accessToken!=='undefined'){
                        
                     
                        const requestTime = Encryption.cryptLibDecryption(accessToken, config.apiAccessKey);
                        
                        if(!isNaN(requestTime)){
                           
                            var currentTimeStamp = Math.floor(Date.now());   // In Seconds
                            var requestTimeDiff = currentTimeStamp - parseInt(requestTime);
                            requestTimeDiff = parseInt(requestTimeDiff/1000);
                            if (accessToken == "" || requestTimeDiff > 1064654646656) {
                                // error
                                var errorMsg = Messages.NOT_ALLOW_ACCESS_WEBSERVICES;
                                Response.send(req, res, 403, errorMsg);
                            } else {
                                next();
                            }
                        }else{
                            var errorMsg = Messages.NOT_ALLOW_ACCESS_WEBSERVICES;
                            Response.send(req, res, 403, errorMsg);
                        }
                    }else{
                        
                        var errorMsg = Messages.NOT_ALLOW_ACCESS_WEBSERVICES;
                        Response.send(req, res, 403, errorMsg);
                    }
                }
            }else{
                
                next();
            }
        }catch(err){
            var errorMsg = err.toString();
            Response.send(req, res, 500, errorMsg);
        }
     },


    // checkJWTAuthentication : async(req, res, next) => {
    // try {
       
    //     var api_name = req.url.substr(req.url.lastIndexOf('/') + 1);

    //     var internal_api_access_key = req.headers.internal_api_access_key || false;
    //     var authHeader = req.headers.authorization ? req.headers.authorization : req.headers.token;
    //     var authToken = authHeader ? authHeader.split(' ')[1] : "";

    //     var nonLoginApis = ["user_login", "user_register", "social_login", "resend_otp", "verify_otp", "update_forgot_password",'get_banners'];
       
    //     if (config.appLoginSessionAuthCheck && nonLoginApis.indexOf(api_name) == -1 && !internal_api_access_key && internal_api_access_key != config.internalApiAccessKey) {
           
    //         if (authToken && authToken != "") {

    //             try {

    //                 var decodedToken = jwt.decode(authToken, config.jwtSecretKey);
                 
    //                 var userId = decodedToken.login_user_id;
    //                 var expiresTime = parseInt(decodedToken.exp);

    //                 var currentTimestamp = Date.now();

    //                 if (!userId || !expiresTime || expiresTime < currentTimestamp ) {

    //                     // error
    //                     var errorMsg = Messages.LOGIN_SESSION_EXPIRED;
    //                     Response.send(req, res, 401, errorMsg);
                        

    //                 } else {

    //                     var userData = await authCheck.checkUserAutherization(req, res);
                          
    //                     if (userData && (userData.is_active == 0 || userData.is_deleted == 1)) {

    //                         // error
    //                         var errorMsg = Messages.INVALID_USER_ACCESS;
    //                         Response.send(req, res, 401, errorMsg);

    //                     } else {
    //                         next();
    //                     }
    //                 }

    //             } catch (err) {

    //                 // error
    //                 var errorMsg = Messages.LOGIN_SESSION_EXPIRED;
    //                 Response.send(req, res, 401, errorMsg);
    //             }

    //         } else {

    //             // error
    //             var errorMsg = Messages.AUTH_TOKEN_MISSING;
    //             Response.send(req, res, 402, errorMsg);
    //         }

    //     } else {
           
    //         if(nonLoginApis.indexOf(api_name)==0){
    //             authCheck.validaterequest(req, res, next);
    //         }else{
    //             next();
    //         }
            
    //     }

    // } catch (err) {

    //     var errorMsg = err.toString();
    //     Response.send(req, res, 500,errorMsg);
    // }
    // },

   


    checkJWTAuthentication : async(req, res, next) => {
        try {
            
        var api_name = req.url.substr(req.url.lastIndexOf('/') + 1);
        var remove_filter = api_name.split('?');
        api_name = remove_filter[0];
        
        var internal_api_access_key = req.headers.internal_api_access_key || false;
        var authHeader = req.headers["authorization"] || "";
        var authToken = authHeader ? authHeader.split(' ')[1] : "";

        var reqPath = req.path.split("/");
        var serviceName = reqPath[1];
        var userType = reqPath[2];
        var moduleName = reqPath[3];
        var submoduleName = reqPath[4];

        // Modify Request Headers
        req.headers["route_service_name"] = serviceName;
        req.headers["route_user_type"] = userType;
        req.headers["route_module_name"] = moduleName;
        req.headers["route_method"] = req.method;

        var nonLoginTypes = ["website"];
        var nonLoginModules = ["service-providers","login","registration","resend_otp",'verify_otp','update_forgot_password','verify_email','delivery_settings','normal_settings'];
        var nonLoginApis = ["verify_email","popularproduct","discountproduct",
            "resend_verification_email","login","get_business_category","get_category","get_subcategory","get_products","get_brands", "resend_otp","verify_otp", "update_forgot_password",'registration','get_banners','similar_products','get_product_detail','other_customization_products','customizationtype','customizationsubtype','listbyfilter','complete_payment'];
    
            if (config.validateApiAccess && !nonLoginTypes.includes(userType) && !nonLoginModules.includes(moduleName) && !nonLoginApis.includes(submoduleName) && !nonLoginApis.includes(api_name)) {
  
                if (authToken && authToken != "") {
                    
                    try {
                        
                        var decodedToken = jwt.decode(authToken, config.jwtSecretKey);
                     
                        var userId = decodedToken.login_user_id;
                        var loginUserRole = decodedToken.user_role || "";
                        var expiresTime = parseInt(decodedToken.exp);
                        expiresTime = parseInt(expiresTime*1000);
                        var currentTimestamp = Date.now();

                   

    
                        if (!userId || !expiresTime || expiresTime < currentTimestamp ) {
                       // if (!userId || !expiresTime  ) {
                            
                            // error
                            var errorMsg = Messages.LOGIN_SESSION_EXPIRED;
                            Response.send(req, res, 401, errorMsg);
                            
    
                        } else {
                           
                            
                            req.headers["login_user_id"] = userId;
                            req.headers["login_user_role"] = loginUserRole;
                            req.headers["route_service_name"] = serviceName;
                            req.headers["route_user_type"] = userType;
                            req.headers["route_module_name"] = moduleName;
                            req.headers["route_method"] = req.method;
                           
                            var userData = await authCheck.checkUserAutherization(req, res);
                            console.log("userData",userData);
                            //next();
                            if (userData==true){
                                next();
                            }else{
                                if(loginUserRole==1){
                                    next();
                                }else{
                                var resMsg = Messages.FORBIDDEN;
                                Response.send(req, res, userData, resMsg);
                                }
                            }
                        }
    
                    } catch (err) {
                        console.log('userData');
                        // error
                        var errorMsg = Messages.LOGIN_SESSION_EXPIRED;
                        Response.send(req, res, 401, errorMsg);
                    }
    
                } else {
    
                    // error
                    var errorMsg = Messages.AUTH_TOKEN_MISSING;
                    Response.send(req, res, 402, errorMsg);
                }
    
            } else {
                
                // if(nonLoginApis.indexOf(api_name)!=-1){
                //     authCheck.validaterequest(req, res, next);
                // }else{
                    next();
                //}
                
            }
    
        } catch (err) {
    
            var errorMsg = err.toString();
            Response.send(req, res, 500,errorMsg);
        }
    },

     checkUserAutherization:(req, res) =>{

        const axiosHttp = serviceAdapter(config.userServiceUrl, req);
        return axiosHttp.get("/validate_authorization").then(resp => {
            return true;
        }).catch(err => {
            return err.response.status;
        });
    },

     checkAdminAutherization:(req,res)=> {
        
        const axiosHttp = serviceAdapter(config.userServiceUrl,req);
        
        return axiosHttp.get("admin/profile").then(async resp => {
            
            if (resp.data.status == 200) {
                return resp.data.data;
            } else {
               
                return null;
            }
    
        })
    }

}

module.exports = authCheck;