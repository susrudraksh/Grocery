'use strict';

const {Encryption,Messages,Response,Redis} =  require('../helpers');
const config = require('../config');
var reqMethods = {
    "POST": "add",
    "PUT": "edit",
    "GET": "list",
    "PUT": "edit",
    "DELETE": "delete",
};

module.exports ={
    validaterequest : async(req,res,next) => {
       
        try{
            if (config.validateApiAccess) {
                
                if(req.method!='OPTION'){
                    var api_name = req.url.substr(req.url.lastIndexOf('/') + 1);
                    
                    var accessToken = req.headers['x-access-token'];
                   
                    if(accessToken!=''){
                       
                        const requestTime = Encryption.cryptLibDecryption(accessToken, config.apiAccessKeyForOther);
                        var currentTimeStamp = Math.floor(Date.now());   // In Seconds
                        var requestTimeDiff = currentTimeStamp - parseInt(requestTime);
        
                        if (accessToken == "" || requestTimeDiff > 60) {
                            // error
                            var errorMsg = Messages.NOT_ALLOW_ACCESS_WEBSERVICES;
                            Response.send(req, res, 403, errorMsg, api_name);
            
                        } else {
                            next();
                        }
                    }else{
                        var errorMsg = Messages.NOT_ALLOW_ACCESS_WEBSERVICES;
                        Response.send(req, res, 403, errorMsg, api_name);
                    }
                }
            }else{
                next();
            }
        }catch(err){
            var errorMsg = err.toString();
            Response.send(req, res, 500, errorMsg, api_name);
        }
     },


    validateAuthorization : async (req, res, next) => {
       
        try {
          
            var login_user_id = req.headers["login_user_id"] || "";
            var login_user_role = req.headers["login_user_role"] || "";
            var route_service_name = req.headers["route_service_name"] || "";
            var route_user_type = req.headers["route_user_type"] || "";
            var route_module_name = req.headers["route_module_name"] || "";
            var route_method = req.headers["route_method"] || "";
    
            var authHeader = req.headers["authorization"] || "";
            var authToken = authHeader ? authHeader.split(' ')[1] : "";
    
            var key = login_user_role + "_" + login_user_id;

            
            var redisAuthToken = await Redis.hget("_auth_tokens", key);
            if (redisAuthToken && redisAuthToken == authToken) {
    
                // Check permission only for Sub admin
                if (login_user_role == 2) {
    
                    var decodedToken = Encryption.getJwtDecryption(authToken, config.jwtSecretKey);
                    var userPermissions = JSON.parse(decodedToken.user_permissions) || {};
                    console.log("route_module_name",route_module_name)
                    console.log("er",userPermissions[route_module_name])
                    console.log("er",userPermissions)
                    var spacialallowfeature = ["orders","setting","report"];
                    var specialallow = false;
                    if(spacialallowfeature.includes(route_module_name) && userPermissions[route_module_name]){
                        specialallow = true;
                    }
                    var allowedModules = ["profile"];
                    var permissionType = reqMethods[route_method];
                    console.log("permissionType",permissionType);
                    console.log("route_module_name",route_module_name);
                    
                    if (login_user_role == 2 && (allowedModules.includes(route_module_name) || userPermissions[route_module_name] && userPermissions[
                        route_module_name].includes(permissionType) || specialallow)) {
                        var resMsg = "Success";
                        Response.send(req, res, 200, resMsg);
                    } else {
                        var resMsg = Messages.FORBIDDEN;
                        Response.send(req, res, 403, resMsg);
                    }
                } else {
                    var resMsg = "Success";
                    Response.send(req, res, 200, resMsg);
                }
            } else {
                var resMsg = Messages.UNAUTHORIZED;
                Response.send(req, res, 401, resMsg);
            }
        } catch (err) {
            var resMsg = err.toString();
            Response.send(req, res, 500, resMsg);
        }
    }

}