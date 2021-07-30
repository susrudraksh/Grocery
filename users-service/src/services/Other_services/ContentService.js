"use strict";

const config = require("../../config");
const serviceAdapter = require("../../routes/serviceAdapter");
const axiosHttp = serviceAdapter(config.apiGatewayUrl);

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const ContentServices = {
    getRequest: async function (path) {
        return axiosHttp.get("/content_service/" + path).then(result => {
            return result.data.data;
        }).catch(err => {
            return err;
        });
    },
    postRequest: async function (path,req) {
        
        if (req.files) { req.body.files = req.files; }
        return axiosHttp.post("/content_service/"+path, req).then(result=>{  
            return result.data.data;
        }).catch(err=>{
            return err;
        })
    }
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
}
module.exports = ContentServices;


