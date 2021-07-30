'use strict';
const express = require('express');

const serviceAdapter = require('./serviceAdapter');
var {Messages,Response} = require('../helpers');


module.exports = (serviseBaseUrl) =>{
    //
    const Router = express.Router();
    Router.get('/*',(req,res)=>{
        const axiosRequest = serviceAdapter(serviseBaseUrl,req);
     
        axiosRequest.get(req.url).then(result=>{
            res.send(result.data);
        }).catch(err=>{
            var statusCode = err.response ? err.response.status : 500;
            var error_message = err.response ? err.response.data.message : Messages.INTERNAL_SERVER_ERROR;
            Response.send(req, res, statusCode, error_message);
        })

    });

    Router.post('/*',(req,res)=>{



        const axiosRequest = serviceAdapter(serviseBaseUrl,req);

        // if files data is exist then append with body data
        if (req.files) { req.body.files = req.files; }

        axiosRequest.post(req.url, req.body).then(result=>{          console.log("HERE");
            res.send(result.data);
        }).catch(err=>{
            var statusCode = err.response ? err.response.status : 500;
            var error_message = err.response ? err.response.data.message : Messages.INTERNAL_SERVER_ERROR;
            Response.send(req, res, statusCode, error_message);
        })

    });

    Router.put('/*',(req,res)=>{

        const axiosRequest = serviceAdapter(serviseBaseUrl,req);

         // if files data is exist then append with body data
         if (req.files) { req.body.files = req.files; }
         
        axiosRequest.put(req.url, req.body).then(result=>{
            res.send(result.data);
        }).catch(err=>{
            var statusCode = err.response ? err.response.status : 500;
            var error_message = err.response ? err.response.data.message : Messages.INTERNAL_SERVER_ERROR;
            Response.send(req, res, statusCode, error_message);
        })

    });


    Router.delete('/*',(req,res)=>{

        const axiosRequest = serviceAdapter(serviseBaseUrl,req);

        axiosRequest.delete(req.url).then(result=>{
            res.send(result.data);
        }).catch(err=>{
            var statusCode = err.response ? err.response.status : 500;
            var error_message = err.response ? err.response.data.message : Messages.INTERNAL_SERVER_ERROR;
            Response.send(req, res, statusCode, error_message);
        })

    });

    return Router;
}