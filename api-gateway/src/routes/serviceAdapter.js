'use strict';
const axios =  require('axios');
const moment = require('moment');
const {Encryption} = require('../helpers');

module.exports = (baseURL,req)=> {
//	console.log(req);
    var headersOpts = {
		"X-Access-Token": Encryption.getCryptLibEncryption(moment.unix()),
		"Authorization": req.headers["authorization"] || "",
		"device_token": req.headers["device_token"] || "",
		"device_type": req.headers["device_type"] || "",
		"local_timezone": req.headers["local_timezone"] || "",
		"login_user_id": req.headers["login_user_id"] || "",
		"login_user_role": req.headers["login_user_role"] || "",
		"route_service_name": req.headers["route_service_name"] || "",
		"route_user_type": req.headers["route_user_type"] || "",
		"route_module_name": req.headers["route_module_name"] || "",
		"route_method": req.headers["route_method"] || "",
    };
    
	
      const axiosHttp = axios.create({
		baseURL: baseURL,
		method: req.method,
		headers: headersOpts,
		maxContentLength: Infinity,
		maxBodyLength: Infinity,
	});


	return axiosHttp;
}